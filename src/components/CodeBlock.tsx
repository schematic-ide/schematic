import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { MediaFrame } from "@/components/MediaFrame";

type Props = {
  code: string;
  language: string;
  filename?: string;
};

export function CodeBlock({ code, language, filename }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* noop */
    }
  };

  const copyButton = (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy code"
      className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-background/40 px-2 py-1 font-mono text-xs text-muted-foreground transition hover:border-cyan/40 hover:text-cyan"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );

  return (
    <MediaFrame title={filename ?? "code"} tag={language} action={copyButton}>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono text-foreground/90">{code}</code>
      </pre>
    </MediaFrame>
  );
}
