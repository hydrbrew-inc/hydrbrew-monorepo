"use client";

import Link from "next/link";
import { useState } from "react";

type Props = {
  userCode: string | null;
};

export function ReferralHubStub({ userCode }: Props) {
  const sharingUrl = userCode ? `https://vrlps.co/${userCode}/cp` : null;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!sharingUrl) return;
    navigator.clipboard.writeText(sharingUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <main className="min-h-screen bg-black text-white antialiased px-4 py-12 md:py-24">
      <div className="max-w-2xl mx-auto">
        <div
          className="flex items-center gap-3 mb-12 text-xs font-mono tracking-[0.3em]"
          style={{ color: "#00FFFF" }}
        >
          <span className="relative inline-flex w-2 h-2">
            <span
              className="absolute inline-flex w-full h-full rounded-full opacity-60 animate-ping"
              style={{ backgroundColor: "#00FFFF" }}
            />
            <span
              className="relative inline-flex w-2 h-2 rounded-full"
              style={{ backgroundColor: "#00FFFF" }}
            />
          </span>
          REFERRAL HUB - INCOMING
        </div>

        <h1 className="text-3xl md:text-5xl mb-6 font-mono leading-tight">
          Your dashboard is being built.
        </h1>
        <p className="text-base md:text-lg text-neutral-400 mb-12 leading-relaxed">
          The full hub - tier progress, leaderboard, redemption - ships
          shortly. In the meantime your share link works today. Every referral
          counts toward your next tier, and we&apos;ll email your discount code
          the moment you cross each threshold.
        </p>

        {userCode ? (
          <>
            <div className="border border-neutral-800 rounded-lg p-6 md:p-8 mb-6 bg-neutral-950/50">
              <div className="text-xs font-mono tracking-[0.3em] text-neutral-500 mb-3">
                MEMBER CODE
              </div>
              <div
                className="font-mono text-2xl md:text-3xl tracking-wider"
                style={{ color: "#00FFFF" }}
              >
                {userCode}
              </div>
            </div>

            <div className="border border-neutral-800 rounded-lg p-6 md:p-8 mb-12 bg-neutral-950/50">
              <div className="text-xs font-mono tracking-[0.3em] text-neutral-500 mb-3">
                YOUR SHARE LINK
              </div>
              <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                <input
                  type="text"
                  title="sharingUrl"
                  value={sharingUrl ?? ""}
                  readOnly
                  className="flex-1 bg-black border border-neutral-800 rounded px-4 py-3 font-mono text-sm focus:outline-none"
                  style={{ color: "#00FFFF" }}
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-6 py-3 font-mono text-sm font-bold tracking-wider transition-colors"
                  style={{
                    backgroundColor: copied ? "#00FFFF" : "transparent",
                    color: copied ? "#000000" : "#00FFFF",
                    border: "1px solid #00FFFF",
                  }}
                >
                  {copied ? "COPIED ✓" : "COPY LINK"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="border border-red-900/50 rounded-lg p-6 md:p-8 mb-12 bg-red-950/10">
            <div className="text-xs font-mono tracking-[0.3em] text-red-400 mb-3">
              MISSING MEMBER CODE
            </div>
            <p className="text-neutral-400 leading-relaxed">
              This page expects a member code in the URL. Click &quot;View My
              Dashboard&quot; from your hydrbrew° welcome email to access your
              dashboard.
            </p>
          </div>
        )}

        <div className="flex justify-center pt-4">
          <Link
            href="/"
            className="font-mono text-xs tracking-[0.3em]"
            style={{ color: "#00FFFF", textDecoration: "underline" }}
          >
            ← BACK TO HYDRBREW°
          </Link>
        </div>
      </div>
    </main>
  );
}
