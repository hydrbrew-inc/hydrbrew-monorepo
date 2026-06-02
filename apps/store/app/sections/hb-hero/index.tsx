import { createSchema } from "@weaverse/hydrogen";
import { Link } from "react-router";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";

interface HbHeroProps extends HydrogenComponentProps {
  headline?: string;
  subtext?: string;
  ctaText?: string;
  ctaLink?: string;
}

function HbHero(props: HbHeroProps) {
  const {
    headline = "COMMAND YOUR DAY.",
    subtext = "The night stays yours.",
    ctaText = "INITIALIZE UPTIME",
    ctaLink = "/products/hydrbrew-pre-order-bundle",
    ...rest
  } = props;

  return (
    <section
      {...rest}
      className="relative min-h-screen flex items-center overflow-hidden bg-black"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/hero-bg.webp)", filter: "brightness(0.45) contrast(1.1) saturate(1.2)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 30% 60%, rgba(0,255,255,0.06) 0%, transparent 70%)" }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-32">
        <div className="max-w-2xl">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold uppercase text-white mb-6" style={{ fontFamily: "'Urbanist',sans-serif", lineHeight: 1.0 }}>
            {headline}
          </h1>
          <p className="text-xl md:text-3xl mb-10" style={{ fontFamily: "'Roboto Mono',monospace", color: "#00FFFF" }}>
            {subtext}
          </p>
          <Link
            to={ctaLink}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-black text-base md:text-lg uppercase tracking-wider transition-all duration-300 hover:opacity-90 hover:scale-105"
            style={{ backgroundColor: "#00FFFF", fontFamily: "'Urbanist',sans-serif", boxShadow: "0 0 40px rgba(0,255,255,0.4)" }}
          >
            {ctaText}
            <span style={{ display: "inline-block", animation: "hb-arrow 1.5s ease-in-out infinite" }}>→</span>
          </Link>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 h-full hidden md:flex items-end pointer-events-none" style={{ width: "40%" }}>
        <img src="/can-front.webp" alt="hydrbrew° can" className="h-4/5 w-auto object-contain object-bottom" style={{ filter: "drop-shadow(0 0 60px rgba(0,255,255,0.2))" }} />
      </div>
    </section>
  );
}

export default HbHero;

export const schema = createSchema({
  type: "hb-hero",
  title: "HB Hero",
  settings: [
    {
      group: "Content",
      inputs: [
        { type: "text", name: "headline", label: "Headline", defaultValue: "COMMAND YOUR DAY." },
        { type: "text", name: "subtext", label: "Subtext", defaultValue: "The night stays yours." },
        { type: "text", name: "ctaText", label: "Button text", defaultValue: "INITIALIZE UPTIME" },
        { type: "text", name: "ctaLink", label: "Button link", defaultValue: "/products/hydrbrew-pre-order-bundle" },
      ],
    },
  ],
  presets: { headline: "COMMAND YOUR DAY.", subtext: "The night stays yours.", ctaText: "INITIALIZE UPTIME", ctaLink: "/products/hydrbrew-pre-order-bundle" },
});
