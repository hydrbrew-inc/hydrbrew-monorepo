-- Operative number: HB-XXXX assigned sequentially on signup. Used in the
-- Klaviyo Initialization Email template ({{ person.operative_number }})
-- and the on-page ID card. Distinct from the Viral Loops referral code.

create sequence operative_number_seq start with 1 increment by 1;

alter table profiles
  add column operative_number text not null unique
  default ('HB-' || lpad(nextval('operative_number_seq')::text, 4, '0'));
