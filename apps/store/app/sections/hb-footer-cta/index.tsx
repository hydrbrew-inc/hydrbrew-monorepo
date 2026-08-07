import { createSchema } from "@weaverse/hydrogen";
import type {
  ComponentLoaderArgs,
  HydrogenComponentProps,
} from "@weaverse/hydrogen";
import { useState, useEffect } from "react";
import { Send, X, FileText, ArrowUp, ChevronDown } from "lucide-react";
import { useFetcher } from "react-router";

type PressArticle = {
  headline: string;
  outlet: string;
  url: string;
  imageUrl?: string;
  date?: string;
};

// Shown until the `press_article` metaobject definition has entries in Shopify
// Admin. Any entry there replaces this list entirely — delete these once Louis
// is managing press from Admin.
// To add the press asset image: upload it in Admin → Content → Files, copy the
// CDN URL, and set it as `imageUrl` below. Cards render fine without one.
const FALLBACK_PRESS_ARTICLES: PressArticle[] = [
  {
    headline:
      "Editor's Guide: The Luxury Fitness and Wellness Brands Worth Discovering",
    outlet: "Sable West",
    url: "https://www.sablewest.com/wellness/editors-guide-the-luxury-fitness-and-wellness-brands-worth-discovering",
    date: "2026-07-16",
  },
];

// The press section holds three cards across; extras are kept out of the grid.
const MAX_PRESS_ARTICLES = 3;

