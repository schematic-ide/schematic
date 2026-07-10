import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContentImage } from "@/components/ContentImage";
import {
  ArticleNavigation,
  ArticleNavigationText,
  articleNavigationLinkClass,
} from "@/components/ArticleNavigation";
import { releases, type Release } from "@/lib/schematic-data";

export const Route = createFileRoute("/changelog/$version")({
  loader: ({ params }) => {
    const release = releases.find((r) => r.version === params.version);
    if (!release) throw notFound();
    return { release };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `v${loaderData.release.version} — Schematic Changelog` },
          { name: "description", content: loaderData.release.summary },
          { property: "og:title", content: `Schematic v${loaderData.release.version}` },
          { property: "og:description", content: loaderData.release.summary },
        ]
      : [{ title: "Release — Schematic" }],
  }),
  component: ReleasePage,
  notFoundComponent: () => (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 pt-16 pb-24 text-center">
        <p className="font-mono text-cyan">404</p>
        <h1 className="mt-2 text-3xl font-bold">Release not found</h1>
        <Link to="/changelog" className="mt-6 inline-block text-cyan underline">
          Back to changelog
        </Link>
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

function ReleasePage() {
  const { release } = Route.useLoaderData() as { release: Release };
  const idx = releases.findIndex((r) => r.version === release.version);
  const prev = releases[idx + 1];
  const next = releases[idx - 1];

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 pt-16 pb-24">
        <Link to="/changelog" className="font-mono text-xs text-muted-foreground hover:text-cyan">
          ← back to changelog
        </Link>

        <div className="mt-6 border-l-2 border-cyan/60 pl-6">
          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="font-mono text-4xl font-bold text-cyan">v{release.version}</h1>
            <time className="font-mono text-sm text-muted-foreground">
              {new Date(release.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </time>
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{release.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{release.summary}</p>
        </div>

        <div className="mt-10 rounded-xl border border-border bg-surface p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-cyan">// highlights</p>
          <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {release.highlights.map((h) => (
              <li key={h} className="flex items-baseline gap-2.5 text-sm leading-snug">
                <span className="text-cyan shrink-0">▸</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 space-y-12">
          {release.sections.map((s) => (
            <section key={s.heading}>
              <h3 className="font-display text-xl font-semibold">
                <span className="text-cyan">#</span> {s.heading}
              </h3>
              <div className="mt-4 space-y-4">
                {s.blocks.map((block, bi) => {
                  if (block.type === "paragraph") {
                    return (
                      <p key={bi} className="text-foreground/85 leading-relaxed">
                        {block.text}
                      </p>
                    );
                  }
                  if (block.type === "image") {
                    return (
                      <ContentImage
                        key={bi}
                        src={block.src}
                        alt={block.alt}
                        title={block.title}
                        caption={block.caption}
                      />
                    );
                  }
                  return (
                    <ul key={bi} className="space-y-2">
                      {block.items.map((item) => (
                        <li
                          key={item}
                          className="relative pl-5 text-foreground/90 before:absolute before:left-0 before:top-[10px] before:h-1.5 before:w-1.5 before:rounded-full before:bg-cyan/70"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <ArticleNavigation
          previous={prev ? (
            <Link
              to="/changelog/$version"
              params={{ version: prev.version }}
              className={articleNavigationLinkClass("previous")}
            >
              <ArticleNavigationText
                direction="previous"
                label="previous"
                title={`v${prev.version}`}
              />
            </Link>
          ) : undefined}
          next={next ? (
            <Link
              to="/changelog/$version"
              params={{ version: next.version }}
              className={articleNavigationLinkClass("next")}
            >
              <ArticleNavigationText
                direction="next"
                label="next"
                title={`v${next.version}`}
              />
            </Link>
          ) : undefined}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
