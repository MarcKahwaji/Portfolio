"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  tw: number;
  depth: number;
};

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    const mouse = { x: 0.5, y: 0.5 };
    const offset = { x: 0, y: 0 };
    let raf = 0;
    let running = false;

    const seed = () => {
      const count = w < 768 ? 40 : 80;
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.4,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        tw: Math.random() * Math.PI * 2,
        depth: Math.random() * 0.7 + 0.3,
      }));
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 768 ? 40 : 80;
      if (stars.length !== count) seed();
      if (reduced) draw(0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      offset.x += ((mouse.x - 0.5) * 22 - offset.x) * 0.04;
      offset.y += ((mouse.y - 0.5) * 22 - offset.y) * 0.04;
      ctx.fillStyle = "#e6eaf2";
      for (const s of stars) {
        if (!reduced) {
          s.x += s.vx;
          s.y += s.vy;
          if (s.x < 0) s.x += w;
          if (s.x > w) s.x -= w;
          if (s.y < 0) s.y += h;
          if (s.y > h) s.y -= h;
        }
        const alpha = reduced ? 0.5 : 0.35 + 0.3 * Math.sin(t / 1200 + s.tw);
        ctx.globalAlpha = alpha * s.depth;
        ctx.beginPath();
        ctx.arc(
          s.x + offset.x * s.depth,
          s.y + offset.y * s.depth,
          s.r,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      if (!running) return;
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX / Math.max(w, 1);
      mouse.y = e.clientY / Math.max(h, 1);
    };

    resize();
    start();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="blob blob-a"
        style={{
          top: "-15%",
          left: "-10%",
          width: "55vw",
          height: "55vw",
          background:
            "radial-gradient(circle, rgba(61, 220, 151, 0.13), transparent 70%)",
        }}
      />
      <div
        className="blob blob-b"
        style={{
          top: "30%",
          right: "-15%",
          width: "60vw",
          height: "60vw",
          background:
            "radial-gradient(circle, rgba(167, 139, 250, 0.12), transparent 70%)",
        }}
      />
      <div
        className="blob blob-c"
        style={{
          bottom: "-20%",
          left: "15%",
          width: "50vw",
          height: "50vw",
          background:
            "radial-gradient(circle, rgba(34, 211, 238, 0.11), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #e6eaf2 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