// Managed in Shopify Admin → Content → Metaobjects → "Press article".
// Entries appear in the Press Coverage modal without code changes.
const PRESS_ARTICLES_QUERY = `#graphql
  query PressArticles {
    metaobjects(type: "press_article", first: 24) {
      nodes {
        id
        fields {
          key
          value
          reference {
            ... on MediaImage {
              image {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

function parsePressArticles(loaderData: any): PressArticle[] {
  const nodes = loaderData?.metaobjects?.nodes ?? [];
  const articles: PressArticle[] = [];
  for (const node of nodes) {
    const field = (key: string) =>
      node.fields?.find((f: { key: string }) => f.key === key);
    const headline = field("headline")?.value;
    const url = field("url")?.value;
    if (!headline || !url) continue;
    articles.push({
      headline,
      url,
      outlet: field("outlet")?.value ?? "",
      imageUrl: field("image")?.reference?.image?.url,
      date: field("date")?.value,
    });
  }
  // Newest first; entries without a date sink to the end
  return articles.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

function formatPressDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface HbFooterCtaProps extends HydrogenComponentProps {
  loaderData?: Awaited<ReturnType<typeof loader>>;
}

function HbFooterCta(props: HbFooterCtaProps) {
  const { loaderData, ...rest } = props;
  const articlesFromAdmin = parsePressArticles(loaderData);
  const pressArticles = (
    articlesFromAdmin.length > 0 ? articlesFromAdmin : FALLBACK_PRESS_ARTICLES
  ).slice(0, MAX_PRESS_ARTICLES);
  const fetcher = useFetcher<{ ok: boolean }>();
  const [email, setEmail] = useState("");
  const [isPressOpen, setIsPressOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isFounderOpen, setIsFounderOpen] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isCredentialsExpanded, setIsCredentialsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const fd = new FormData();
    fd.set("email", email);
    fetcher.submit(fd, { action: "/api/klaviyo", method: "POST", encType: "multipart/form-data" });
    setEmail("");
  };

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const anyModalOpen = isPressOpen || isPrivacyOpen || isTermsOpen || isFounderOpen || isShippingOpen;
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") { setIsPressOpen(false); setIsPrivacyOpen(false); setIsTermsOpen(false); setIsFounderOpen(false); setIsShippingOpen(false); } };
    if (anyModalOpen) {
      const pos = window.scrollY;
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${pos}px`;
      document.body.style.width = "100%";
      return () => {
        document.removeEventListener("keydown", handleEsc);
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, pos);
      };
    }
  }, [anyModalOpen]);

  const socialLinks = [
    { label: "Instagram", href: "https://www.instagram.com/tryhydrbrew/", icon: <svg className="w-5 h-5 text-[#00FFFF]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61577503100638", icon: <svg className="w-5 h-5 text-[#00FFFF]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
    { label: "X", href: "https://x.com/hydrbrew", icon: <svg className="w-5 h-5 text-[#00FFFF]" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
    { label: "TikTok", href: "https://www.tiktok.com/@hydrbrew", icon: <svg className="w-5 h-5 text-[#00FFFF]" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg> },
  ];

  const modalCls = "fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto";
  const backdropCls = "fixed inset-0 bg-black/95 backdrop-blur-md";
  const closeBtnCls = "fixed top-6 right-6 z-20 p-3 bg-[#00FFFF]/10 border-2 border-[#00FFFF]/30 hover:border-[#00FFFF] rounded-xl text-[#00FFFF] hover:bg-[#00FFFF]/20 transition-all group";

  return (
    <footer {...rest} className="relative bg-black border-t border-[#00FFFF]/20" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#00FFFF]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-12 pb-8 md:py-16">
        {/* Email CTA */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="text-[#00FFFF]/60 text-xs uppercase tracking-widest mb-4" style={{ fontFamily: "'Roboto Mono',monospace" }}>JOIN THE COHORT // DAILY OPTIMIZATION</div>
          <h3 className="text-5xl md:text-7xl text-white mb-6" style={{ fontFamily: "'Urbanist',sans-serif", fontWeight: 700 }}>
            Establish <span className="text-[#00FFFF]">Uptime Baseline</span>
          </h3>
          <p className="text-white/70 text-lg mb-8" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
            Subscribe to receive tactical intelligence and human throughput updates. Zero noise. Absolute data.
          </p>
          {fetcher.data?.ok ? (
            <div className="text-[#00FFFF] font-mono py-4">✓ You&apos;re in — check your email!</div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="flex-1 px-6 py-4 bg-white/5 border border-[#00FFFF]/30 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-[#00FFFF] transition-colors" style={{ fontFamily: "'Space Grotesk',sans-serif" }} />
              <button type="submit" className="px-8 py-4 bg-[#00FFFF] text-black rounded-full hover:bg-[#00FFFF]/90 transition-all hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] flex items-center justify-center gap-2 whitespace-nowrap font-bold" style={{ fontFamily: "'Urbanist',sans-serif", fontWeight: 700 }}>
                {fetcher.state !== "idle" ? "Submitting…" : <>Join Cohort<Send className="w-4 h-4" /></>}
              </button>
            </form>
          )}
        </div>

        {/* Nav links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 max-w-6xl mx-auto">
          <div>
            <h4 className="text-white mb-4" style={{ fontFamily: "'Urbanist',sans-serif" }}>Shop</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="https://hydrbrew.myshopify.com/products/hydrbrew-12-pack?variant=47538404982937" className="hover:text-[#00FFFF] transition-colors">All Products</a></li>
              <li><a href="/protocol" className="hover:text-[#00FFFF] transition-colors">Caffeine Audit</a></li>
              <li><a href="mailto:?subject=You%20need%20to%20try%20this&body=Hey%2C%0A%0AI%27ve%20been%20using%20hydrbrew%C2%B0" className="hover:text-[#00FFFF] transition-colors">Refer a Friend</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white mb-4" style={{ fontFamily: "'Urbanist',sans-serif" }}>Support</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="mailto:support@hydrbrew.com" className="hover:text-[#00FFFF] transition-colors">Contact Us</a></li>
              <li><button type="button" onClick={() => setIsShippingOpen(true)} className="hover:text-[#00FFFF] transition-colors font-normal">Shipping &amp; Refunds</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white mb-4" style={{ fontFamily: "'Urbanist',sans-serif" }}>Company</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><button type="button" onClick={() => setIsFounderOpen(true)} className="hover:text-[#00FFFF] transition-colors font-normal">About</button></li>
              <li><button type="button" onClick={() => setIsPressOpen(true)} className="hover:text-[#00FFFF] transition-colors font-normal">Press</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white mb-4" style={{ fontFamily: "'Urbanist',sans-serif" }}>Legal</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><button type="button" onClick={() => setIsPrivacyOpen(true)} className="hover:text-[#00FFFF] transition-colors font-normal">Privacy Policy</button></li>
              <li><button type="button" onClick={() => setIsTermsOpen(true)} className="hover:text-[#00FFFF] transition-colors font-normal">Terms of Service</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#00FFFF]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-2xl tracking-wider mb-2" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
              <span className="text-[#00FFFF]">hydr</span><span className="text-white">brew°</span>
            </h2>
            <p className="text-xs text-white/40">© 2026 Hydrbrew, Inc. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            {socialLinks.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 border border-[#00FFFF]/20 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-[#00FFFF]/40 transition-all" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Shipping Modal */}
      {isShippingOpen && (
        <div className={modalCls} style={{ alignItems: "center" }}>
          <div className={backdropCls} onClick={() => setIsShippingOpen(false)} />
          <div className="relative z-10 w-full max-w-xl mx-4">
            <div className="bg-[#0A0A0A] border-2 border-[#00FFFF]/20 rounded-3xl overflow-hidden">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div><span className="text-[#00FFFF] text-xs font-mono uppercase tracking-widest">Shipping &amp; Refunds</span><h2 className="text-2xl text-white font-bold mt-2" style={{ fontFamily: "'Urbanist',sans-serif" }}>Delivery Policy</h2></div>
                  <button type="button" onClick={() => setIsShippingOpen(false)} aria-label="Close shipping info" className="p-2 bg-[#00FFFF]/10 border border-[#00FFFF]/30 hover:border-[#00FFFF] rounded-lg text-[#00FFFF] hover:bg-[#00FFFF]/20 transition-all"><X className="w-5 h-5" /></button>
                </div>
                <div className="h-px bg-[#00FFFF]/10 mb-6" />
                <p className="text-white/80 leading-relaxed" style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", lineHeight: "1.8" }}>
                  We use a third-party shipper, ShipBob, for last-mile delivery. Standard delivery takes 2–5 business days. Due to the consumable nature of our products, all sales are final unless the product arrives damaged. Not satisfied? Contact{" "}
                  <a href="mailto:support@hydrbrew.com" className="text-[#00FFFF] underline">support@hydrbrew.com</a>{" "}within 7 days of delivery for resolution.
                </p>
                <div className="mt-6 pt-6 border-t border-[#00FFFF]/10 flex justify-end">
                  <button type="button" onClick={() => setIsShippingOpen(false)} className="px-6 py-2.5 bg-white/5 border border-white/10 text-white/70 rounded-xl hover:bg-white/10 transition-all text-sm">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Founder Modal */}
      {isFounderOpen && (
        <div className={modalCls}>
          <div className={backdropCls} onClick={() => setIsFounderOpen(false)} />
          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-8 md:py-16">
            <button type="button" onClick={() => setIsFounderOpen(false)} className={closeBtnCls} aria-label="Close"><X className="w-6 h-6" /></button>
            <article className="bg-[#0A0A0A] border-2 border-[#00FFFF]/20 rounded-3xl overflow-hidden">
              <div className="relative px-8 md:px-12 pt-12 pb-8 border-b border-[#00FFFF]/10">
                <p className="text-[#00FFFF]/60 text-xs uppercase tracking-widest mb-4 font-mono">Leucadia, California · Origin Story</p>
                <h2 className="text-5xl md:text-7xl text-white font-bold leading-tight mb-4" style={{ fontFamily: "'Urbanist',sans-serif" }}>The <span className="text-[#00FFFF]">People</span><br />Behind the Brand</h2>
                <p className="text-white/50 text-lg max-w-xl" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>hydrbrew° was born not in a lab, but on a walk.</p>
              </div>

              <div className="grid grid-cols-2 gap-0 border-b border-[#00FFFF]/10">
                {[
                  { name: "Louis Caverly", role: "Co-Founder & CEO", img: "https://i.imgur.com/KIVrOVW.jpeg" },
                  { name: "Fawne Caverly", role: "Co-Founder & COO", img: "https://i.imgur.com/dsKRvAs.jpeg" },
                ].map((f, i) => (
                  <div key={f.name} className={`relative group overflow-hidden ${i === 0 ? "border-r border-[#00FFFF]/10" : ""}`}>
                    <div className="aspect-[3/4] overflow-hidden">
                      <img src={f.img} alt={f.name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-6 md:p-8">
                      <p className="text-[#00FFFF] text-xs uppercase tracking-widest font-mono mb-1">{f.role}</p>
                      <h3 className="text-2xl md:text-3xl text-white font-bold" style={{ fontFamily: "'Urbanist',sans-serif" }}>{f.name}</h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* Credentials accordion */}
              <div className="border-b border-[#00FFFF]/10">
                <button type="button" onClick={() => setIsCredentialsExpanded(!isCredentialsExpanded)} className="w-full px-8 md:px-12 py-6 flex items-center justify-between hover:bg-white/[0.02] transition-all group">
                  <div className="flex items-center gap-3">
                    <span className="text-[#00FFFF]/60 text-xs font-mono uppercase tracking-widest">Team Credentials</span>
                    <div className="w-2 h-2 bg-[#00FFFF]/40 rounded-full group-hover:bg-[#00FFFF] transition-colors" />
                  </div>
                  <ChevronDown className={`w-5 h-5 text-[#00FFFF]/60 transition-transform duration-300 ${isCredentialsExpanded ? "rotate-180" : ""}`} />
                </button>
                <div className="overflow-hidden transition-all duration-500 ease-in-out" style={{ maxHeight: isCredentialsExpanded ? "1000px" : "0", opacity: isCredentialsExpanded ? 1 : 0 }}>
                  <div className="grid md:grid-cols-2 gap-8 px-8 md:px-12 py-10 bg-gradient-to-br from-[#00FFFF]/[0.02] to-transparent">
                    <div className="space-y-3">
                      <div className="flex items-baseline gap-2 mb-4"><h3 className="text-xl text-white font-bold" style={{ fontFamily: "'Urbanist',sans-serif" }}>Louis Caverly</h3><span className="text-[#00FFFF]/60 text-xs font-mono uppercase tracking-wider">CEO</span></div>
                      <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: "'Inter',sans-serif" }}>Beverage industry veteran who led multi-state expansion for Two Roots NA Beer and successfully exited to Spirited Brands. Brings expertise in national buyer negotiation, GTM systems architecture, and product innovation.</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-baseline gap-2 mb-4"><h3 className="text-xl text-white font-bold" style={{ fontFamily: "'Urbanist',sans-serif" }}>Fawne Caverly</h3><span className="text-[#00FFFF]/60 text-xs font-mono uppercase tracking-wider">COO</span></div>
                      <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: "'Inter',sans-serif" }}>22 years of executive experience at a top global golf manufacturer, specializing in HR business management and C-Suite coaching. Brand Voice Architect and Operational Integrity lead at hydrbrew.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Story */}
              <div className="px-8 md:px-12 py-12 space-y-6 text-white/80" style={{ fontFamily: "'Inter',sans-serif", fontSize: "17px", lineHeight: "1.85" }}>
                <p>Louis and Fawne were thinking about something simple: what happens to an iced coffee as it melts. The ice dilutes the caffeine. The drink becomes lighter, crisper, and more hydrating as you finish it. That observation became an architectural principle — <em className="text-white not-italic font-semibold">what if the whole drink was engineered from that endpoint?</em></p>
                <div className="my-8 pl-6 border-l-4 border-[#00FFFF] py-2">
                  <p className="text-xl md:text-2xl text-white font-semibold leading-snug" style={{ fontFamily: "'Urbanist',sans-serif" }}>"We don't build drinks. We build the substrate for your best work."</p>
                </div>
                <p>hydrbrew° was architected to solve both. A functional iced coffee built around 85mg buffered caffeine, 200mg L-Theanine, 200mg Lion's Mane, and ionic electrolytes — engineered for the afternoon window, designed to finish as clean as it starts, and built to leave no systemic debt behind.</p>
                <div className="pt-6 border-t border-[#00FFFF]/10">
                  <p className="text-[#00FFFF] font-mono text-sm tracking-widest">hydrbrew° - Zero Systemic Debt.</p>
                  <p className="text-white/40 font-mono text-sm mt-1">The afternoon stays yours.</p>
                </div>
              </div>

              <div className="px-8 md:px-12 pb-10 flex items-center justify-between border-t border-[#00FFFF]/10 pt-6">
                <button type="button" onClick={() => setIsFounderOpen(false)} className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>← Close</button>
                <div className="text-sm text-white/40 font-mono">End of transmission //</div>
              </div>
            </article>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {isPrivacyOpen && (
        <div className={modalCls}>
          <div className={backdropCls} onClick={() => setIsPrivacyOpen(false)} />
          <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 md:py-16">
            <button type="button" onClick={() => setIsPrivacyOpen(false)} className={closeBtnCls} aria-label="Close privacy"><X className="w-6 h-6" /></button>
            <article className="bg-[#0A0A0A] border-2 border-[#00FFFF]/20 rounded-3xl overflow-hidden">
              <div className="p-8 md:p-12">
                <div className="mb-8 pb-8 border-b border-[#00FFFF]/20">
                  <span className="px-4 py-2 bg-[#00FFFF]/10 border border-[#00FFFF] text-[#00FFFF] text-xs font-mono uppercase tracking-wider rounded-full">Legal</span>
                  <h2 className="text-4xl md:text-5xl text-white font-bold mt-6 mb-2" style={{ fontFamily: "'Urbanist',sans-serif" }}>Privacy Policy</h2>
                  <p className="text-white/40 font-mono text-sm">Last updated: May 2026</p>
                </div>
                <div className="space-y-6 text-white/80" style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", lineHeight: "1.8" }}>
                  {[
                    { num: "1", title: "Information We Collect", body: "When you interact with the hydrbrew° website — joining our waitlist, placing a pre-order, or creating an account — we collect identity & contact data, purchase & transaction data, referral & rewards data, communications data, and technical data." },
                    { num: "2", title: "How We Use Your Information", body: "Processing and fulfilling your orders; securing your waitlist position; processing payments and preventing fraud; distributing referral rewards; sending launch updates and promotional communications; responding to customer support inquiries; improving our website and products; complying with legal obligations." },
                    { num: "3", title: "How We Share Your Information", body: "We do not sell your personal data. We share only with trusted service providers: Shopify (e-commerce & payments), Viral Loops (referral tracking), Klaviyo (email communications), shipping carriers, and analytics providers in aggregated, anonymized form." },
                    { num: "4", title: "Your Rights", body: "Depending on your location, you may request access, correction, deletion, opt-out of marketing, or data portability. Contact support@hydrbrew.com — we respond within 30 days." },
                    { num: "5", title: "Contact", body: "Questions or requests: hydrbrew° — support@hydrbrew.com" },
                  ].map((s) => (
                    <div key={s.num}>
                      <div className="p-4 bg-black/40 border-l-4 border-[#00FFFF] rounded-r-lg mb-3">
                        <h3 className="text-lg md:text-xl text-[#00FFFF] font-bold" style={{ fontFamily: "'Urbanist',sans-serif" }}><span className="font-mono mr-2">{s.num}.</span>{s.title}</h3>
                      </div>
                      <p>{s.body}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-10 pt-8 border-t border-[#00FFFF]/20 flex items-center justify-between">
                  <button type="button" onClick={() => setIsPrivacyOpen(false)} className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all">← Close</button>
                  <div className="text-sm text-white/40 font-mono">End of transmission //</div>
                </div>
              </div>
            </article>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {isTermsOpen && (
        <div className={modalCls}>
          <div className={backdropCls} onClick={() => setIsTermsOpen(false)} />
          <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 md:py-16">
            <button type="button" onClick={() => setIsTermsOpen(false)} className={closeBtnCls} aria-label="Close terms"><X className="w-6 h-6" /></button>
            <article className="bg-[#0A0A0A] border-2 border-[#00FFFF]/20 rounded-3xl overflow-hidden">
              <div className="p-8 md:p-12">
                <div className="mb-8 pb-8 border-b border-[#00FFFF]/20">
                  <span className="px-4 py-2 bg-[#00FFFF]/10 border border-[#00FFFF] text-[#00FFFF] text-xs font-mono uppercase tracking-wider rounded-full">Legal</span>
                  <h2 className="text-4xl md:text-5xl text-white font-bold mt-6 mb-2" style={{ fontFamily: "'Urbanist',sans-serif" }}>Terms of Service</h2>
                  <p className="text-white/40 font-mono text-sm">Last updated: May 2026 · Hydrbrew, Inc.</p>
                </div>
                <div className="space-y-6 text-white/80" style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", lineHeight: "1.8" }}>
                  {[
                    { num: "1", title: "Agreement to Terms", body: "By accessing or using hydrbrew.com or purchasing products from Hydrbrew, Inc., you agree to be bound by these Terms of Service." },
                    { num: "2", title: "Intellectual Property", body: "All content on the Site — including the hydrbrew° name, logo, trademarks, product formulations, copy, photography, design assets, and underlying code — is the exclusive property of Hydrbrew, Inc." },
                    { num: "3", title: "Products & Purchases", body: "All prices are in USD and subject to change. We accept payments via Shopify Payments and Stripe. All sales are final unless the product arrives damaged. Pre-orders may be canceled for a full refund prior to shipment." },
                    { num: "4", title: "Health & Product Disclaimer", body: "hydrbrew° is a functional beverage. These statements have not been evaluated by the FDA. Our products are not intended to diagnose, treat, cure, or prevent any disease. Consult your physician before consuming if pregnant, nursing, or sensitive to caffeine." },
                    { num: "5", title: "Contact", body: "Hydrbrew, Inc. · 2033 San Elijo Ave. Unit #1122, Cardiff, CA 92007 · support@hydrbrew.com" },
                  ].map((s) => (
                    <div key={s.num}>
                      <div className="p-4 bg-black/40 border-l-4 border-[#00FFFF] rounded-r-lg mb-3">
                        <h3 className="text-lg md:text-xl text-[#00FFFF] font-bold" style={{ fontFamily: "'Urbanist',sans-serif" }}><span className="font-mono mr-2">{s.num}.</span>{s.title}</h3>
                      </div>
                      <p>{s.body}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-10 pt-8 border-t border-[#00FFFF]/20 flex items-center justify-between">
                  <button type="button" onClick={() => setIsTermsOpen(false)} className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all">← Close</button>
                  <div className="text-sm text-white/40 font-mono">End of transmission //</div>
                </div>
              </div>
            </article>
          </div>
        </div>
      )}

      {/* Press Modal */}
      {isPressOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto">
          <div className={backdropCls} onClick={() => setIsPressOpen(false)} />
          <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-16">
            <button type="button" onClick={() => setIsPressOpen(false)} className={closeBtnCls} aria-label="Close press"><X className="w-6 h-6" /></button>
            <div className="bg-[#0A0A0A] border-2 border-[#00FFFF]/20 rounded-3xl overflow-hidden p-12">
              <div className="text-center mb-12">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full inline-flex mb-6">
                  <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse" />
                  <span className="text-white/40 text-sm font-mono uppercase tracking-wider">As Featured In</span>
                </div>
                <h2 className="text-4xl md:text-5xl text-white mb-4 font-bold">Press <span className="text-[#00FFFF]">Coverage</span></h2>
                <p className="text-white/40 font-mono text-sm">{pressArticles.length > 0 ? "Media archive" : "Media archive • Coming soon"}</p>
              </div>
              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {pressArticles.map((article) => (
                  <a
                    key={article.url}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col min-h-48 bg-white/[0.02] border-2 border-[#00FFFF]/15 hover:border-[#00FFFF]/60 rounded-2xl p-6 transition-all hover:bg-white/[0.04]"
                  >
                    {article.imageUrl ? (
                      <img src={article.imageUrl} alt={article.outlet} className="h-12 self-start object-contain mb-4" loading="lazy" />
                    ) : (
                      <div className="text-white font-bold text-xl uppercase tracking-[0.15em] mb-4 leading-none">{article.outlet}</div>
                    )}
                    <div className="text-[#00FFFF]/60 font-mono text-xs uppercase tracking-wider mb-2">
                      {article.imageUrl ? article.outlet : "Featured"}
                      {article.date ? ` • ${formatPressDate(article.date)}` : ""}
                    </div>
                    <p className="text-white/90 text-base font-semibold leading-snug group-hover:text-[#00FFFF] transition-colors">{article.headline}</p>
                    <div className="mt-auto pt-4 text-white/40 text-sm font-mono group-hover:text-white/70 transition-colors">Read article ↗</div>
                  </a>
                ))}
                {/* Fill the remaining slots so the row always reads as three */}
                {["[ COVERAGE PENDING ]", "[ TRANSMISSION INCOMING ]", "[ AWAITING PUBLICATION ]"]
                  .slice(0, Math.max(0, MAX_PRESS_ARTICLES - pressArticles.length))
                  .map((label) => (
                    <div key={label} className="min-h-48 bg-white/[0.02] border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center">
                      <div className="text-center px-6">
                        <FileText className="w-10 h-10 text-white/10 mx-auto mb-3" />
                        <p className="text-white/20 font-mono text-sm uppercase tracking-wider">{label}</p>
                        <div className="mt-2 flex justify-center"><span className="text-[#00FFFF]/30 font-mono text-lg animate-pulse">_</span></div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="pt-8 border-t border-[#00FFFF]/20 flex items-center justify-between">
                <button type="button" onClick={() => setIsPressOpen(false)} className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all">← Back</button>
                <div className="text-sm text-white/40 font-mono">End of transmission //</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back to top */}
      {showBackToTop && (
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-8 right-8 z-50 group flex items-center gap-3" aria-label="Back to top">
          <span className="text-white/80 text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2" style={{ fontFamily: "'Roboto Mono',monospace" }}>
            Baseline<span className="hb-baseline-arrow inline-block">↑</span>
          </span>
          <div className="relative">
            <div className="w-12 h-12 bg-black border-2 border-[#00FFFF] rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(0,255,255,0.6)]">
              <ArrowUp className="w-5 h-5 text-[#00FFFF] group-hover:text-white transition-colors" />
            </div>
            <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-[#00FFFF]/50" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-[#00FFFF]/50" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-[#00FFFF]/50" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-[#00FFFF]/50" />
          </div>
        </button>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hb-baseline-arrow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .hb-baseline-arrow { animation:hb-baseline-arrow 1.5s ease-in-out infinite; }
      `}} />
    </footer>
  );
}

export default HbFooterCta;

export const loader = async ({ weaverse }: ComponentLoaderArgs) => {
  const { storefront } = weaverse;
  try {
    return await storefront.query(PRESS_ARTICLES_QUERY);
  } catch (err) {
    // The press_article metaobject definition may not exist yet — the modal
    // falls back to its "coming soon" placeholders when this returns null.
    console.error("[hb-footer-cta] press metaobjects query failed", err);
    return null;
  }
};

export const schema = createSchema({
  type: "hb-footer-cta",
  title: "HB Footer",
  settings: [],
  presets: {},
});
