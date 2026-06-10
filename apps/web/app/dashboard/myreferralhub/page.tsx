import type { Metadata } from "next";
import { ReferralHub } from "./ReferralHub";

export const metadata: Metadata = {
  title: "Your Referral Hub | hydrbrew°",
  description:
    "Track your referrals, tier progress, and where you rank in the hydrbrew° network.",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ userCode?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const userCode =
    typeof params.userCode === "string" && params.userCode.trim() !== ""
      ? params.userCode.trim()
      : null;
  return <ReferralHub userCode={userCode} />;
}
