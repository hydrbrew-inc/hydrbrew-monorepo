-- Operative numbers now read "Member-XXXX" instead of "HB-XXXX". The sequence
-- is unchanged, so numbering continues seamlessly; existing rows are backfilled
-- to the new prefix (same number, new prefix — uniqueness is preserved).

alter table profiles
  alter column operative_number
  set default ('Member-' || lpad(nextval('operative_number_seq')::text, 4, '0'));

update profiles
  set operative_number = replace(operative_number, 'HB-', 'Member-')
  where operative_number like 'HB-%';
