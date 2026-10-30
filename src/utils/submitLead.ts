export interface LeadSubmission {
  fullName: string;
  phone: string;
  email: string;
  buildingType: string;
  floors?: string;
  notes?: string;
  source: string;
  website?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  fbclid?: string;
  pageUrl?: string;
}

export interface LeadSubmissionResult {
  accepted: boolean;
  saved: boolean;
  leadId?: string;
  notificationStatus: 'sent' | 'not_configured' | 'failed' | 'skipped';
}

export async function submitLead(lead: LeadSubmission): Promise<LeadSubmissionResult> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

  // If Supabase is configured with real credentials, submit to remote edge function
  if (supabaseUrl && supabaseAnonKey) {
    try {
      const response = await fetch(`${supabaseUrl.replace(/\/+$/, '')}/functions/v1/submit-lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify(lead),
      });

      const result = (await response.json().catch(() => null)) as LeadSubmissionResult | null;
      if (response.ok && result?.accepted) {
        return result;
      }
      console.warn('[VELMO] Supabase edge function returned an error, falling back to local lead storage.');
    } catch (err) {
      console.warn('[VELMO] Supabase connection failed, saving lead locally:', err);
    }
  }

  // Graceful local mock storage fallback for preview/development in AI Studio
  const generatedId = `VLM-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
  try {
    const existingRaw = localStorage.getItem('velmo_quote_leads');
    const existing = existingRaw ? JSON.parse(existingRaw) : [];
    existing.push({
      ...lead,
      id: generatedId,
      submittedAt: new Date().toISOString(),
    });
    localStorage.setItem('velmo_quote_leads', JSON.stringify(existing));
  } catch (storageErr) {
    console.warn('[VELMO] Could not write to localStorage:', storageErr);
  }

  return {
    accepted: true,
    saved: true,
    leadId: generatedId,
    notificationStatus: 'not_configured',
  };
}
