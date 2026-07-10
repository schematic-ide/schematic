import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  tag: string;
  action?: ReactNode;
  caption?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function MediaFrame({
  title,
  tag,
  action,
  caption,
  children,
  className,
  contentClassName,
}: Props) {
  return (
    <figure
      className={cn(
        "my-8 overflow-hidden rounded-lg border border-border bg-surface-elevated",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2">
        <div className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-cyan/70" />
        </div>
        <span className="ml-2 min-w-0 truncate font-mono text-xs text-muted-foreground">
          {title}
        </span>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <span className="rounded-sm border border-cyan/30 bg-cyan/5 px-1.5 py-0.5 font-mono text-xs uppercase tracking-wider text-cyan">
            {tag}
          </span>
          {action}
        </div>
      </div>
      <div className={cn("bg-background/40", contentClassName)}>{children}</div>
      {caption && (
        <figcaption className="border-t border-border bg-background/35 px-4 py-3 font-mono text-xs leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
