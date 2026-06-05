-- Drop the NFT/lore scaffolding from profiles. The NFT mechanism was removed
-- from the product (discounts-only rewards); these columns, the counter-sync
-- trigger, and the NFT public_counters rows were never written to by app code.

-- The trigger fires on update of nft_status, so it must go before the column.
drop trigger if exists profiles_sync_nft_counters on profiles;
drop function if exists sync_nft_counters();

-- Dropping nft_status also drops its dependent partial index.
alter table profiles
  drop column if exists nft_minted,
  drop column if exists nft_status,
  drop column if exists nft_action_id,
  drop column if exists nft_claim_url,
  drop column if exists lore_access_granted;

delete from public_counters where key in ('nfts_claimed', 'nfts_remaining');
