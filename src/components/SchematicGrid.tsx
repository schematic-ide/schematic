import { type CSSProperties, useEffect, useMemo, useState } from "react";

type Line = {
  id: number;
  vertical: boolean;
  offset: number; // px from top (h) or left (v), snapped to 30px grid
  duration: number;
  delay: number;
  reverse: boolean;
  length: number;
  opacity: number;
};

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const GRID = 30;

export function SchematicGrid({ count = 12 }: { count?: number }) {
  const [size, setSize] = useState({ w: 1440, h: 900 });
  const [seed, setSeed] = useState(42);

  useEffect(() => {
    const update = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    setSeed(getRandomSeed());
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const lines = useMemo<Line[]>(() => {
    const rnd = mulberry32(seed);
    const cols = Math.floor(size.w / GRID);
    const rows = Math.floor(size.h / GRID);
    return Array.from({ length: count }, (_, i) => {
      const vertical = rnd() > 0.5;
      const slots = vertical ? cols : rows;
      const duration = 8 + rnd() * 11;
      return {
        id: i,
        vertical,
        offset: Math.floor(rnd() * slots) * GRID,
        duration,
        delay: -rnd() * duration,
        reverse: rnd() > 0.5,
        length: 120 + rnd() * 210,
        opacity: 0.55 + rnd() * 0.45,
      };
    });
  }, [count, seed, size.w, size.h]);

  return (
    <div className="schematic-grid" aria-hidden>
      {lines.map((l) => (
        <div
          key={l.id}
          className={`schematic-track${l.vertical ? " vertical" : ""}`}
          style={
            l.vertical
              ? { left: `${l.offset}px` }
              : { top: `${l.offset}px` }
          }
        >
          <span
            className={`schematic-head${l.reverse ? " reverse" : ""}`}
            style={{
              animationDuration: `${l.duration}s`,
              animationDelay: `${l.delay}s`,
              "--head-length": `${l.length}px`,
              "--head-opacity": l.opacity,
            } as CSSProperties}
          />
        </div>
      ))}
    </div>
  );
}

function getRandomSeed() {
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    const values = new Uint32Array(1);
    crypto.getRandomValues(values);
    return values[0] || 42;
  }

  return Math.floor(Math.random() * 0xffffffff) || 42;
}
