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
            It is a ROS 2 workspace loop, not a generic canvas. As you move down the page, the
            pieces appear in the same order you use them in the app.
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
      <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 sm:grid-cols-[3rem_minmax(0,1fr)]">
        <span className="row-span-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan/35 bg-background font-mono text-xs text-cyan shadow-[0_0_24px_rgba(75,221,212,0.14)] sm:h-12 sm:w-12 sm:text-sm">
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="self-center font-mono text-xs uppercase tracking-widest text-cyan">
          {step.eyebrow}
        </p>
        <h3 className="mt-5 break-words text-xl font-semibold leading-tight text-foreground sm:text-3xl">
          {step.title}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{step.body}</p>
      </div>

      <div className="min-w-0">{step.visual}</div>
    </article>
  );
}

function WorkspaceVisual() {
  return (
    <div className="scroll-piece border-y border-border bg-[#0F172A]/70 px-4 py-5 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-slate-500">
        workspace startup
      </p>
      <div className="mt-5 space-y-4 font-mono text-xs">
        <StatusLine label="validate" value="src/ found" />
        <StatusLine label="prepare" value=".schematic/graphs ready" />
        <StatusLine label="build" value="colcon build + install/setup.bash" />
        <StatusLine label="environment" value="ROS overlay captured" />
      </div>
      <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 font-mono text-xs">
        <span className="text-slate-500">workspace terminal attached</span>
        <span className="text-emerald-300">ready</span>
      </div>
    </div>
  );
}

function PackagesVisual() {
  return (
    <div className="scroll-piece border-y border-border bg-[#0B1220] px-4 py-5 sm:px-6">
      <div className="grid gap-7 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-xs uppercase tracking-widest text-slate-500">
            package browser
          </p>
          <div className="mt-5 space-y-3">
            <ResourceRow label="Executables" value="drop as runnable nodes" tone="cyan" />
            <ResourceRow label="Launch Files" value="drop as launch includes" tone="violet" />
            <ResourceRow label="Parameter Files" value="apply to nodes" tone="amber" />
            <ResourceRow label="RViz Configs" value="attach to graph" tone="sky" />
          </div>
        </div>
        <div className="min-w-0 border-t border-border pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
          <p className="font-mono text-xs uppercase tracking-widest text-slate-500">
            graph document
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <GraphDocItem title="camera_node" sub="executable node" />
            <GraphDocItem title="bringup.launch.py" sub="launch include" />
            <GraphDocItem title="nav2_params.yaml" sub="parameter layer" />
            <GraphDocItem title="nav2.rviz" sub="attached RViz config" />
          </div>
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
            runtime probe
          </p>
          <h4 className="mt-3 text-xl font-semibold text-slate-50">executable / launch include</h4>
          <div className="mt-5 space-y-3 font-mono text-xs">
            <RuntimeLine dot="bg-cyan" label="topics" value="publishers + subscribers" />
            <RuntimeLine dot="bg-orange-400" label="services" value="servers + clients" />
            <RuntimeLine dot="bg-violet-400" label="actions" value="goal / feedback / result" />
            <RuntimeLine dot="bg-amber-400" label="params + args" value="editable" />
          </div>
        </div>
        <div className="min-w-0 flex-1 border-t border-border pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
          <p className="font-mono text-xs uppercase tracking-widest text-slate-500">
            inspector actions
          </p>
          <div className="mt-4 space-y-2 font-mono text-xs text-slate-400">
            <p>show/hide service ports on graph</p>
            <p>create callable service chips</p>
            <p>edit node names, namespaces, params, remaps</p>
            <p className="text-cyan">topic echo opens from topic rows</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RunVisual() {
  return (
    <div className="scroll-piece border-y border-border bg-[#060B13] px-4 py-5 font-mono text-xs sm:px-6">
      <p className="text-slate-500">active graph terminal</p>
      <div className="mt-6 space-y-2 text-slate-400">
        <p>
          <span className="text-cyan">$</span> Run Graph
        </p>
        <p>[Schematic] launch includes + executable nodes started</p>
        <p>[Schematic] topic frequency monitors attached</p>
        <p className="text-emerald-300">[Schematic] graph run active</p>
      </div>
      <div className="mt-7 grid gap-3 border-t border-border pt-5 sm:grid-cols-3">
        <RuntimeBadge label="lifecycle" value="configure / activate" />
        <RuntimeBadge label="service chip" value="call live endpoints" />
        <RuntimeBadge label="tools" value="rviz2 / gazebo / rqt_graph" />
      </div>
    </div>
  );
}

function StatusLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[0.5rem_minmax(0,6.5rem)_minmax(0,1fr)] items-start gap-x-3 gap-y-1">
      <span className="mt-1.5 h-2 w-2 rounded-full bg-cyan" />
      <span className="min-w-0 break-words text-slate-500">{label}</span>
      <span className="min-w-0 break-words text-slate-200">{value}</span>
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
    eyebrow: "workspace",
    title: "Open a real ROS 2 workspace.",
    body: "Schematic validates the workspace, creates its .schematic graph folder, runs the build/sourcing flow, and captures the ROS environment the editor will use.",
    visual: <WorkspaceVisual />,
  },
  {
    eyebrow: "resources",
    title: "Build the graph from package resources.",
    body: "The left panel is a package browser: executables become runnable nodes, launch files become launch includes, params can be applied, and RViz configs can sit on the graph.",
    visual: <PackagesVisual />,
  },
  {
    eyebrow: "probe",
    title: "Probe, wire, and edit the discovered interfaces.",
    body: "Runtime probes populate topics, services, actions, parameters, and launch arguments. The inspector is where you tune remaps, parameter layers, service chips, and topic echo.",
    visual: <ProbeVisual />,
  },
  {
    eyebrow: "run",
    title: "Run and control the graph from Schematic.",
    body: "Run Graph starts executables and launch includes in the prepared workspace terminal, tracks topic frequency, exposes lifecycle controls, supports live service calls, and can launch ROS tools.",
    visual: <RunVisual />,
  },
];
