"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { getStoreUrl } from "@repo/lib/store-url";

// VL's leaderboard is a native web component, not a REST endpoint. Cast the
// custom-element tag so it type-checks; at runtime React renders the real
// <leaderboard-widget> element with the campaign's ucid attribute.
const LeaderboardWidget = "leaderboard-widget" as unknown as React.FC<{
  ucid?: string;
}>;
const VL_CAMPAIGN_ID = process.env.NEXT_PUBLIC_VIRAL_LOOPS_CAMPAIGN_ID;

// ── Tiers (locked spec) ──────────────────────────────────────────────────────
// Discounts only. Coupon codes are per-member and live in the Klaviyo tier
// emails — never displayed here. Unlocked reward tiers link to the store, where
// the member applies the code from their inbox.
const TIERS = [
  { key: "INITIALIZED", label: "INITIALIZED", threshold: 0, reward: "Member ID" },
  { key: "PRINCIPAL", label: "PRINCIPAL", threshold: 2, reward: "25% OFF · 3 USES" },
  { key: "SOVEREIGN", label: "SOVEREIGN", threshold: 5, reward: "30% OFF · 3 USES" },
  { key: "ELITE", label: "ELITE", threshold: 10, reward: "30% LIFETIME" },
] as const;

type Tier = (typeof TIERS)[number];

function getCurrentTier(r: number): Tier {
  if (r >= 10) return TIERS[3];
  if (r >= 5) return TIERS[2];
  if (r >= 2) return TIERS[1];
  return TIERS[0];
}
function getNextTier(r: number): Tier | null {
  if (r >= 10) return null;
  if (r >= 5) return TIERS[3];
  if (r >= 2) return TIERS[2];
  return TIERS[1];
}
function getProgressPercent(r: number): number {
  if (r >= 10) return 100;
  if (r >= 5) return ((r - 5) / 5) * 100;
  if (r >= 2) return ((r - 2) / 3) * 100;
  return (r / 2) * 100;
}

type Member = {
  operativeNumber: string;
  firstName: string | null;
  referralCode: string;
  referrals: number;
  globalRank: number | null;
  sharingUrl: string;
  signupSource: string | null;
};

const CYAN = "#00FFFF";
const FONT =
  "var(--font-urbanist), 'Helvetica Neue', Helvetica, Arial, sans-serif";

