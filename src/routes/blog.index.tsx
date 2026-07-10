import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { blogPosts } from "@/lib/schematic-data";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Schematic" },
      { name: "description", content: "Tutorials, deep dives, and updates from the team building Schematic." },
      { property: "og:title", content: "Schematic Blog" },
      { property: "og:description", content: "Tutorials and deep dives on Schematic." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 pt-16 pb-24">
        <p className="font-mono text-xs uppercase tracking-widest text-cyan">// blog</p>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Writing about Schematic</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Walkthroughs, design notes, and the occasional rant about ROS 2 launch files.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {blogPosts.map((p, i) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className={`group flex flex-col justify-between rounded-xl border border-border bg-surface p-7 transition hover:border-cyan/40 hover:bg-surface-elevated ${
                i === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
                  <time>{new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
                  <span>·</span>
                  <span>{p.readingTime}</span>
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-sm border border-cyan/30 bg-cyan/5 px-1.5 py-0.5 text-cyan">
                      {t}
                    </span>
                  ))}
                </div>
                <h2 className={`mt-3 font-semibold tracking-tight ${i === 0 ? "text-3xl" : "text-xl"}`}>
                  {p.title}
                </h2>
                <p className="mt-3 text-muted-foreground">{p.excerpt}</p>
              </div>
              <div className="mt-6 inline-flex items-center gap-1 font-mono text-xs text-cyan">
                Read post →
              </div>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
