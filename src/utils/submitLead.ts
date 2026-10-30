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

// Public project settings used when the host does not provide VITE_ variables. The
// publishable key is meant to be public: row-level security keeps the leads table private.
const DEFAULT_SUPABASE_URL = 'https://ywanozywaivpbfamgugi.supabase.co';
const DEFAULT_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_jRFm4PMi7CYqjBHzcX4NKA_Cv1GJqrq';

export async function submitLead(lead: LeadSubmission): Promise<LeadSubmissionResult> {
  const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL).trim();
  // Accepts the newer `sb_publishable_` key or a legacy JWT-format anon key.
  const supabaseKey = (
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
    || import.meta.env.VITE_SUPABASE_ANON_KEY
    || DEFAULT_SUPABASE_PUBLISHABLE_KEY
  ).trim();

  // Publishable keys are not JWTs, so they only go in the apikey header.
  const isLegacyJwt = !supabaseKey.startsWith('sb_');
  try {
    const response = await fetch(`${supabaseUrl.replace(/\/+$/, '')}/functions/v1/submit-lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseKey,
        ...(isLegacyJwt ? { Authorization: `Bearer ${supabaseKey}` } : {}),
      },
      body: JSON.stringify(lead),
    });

    const result = (await response.json().catch(() => null)) as LeadSubmissionResult | null;
    if (response.ok && result?.accepted) {
      return result;
    }
    console.error('[VELMO] Lead submission was rejected with status:', response.status);
  } catch (err) {
    console.error('[VELMO] Lead submission request failed:', err);
  }
  // The lead did not reach the server, so tell the visitor instead of reporting success.
  throw new Error('We could not submit your request. Please try again, or call us directly.');
}
