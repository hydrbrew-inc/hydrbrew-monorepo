import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { Link } from "react-router";

interface HbHeroProps extends HydrogenComponentProps {
  headline?: string;
  subtext?: string;
  ctaText?: string;
  ctaLink?: string;
}

function HbHero(props: HbHeroProps) {
  const {
    headline = "COMMAND\nYOUR\nDAY.",
    subtext = "The night stays yours.",
    ctaText = "INITIALIZE UPTIME",
    ctaLink = "/products/hydrbrew-pre-order-bundle",
    ...rest
  } = props;

  return (
    <section
      {...rest}
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ height: "850px", backgroundColor: "#000000" }}
    >
      {/* Ambient glows */}
      <div className="absolute right-0 top-0 bottom-0 w-[55%] overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-[18%] -translate-y-1/2 w-[900px] h-[900px]" style={{ background: "radial-gradient(ellipse at center,rgba(0,255,255,0.08) 0%,rgba(0,200,220,0.04) 35%,transparent 60%)", filter: "blur(80px)", opacity: 0.6 }} />
        <div className="absolute top-[45%] right-[22%] w-[700px] h-[700px]" style={{ background: "radial-gradient(circle,rgba(120,220,255,0.06) 0%,rgba(80,180,240,0.03) 40%,transparent 65%)", filter: "blur(90px)", opacity: 0.5 }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center">
        {/* Left: text */}
        <div className="absolute left-[5%] md:left-[8%] top-[40%] md:top-1/2 -translate-y-1/2 space-y-4 md:space-y-6 z-20">
          <h1 className="text-6xl md:text-9xl text-white uppercase" style={{ fontFamily: "'Urbanist',sans-serif", fontWeight: 700, lineHeight: 1.0 }}>
            COMMAND<br />YOUR<br />DAY.
          </h1>
          <p className="text-xl md:text-3xl" style={{ color: "#00FFFF", fontFamily: "'Roboto Mono',monospace" }}>
            {subtext}
          </p>
          <div className="pt-2 md:pt-4">
            <Link
              to={ctaLink}
              className="inline-flex items-center gap-2 px-8 py-3 md:px-10 md:py-4 text-black text-sm md:text-base tracking-wider rounded-full transition-all hover:scale-105 font-bold"
              style={{ backgroundColor: "#00FFFF", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, boxShadow: "none" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(0,255,255,0.6)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              {ctaText}
              <span style={{ display: "inline-block", animation: "hb-arrow 1.5s ease-in-out infinite" }}>→</span>
            </Link>
          </div>
        </div>

        {/* Background: desk scene */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-desk.webp"
            alt="hydrbrew functional iced coffee can on desk"
            className="w-full h-full object-cover"
            style={{ objectPosition: "60% 40%", filter: "brightness(1.12) contrast(1.18) saturate(1.35) sepia(0.15) hue-rotate(-8deg)" }}
            fetchPriority="high"
            loading="eager"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right,#000000 0%,rgba(0,0,0,0.85) 15%,rgba(0,0,0,0.4) 35%,transparent 50%)", pointerEvents: "none" }} />
          <div className="absolute inset-0" style={{ mixBlendMode: "screen", background: "radial-gradient(ellipse 25% 45% at 72% 50%,rgba(0,255,255,0.12) 0%,transparent 50%)", pointerEvents: "none" }} />
          <div className="absolute bottom-[8%] right-[18%] w-[280px] h-[180px]" style={{ background: "radial-gradient(ellipse 50% 35% at 50% 50%,rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.1) 60%,transparent 80%)", filter: "blur(35px)", opacity: 0.9 }} />
        </div>
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
        { type: "text", name: "subtext", label: "Subtext", defaultValue: "The night stays yours." },
        { type: "text", name: "ctaText", label: "Button text", defaultValue: "INITIALIZE UPTIME" },
        { type: "text", name: "ctaLink", label: "Button link", defaultValue: "/products/hydrbrew-pre-order-bundle" },
      ],
    },
  ],
  presets: { subtext: "The night stays yours.", ctaText: "INITIALIZE UPTIME", ctaLink: "/products/hydrbrew-pre-order-bundle" },
});
