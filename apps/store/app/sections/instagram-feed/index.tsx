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
    if (document.querySelector('script[src="https://w.behold.so/widget.js"]')) {
      return;
    }
    const s = document.createElement("script");
    s.type = "module";
    s.src = "https://w.behold.so/widget.js";
    document.head.appendChild(s);
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
        <behold-widget feed-id={feedId} />
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
