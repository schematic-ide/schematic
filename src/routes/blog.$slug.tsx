import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CodeBlock } from "@/components/CodeBlock";
import { ContentImage } from "@/components/ContentImage";
import {
  ArticleNavigation,
  ArticleNavigationText,
  articleNavigationLinkClass,
} from "@/components/ArticleNavigation";
import { blogPosts, type BlogPost, type ContentBlock } from "@/lib/schematic-data";
import { Info, Lightbulb, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — Schematic Blog` },
          { name: "description", content: loaderData.post.excerpt },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.excerpt },
        ]
      : [{ title: "Post — Schematic" }],
  }),
  component: PostPage,
  notFoundComponent: () => (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 pt-16 pb-24 text-center">
        <p className="font-mono text-cyan">404</p>
        <h1 className="mt-2 text-3xl font-bold">Post not found</h1>
        <Link to="/blog" className="mt-6 inline-block text-cyan underline">Back to blog</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 pt-16 pb-24 text-center">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
      </div>
    </div>
  ),
});

function PostPage() {
  const { post } = Route.useLoaderData() as { post: BlogPost };
  const idx = blogPosts.findIndex((p) => p.slug === post.slug);
  const prev = blogPosts[idx + 1];
  const next = blogPosts[idx - 1];

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-6 pt-16 pb-24">
        <Link to="/blog" className="font-mono text-xs text-muted-foreground hover:text-cyan">
          ← back to blog
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
          <time>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
          {post.tags.map((t) => (
            <span key={t} className="rounded-sm border border-cyan/30 bg-cyan/5 px-1.5 py-0.5 text-cyan">{t}</span>
          ))}
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>
        <p className="mt-5 text-lg text-muted-foreground">{post.excerpt}</p>

        <article className="mt-10 space-y-6 text-foreground/90 leading-relaxed">
          {post.content.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}
        </article>

        <ArticleNavigation
          previous={prev ? (
            <Link
              to="/blog/$slug"
              params={{ slug: prev.slug }}
              className={articleNavigationLinkClass("previous")}
            >
              <ArticleNavigationText
                direction="previous"
                label="previous"
                title={prev.title}
              />
            </Link>
          ) : undefined}
          next={next ? (
            <Link
              to="/blog/$slug"
              params={{ slug: next.slug }}
              className={articleNavigationLinkClass("next")}
            >
              <ArticleNavigationText
                direction="next"
                label="next"
                title={next.title}
              />
            </Link>
          ) : undefined}
        />
      </main>
      <SiteFooter />
    </div>
  );
}

function renderInline(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`") && part.length > 1) {
      return (
        <code
          key={i}
          className="rounded-sm border border-cyan/20 bg-cyan/10 px-1.5 py-0.5 font-mono text-[0.875em] text-cyan"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p>{renderInline(block.text)}</p>;
    case "heading": {
      const level = block.level ?? 2;
      const cls =
        level === 2
          ? "mt-12 text-2xl font-semibold tracking-tight"
          : "mt-8 text-xl font-semibold tracking-tight";
      return level === 2 ? <h2 className={cls}>{block.text}</h2> : <h3 className={cls}>{block.text}</h3>;
    }
    case "code":
      return <CodeBlock code={block.code} language={block.language} filename={block.filename} />;
    case "image":
      return <ContentImage src={block.src} alt={block.alt} title={block.title} caption={block.caption} />;
    case "list": {
      const items = block.items.map((it, i) => <li key={i}>{renderInline(it)}</li>);
      return block.ordered ? (
        <ol className="ml-6 list-decimal space-y-2">{items}</ol>
      ) : (
        <ul className="ml-6 list-disc space-y-2 marker:text-cyan">{items}</ul>
      );
    }
    case "callout": {
      const variant = block.variant ?? "info";
      const Icon = variant === "warning" ? AlertTriangle : variant === "tip" ? Lightbulb : Info;
      const tone =
        variant === "warning"
          ? "border-yellow-500/30 bg-yellow-500/5 text-yellow-200"
          : variant === "tip"
            ? "border-cyan/30 bg-cyan/5 text-foreground"
            : "border-border bg-surface-elevated text-foreground";
      return (
        <aside className={`my-6 flex gap-3 rounded-lg border p-4 ${tone}`}>
          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
          <div>
            {block.title && <p className="font-mono text-xs uppercase tracking-widest text-cyan">{block.title}</p>}
            <p className={block.title ? "mt-1" : ""}>{renderInline(block.text)}</p>
          </div>
        </aside>
      );
    }
  }
}
