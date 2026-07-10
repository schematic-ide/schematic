import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { releases } from "@/lib/schematic-data";

export const Route = createFileRoute("/changelog/")({
  head: () => ({
    meta: [
      { title: "Changelog — Schematic" },
      { name: "description", content: "Every Schematic release with dates, version numbers, and a summary of what changed." },
      { property: "og:title", content: "Schematic Changelog" },
      { property: "og:description", content: "Timeline of Schematic releases." },
    ],
  }),
  component: ChangelogPage,
});

function ChangelogPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 pt-16 pb-24">
        <p className="font-mono text-xs uppercase tracking-widest text-cyan">// changelog</p>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Release timeline</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Every Schematic release, newest first. Click a version to read the full notes.
        </p>

        <ol className="mt-16 space-y-12">
          {releases.map((r, i) => {
            const isFirst = i === 0;
            const isLast = i === releases.length - 1;
            return (
              <li key={r.version} className="group grid grid-cols-[24px_1fr] gap-6">
                {/* Rail + dot column */}
                <div className="relative">
                  {/* Line above dot — only when not the first item */}
                  {!isFirst && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 h-1/2 w-[2px] bg-cyan/60"
                    />
                  )}
                  {/* Line below dot — extends through the gap to the next item; hidden on the last */}
                  {!isLast && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 w-[2px] bg-cyan/60"
                      style={{ bottom: "-3rem" }}
                    />
                  )}
                  {/* Dot — vertically centered on the card */}
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-4 w-4 items-center justify-center">
                    <span className="absolute h-4 w-4 rounded-full bg-cyan/20" />
                    <span className={`relative h-2.5 w-2.5 rounded-full ${isFirst ? "bg-cyan glow" : "bg-cyan/80"}`} />
                  </span>
                </div>

                <Link
                  to="/changelog/$version"
                  params={{ version: r.version }}
                  className="block rounded-xl border border-border bg-surface p-6 transition hover:border-cyan/40 hover:bg-surface-elevated"
                >
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-mono text-sm text-cyan">v{r.version}</span>
                    <time className="font-mono text-xs text-muted-foreground">
                      {new Date(r.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </time>
                    {isFirst && (
                      <span className="rounded-sm border border-cyan/40 bg-cyan/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan">
                        latest
                      </span>
                    )}
                  </div>
                  <h2 className="mt-2 text-xl font-semibold text-foreground">{r.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{r.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {r.highlights.slice(0, 3).map((h) => (
                      <span key={h} className="rounded-md border border-border bg-background/60 px-2 py-1 font-mono text-[11px] text-muted-foreground">
                        {h}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 inline-flex items-center gap-1 font-mono text-xs text-cyan opacity-0 transition group-hover:opacity-100">
                    Read full notes →
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>


      </main>
      <SiteFooter />
    </div>
  );
}
