import {
  FacebookLogoIcon,
  PinterestLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import { createSchema, isBrowser } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { Calendar, Clock, User } from "lucide-react";
import { useLoaderData, useRouteLoaderData } from "react-router";
import {
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from "react-share";
import type { ArticleQuery } from "storefront-api.generated";
import { Image } from "~/components/image";
import { layoutInputs } from "~/components/section";
import type { RootLoader } from "~/root";

interface BlogPostProps extends HydrogenComponentProps {
  showTags: boolean;
  showShareButtons: boolean;
}

function estimateReadTime(html: string): string {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export default function BlogPost(props: BlogPostProps) {
  const { showTags, showShareButtons, ...rest } = props;
  const { layout } = useRouteLoaderData<RootLoader>("root");
  const { article, blog, formattedDate } = useLoaderData<{
    article: ArticleQuery["blog"]["articleByHandle"];
    blog: ArticleQuery["blog"];
    formattedDate: string;
  }>();

  if (!article) return <section {...rest} />;

  const { title, handle, image, contentHtml, author, tags } = article;

  let domain = layout.shop.primaryDomain.url;
  if (isBrowser) {
    const origin = window.location.origin;
    if (!origin.includes("localhost")) domain = origin;
  }
  const { handle: blogHandle } = blog;
  const articleUrl = `${domain}/blogs/${blogHandle}/${handle}`;
  const readTime = estimateReadTime(contentHtml ?? "");

  return (
    <section {...rest} className="min-h-screen bg-[#0A0A0A]">
      {/* Hero image */}
      {image && (
        <div className="relative h-[400px] md:h-[520px] overflow-hidden">
          <Image data={image} sizes="100vw" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20">
        {/* Title */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-tight mb-8"
          style={{ fontFamily: "'Urbanist', sans-serif" }}
        >
          {title}
        </h1>

        {/* Meta row */}
        <div
          className="flex flex-wrap items-center gap-6 text-sm text-white/60 mb-8 pb-8 border-b border-[#00FFFF]/20"
          style={{ fontFamily: "'Roboto Mono', monospace" }}
        >
          {author?.name && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#00FFFF]" />
              <span>{author.name}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#00FFFF]" />
            <span>{readTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#00FFFF]" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Article body */}
        <article>
          <div
            className="hb-article-content"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>

        {/* Footer row */}
        <div className="mt-16 pt-8 border-t border-[#00FFFF]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {showShareButtons && (
            <div className="flex items-center gap-3">
              <strong
                className="text-white/60 text-sm"
                style={{ fontFamily: "'Roboto Mono', monospace" }}
              >
                Share:
              </strong>
              <FacebookShareButton url={articleUrl}>
                <FacebookLogoIcon
                  size={22}
                  className="text-white/50 hover:text-[#00FFFF] transition-colors"
                />
              </FacebookShareButton>
              <PinterestShareButton url={articleUrl} media={image?.url ?? ""}>
                <PinterestLogoIcon
                  size={22}
                  className="text-white/50 hover:text-[#00FFFF] transition-colors"
                />
              </PinterestShareButton>
              <TwitterShareButton url={articleUrl} title={title}>
                <XLogoIcon
                  size={22}
                  className="text-white/50 hover:text-[#00FFFF] transition-colors"
                />
              </TwitterShareButton>
            </div>
          )}
          {showTags && tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#00FFFF]/10 border border-[#00FFFF]/30 text-[#00FFFF] text-xs font-mono uppercase tracking-wider rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export const schema = createSchema({
  type: "blog-post",
  title: "Blog post",
  limit: 1,
  enabledOn: {
    pages: ["ARTICLE"],
  },
  settings: [
    {
      group: "Layout",
      inputs: layoutInputs,
    },
    {
      group: "Article",
      inputs: [
        {
          type: "switch",
          label: "Show tags",
          name: "showTags",
          defaultValue: true,
        },
        {
          type: "switch",
          label: "Show share buttons",
          name: "showShareButtons",
          defaultValue: true,
        },
      ],
    },
  ],
});
