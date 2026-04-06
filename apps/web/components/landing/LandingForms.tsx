"use client";

import type { FormEvent } from "react";

function preventAndLog(formId: string, data: Record<string, string>) {
  // Placeholder only — no network.
  // eslint-disable-next-line turbo/no-undeclared-env-vars -- Next.js compile-time flag
  if (process.env.NODE_ENV === "development") {
    console.info(`[landing form placeholder] ${formId}`, data);
  }
}

export function HeaderJoinForm() {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "");
    // TODO(Klaviyo): subscribe header strip — dedicated list / embedded form ID
    preventAndLog("header-join", { email });
  }

  return (
    <form className="lp-form-inline" onSubmit={onSubmit} noValidate>
      <label htmlFor="lp-header-email" className="visually-hidden">
        Email
      </label>
      <input
        id="lp-header-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="your.email@protocol.com"
        className="lp-input"
      />
      <button type="submit" className="lp-btn-join">
        JOIN →
      </button>
    </form>
  );
}

export function MintAssetForm({ instance }: { instance: "primary" | "secondary" }) {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    // TODO(Klaviyo): NFT / protocol waitlist — segment by source=quadrant-nft
    preventAndLog(`mint-asset-${instance}`, {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
    });
  }

  return (
    <form className="lp-form-stack lp-form-stack--row-md" onSubmit={onSubmit}>
      <input
        name="name"
        type="text"
        placeholder="Name"
        className="lp-input"
        style={{ flex: 1 }}
        autoComplete="name"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="your.email@protocol.com"
        className="lp-input"
        autoComplete="email"
      />
      <button type="submit" className="lp-btn-submit">
        MINT YOUR ASSET
      </button>
    </form>
  );
}

export function OuraBetaJoinForm() {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    // TODO(Klaviyo): Oura beta cohort — separate list + compliance copy
    preventAndLog("oura-beta", {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
    });
  }

  return (
    <form className="lp-form-stack lp-form-stack--row-md" onSubmit={onSubmit}>
      <input
        name="name"
        type="text"
        required
        placeholder="Name"
        className="lp-input"
        autoComplete="name"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className="lp-input"
        autoComplete="email"
      />
      <button type="submit" className="lp-btn-submit">
        JOIN BETA COHORT
      </button>
    </form>
  );
}

export function FinalWaitlistForm() {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    // TODO(Klaviyo): pre-launch waitlist — main list; gate HydrCore / scan eligibility flags
    preventAndLog("final-waitlist", {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
    });
  }

  return (
    <form className="lp-form-stack lp-form-stack--row-md" onSubmit={onSubmit}>
      <input
        name="name"
        type="text"
        placeholder="Name"
        className="lp-input"
        autoComplete="name"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="your.email@protocol.com"
        className="lp-input"
        autoComplete="email"
      />
      <button type="submit" className="lp-btn-submit">
        JOIN WAITLIST
      </button>
    </form>
  );
}
