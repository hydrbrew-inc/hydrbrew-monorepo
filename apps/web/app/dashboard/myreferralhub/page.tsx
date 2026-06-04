import type { Metadata } from "next";
import { ReferralHubStub } from "./ReferralHubStub";

export const metadata: Metadata = {
  title: "Your Referral Hub | hydrbrew°",
  description:
    "Your member dashboard for the hydrbrew° referral program. Share your link and unlock tier rewards.",
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
  return <ReferralHubStub userCode={userCode} />;
}
