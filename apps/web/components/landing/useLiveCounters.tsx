"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { siteConfig } from "@repo/lib/site-config";

// Live signup counters for the landing page, shared via context so the hero
// and final CTA read one source. Values come from /api/counters (server-side
// exact count) on load. We intentionally do NOT open a Supabase realtime
// WebSocket here: the counter is decorative, and on mobile in-app browsers
// (our paid-social traffic) the WS frequently fails to connect and the client
// retries in a tight loop that hogs the main thread — a measurable PageSpeed
// hit for a number that's only ever off by the few signups since page load.

type LiveCounters = {
  total: number;
  last24h: number;
  remaining: number;
  viewingNow: number;
  ready: boolean;
};

const LiveCountersContext = createContext<LiveCounters>({
  total: 0,
  last24h: 0,
  remaining: siteConfig.foundingMemberCap,
  viewingNow: 7,
  ready: false,
});

export function LiveCountersProvider({ children }: { children: ReactNode }) {
  const [total, setTotal] = useState(0);
  const [last24h, setLast24h] = useState(0);
  const [ready, setReady] = useState(false);
  const [viewingNow, setViewingNow] = useState(7);

  useEffect(() => {
    let active = true;

    fetch("/api/counters")
      .then((res) => res.json())
      .then((data) => {
        if (!active || !data?.ok) return;
        setTotal(typeof data.total === "number" ? data.total : 0);
        setLast24h(typeof data.last24h === "number" ? data.last24h : 0);
        setReady(true);
      })
      .catch(() => {
        // Counters are decorative — a failed fetch shouldn't surface an error.
      });

    return () => {
      active = false;
    };
  }, []);

  // "Viewing now": a small, live-feeling number in [7, 15]. Its center drifts
  // up as the member base grows (+1 per 100 members, capped), with light
  // jitter every few seconds so it reads as live rather than static.
  useEffect(() => {
    const pick = () => {
      const center = Math.min(15, 7 + Math.floor(total / 100));
      const jitter = Math.floor(Math.random() * 5) - 2; // -2..+2
      return Math.max(7, Math.min(15, center + jitter));
    };
    setViewingNow(pick());
    const id = setInterval(() => setViewingNow(pick()), 5000);
    return () => clearInterval(id);
  }, [total]);

  const value: LiveCounters = {
    total,
    last24h,
    ready,
    viewingNow,
    remaining: Math.max(siteConfig.foundingMemberCap - total, 0),
  };

  return (
    <LiveCountersContext.Provider value={value}>
      {children}
    </LiveCountersContext.Provider>
  );
}

export function useLiveCounters(): LiveCounters {
  return useContext(LiveCountersContext);
}
