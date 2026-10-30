create table if not exists public.quote_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  phone text not null,
  email text not null,
  building_type text not null,
  floors text,
  notes text,
  source text not null,
  page_url text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  gclid text,
  fbclid text,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'closed'))
);

create table if not exists public.quote_lead_access (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.quote_leads enable row level security;
alter table public.quote_lead_access enable row level security;

revoke all on public.quote_leads from anon, authenticated;
revoke all on public.quote_lead_access from anon, authenticated;
grant select, update (status) on public.quote_leads to authenticated;
grant select on public.quote_lead_access to authenticated;

drop policy if exists "Authorized staff can read quote leads" on public.quote_leads;
create policy "Authorized staff can read quote leads"
  on public.quote_leads
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.quote_lead_access
      where quote_lead_access.user_id = (select auth.uid())
    )
  );

drop policy if exists "Authorized staff can update quote lead status" on public.quote_leads;
create policy "Authorized staff can update quote lead status"
  on public.quote_leads
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.quote_lead_access
      where quote_lead_access.user_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1
      from public.quote_lead_access
      where quote_lead_access.user_id = (select auth.uid())
    )
  );

drop policy if exists "Users can see their own quote lead access" on public.quote_lead_access;
create policy "Users can see their own quote lead access"
  on public.quote_lead_access
  for select
  to authenticated
  using (user_id = (select auth.uid()));
