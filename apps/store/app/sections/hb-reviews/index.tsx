import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { Link } from "react-router";

interface HbReviewsProps extends HydrogenComponentProps {
  ctaLink?: string;
}

function HbReviews(props: HbReviewsProps) {
  const { ctaLink = "/products/hydrbrew-pre-order-bundle", ...rest } = props;

  return (
    <section {...rest} className="relative py-24 bg-black">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px]" style={{ backgroundColor: "rgba(168,85,247,0.05)" }} />
      </div>

      <div className="relative z-10 w-full">
        {/* Full-width background image */}
        <img
          src="/reviews-bg.webp"
          alt="hydrbrew community — high-frequency output and sustained focus lifestyle"
          className="w-full object-cover object-[65%] md:object-left"
          style={{ minHeight: 560 }}
          loading="lazy"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2
            className="text-5xl md:text-7xl lg:text-8xl text-white uppercase mb-6"
            style={{ fontFamily: "'Urbanist',sans-serif", fontWeight: 700 }}
          >
            HIGH FREQUENCY<br />OUTPUT.
          </h2>
          <p
            className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 italic max-w-3xl"
            style={{ fontFamily: "'Urbanist',sans-serif", fontWeight: 300 }}
          >
            When the room is moving fast, your focus stays perfectly still.
          </p>
          <Link
            to={ctaLink}
            className="inline-flex items-center gap-2 px-10 py-4 text-black text-base md:text-lg uppercase tracking-wider rounded-full transition-all hover:scale-105 font-bold"
            style={{ backgroundColor: "#00FFFF", fontFamily: "'Urbanist',sans-serif", fontWeight: 700 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(0,255,255,0.6)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
          >
            UPGRADE YOUR BASELINE
            <span style={{ display: "inline-block", animation: "hb-arrow 1.5s ease-in-out infinite" }}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HbReviews;

export const schema = createSchema({
  type: "hb-reviews",
  title: "HB Reviews CTA",
  settings: [
    { group: "Content", inputs: [{ type: "text", name: "ctaLink", label: "CTA Link", defaultValue: "/products/hydrbrew-pre-order-bundle" }] },
  ],
  presets: { ctaLink: "/products/hydrbrew-pre-order-bundle" },
});
