import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-cyan glow" />
          <span className="font-display text-lg font-semibold tracking-tight">
            Sche<span className="text-cyan">matic</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm sm:flex">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/changelog">Changelog</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="ml-3 inline-flex items-center gap-2 rounded-md border border-cyan/40 bg-cyan/10 px-3 py-1.5 font-mono text-xs text-cyan transition hover:bg-cyan/20"
          >
            <span>★</span> GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="rounded-md border border-transparent px-3 py-1.5 text-muted-foreground transition hover:border-border hover:bg-muted hover:text-foreground"
      activeProps={{
        className: "rounded-md border border-cyan/45 bg-cyan/10 px-3 py-1.5 text-cyan",
      }}
      activeOptions={{ exact: to === "/" }}
    >
      {children}
    </Link>
  );
}
