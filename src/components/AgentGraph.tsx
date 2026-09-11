"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { ACCENT_CYCLE, ACCENT_HEX } from "@/lib/colors";

const SIZE = 520;
const C = SIZE / 2;
const NODE_R = 6; // 12px core
const CENTRE_R = 9; // 18px core
const ATTRACT_RADIUS = 120;
const PULSE_EVERY = 1500;
const PULSE_DUR = 520;

const NODE_POLAR: [number, number][] = [
  [-90, 195],
  [-38, 205],
  [14, 185],
  [66, 205],
  [124, 190],
  [170, 180],
  [222, 200],
];

const PAIRS: [number, number][] = [
  [0, 1],
  [2, 3],
  [5, 6],
];

const easeInOut = (p: number) =>
  p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

function basePos(i: number, orbit: number) {
  const [deg, r] = NODE_POLAR[i];
  const a = (deg * Math.PI) / 180 + orbit;
  return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) };
}

type Pulse = { edge: number; start: number; dur: number; colour: string };
type Ripple = { node: number; start: number; colour: string };

export default function AgentGraph({ labels }: { labels: string[] }) {
  const reduced = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const worldRef = useRef<SVGGElement>(null);
  const edgeRefs = useRef<(SVGLineElement | null)[]>([]);
  const pairRefs = useRef<(SVGLineElement | null)[]>([]);
  const nodeRefs = useRef<(SVGGElement | null)[]>([]);
  const haloRefs = useRef<(SVGCircleElement | null)[]>([]);
  const coreRefs = useRef<(SVGCircleElement | null)[]>([]);
  const labelRefs = useRef<(SVGTextElement | null)[]>([]);
  const pulseRefs = useRef<(SVGCircleElement | null)[]>([]);
  const rippleRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    if (reduced) return;
    const svg = svgRef.current;
    const world = worldRef.current;
    if (!svg || !world) return;

    const n = NODE_POLAR.length;
    const pos = NODE_POLAR.map((_, i) => ({ ...basePos(i, 0), vx: 0, vy: 0 }));
    const flash = new Array(n).fill(0);
    const flashColour: string[] = new Array(n).fill(ACCENT_HEX.mint);
    let orbit = 0;
    let hoverIdx = -1;
    let cursor: { x: number; y: number } | null = null;
    const parallax = { x: 0, y: 0, tx: 0, ty: 0 };
    let pulses: Pulse[] = [];
    let ripples: Ripple[] = [];
    let seq = 0;
    let pulseTimer = 0;
    let last = 0;
    let raf = 0;
    let running = false;
    let inView = true;

    const spawnPulse = (edge: number, dur = PULSE_DUR) => {
      const colour = ACCENT_HEX[ACCENT_CYCLE[seq % ACCENT_CYCLE.length]];
      seq += 1;
      pulses.push({ edge, start: performance.now(), dur, colour });
    };

    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min(now - last || 16, 50);
      last = now;
      const t = now;

      orbit += dt * 0.00005; // one revolution roughly every two minutes
      parallax.x += (parallax.tx - parallax.x) * 0.05;
      parallax.y += (parallax.ty - parallax.y) * 0.05;
      world.setAttribute(
        "transform",
        `translate(${parallax.x.toFixed(2)} ${parallax.y.toFixed(2)})`,
      );

      // node physics
      for (let i = 0; i < n; i++) {
        const base = basePos(i, orbit);
        let tx = base.x;
        let ty = base.y;
        if (cursor) {
          const dx = cursor.x - base.x;
          const dy = cursor.y - base.y;
          const d = Math.hypot(dx, dy);
          if (d < ATTRACT_RADIUS && d > 0.001) {
            const pull = ((ATTRACT_RADIUS - d) / ATTRACT_RADIUS) * 26;
            tx += (dx / d) * pull;
            ty += (dy / d) * pull;
          }
        }
        const p = pos[i];
        p.vx += (tx - p.x) * 0.09;
        p.vy += (ty - p.y) * 0.09;
        p.vx *= 0.82;
        p.vy *= 0.82;
        p.x += p.vx;
        p.y += p.vy;

        const g = nodeRefs.current[i];
        if (g) g.setAttribute("transform", `translate(${p.x} ${p.y})`);

        const breathe = 1 + 0.07 * Math.sin(t * 0.0012 + i * 0.9);
        const core = coreRefs.current[i];
        if (core) core.setAttribute("r", String(NODE_R * breathe));

        flash[i] *= 0.93;
        const halo = haloRefs.current[i];
        if (halo) {
          const hovered = i === hoverIdx;
          halo.setAttribute("r", String(16 * breathe + flash[i] * 8));
          halo.setAttribute(
            "fill",
            flash[i] > 0.05 ? flashColour[i] : ACCENT_HEX.mint,
          );
          halo.setAttribute(
            "fill-opacity",
            String(0.14 + flash[i] * 0.3 + (hovered ? 0.18 : 0)),
          );
        }
        const label = labelRefs.current[i];
        if (label) label.setAttribute("opacity", i === hoverIdx ? "1" : "0");
      }

      // edges follow nodes
      for (let i = 0; i < n; i++) {
        const line = edgeRefs.current[i];
        if (line) {
          line.setAttribute("x2", String(pos[i].x));
          line.setAttribute("y2", String(pos[i].y));
          const lit = i === hoverIdx;
          line.setAttribute("stroke", lit ? ACCENT_HEX.mint : "#22304A");
          line.setAttribute("stroke-opacity", lit ? "0.9" : "1");
          line.setAttribute("stroke-width", lit ? "1.6" : "1");
        }
      }
      PAIRS.forEach(([a, b], k) => {
        const line = pairRefs.current[k];
        if (!line) return;
        line.setAttribute("x1", String(pos[a].x));
        line.setAttribute("y1", String(pos[a].y));
        line.setAttribute("x2", String(pos[b].x));
        line.setAttribute("y2", String(pos[b].y));
        const lit = a === hoverIdx || b === hoverIdx;
        line.setAttribute("stroke", lit ? ACCENT_HEX.mint : "#22304A");
        line.setAttribute("stroke-width", lit ? "1.6" : "1");
      });

      // continuous pulses
      pulseTimer += dt;
      if (pulseTimer >= PULSE_EVERY) {
        pulseTimer = 0;
        spawnPulse(seq % n);
      }
      const alive: Pulse[] = [];
      pulses.forEach((pl) => {
        const p = (now - pl.start) / pl.dur;
        if (p >= 1) {
          flash[pl.edge] = 1;
          flashColour[pl.edge] = pl.colour;
          return;
        }
        alive.push(pl);
      });
      pulses = alive;
      pulseRefs.current.forEach((c, k) => {
        if (!c) return;
        const pl = pulses[k];
        if (!pl) {
          c.setAttribute("opacity", "0");
          return;
        }
        const p = easeInOut((now - pl.start) / pl.dur);
        const target = pos[pl.edge];
        c.setAttribute("cx", String(C + (target.x - C) * p));
        c.setAttribute("cy", String(C + (target.y - C) * p));
        c.setAttribute("fill", pl.colour);
        c.setAttribute("opacity", "1");
      });

      // ripples
      ripples = ripples.filter((r) => now - r.start < 650);
      rippleRefs.current.forEach((c, k) => {
        if (!c) return;
        const r = ripples[k];
        if (!r) {
          c.setAttribute("opacity", "0");
          return;
        }
        const p = (now - r.start) / 650;
        const at = pos[r.node];
        c.setAttribute("cx", String(at.x));
        c.setAttribute("cy", String(at.y));
        c.setAttribute("r", String(8 + p * 38));
        c.setAttribute("stroke", r.colour);
        c.setAttribute("opacity", String((1 - p) * 0.55));
      });

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || !inView || document.hidden) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const toLocal = (e: PointerEvent) => {
      const rect = svg.getBoundingClientRect();
      return {
        x: ((e.clientX - rect.left) / rect.width) * SIZE,
        y: ((e.clientY - rect.top) / rect.height) * SIZE,
      };
    };
    const hit = (pt: { x: number; y: number }) => {
      let best = -1;
      let bestD = 26;
      for (let i = 0; i < n; i++) {
        const d = Math.hypot(pt.x - pos[i].x, pt.y - pos[i].y);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      return best;
    };

    const onMove = (e: PointerEvent) => {
      cursor = toLocal(e);
      hoverIdx = hit(cursor);
      svg.style.cursor = hoverIdx >= 0 ? "pointer" : "default";
    };
    const onLeave = () => {
      cursor = null;
      hoverIdx = -1;
      svg.style.cursor = "default";
    };
    const onClick = (e: PointerEvent) => {
      const idx = hit(toLocal(e));
      if (idx < 0) return;
      const colour = ACCENT_HEX[ACCENT_CYCLE[seq % ACCENT_CYCLE.length]];
      spawnPulse(idx, 300);
      ripples.push({ node: idx, start: performance.now(), colour });
    };
    const onWindowMove = (e: PointerEvent) => {
      parallax.tx = (e.clientX / window.innerWidth - 0.5) * 10;
      parallax.ty = (e.clientY / window.innerHeight - 0.5) * 10;
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0.05 },
    );
    io.observe(svg);

    svg.addEventListener("pointermove", onMove);
    svg.addEventListener("pointerleave", onLeave);
    svg.addEventListener("pointerdown", onClick);
    window.addEventListener("pointermove", onWindowMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      io.disconnect();
      svg.removeEventListener("pointermove", onMove);
      svg.removeEventListener("pointerleave", onLeave);
      svg.removeEventListener("pointerdown", onClick);
      window.removeEventListener("pointermove", onWindowMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label="Diagram of seven agent nodes connected to a central orchestrator"
      className="h-auto w-full touch-none select-none"
    >
      <g ref={worldRef}>
        {NODE_POLAR.map((_, i) => {
          const p = basePos(i, 0);
          return (
            <line
              key={`edge-${i}`}
              ref={(el) => {
                edgeRefs.current[i] = el;
              }}
              x1={C}
              y1={C}
              x2={p.x}
              y2={p.y}
              stroke="#22304A"
              strokeWidth="1"
            />
          );
        })}
        {PAIRS.map(([a, b], k) => {
          const pa = basePos(a, 0);
          const pb = basePos(b, 0);
          return (
            <line
              key={`pair-${k}`}
              ref={(el) => {
                pairRefs.current[k] = el;
              }}
              x1={pa.x}
              y1={pa.y}
              x2={pb.x}
              y2={pb.y}
              stroke="#22304A"
              strokeWidth="1"
            />
          );
        })}

        {Array.from({ length: 4 }).map((_, k) => (
          <circle
            key={`pulse-${k}`}
            ref={(el) => {
              pulseRefs.current[k] = el;
            }}
            r="4"
            opacity="0"
            fill={ACCENT_HEX.mint}
          />
        ))}
        {Array.from({ length: 3 }).map((_, k) => (
          <circle
            key={`ripple-${k}`}
            ref={(el) => {
              rippleRefs.current[k] = el;
            }}
            r="8"
            opacity="0"
            fill="none"
            stroke={ACCENT_HEX.mint}
            strokeWidth="1.5"
          />
        ))}

        <circle
          cx={C}
          cy={C}
          r="26"
          fill={ACCENT_HEX.mint}
          fillOpacity="0.16"
        />
        <circle cx={C} cy={C} r={CENTRE_R} fill={ACCENT_HEX.mint} />

        {NODE_POLAR.map((_, i) => {
          const p = basePos(i, 0);
          return (
            <g
              key={`node-${i}`}
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              transform={`translate(${p.x} ${p.y})`}
            >
              <circle
                ref={(el) => {
                  haloRefs.current[i] = el;
                }}
                r="16"
                fill={ACCENT_HEX.mint}
                fillOpacity="0.14"
              />
              <circle
                ref={(el) => {
                  coreRefs.current[i] = el;
                }}
                r={NODE_R}
                fill={ACCENT_HEX.mint}
              />
              <text
                ref={(el) => {
                  labelRefs.current[i] = el;
                }}
                y="-24"
                textAnchor="middle"
                opacity="0"
                fill="#E6EAF2"
                fontSize="14"
                className="pointer-events-none font-mono"
                style={{ transition: "opacity 150ms" }}
              >
                {labels[i] ?? ""}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
