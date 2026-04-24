-- Phase 01 schema: waitlist signup + public FOMO counters.

create extension if not exists "pgcrypto";

create table profiles (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  first_name text,

  operative_id text unique,
  referral_code text unique,
  referrer_code text,
  milestone_level smallint not null default 1 check (milestone_level between 1 and 4),

  signup_source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,

  nft_minted boolean not null default false,
  nft_status text not null default 'pending'
    check (nft_status in ('pending','queued','minted','failed','skipped')),
  nft_action_id text,
  nft_claim_url text,

  lore_access_granted boolean not null default false,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index on profiles (lower(email));
create index on profiles (referrer_code) where referrer_code is not null;
create index on profiles (created_at desc);
create index on profiles (nft_status) where nft_status in ('pending','queued');

create table public_counters (
  key text primary key,
  value bigint not null default 0,
  updated_at timestamptz not null default now()
);

insert into public_counters (key, value) values
  ('total_signups', 0),
  ('nfts_claimed', 0),
  ('nfts_remaining', 2000);

create function set_updated_at() returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger profiles_set_updated_at before update on profiles
  for each row execute function set_updated_at();

create trigger public_counters_set_updated_at before update on public_counters
  for each row execute function set_updated_at();

create function bump_signups() returns trigger
  language plpgsql security definer set search_path = public as $$
begin
  update public_counters set value = value + 1 where key = 'total_signups';
  return new;
end;
$$;

create trigger profiles_bump_signups after insert on profiles
  for each row execute function bump_signups();

-- Only counts the first flip to 'minted' — Crossmint webhook retries mustn't double-count.
create function sync_nft_counters() returns trigger
  language plpgsql security definer set search_path = public as $$
begin
  if new.nft_status = 'minted' and coalesce(old.nft_status, '') <> 'minted' then
    update public_counters set value = value + 1 where key = 'nfts_claimed';
    update public_counters set value = greatest(value - 1, 0) where key = 'nfts_remaining';
  end if;
  return new;
end;
$$;

create trigger profiles_sync_nft_counters after update of nft_status on profiles
  for each row execute function sync_nft_counters();

alter table profiles enable row level security;
alter table public_counters enable row level security;

-- profiles has no policies: deny-all to anon. Server writes with the secret key bypass RLS.
-- public_counters is readable by anyone (landing page), writes are server-only.
create policy "public_counters readable" on public_counters
  for select to anon, authenticated using (true);

alter publication supabase_realtime add table public_counters;
