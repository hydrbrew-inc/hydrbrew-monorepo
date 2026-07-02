import { createSchema } from "@weaverse/hydrogen";
import { useEffect } from "react";
import type { SectionProps } from "~/components/section";
import { Section, sectionSettings } from "~/components/section";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "behold-widget": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { "feed-id": string },
        HTMLElement
      >;
    }
  }
}

interface InstagramFeedProps extends SectionProps {
  heading?: string;
  feedId?: string;
}

function InstagramFeed(props: InstagramFeedProps) {
  const { heading, feedId = "4Y25XqYpmc6hjLt4QtZU", children: _children, ...rest } = props;

  useEffect(() => {
    if (!document.querySelector('script[src="https://w.behold.so/widget.js"]')) {
      const s = document.createElement("script");
      s.type = "module";
      s.src = "https://w.behold.so/widget.js";
      document.head.appendChild(s);
    }

    const injectHide = () => {
      document.querySelectorAll("behold-widget").forEach((w) => {
        const root = (w as any).shadowRoot as ShadowRoot | null;
        if (root && !root.querySelector("#hb-no-brand")) {
          const st = document.createElement("style");
          st.id = "hb-no-brand";
          st.textContent = `
            [class*="brand"],[class*="Brand"],[class*="branding"],[class*="Branding"],
            footer,[class*="footer"],[class*="Footer"],
            a[href*="behold"],a[href*="beholder"],
            [class*="powered"],[class*="Powered"],
            [class*="badge"],[class*="Badge"],
            [class*="watermark"],[class*="Watermark"],
            [class*="credit"],[class*="Credit"],
            [class*="logo"]:not([class*="feed"]):not([class*="post"]) {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              height: 0 !important;
              overflow: hidden !important;
            }
            img {
              object-fit: cover !important;
              object-position: center !important;
              width: 100% !important;
              height: 100% !important;
              min-height: 200px !important;
            }
            [class*="item"] img,
            [class*="post"] img,
            [class*="cell"] img,
            [class*="tile"] img,
            li img {
              min-height: 220px !important;
            }
            @media (max-width: 768px) {
              img { min-height: 180px !important; }
            }
          `;
          root.appendChild(st);
        }
      });
    };

    const timer1 = setTimeout(injectHide, 500);
    const timer2 = setTimeout(injectHide, 1500);
    const timer3 = setTimeout(injectHide, 4000);
    const observer = new MutationObserver(injectHide);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      {...(rest as React.HTMLAttributes<HTMLElement>)}
      className="bg-black py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {heading && (
          <h2
            className="text-center text-5xl md:text-7xl font-bold text-white mb-12"
            style={{ fontFamily: "'Urbanist', sans-serif" }}
          >
            Follow us on{" "}
            <span style={{ color: "#00FFFF" }}>Instagram</span>
          </h2>
        )}
        {/* clip-path trims ~52px off the bottom of the widget, hiding the Behold badge without a visible overlay */}
        <div style={{ clipPath: "inset(0 0 90px 0)", marginBottom: "-90px", minHeight: 400 }}>
          <behold-widget feed-id={feedId} />
        </div>
      </div>
    </section>
  );
}

export default InstagramFeed;

export const schema = createSchema({
  type: "instagram-feed",
  title: "Instagram Feed",
  settings: [
    {
      group: "Content",
      inputs: [
        {
          type: "text",
          name: "heading",
          label: "Heading",
          defaultValue: "Follow us on Instagram",
          placeholder: "Follow us on Instagram",
        },
        {
          type: "text",
          name: "feedId",
          label: "Behold Feed ID",
          defaultValue: "4Y25XqYpmc6hjLt4QtZU",
          placeholder: "4Y25XqYpmc6hjLt4QtZU",
        },
      ],
    },
    ...sectionSettings,
  ],
  presets: {
    heading: "Follow us on Instagram",
    feedId: "4Y25XqYpmc6hjLt4QtZU",
  },
});
