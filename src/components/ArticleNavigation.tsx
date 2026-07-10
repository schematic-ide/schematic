import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Direction = "previous" | "next";

type Props = {
  previous?: ReactNode;
  next?: ReactNode;
};

export function ArticleNavigation({ previous, next }: Props) {
  return (
    <nav className="mt-16 flex flex-wrap gap-x-8 gap-y-4 border-t border-border pt-6 text-sm">
      <div className="min-w-0 flex-1 basis-80">{previous}</div>
      <div className="min-w-0 flex-1 basis-80 text-right">{next}</div>
    </nav>
  );
}

export function articleNavigationLinkClass(direction: Direction) {
  return cn(
    "group inline-flex min-w-0 items-baseline gap-2 font-mono transition hover:text-cyan",
    direction === "next" && "justify-end text-right",
  );
}

export function ArticleNavigationText({
  direction,
  label,
  title,
}: {
  direction: Direction;
  label: string;
  title: string;
}) {
  const labelText = (
    <span className="shrink-0 text-xs text-muted-foreground transition group-hover:text-cyan/80">
      {direction === "previous" ? "← " : ""}
      {label}
      {direction === "next" ? " →" : ""}
    </span>
  );
  const titleText = (
    <span className="min-w-0 text-cyan">{title}</span>
  );
  return direction === "previous" ? (
    <>
      {labelText}
      {titleText}
    </>
  ) : (
    <>
      {titleText}
      {labelText}
    </>
  );
}
