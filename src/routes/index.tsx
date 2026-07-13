import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MediaFrame } from "@/components/MediaFrame";
import { releases } from "@/lib/schematic-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Schematic — Visual IDE for ROS" },
      {
        name: "description",
        content:
          "Schematic is a visual IDE for ROS 2. Design node graphs, inspect topics live, and generate launch files without boilerplate.",
      },
      { property: "og:title", content: "Schematic — Visual IDE for ROS" },
      {
        property: "og:description",
        content:
          "Design ROS 2 node graphs visually. Inspect topics live. Generate clean launch files.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const latest = releases[0];
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-20 sm:pb-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/5 px-3 py-1 font-mono text-xs text-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />v{latest.version} —
            out now on GitHub
          </div>
          <h1 className="mt-6 max-w-3xl break-words text-4xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
            The visual IDE for <span className="text-gradient">ROS</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Design, build, wire, and run your entire ROS system on one visual canvas.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
            >
              Download v{latest.version}
              <span aria-hidden>↗</span>
            </a>
            <Link
              to="/changelog"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 font-medium text-foreground transition hover:bg-surface-elevated"
            >
              See what's new
            </Link>
          </div>

          <MediaFrame
            title="schematic — visual ros demo"
            tag="video"
            className="mt-16 mb-0 shadow-2xl"
            contentClassName="relative aspect-video w-full bg-gradient-to-br from-background via-surface to-background"
          >
            {/* TODO: Replace with <video src="..." autoPlay muted loop playsInline className="h-full w-full object-cover" /> */}
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-cyan/40 bg-cyan/10 text-cyan">
                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-7 w-7">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                visual ros demo · coming soon
              </p>
            </div>
          </MediaFrame>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 pt-0 pb-20 sm:pb-24">
        <div className="mb-10 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-cyan">// workflow</p>
          <h2 className="mt-2 break-words text-2xl font-bold sm:text-4xl">
            How Schematic actually works.
          </h2>
          <p className="mt-4 text-muted-foreground">
            ROS 2 systems are spread across processes, interfaces, and configuration. Schematic
            brings them together as a graph you can explore, assemble, connect, and operate.
          </p>
        </div>

        <ScrollWorkflow />
      </section>

      {/* Latest release CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-2xl border border-cyan/30 bg-gradient-to-br from-surface to-background p-8 sm:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan/10 blur-3xl" />
          <p className="font-mono text-xs uppercase tracking-widest text-cyan">
            Latest release ·{" "}
            {new Date(latest.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
              timeZone: "UTC",
            })}
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            v{latest.version} — {latest.title}
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">{latest.summary}</p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {latest.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 font-mono text-sm text-foreground/90">
                <span className="mt-1 text-cyan">▸</span> {h}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link
              to="/changelog/$version"
              params={{ version: latest.version }}
              className="inline-flex items-center gap-2 rounded-lg border border-cyan/40 bg-cyan/10 px-4 py-2 font-medium text-cyan transition hover:bg-cyan/20"
            >
              Read full release notes →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function ScrollWorkflow() {
  return (
    <div className="border-t border-border/70">
      {workflowSteps.map((step, index) => (
        <WorkflowStep key={step.title} step={step} index={index} />
      ))}
    </div>
  );
}

function WorkflowStep({ step, index }: { step: WorkflowStepData; index: number }) {
  return (
    <article className="scroll-step grid gap-8 border-b border-border/70 py-10 md:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] md:items-start md:gap-10 lg:gap-12">
      <div className="min-w-0">
        <div className="flex items-center gap-4 sm:gap-5">
          <span
            aria-hidden="true"
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-cyan/40 bg-surface/45 font-mono text-xs leading-none tabular-nums text-cyan"
          >
            <span className="translate-y-px">{String(index + 1).padStart(2, "0")}</span>
          </span>
          <p className="font-mono text-xs leading-5 uppercase tracking-widest text-cyan">
            {step.eyebrow}
          </p>
        </div>
        <h3 className="mt-5 break-words text-xl font-semibold leading-tight text-foreground sm:text-3xl">
          {step.title}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{step.body}</p>
      </div>

      <div className="min-w-0">{step.visual}</div>
    </article>
  );
}

function LibraryVisual() {
  return (
    <div className="scroll-piece border-y border-border bg-[#0B1220] px-4 py-5 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-widest text-slate-500">ROS 2 palette</p>
        <p className="font-mono text-xs text-cyan">search everything</p>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <FeatureCell label="packages" value="browse the software available to your system" />
        <FeatureCell label="executables" value="individual ROS nodes ready to place" />
        <FeatureCell label="launch files" value="larger subsystems as reusable blocks" />
      </div>
      <p className="mt-5 border-t border-border pt-4 font-mono text-xs text-slate-500">
        pin what matters · inspect details · add from the palette or directly on the canvas
      </p>
    </div>
  );
}

function CanvasVisual() {
  return (
    <div className="scroll-piece border-y border-border bg-[#0B1220] px-4 py-5 sm:px-6">
      <div className="grid gap-7 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-xs uppercase tracking-widest text-slate-500">
            building blocks
          </p>
          <div className="mt-5 space-y-3">
            <ResourceRow label="Executable" value="one runnable ROS node" tone="cyan" />
            <ResourceRow label="Launch system" value="many nodes behind one block" tone="violet" />
            <ResourceRow
              label="Bag play / record"
              value="ROS data in the same graph"
              tone="amber"
            />
          </div>
        </div>
        <div className="min-w-0 border-t border-border pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
          <p className="font-mono text-xs uppercase tracking-widest text-slate-500">
            system canvas
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <GraphDocItem title="camera_driver" sub="executable" />
            <GraphDocItem title="perception" sub="launch system" />
            <GraphDocItem title="navigator" sub="lifecycle node" />
            <GraphDocItem title="sensor_data" sub="bag playback" />
          </div>
          <p className="mt-4 font-mono text-xs text-cyan">drag · position · duplicate · save</p>
        </div>
      </div>
    </div>
  );
}

function ProbeVisual() {
  return (
    <div className="scroll-piece border-y border-border bg-[#0F172A]/70 px-4 py-5 sm:px-6">
      <div className="grid gap-7 sm:grid-cols-2">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-xs uppercase tracking-widest text-slate-500">
            interface discovery
          </p>
          <h4 className="mt-3 text-xl font-semibold text-slate-50">executable + launch include</h4>
          <div className="mt-5 space-y-3 font-mono text-xs">
            <RuntimeLine dot="bg-cyan" label="topics" value="publishers + subscribers" />
            <RuntimeLine dot="bg-orange-400" label="services" value="servers + clients" />
            <RuntimeLine dot="bg-violet-400" label="actions" value="goal / feedback / result" />
            <RuntimeLine dot="bg-amber-400" label="params + args" value="editable" />
          </div>
        </div>
        <div className="min-w-0 flex-1 border-t border-border pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
          <p className="font-mono text-xs uppercase tracking-widest text-slate-500">
            visible on the block
          </p>
          <div className="mt-4 space-y-2 font-mono text-xs text-slate-400">
            <p>typed input and output ports</p>
            <p>services grouped by server and client</p>
            <p>actions bundled as one interaction</p>
            <p className="text-cyan">parameters and arguments ready to edit</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComposeVisual() {
  return (
    <div className="scroll-piece border-y border-border bg-[#0B1220] px-4 py-5 sm:px-6">
      <div className="grid gap-7 sm:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
        <div className="min-w-0">
          <p className="font-mono text-xs uppercase tracking-widest text-slate-500">typed graph</p>
          <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 font-mono text-xs">
            <PortCard title="camera" detail="/image_raw" tone="cyan" />
            <span className="text-cyan">──▶</span>
            <PortCard title="detector" detail="image input" tone="violet" />
            <PortCard title="planner" detail="service client" tone="amber" />
            <span className="text-orange-300">──▶</span>
            <PortCard title="navigator" detail="service server" tone="orange" />
          </div>
          <p className="mt-4 font-mono text-xs text-slate-500">
            compatible ports become ROS remaps at run time
          </p>
        </div>
        <div className="min-w-0 border-t border-border pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
          <p className="font-mono text-xs uppercase tracking-widest text-slate-500">
            connection logic
          </p>
          <div className="mt-4 space-y-2 font-mono text-xs text-slate-400">
            <p>publishers connect to subscribers</p>
            <p>clients connect to service servers</p>
            <p>incompatible interface types stay separate</p>
            <p className="text-cyan">wires become ROS names and remaps</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfigureVisual() {
  return (
    <div className="scroll-piece border-y border-border bg-[#0F172A]/70 px-4 py-5 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-slate-500">visual inspector</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <FeatureCell label="identity" value="node name · namespace" />
        <FeatureCell label="interfaces" value="topic names · QoS" />
        <FeatureCell label="parameters" value="YAML · manual values" />
        <FeatureCell label="arguments" value="launch · command line" />
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 font-mono text-xs text-slate-500">
        <span>edit the selected block without leaving the graph</span>
        <span className="text-cyan">apply simulation time across the whole system</span>
      </div>
    </div>
  );
}

function RunVisual() {
  return (
    <div className="scroll-piece border-y border-border bg-[#060B13] px-4 py-5 font-mono text-xs sm:px-6">
      <p className="text-slate-500">live graph</p>
      <div className="mt-6 space-y-2 text-slate-400">
        <p>
          <span className="text-cyan">$</span> Run Graph
        </p>
        <p>[Schematic] visual connections applied to ROS 2</p>
        <p>[Schematic] nodes and launch systems started</p>
        <p className="text-emerald-300">[Schematic] live signals connected to the canvas</p>
      </div>
      <div className="mt-7 grid gap-3 border-t border-border pt-5 sm:grid-cols-2 lg:grid-cols-4">
        <RuntimeBadge label="observe" value="topic echo + live Hz" />
        <RuntimeBadge label="control" value="services + lifecycle" />
        <RuntimeBadge label="edit live" value="params + new relays" />
        <RuntimeBadge label="data" value="record + replay bags" />
      </div>
    </div>
  );
}

function PortCard({
  title,
  detail,
  tone,
}: {
  title: string;
  detail: string;
  tone: "cyan" | "violet" | "amber" | "orange";
}) {
  const toneClass = {
    cyan: "border-cyan/40 text-cyan",
    violet: "border-violet-400/40 text-violet-300",
    amber: "border-amber-400/40 text-amber-300",
    orange: "border-orange-400/40 text-orange-300",
  }[tone];

  return (
    <div className={`min-w-0 border bg-[#0F172A] px-3 py-3 ${toneClass}`}>
      <p className="break-words">{title}</p>
      <p className="mt-1 break-words text-slate-500">{detail}</p>
    </div>
  );
}

function FeatureCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border bg-[#0B1220] px-3 py-3 font-mono text-xs">
      <p className="text-cyan">{label}</p>
      <p className="mt-2 leading-relaxed text-slate-500">{value}</p>
    </div>
  );
}

function ResourceRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "cyan" | "violet" | "amber" | "sky";
}) {
  const toneClass = {
    cyan: "border-l-cyan text-cyan",
    violet: "border-l-violet-400 text-violet-300",
    amber: "border-l-amber-400 text-amber-300",
    sky: "border-l-sky-400 text-sky-300",
  }[tone];

  return (
    <div className={`border-l-2 px-3 py-2 ${toneClass}`}>
      <p className="text-sm font-medium">{label}</p>
      <p className="mt-1 font-mono text-xs text-slate-500">{value}</p>
    </div>
  );
}

function GraphDocItem({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="min-w-0 border border-border bg-[#0F172A] px-3 py-3">
      <p className="break-words text-sm font-semibold text-slate-50">{title}</p>
      <p className="mt-1 break-words font-mono text-xs text-slate-500">{sub}</p>
      <div className="mt-3 h-1.5 w-14 rounded-full bg-cyan/70" />
    </div>
  );
}

function RuntimeLine({ dot, label, value }: { dot: string; label: string; value: string }) {
  return (
    <div className="grid grid-cols-[0.5rem_minmax(0,1fr)] items-start gap-x-3 gap-y-1 sm:grid-cols-[0.5rem_minmax(0,0.8fr)_minmax(0,1fr)]">
      <span className={`mt-1.5 h-2 w-2 rounded-full ${dot}`} />
      <span className="min-w-0 break-words text-slate-300">{label}</span>
      <span className="col-start-2 min-w-0 break-words text-slate-500 sm:col-start-3 sm:row-start-1 sm:text-right">
        {value}
      </span>
    </div>
  );
}

function RuntimeBadge({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-cyan">{label}</p>
      <p className="mt-1 text-slate-500">{value}</p>
    </div>
  );
}

type WorkflowStepData = {
  eyebrow: string;
  title: string;
  body: string;
  visual: JSX.Element;
};

const workflowSteps: WorkflowStepData[] = [
  {
    eyebrow: "explore",
    title: "Find the ROS 2 components you want to work with.",
    body: "Schematic gathers the software available to your system into a searchable visual palette. Browse packages, inspect what they provide, and reach the executables and launch systems you need without hunting through commands and file trees.",
    visual: <LibraryVisual />,
  },
  {
    eyebrow: "assemble",
    title: "Lay out the system as a graph of real ROS 2 software.",
    body: "Drop individual nodes, complete launch systems, and recorded-data tools onto the canvas. Each block represents something Schematic can actually run, so the diagram is the system—not a disconnected drawing of it.",
    visual: <CanvasVisual />,
  },
  {
    eyebrow: "reveal",
    title: "See how every component communicates.",
    body: "Schematic discovers topics, services, actions, parameters, and arguments, then exposes them directly on each block. Interfaces that normally exist only in source code or command output become visible ports and controls you can reason about at a glance.",
    visual: <ProbeVisual />,
  },
  {
    eyebrow: "connect",
    title: "Define ROS 2 behavior by drawing the connections.",
    body: "Wire publishers to subscribers and service clients to servers using typed ports. Schematic checks compatibility and translates the visual topology into the topic names, service names, and remaps the running system needs.",
    visual: <ComposeVisual />,
  },
  {
    eyebrow: "configure",
    title: "Tune each component without losing sight of the system.",
    body: "Select a block to edit its identity, namespace, topic settings, QoS, parameters, and arguments beside the canvas. Configuration stays attached to the component it affects while the full graph remains visible.",
    visual: <ConfigureVisual />,
  },
  {
    eyebrow: "run + interact",
    title: "Turn the canvas into a live control surface.",
    body: "Run the graph and watch ROS 2 activity return to the same visual model. Inspect topic data and frequency, call services, drive lifecycle transitions, change parameters, add connections while running, and record or replay data without breaking the flow.",
    visual: <RunVisual />,
  },
];
