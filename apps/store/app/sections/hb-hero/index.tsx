import { createSchema } from "@weaverse/hydrogen";
import { Link } from "react-router";
import type { SectionProps } from "~/components/section";

interface HbHeroProps extends SectionProps {
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;700;800&family=Roboto+Mono:wght@400;700&display=swap');
        .hb-hero-headline { font-family: 'Urbanist', sans-serif; }
        .hb-hero-sub { font-family: 'Roboto Mono', monospace; }
        .hb-hero-btn { font-family: 'Urbanist', sans-serif; }
        @keyframes hb-arrow { 0%,100%{transform:translateX(0)} 50%{transform:translateX(6px)} }
        .hb-arrow { display:inline-block; animation: hb-arrow 1.5s ease-in-out infinite; }
      `}</style>
      <section
        className="relative min-h-screen flex items-center overflow-hidden bg-black"
        {...(rest as any)}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/hero-bg.webp)",
            filter: "brightness(0.45) contrast(1.1) saturate(1.2)",
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        {/* Cyan ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 30% 60%, rgba(0,255,255,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-32">
          <div className="max-w-2xl">
            <h1
              className="hb-hero-headline text-6xl md:text-8xl lg:text-9xl font-bold uppercase text-white mb-6"
              style={{ lineHeight: 1.0, letterSpacing: "-1px" }}
            >
              {headline}
            </h1>
            <p
              className="hb-hero-sub text-xl md:text-3xl mb-10"
              style={{ color: "#00FFFF" }}
            >
              {subtext}
            </p>
            <Link
              to={ctaLink}
              className="hb-hero-btn inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-black text-base md:text-lg uppercase tracking-wider transition-all duration-300 hover:opacity-90 hover:scale-105"
              style={{
                backgroundColor: "#00FFFF",
                boxShadow: "0 0 0 rgba(0,255,255,0.4)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 40px rgba(0,255,255,0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 0 rgba(0,255,255,0.4)";
              }}
            >
              {ctaText}
              <span className="hb-arrow">→</span>
            </Link>
          </div>
        </div>

        {/* Can image — right side, desktop only */}
        <div className="absolute right-0 bottom-0 h-full hidden md:flex items-end justify-end pointer-events-none"
          style={{ width: "45%" }}>
          <img
            src="/can-front.webp"
            alt="hydrbrew° can"
            className="h-4/5 w-auto object-contain object-bottom"
            style={{ filter: "drop-shadow(0 0 60px rgba(0,255,255,0.2))" }}
          />
        </div>
      </section>
    </>
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
  presets: {
    headline: "COMMAND YOUR DAY.",
    subtext: "The night stays yours.",
    ctaText: "INITIALIZE UPTIME",
    ctaLink: "/products/hydrbrew-pre-order-bundle",
  },
});
