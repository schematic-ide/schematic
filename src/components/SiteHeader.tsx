import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

        <DropdownMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-md border border-cyan/40 bg-cyan/10 text-cyan transition hover:bg-cyan/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan sm:hidden"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={10}
            className="w-[calc(100vw-3rem)] border-border/80 bg-surface-elevated/95 p-2 shadow-xl backdrop-blur-xl sm:hidden"
          >
            <MobileNavLink to="/" index="01">
              Home
            </MobileNavLink>
            <MobileNavLink to="/changelog" index="02">
              Changelog
            </MobileNavLink>
            <MobileNavLink to="/blog" index="03">
              Blog
            </MobileNavLink>
            <DropdownMenuSeparator className="my-2 bg-border/70" />
            <DropdownMenuItem asChild>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex cursor-pointer items-center justify-between rounded-md border border-cyan/35 bg-cyan/10 px-3 py-2.5 font-mono text-xs text-cyan transition-colors focus:bg-cyan/20 focus:text-cyan"
              >
                <span>GitHub</span>
                <span aria-hidden="true">★</span>
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function MobileNavLink({
  to,
  index,
  children,
}: {
  to: string;
  index: string;
  children: React.ReactNode;
}) {
  return (
    <DropdownMenuItem asChild>
      <Link
        to={to}
        className="flex cursor-pointer items-center gap-3 rounded-md border border-transparent px-3 py-2.5 text-sm text-muted-foreground transition-colors focus:bg-muted focus:text-foreground"
        activeProps={{
          className:
            "flex cursor-pointer items-center gap-3 rounded-md border border-cyan/35 bg-cyan/10 px-3 py-2.5 text-sm text-cyan focus:bg-cyan/10 focus:text-cyan",
        }}
        activeOptions={{ exact: to === "/" }}
      >
        <span className="font-mono text-[10px] text-cyan/70">{index}</span>
        <span>{children}</span>
      </Link>
    </DropdownMenuItem>
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
