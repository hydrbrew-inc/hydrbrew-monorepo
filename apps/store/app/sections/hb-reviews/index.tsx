import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";

interface HbReviewsProps extends HydrogenComponentProps {
  reviewsImage?: string;
  shopLink?: string;
}

function HbReviews(props: HbReviewsProps) {
  const {
    reviewsImage = "https://i.imgur.com/Ps32UHT.png",
    shopLink = "/products",
    ...rest
  } = props;

  return (
    <section {...rest} className="relative py-24 bg-gradient-to-b from-black via-[#0A0A0A] to-black">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full">
        <img
          src={reviewsImage}
          alt="hydrbrew community — high-frequency output and sustained focus lifestyle"
          className="w-full min-h-[560px] md:min-h-0 md:h-auto object-cover object-[65%] md:object-left"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40" />
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
          <a
            href={shopLink}
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#00FFFF] text-black text-base md:text-lg uppercase tracking-wider rounded-full hover:bg-[#00FFFF]/90 transition-all hover:shadow-[0_0_40px_rgba(0,255,255,0.6)] hover:scale-105 font-bold"
            style={{ fontFamily: "'Urbanist',sans-serif", fontWeight: 700 }}
          >
            UPGRADE YOUR BASELINE
            <span className="hb-review-arrow" style={{ display: "inline-block" }}>→</span>
          </a>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hb-review-arrow { 0%,100%{transform:translateX(0)} 50%{transform:translateX(6px)} }
        .hb-review-arrow { animation:hb-review-arrow 1.5s ease-in-out infinite; }
      `}} />
    </section>
  );
}

export default HbReviews;

export const schema = createSchema({
  type: "hb-reviews",
  title: "HB Reviews",
  settings: [
    { group: "Content", inputs: [
      { type: "image", name: "reviewsImage", label: "Background image" },
      { type: "text", name: "shopLink", label: "Shop link", defaultValue: "/products" },
    ]},
  ],
  presets: { shopLink: "/products" },
});
