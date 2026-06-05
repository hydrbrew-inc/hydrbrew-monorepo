import { NextResponse } from "next/server";
import { supabaseServer } from "@repo/lib/supabase-server";

// Live signup counters for the landing page. `total` is an exact count of
// profiles (more reliable than public_counters.value, which can drift if rows
// are deleted); `last24h` powers the "+N in last 24h" badge. profiles has
// deny-all RLS to anon, so this must run server-side with the secret key.

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = supabaseServer();

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const [totalResult, recentResult] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .gte("created_at", since),
  ]);

  if (totalResult.error) {
    console.error("[counters] total count failed", totalResult.error);
    return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    total: totalResult.count ?? 0,
    last24h: recentResult.count ?? 0,
  });
}
