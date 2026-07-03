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
    // Behold uses a closed shadow root ({mode:'closed'}), so shadowRoot returns null.
    // Patching attachShadow forces open mode for any element that calls it AFTER this runs.
    if (!(window as any)._hbShadowPatched) {
      (window as any)._hbShadowPatched = true;
      const _orig = Element.prototype.attachShadow;
      (Element.prototype as any).attachShadow = function (init: ShadowRootInit) {
        return _orig.call(this, { ...init, mode: "open" });
      };
    }

    if (!document.querySelector('script[src="https://w.behold.so/widget.js"]')) {
      const s = document.createElement("script");
      s.type = "module";
      s.src = "https://w.behold.so/widget.js";
      document.head.appendChild(s);
    }

    const shadowObservers: MutationObserver[] = [];
    let debounceTimer: ReturnType<typeof setTimeout>;
    let applying = false;

    const applyFixes = () => {
      if (applying) return;
      applying = true;
      try {
        document.querySelectorAll("behold-widget").forEach((w) => {
          const widget = w as HTMLElement;
          const root = (widget as any).shadowRoot as ShadowRoot | null;

          // Shadow root still closed? Force-reconnect so our patched attachShadow runs.
          if (!root && !(widget as any)._hbReconnected) {
            (widget as any)._hbReconnected = true;
            const parent = widget.parentNode;
            const next = widget.nextSibling;
            if (parent) {
              parent.removeChild(widget);
              parent.insertBefore(widget, next);
              // Give Behold 600ms to re-render with the open shadow root
              setTimeout(applyFixes, 600);
            }
            return;
          }

          // Fall back to querying the element itself (handles light-DOM fallback too)
          const searchRoot: ParentNode = root ?? widget;

          // CSS injection for brand/badge hiding (only works when root is open)
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
            `;
            root.appendChild(st);
          }

          const isMobile = window.innerWidth <= 768;
          const imgH = isMobile ? "190px" : "260px";

          // Force 2-column grid on mobile
          searchRoot.querySelectorAll("*").forEach((el) => {
            const htmlEl = el as HTMLElement;
            if (window.getComputedStyle(htmlEl).display === "grid" && isMobile) {
              htmlEl.style.setProperty("grid-template-columns", "repeat(2, 1fr)", "important");
              htmlEl.style.setProperty("gap", "4px", "important");
            }
          });

          // Fix each image and its parent cell
          searchRoot.querySelectorAll("img").forEach((imgEl) => {
            const img = imgEl as HTMLImageElement;
            img.style.setProperty("height", imgH, "important");
            img.style.setProperty("min-height", imgH, "important");
            img.style.setProperty("max-height", imgH, "important");
            img.style.setProperty("object-fit", "cover", "important");
            img.style.setProperty("object-position", "center", "important");
            img.style.setProperty("width", "100%", "important");
            img.style.setProperty("display", "block", "important");
            const cell = img.parentElement;
            if (cell) {
              cell.style.setProperty("height", imgH, "important");
              cell.style.setProperty("min-height", imgH, "important");
              cell.style.setProperty("overflow", "hidden", "important");
            }
          });

          // Watch for future Behold re-renders (once root is open)
          if (root && !(root as any)._hbWatching) {
            (root as any)._hbWatching = true;
            const shadowObs = new MutationObserver((mutations) => {
              const hasNewImages = mutations.some((m) =>
                Array.from(m.addedNodes).some((n) => {
                  const el = n as Element;
                  return el.tagName === "IMG" || (el.querySelector && el.querySelector("img"));
                })
              );
              if (hasNewImages) {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(applyFixes, 200);
              }
            });
            shadowObs.observe(root, { childList: true, subtree: true });
            shadowObservers.push(shadowObs);
          }
        });
      } finally {
        applying = false;
      }
    };

    const timer1 = setTimeout(applyFixes, 200);
    const timer2 = setTimeout(applyFixes, 800);
    const timer3 = setTimeout(applyFixes, 2000);
    const timer4 = setTimeout(applyFixes, 5000);

    const bodyObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (Array.from(m.addedNodes).some((n) => (n as Element).tagName === "BEHOLD-WIDGET")) {
          applyFixes();
          break;
        }
      }
    });
    bodyObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(debounceTimer);
      bodyObserver.disconnect();
      shadowObservers.forEach((o) => o.disconnect());
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
        {/*
          transform: translateZ(0) makes this div the containing block for ANY
          position:fixed descendants inside the Behold shadow DOM.
          overflow: hidden then clips them if they fall outside our bounds.
          The black div covers whatever remains at the bottom.
        */}
        <div style={{
          position: "relative",
          minHeight: 600,
          transform: "translateZ(0)",
          overflow: "hidden",
        }}>
          <behold-widget feed-id={feedId} />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "100px",
              background: "linear-gradient(to bottom, transparent 0%, #000 40%)",
              zIndex: 9999,
              pointerEvents: "none",
            }}
          />
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
