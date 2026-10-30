<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>


## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Supabase quote lead backend

Quote requests from both quote forms are submitted to a Supabase Edge Function. The function validates and stores each request in the private `quote_leads` table, then sends an email through Resend when email settings are configured. The service-role key and email API key are only used by the Edge Function; never add them to frontend code or a `VITE_` variable.

### One-time external setup

1. Create a Supabase project and a Resend account. Verify a sender domain in Resend, for example `leads@yourdomain.com`.
2. Install the Supabase CLI and authenticate:
   ```sh
   supabase login
   supabase link --project-ref YOUR_PROJECT_ID
   ```
3. Apply the private database schema:
   ```sh
   supabase db push
   ```
   The migration creates the leads table, enables row-level security, and denies public access. Authenticated users can read leads only after being added to `quote_lead_access`.
4. Configure Edge Function secrets in the Supabase Dashboard under **Edge Functions → Secrets**, or with `supabase secrets set`:
   - `RESEND_API_KEY`: API key from Resend.
   - `LEAD_NOTIFICATION_EMAIL`: recipient email address (multiple addresses may be comma-separated).
   - `LEAD_FROM_EMAIL`: verified sender, such as `VELMO Leads <leads@yourdomain.com>`.
   - `ALLOWED_ORIGINS`: comma-separated allowed website origins, for example `https://yourdomain.com,http://localhost:3000`.

   Supabase provides `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to deployed Edge Functions. For local function development, provide those two values in an untracked local secrets file instead.
5. Deploy the lead endpoint:
   ```sh
   supabase functions deploy submit-lead
   ```
6. For local website development, copy `.env.example` to `.env.local` and set:
   - `VITE_SUPABASE_URL`: the Supabase project URL.
   - `VITE_SUPABASE_ANON_KEY`: the project's public JWT-format `anon` key (not the service-role key).

   Set the same two public Vite variables in the website host's environment settings before building/deploying the website. These values are intentionally public; RLS prevents them from reading the leads table. Do not use the service-role key here.
7. Create the designated staff account in **Supabase → Authentication → Users**. To authorize that account to read leads, find its user UUID and run in the Supabase SQL Editor:
   ```sql
   insert into public.quote_lead_access (user_id)
   values ('STAFF_USER_UUID');
   ```
   Remove access by deleting that row. The database policies allow only these explicitly authorized authenticated users to read leads and update their status.
8. Submit a test request from the deployed site. Confirm it appears in `quote_leads` and the notification arrives at the configured recipient. If email is not configured or delivery fails, the request remains saved and the form reports that email status separately.

The database and access policies are ready for a staff-only authenticated lead viewer, but this project does not yet include a sign-in or lead-management screen. The project owner can inspect submissions in Supabase; do not invite someone as a Supabase project member just to view leads, since project membership may grant broader project access than the row-level lead policy. The notification email contains the submitted lead details.

Before public launch, configure abuse protection such as CAPTCHA/Turnstile and request rate limiting at the edge/CDN. CORS and the honeypot are useful safeguards but are not a substitute for rate limiting.
