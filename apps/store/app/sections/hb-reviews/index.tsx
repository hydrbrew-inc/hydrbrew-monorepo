import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { Link } from "react-router";

interface HbReviewsProps extends HydrogenComponentProps {
  headline?: string;
  subtext?: string;
  ctaText?: string;
  ctaLink?: string;
}

function HbReviews(props: HbReviewsProps) {
  const {
    headline = "HIGH FREQUENCY OUTPUT.",
    subtext = "When the room is moving fast, your focus stays perfectly still.",
    ctaText = "UPGRADE YOUR BASELINE",
    ctaLink = "/products/hydrbrew-pre-order-bundle",
    ...rest
  } = props;

  return (
    <section {...rest} className="relative overflow-hidden" style={{ minHeight: 560, backgroundColor: "#000" }}>
      <img src="/can-front.webp" alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "65% center", opacity: 0.35, filter: "contrast(1.2) saturate(0.8)" }} />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%,rgba(0,255,255,0.04) 0%,transparent 70%)" }} />
      <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-140 px-4 py-20">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white uppercase mb-6" style={{ fontFamily: "'Urbanist',sans-serif" }}>
          {headline}
        </h2>
        <p className="text-xl md:text-2xl text-white/90 italic max-w-3xl mb-10" style={{ fontFamily: "'Urbanist',sans-serif", fontWeight: 300 }}>
          {subtext}
        </p>
        <Link
          to={ctaLink}
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-black text-base md:text-lg uppercase tracking-wider transition-all duration-300 hover:opacity-90 hover:scale-105"
          style={{ backgroundColor: "#00FFFF", fontFamily: "'Urbanist',sans-serif", boxShadow: "0 0 40px rgba(0,255,255,0.4)" }}
        >
          {ctaText} →
        </Link>
      </div>
    </section>
  );
}

export default HbReviews;

export const schema = createSchema({
  type: "hb-reviews",
  title: "HB Reviews CTA",
  settings: [
    {
      group: "Content",
      inputs: [
        { type: "text", name: "headline", label: "Headline", defaultValue: "HIGH FREQUENCY OUTPUT." },
        { type: "text", name: "subtext", label: "Subtext", defaultValue: "When the room is moving fast, your focus stays perfectly still." },
        { type: "text", name: "ctaText", label: "Button text", defaultValue: "UPGRADE YOUR BASELINE" },
        { type: "text", name: "ctaLink", label: "Button link", defaultValue: "/products/hydrbrew-pre-order-bundle" },
      ],
    },
  ],
  presets: { headline: "HIGH FREQUENCY OUTPUT.", subtext: "When the room is moving fast, your focus stays perfectly still.", ctaText: "UPGRADE YOUR BASELINE", ctaLink: "/products/hydrbrew-pre-order-bundle" },
});
