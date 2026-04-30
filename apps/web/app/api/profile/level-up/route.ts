import { NextResponse } from "next/server";
import { supabaseServer } from "@repo/lib/supabase-server";

// Called from Klaviyo flow webhook steps (Tier 3 + Tier 4) when a profile
// crosses a milestone. Updates profiles.milestone_level and triggers any
// server-side action tied to that tier.
//
// Auth: shared secret in `Authorization: Bearer <LEVEL_UP_WEBHOOK_SECRET>`.
// Body: { email: string, milestoneLevel: 1 | 2 | 3 | 4 }

type LevelUpBody = {
  email?: string;
  milestoneLevel?: number;
};

function isAuthorized(request: Request): boolean {
  const expected = process.env.LEVEL_UP_WEBHOOK_SECRET;
  if (!expected) return false;
  const header = request.headers.get("authorization") ?? "";
  const [scheme, token] = header.split(" ");
  return scheme === "Bearer" && token === expected;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { ok: false, error: "unauthorized" },
      { status: 401 },
    );
  }

  let body: LevelUpBody;
  try {
    body = (await request.json()) as LevelUpBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  const email = body.email?.trim().toLowerCase();
  const milestoneLevel = body.milestoneLevel;
  if (!email || !milestoneLevel || milestoneLevel < 1 || milestoneLevel > 4) {
    return NextResponse.json(
      { ok: false, error: "invalid_payload" },
      { status: 400 },
    );
  }

  const supabase = supabaseServer();

  // Only advance the level — never regress (Klaviyo flow retries shouldn't
  // demote someone whose VL count has since climbed past the trigger value).
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, email, milestone_level")
    .eq("email", email)
    .maybeSingle();

  if (error || !profile) {
    return NextResponse.json(
      { ok: false, error: "profile_not_found" },
      { status: 404 },
    );
  }

  if (milestoneLevel > profile.milestone_level) {
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ milestone_level: milestoneLevel })
      .eq("id", profile.id);

    if (updateError) {
      console.error("[level-up] supabase update failed", updateError);
      return NextResponse.json(
        { ok: false, error: "db_error" },
        { status: 500 },
      );
    }
  }

  // Tier-specific server actions.
  if (milestoneLevel === 3) {
    // TODO: queue the bonus Crossmint mint once the collection is set up.
    // Until then this is a no-op; the email still fires from Klaviyo.
  }
  if (milestoneLevel === 4) {
    // TODO: signal Phase 03 medallion-claim eligibility. For now the
    // milestone_level=4 itself is the eligibility marker — the ARC medallion
    // claim flow will check it before allowing a claim.
  }

  return NextResponse.json({
    ok: true,
    profile: {
      id: profile.id,
      email: profile.email,
      milestoneLevel: Math.max(milestoneLevel, profile.milestone_level),
    },
  });
}