export function ReferralHub({ userCode }: { userCode: string | null }) {
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userCode) {
      setError("NO MEMBER CODE");
      setLoading(false);
      return;
    }
    let active = true;
    fetch(`/api/dashboard/member?code=${encodeURIComponent(userCode)}`)
      .then((r) => r.json())
      .then((m) => {
        if (!active) return;
        if (!m?.ok) {
          setError(m?.error === "not_found" ? "MEMBER NOT FOUND" : "SYSTEM ERROR");
          setLoading(false);
          return;
        }
        setMember(m.member);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setError("SYSTEM ERROR — PLEASE REFRESH");
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [userCode]);

  if (loading) return <CenteredMessage color={CYAN}>INITIALIZING…</CenteredMessage>;
  if (error || !member)
    return (
      <CenteredMessage color="#FF4B4B" bordered>
        ⚠ {error ?? "SYSTEM ERROR"}
      </CenteredMessage>
    );

  const currentTier = getCurrentTier(member.referrals);
  const nextTier = getNextTier(member.referrals);
  const isElite = member.referrals >= 10;
  const toNext = nextTier ? Math.max(nextTier.threshold - member.referrals, 0) : 0;

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#0B0B0B",
        color: "#FFFFFF",
        fontFamily: FONT,
      }}
    >
      <style>{`@keyframes hubping{75%,100%{transform:scale(2);opacity:0}}`}</style>
      {VL_CAMPAIGN_ID ? (
        <Script
          src={`https://app.viral-loops.com/widgetsLoader.js?ucid=${VL_CAMPAIGN_ID}`}
          strategy="afterInteractive"
        />
      ) : null}
      {/* Wafer-thin top banner */}
      <Image
        src="/images/Transmit_the_Signal_Referral_Hub.webp"
        alt="hydrbrew° - Transmit the Signal"
        width={1200}
        height={400}
        priority
        className="block w-full md:max-w-5xl mx-auto"
      />
      <div style={{ padding: "24px" }}>
      <div style={{ maxWidth: 1024, margin: "0 auto" }}>
        {/* STATUS BAR */}
        <section style={card(28)}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 24,
            }}
          >
            <div>
              <div style={labelRow()}>
                <PulsingDot /> PROTOCOL STATUS
              </div>
              <div style={statusTitle()}>
                {currentTier.label} MEMBER <span style={{ color: CYAN }}>[+1]</span>
              </div>
              <div style={{ fontSize: 13, color: "#666", letterSpacing: 3 }}>
                MEMBER ID: {member.operativeNumber}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: 36,
                flexWrap: "wrap",
                borderLeft: "1px solid #1a1a1a",
                paddingLeft: 28,
              }}
            >
              <Stat label="REFERRALS" value={String(member.referrals)} color={CYAN} />
              <Stat label="TO NEXT TIER" value={isElite ? "—" : String(toNext)} />
              <Stat
                label="GLOBAL RANK"
                value={member.globalRank ? `#${member.globalRank}` : "—"}
                color="#00CCCC"
              />
            </div>
          </div>
        </section>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 16,
            alignItems: "start",
            marginTop: 16,
          }}
        >
          {/* LEFT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* TRANSMIT SIGNAL */}
            <section style={card(32)}>
              <div style={{ fontSize: 12, color: CYAN, letterSpacing: 4, marginBottom: 6 }}>
                PROTOCOL AMPLIFICATION
              </div>
              <div style={sectionTitle()}>TRANSMIT THE SIGNAL</div>
              <p style={{ fontSize: 16, color: "#999", lineHeight: 1.7, margin: "10px 0 22px" }}>
                Share your link. Every person you bring in moves you up the tier — and
                gives them early access to the same formulation. The afternoon stays yours.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
                <input
                  type="text"
                  readOnly
                  value={member.sharingUrl}
                  style={{
                    backgroundColor: "#0d0d0d",
                    border: "1px solid #1a1a1a",
                    fontSize: 15,
                    padding: "14px 18px",
                    color: CYAN,
                    outline: "none",
                    flex: 1,
                    minWidth: 200,
                    fontFamily: FONT,
                  }}
                />
                <CopyButton value={member.sharingUrl} />
              </div>
              <div style={codeRow()}>
                <span style={{ fontSize: 13, color: "#777", letterSpacing: 3 }}>YOUR CODE</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: CYAN, letterSpacing: 4 }}>
                  {member.referralCode}
                </span>
              </div>
            </section>

            {/* FLOW STATE METER */}
            <section style={card(32)}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: 18,
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 3 }}>
                  FLOW STATE METER
                </div>
                <div style={{ fontSize: 13, color: "#999", letterSpacing: 2 }}>
                  {isElite ? "ELITE — CEILING REACHED" : `${toNext} TO ${nextTier?.label}`}
                </div>
              </div>
              <div style={progressTrack()}>
                <div
                  style={{
                    height: "100%",
                    width: `${getProgressPercent(member.referrals)}%`,
                    backgroundColor: isElite ? CYAN : "#00CCCC",
                    transition: "width 1s ease",
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 18 }}>
                {TIERS.map((t) => (
                  <TierRow key={t.key} tier={t} referrals={member.referrals} current={currentTier} />
                ))}
              </div>
            </section>
          </div>

          {/* LEADERBOARD */}
          <section style={{ ...card(32), display: "flex", flexDirection: "column" }}>
            <div style={{ borderBottom: "1px solid #1a1a1a", paddingBottom: 18, marginBottom: 18 }}>
              <div style={{ fontSize: 12, color: "#999", letterSpacing: 3, marginBottom: 6 }}>
                BIOMETRIC FEED
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 3 }}>GLOBAL RANKING</div>
            </div>
            <div style={{ flex: 1 }}>
              {VL_CAMPAIGN_ID ? (
                <LeaderboardWidget ucid={VL_CAMPAIGN_ID} />
              ) : (
                <div style={{ fontSize: 13, color: "#666", letterSpacing: 2, padding: "14px 0" }}>
                  &gt; LEADERBOARD UNAVAILABLE
                </div>
              )}
            </div>
            <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 18, marginTop: 22 }}>
              <div style={{ fontSize: 13, color: "#999", letterSpacing: 2 }}>
                &gt; YOUR POSITION: {member.globalRank ? `#${member.globalRank}` : "CALCULATING…"}
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: CYAN,
                  letterSpacing: 3,
                  marginTop: 10,
                }}
              >
                THE AFTERNOON STAYS YOURS
                <sup
                  style={{
                    fontSize: "0.6em",
                    verticalAlign: "super",
                    letterSpacing: "normal",
                    marginLeft: 1,
                  }}
                >
                  ™
                </sup>
              </div>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <footer
          style={{
            marginTop: 16,
            padding: "18px 28px",
            border: "1px solid #1a1a1a",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
            fontSize: 12,
            color: "#555",
            letterSpacing: 2,
          }}
        >
          <span>hydrbrew° · LEUCADIA, CA · LAUNCHING JULY 2026</span>
          <Link href="/" style={{ color: "#00CCCC" }}>
            ← BACK TO HYDRBREW°
          </Link>
        </footer>
      </div>
      </div>
    </main>
  );
}

