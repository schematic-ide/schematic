export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-sm bg-cyan" />
          <span className="font-mono">schematic // v0.1.0</span>
        </div>
        <div className="font-mono text-xs">
          © {new Date().getFullYear()} Schematic — MIT licensed
        </div>
      </div>
    </footer>
  );
}
