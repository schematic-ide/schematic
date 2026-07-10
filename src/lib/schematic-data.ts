export type ReleaseBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src: string; alt: string; title?: string; caption?: string };

export type Release = {
  version: string;
  date: string; // ISO
  title: string;
  summary: string;
  highlights: string[];
  sections: { heading: string; blocks: ReleaseBlock[] }[];
};

export const releases: Release[] = [
  {
    version: "0.1.0",
    date: "2026-05-20",
    title: "First public release",
    summary:
      "Schematic goes public. A visual ROS IDE for designing nodes, topics, and launch graphs without writing boilerplate.",
    highlights: [
      "Visual node graph editor",
      "Live topic inspector",
      "ROS 2 launch file generator",
      "Cross-distro support (Humble, Iron, Jazzy)",
    ],
    sections: [
      {
        heading: "Editor",
        blocks: [
          {
            type: "paragraph",
            text: "The canvas is now the centerpiece. Drag nodes from the sidebar, snap them into place, and let Schematic route the edges for you. Everything you'd normally fight with in a launch file is now a property panel away.",
          },
          {
            type: "image",
            src: "/images/schematic-canvas-overview.svg",
            alt: "Schematic canvas with ROS nodes connected by cyan topic lines",
            title: "schematic — canvas overview",
            caption: "The first public canvas shows publisher, transform, planner, and controller nodes wired into a launch-ready ROS graph.",
          },
          {
            type: "list",
            items: [
              "Drag-and-drop node graph with auto-routing edges",
              "Inline parameter editor with type validation",
              "Subscriber/publisher port matching with type hints",
            ],
          },
        ],
      },
      {
        heading: "Runtime",
        blocks: [
          {
            type: "paragraph",
            text: "We rebuilt the runtime panel so you can actually see what your robot is doing without alt-tabbing into six terminals.",
          },
          {
            type: "list",
            items: [
              "Live topic echo panel with rate metrics",
              "TF tree visualizer",
              "One-click launch from the canvas",
            ],
          },
        ],
      },
      {
        heading: "Known issues",
        blocks: [
          {
            type: "paragraph",
            text: "A couple of rough edges we're tracking for the next release:",
          },
          {
            type: "list",
            items: [
              "rosbag playback scrubbing is not yet supported",
              "Windows native build is experimental",
            ],
          },
        ],
      },
    ],
  },
  {
    version: "0.0.3",
    date: "2026-04-28",
    title: "Beta polish & launch generator",
    summary:
      "Final beta. Added the launch file generator and squashed a long list of editor crashes.",
    highlights: [
      "Launch file generator (Python + XML)",
      "Undo/redo across the canvas",
      "70+ bug fixes",
    ],
    sections: [
      {
        heading: "Added",
        blocks: [
          {
            type: "paragraph",
            text: "The launch generator is finally here. Export your entire graph as a clean ros2 launch Python file you'd be happy to commit.",
          },
          {
            type: "list",
            items: [
              "Export graph as ros2 launch python file",
              "Project-level parameter overlays",
            ],
          },
        ],
      },
      {
        heading: "Fixed",
        blocks: [
          {
            type: "list",
            items: [
              "Crash when deleting a node mid-drag",
              "Edges occasionally rendering behind nodes",
            ],
          },
        ],
      },
    ],
  },
  {
    version: "0.0.2",
    date: "2026-03-14",
    title: "Topic inspector",
    summary: "Introduced the live topic inspector and ROS 2 Iron support.",
    highlights: ["Live topic inspector", "ROS 2 Iron support", "Dark theme refresh"],
    sections: [
      {
        heading: "Added",
        blocks: [
          {
            type: "paragraph",
            text: "The topic inspector gives you a live, tree-shaped view of any message on the bus — including nested fields, arrays, and timing metrics.",
          },
          {
            type: "list",
            items: [
              "Topic inspector with message tree view",
              "Hz/bandwidth metrics per topic",
            ],
          },
        ],
      },
      {
        heading: "Changed",
        blocks: [
          {
            type: "paragraph",
            text: "Refined the dark theme tokens so contrast holds up on cheap monitors and bright lab lighting.",
          },
        ],
      },
    ],
  },
  {
    version: "0.0.1",
    date: "2026-02-02",
    title: "Initial prototype",
    summary: "First internal prototype. Node graph and basic ROS 2 Humble bridge.",
    highlights: ["Node graph prototype", "ROS 2 Humble bridge"],
    sections: [
      {
        heading: "Added",
        blocks: [
          {
            type: "paragraph",
            text: "The first thing that ever worked: a canvas, some nodes, and a thin bridge into a running ROS 2 Humble graph.",
          },
          {
            type: "list",
            items: [
              "Basic canvas with nodes and edges",
              "Bridge to a running ROS 2 graph",
            ],
          },
        ],
      },
    ],
  },
];

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level?: 2 | 3 }
  | { type: "code"; language: string; filename?: string; code: string }
  | { type: "image"; src: string; alt: string; title?: string; caption?: string }
  | { type: "callout"; variant?: "info" | "warning" | "tip"; title?: string; text: string }
  | { type: "list"; ordered?: boolean; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  excerpt: string;
  tags: string[];
  content: ContentBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "inline-code-styling",
    title: "Writing prose with inline code that doesn't suck",
    date: "2026-06-23",
    readingTime: "2 min",
    excerpt:
      "A quick tour of how inline code variables render inside paragraphs, lists, and callouts.",
    tags: ["meta", "design"],
    content: [
      {
        type: "paragraph",
        text: "Wrap any variable or snippet in backticks and it becomes a cyan-tinted chip. For example, call `schematic open` to launch the IDE, or set the `ROS_DOMAIN_ID` environment variable before booting your graph.",
      },
      { type: "heading", text: "Inside lists", level: 2 },
      {
        type: "list",
        items: [
          "Use `npm run dev` to start the dev server.",
          "Export your config to `~/.schematic/config.toml`.",
          "The `--watch` flag re-runs the generator on save.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Pro tip",
        text: "Inline code also works in callouts — like mentioning the `SCHEMATIC_HOME` env var here.",
      },
      { type: "heading", text: "Inspector screenshot", level: 2 },
      {
        type: "image",
        src: "/images/schematic-topic-inspector.svg",
        alt: "Schematic topic inspector showing message fields and timing metrics",
        title: "topic inspector /scan",
        caption: "The topic inspector keeps the message tree, rate, bandwidth, and range sample visible without opening another terminal.",
      },
      { type: "heading", text: "And full code blocks still look like this", level: 2 },
      {
        type: "code",
        language: "bash",
        filename: "terminal",
        code: "# Run it\nschematic open --workspace ./my_ws",
      },
    ],
  },

  {
    slug: "introducing-schematic",
    title: "Introducing Schematic",
    date: "2026-05-20",
    readingTime: "4 min",
    excerpt:
      "Why we built a visual IDE for ROS, and what it changes about the way you prototype robots.",
    tags: ["announcement", "ros2"],
    content: [
      {
        type: "paragraph",
        text: "Robotics development still leans heavily on hand-rolled launch files, YAML overlays, and tribal knowledge passed between lab members. Schematic is our attempt to take the boring parts and put them on a canvas.",
      },
      {
        type: "paragraph",
        text: "The first public release focuses on three things: a visual graph editor that mirrors your real ROS graph, a live topic inspector, and a launch file generator that produces files you would not be ashamed to commit.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Try it now",
        text: "Grab the 0.1.0 release from GitHub, file issues, and tell us what's missing.",
      },
    ],
  },
  {
    slug: "building-your-first-graph",
    title: "Building your first node graph in Schematic",
    date: "2026-05-18",
    readingTime: "6 min",
    excerpt:
      "A walkthrough of going from an empty canvas to a running ROS 2 system in about ten minutes.",
    tags: ["tutorial", "getting-started"],
    content: [
      {
        type: "paragraph",
        text: "Open Schematic and create a new project. Choose your ROS distribution from the dropdown — Humble, Iron, or Jazzy are all supported.",
      },
      { type: "heading", text: "Install and launch", level: 2 },
      {
        type: "code",
        language: "bash",
        filename: "terminal",
        code: "# Install Schematic\ncurl -fsSL https://schematic.dev/install.sh | bash\n\n# Launch the IDE\nschematic open",
      },
      {
        type: "paragraph",
        text: "Drag a publisher node onto the canvas. Set its topic name and message type from the inline editor on the right. Drop a subscriber node next to it and connect the matching ports.",
      },
      { type: "heading", text: "A minimal publisher node", level: 2 },
      {
        type: "code",
        language: "python",
        filename: "talker.py",
        code: "import rclpy\nfrom rclpy.node import Node\nfrom std_msgs.msg import String\n\nclass Talker(Node):\n    def __init__(self):\n        super().__init__('talker')\n        self.pub = self.create_publisher(String, 'chatter', 10)\n        self.create_timer(0.5, self.tick)\n\n    def tick(self):\n        self.pub.publish(String(data='hello from Schematic'))\n\nrclpy.init()\nrclpy.spin(Talker())",
      },
      {
        type: "callout",
        variant: "info",
        title: "Heads up",
        text: "Hit the launch button at the top of the canvas. Schematic generates a launch file, sources your workspace, and starts your graph. The topic inspector lights up with live data.",
      },
    ],
  },
  {
    slug: "designing-the-launch-generator",
    title: "How the launch file generator works",
    date: "2026-04-30",
    readingTime: "8 min",
    excerpt:
      "A peek under the hood at how Schematic turns a visual graph into idiomatic ros2 launch code.",
    tags: ["deep-dive", "internals"],
    content: [
      {
        type: "paragraph",
        text: "ROS 2 launch files are Python programs, which makes them powerful but easy to write badly. We wanted Schematic's generated files to look like something a human wrote on a good day.",
      },
      { type: "heading", text: "Generated output", level: 2 },
      {
        type: "code",
        language: "python",
        filename: "bringup.launch.py",
        code: "from launch import LaunchDescription\nfrom launch_ros.actions import Node\n\ndef generate_launch_description():\n    return LaunchDescription([\n        Node(\n            package='demo_nodes_cpp',\n            executable='talker',\n            name='talker',\n            parameters=[{'rate': 10.0}],\n        ),\n        Node(\n            package='demo_nodes_cpp',\n            executable='listener',\n            name='listener',\n        ),\n    ])",
      },
      {
        type: "paragraph",
        text: "The generator walks the graph, groups nodes by package, and emits a single LaunchDescription with parameters lifted to the top of the file. Conditional includes are wrapped in IfCondition with launch arguments preserved verbatim.",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Rough edges",
        text: "Lifecycle nodes are still partially supported — that's next on the roadmap.",
      },
    ],
  },
];
