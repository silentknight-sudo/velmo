const edgeRuntime = globalThis as typeof globalThis & {
  Deno: {
    env: { get(name: string): string | undefined };
    serve(handler: (request: Request) => Response | Promise<Response>): void;
  };
};

const corsHeaders = {
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

interface LeadRequest {
  fullName?: unknown;
  phone?: unknown;
  email?: unknown;
  buildingType?: unknown;
  floors?: unknown;
  notes?: unknown;
  source?: unknown;
  website?: unknown;
  pageUrl?: unknown;
  utmSource?: unknown;
  utmMedium?: unknown;
  utmCampaign?: unknown;
  utmTerm?: unknown;
  utmContent?: unknown;
  gclid?: unknown;
  fbclid?: unknown;
}

const jsonResponse = (status: number, body: Record<string, unknown>, origin: string | null) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      ...(origin ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' } : {}),
    },
  });

const cleanText = (value: unknown, maxLength: number): string =>
  typeof value === 'string'
    ? value.replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, maxLength)
    : '';

const escapeHtml = (value: string): string => {
  const entities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return value.replace(/[&<>"']/g, (character) => entities[character] ?? character);
};

edgeRuntime.Deno.serve(async (request: Request) => {
  const origin = request.headers.get('Origin');
  const allowedOrigins = (edgeRuntime.Deno.env.get('ALLOWED_ORIGINS') ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  if (origin && allowedOrigins.length > 0 && !allowedOrigins.includes(origin)) {
    return jsonResponse(403, { accepted: false, error: 'Origin not allowed.' }, null);
  }

  if (request.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        ...corsHeaders,
        ...(origin ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' } : {}),
      },
    });
  }

  if (request.method !== 'POST') {
    return jsonResponse(405, { accepted: false, error: 'Method not allowed.' }, origin);
  }

  const contentLength = Number(request.headers.get('Content-Length') ?? 0);
  if (contentLength > 10_000) {
    return jsonResponse(413, { accepted: false, error: 'Request is too large.' }, origin);
  }

  const reader = request.body?.getReader();
  if (!reader) {
    return jsonResponse(400, { accepted: false, error: 'Request body is required.' }, origin);
  }

  const bodyChunks: Uint8Array[] = [];
  let bodySize = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bodySize += value.byteLength;
    if (bodySize > 10_000) {
      await reader.cancel();
      return jsonResponse(413, { accepted: false, error: 'Request is too large.' }, origin);
    }
    bodyChunks.push(value);
  }

  const bodyBytes = new Uint8Array(bodySize);
  let offset = 0;
  for (const chunk of bodyChunks) {
    bodyBytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  const rawBody = new TextDecoder().decode(bodyBytes);
  let input: LeadRequest;
  try {
    input = JSON.parse(rawBody) as LeadRequest;
    if (!input || typeof input !== 'object' || Array.isArray(input)) {
      throw new Error('Expected object.');
    }
  } catch {
    return jsonResponse(400, { accepted: false, error: 'Invalid request body.' }, origin);
  }

  if (cleanText(input.website, 200)) {
    return jsonResponse(200, {
      accepted: true,
      saved: false,
      notificationStatus: 'skipped',
    }, origin);
  }

  const lead = {
    full_name: cleanText(input.fullName, 120),
    phone: cleanText(input.phone, 40),
    email: cleanText(input.email, 254).toLowerCase(),
    building_type: cleanText(input.buildingType, 120),
    floors: cleanText(input.floors, 120) || null,
    notes: cleanText(input.notes, 3000) || null,
    source: cleanText(input.source, 120) || 'Website quote form',
    page_url: cleanText(input.pageUrl, 2048) || null,
    utm_source: cleanText(input.utmSource, 200) || null,
    utm_medium: cleanText(input.utmMedium, 200) || null,
    utm_campaign: cleanText(input.utmCampaign, 200) || null,
    utm_term: cleanText(input.utmTerm, 200) || null,
    utm_content: cleanText(input.utmContent, 200) || null,
    gclid: cleanText(input.gclid, 500) || null,
    fbclid: cleanText(input.fbclid, 500) || null,
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    !lead.full_name ||
    (lead.phone.match(/\d/g) ?? []).length < 7 ||
    !emailPattern.test(lead.email) ||
    !lead.building_type
  ) {
    return jsonResponse(400, { accepted: false, error: 'Please provide valid contact and project details.' }, origin);
  }

  const supabaseUrl = edgeRuntime.Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = edgeRuntime.Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceRoleKey) {
    console.error('Lead endpoint is missing Supabase server configuration.');
    return jsonResponse(500, { accepted: false, error: 'Lead storage is not configured.' }, origin);
  }

  let storedLead: { id: string; created_at: string };
  try {
    const insertResponse = await fetch(`${supabaseUrl.replace(/\/+$/, '')}/rest/v1/quote_leads?select=id,created_at`, {
      method: 'POST',
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(lead),
    });

    if (!insertResponse.ok) {
      console.error('Supabase rejected lead insert with status:', insertResponse.status);
      return jsonResponse(500, { accepted: false, error: 'We could not save your request.' }, origin);
    }

    const inserted = await insertResponse.json() as Array<{ id: string; created_at: string }>;
    if (!inserted[0]?.id) {
      console.error('Supabase returned no lead record after insert.');
      return jsonResponse(500, { accepted: false, error: 'We could not confirm your request was saved.' }, origin);
    }
    storedLead = inserted[0];
  } catch (error) {
    console.error('Lead storage request failed:', error instanceof Error ? error.message : 'Unknown error');
    return jsonResponse(500, { accepted: false, error: 'We could not save your request.' }, origin);
  }

  const resendApiKey = edgeRuntime.Deno.env.get('RESEND_API_KEY');
  const recipient = edgeRuntime.Deno.env.get('LEAD_NOTIFICATION_EMAIL');
  const sender = edgeRuntime.Deno.env.get('LEAD_FROM_EMAIL');
  const recipients = recipient?.split(',').map((value) => value.trim()).filter(Boolean) ?? [];
  let notificationStatus: 'sent' | 'not_configured' | 'failed' = 'not_configured';

  if (resendApiKey && recipients.length > 0 && sender?.trim()) {
    const emailRows = [
      ['Name', lead.full_name],
      ['Phone', lead.phone],
      ['Email', lead.email],
      ['Building type', lead.building_type],
      ['Floors / stops', lead.floors ?? 'Not specified'],
      ['Requirements', lead.notes ?? 'None provided'],
      ['Source', lead.source],
      ['Lead ID', storedLead.id],
    ];
    const text = emailRows.map(([label, value]) => `${label}: ${value}`).join('\n');
    const html = emailRows
      .map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`)
      .join('');

    try {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: sender,
          to: recipients,
          subject: `New VELMO quote request: ${lead.full_name}`,
          text,
          html,
        }),
      });

      if (emailResponse.ok) {
        notificationStatus = 'sent';
      } else {
        notificationStatus = 'failed';
        console.error('Email provider rejected lead notification with status:', emailResponse.status);
      }
    } catch (error) {
      notificationStatus = 'failed';
      console.error('Lead notification request failed:', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  return jsonResponse(200, {
    accepted: true,
    saved: true,
    leadId: storedLead.id,
    notificationStatus,
  }, origin);
});