// ── Subcomponents ────────────────────────────────────────────────────────────
function PulsingDot() {
  return (
    <span style={{ position: "relative", display: "inline-flex", width: 9, height: 9 }}>
      <span
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          backgroundColor: CYAN,
          opacity: 0.6,
          animation: "hubping 1.5s cubic-bezier(0,0,0.2,1) infinite",
        }}
      />
      <span style={{ position: "relative", width: 9, height: 9, borderRadius: "50%", backgroundColor: CYAN }} />
    </span>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() =>
        navigator.clipboard.writeText(value).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
      }
      style={{
        backgroundColor: copied ? CYAN : "transparent",
        color: copied ? "#000" : CYAN,
        border: `1px solid ${CYAN}`,
        fontFamily: FONT,
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: 3,
        padding: "14px 24px",
        cursor: "pointer",
        whiteSpace: "nowrap",
        minWidth: 180,
        transition: "all 0.2s",
      }}
    >
      {copied ? "TRANSMITTED ✓" : "COPY LINK →"}
    </button>
  );
}

function TierRow({
  tier,
  referrals,
  current,
}: {
  tier: Tier;
  referrals: number;
  current: Tier;
}) {
  const unlocked = referrals >= tier.threshold;
  const isCurrent = current.key === tier.key;
  const isReward = tier.threshold > 0;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
        padding: "16px 18px",
        backgroundColor: isCurrent ? "rgba(0,255,255,0.03)" : "#0d0d0d",
        border: isCurrent ? "1px solid rgba(0,255,255,0.4)" : "1px solid #1a1a1a",
        opacity: unlocked ? 1 : 0.35,
        transition: "opacity 0.3s",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 5, flex: 1 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: 2,
            color: isCurrent ? CYAN : unlocked ? "#FFF" : "#555",
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <span>
            {unlocked ? "[✓]" : "[ ]"} {tier.label} TIER
          </span>
          {isCurrent && <span style={badge()}>ACTIVE</span>}
        </div>
        <div style={{ fontSize: 12, color: "#777", letterSpacing: 1 }}>
          {tier.threshold} REFS · {tier.reward}
        </div>
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>
        {!unlocked ? (
          <span style={{ color: "#444", border: "1px dashed #2a2a2a", padding: "8px 14px" }}>
            LOCKED
          </span>
        ) : isReward ? (
          <a
            href={getStoreUrl()}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#000",
              backgroundColor: CYAN,
              padding: "8px 14px",
              textDecoration: "none",
            }}
          >
            REDEEM →
          </a>
        ) : (
          <span style={{ color: CYAN, border: `1px solid ${CYAN}`, padding: "8px 14px" }}>
            ✓
          </span>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, color = "#FFF" }: { label: string; value: string; color?: string }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: "#999", letterSpacing: 2, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 34, fontWeight: 700, color }}>{value}</div>
    </div>
  );
}

function CenteredMessage({
  children,
  color,
  bordered,
}: {
  children: React.ReactNode;
  color: string;
  bordered?: boolean;
}) {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#0B0B0B",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          fontSize: 15,
          color,
          letterSpacing: 4,
          padding: bordered ? "20px 28px" : 0,
          border: bordered ? `1px solid ${color}` : "none",
        }}
      >
        {children}
      </div>
    </main>
  );
}

// ── Style helpers ────────────────────────────────────────────────────────────
function card(padding = 24): React.CSSProperties {
  return { border: "1px solid #1a1a1a", backgroundColor: "#0B0B0B", padding };
}
function labelRow(): React.CSSProperties {
  return { display: "flex", alignItems: "center", gap: 8, fontSize: 12, letterSpacing: 3, color: "#999", marginBottom: 10 };
}
function statusTitle(): React.CSSProperties {
  return { fontSize: 30, fontWeight: 900, color: "#FFF", marginBottom: 6 };
}
function sectionTitle(): React.CSSProperties {
  return { fontSize: 24, fontWeight: 900, color: "#FFF" };
}
function codeRow(): React.CSSProperties {
  return {
    marginTop: 14,
    padding: "14px 18px",
    backgroundColor: "#0d0d0d",
    border: "1px solid #1a1a1a",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  };
}
function progressTrack(): React.CSSProperties {
  return { width: "100%", height: 10, backgroundColor: "#111", border: "1px solid #1a1a1a", padding: 1 };
}
function badge(): React.CSSProperties {
  return { fontSize: 10, color: CYAN, border: "1px solid rgba(0,255,255,0.4)", padding: "3px 8px", letterSpacing: 2 };
}
