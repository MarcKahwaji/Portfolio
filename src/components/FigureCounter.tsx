"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);

export default function FigureCounter({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLParagraphElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    const root = rootRef.current;
    const num = numRef.current;
    const bar = barRef.current;
    if (!root || !num || !bar) return;

    if (reduced) {
      num.textContent = value;
      bar.style.width = "100%";
      return;
    }

    let raf = 0;
    let started = false;
    const run = () => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / 1200, 1);
        const eased = easeOutCubic(p);
        num.textContent =
          p >= 1 ? target + suffix : String(Math.round(target * eased));
        bar.style.width = `${eased * 100}%`;
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduced, target, suffix, value]);

  return (
    <div ref={rootRef}>
      <p
        ref={numRef}
        className="text-gradient-mint-cyan font-display text-5xl font-bold tracking-[-0.02em]"
      >
        0
      </p>
      <div className="mt-2 h-[3px] w-full max-w-[180px] overflow-hidden rounded-full bg-line/60">
        <div
          ref={barRef}
          className="h-full w-0 bg-gradient-to-r from-mint to-cyan"
        />
      </div>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </div>
  );
}
