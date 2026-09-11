"use client";

import { useRef, useState } from "react";
import { Check, Mail } from "lucide-react";
import { motion, useReducedMotion, useSpring } from "motion/react";
import AgentGraph from "@/components/AgentGraph";
import { site } from "@/data/site";
import { projects } from "@/data/projects";

type Word = { text: string; gradient: boolean };

function headlineWords(): Word[] {
  const headline = site.hero.headline;
  const phrase = site.hero.headlineHighlight;
  const idx = headline.indexOf(phrase);
  const parts =
    idx === -1
      ? [{ text: headline, gradient: false }]
      : [
          { text: headline.slice(0, idx), gradient: false },
          { text: phrase, gradient: true },
          { text: headline.slice(idx + phrase.length), gradient: false },
        ];
  return parts.flatMap((part) =>
    part.text
      .split(/\s+/)
      .filter(Boolean)
      .map((text) => ({ text, gradient: part.gradient })),
  );
}

function MagneticCta() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 260, damping: 20 });
  const y = useSpring(0, { stiffness: 260, damping: 20 });

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-8, Math.min(8, dx * 0.2)));
    y.set(Math.max(-6, Math.min(6, dy * 0.3)));
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href="#projects"
      style={reduced ? undefined : { x, y }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="shine rounded-[6px] bg-mint px-6 py-3 text-base font-medium text-ink transition-colors duration-150 hover:bg-mint-deep md:text-[18px]"
    >
      {site.hero.primaryCta}
    </motion.a>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const words = headlineWords();
  const agentLabels = projects[0].pipeline ?? [];

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay },
        };

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-x-clip pt-24 pb-16 md:pt-28">
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-5 md:grid-cols-12 md:px-8">
        <div className="md:col-span-6">
          <motion.p
            {...fade(0)}
            className="font-display text-[32px] leading-tight font-bold tracking-[-0.02em] text-text"
          >
            {site.name}
          </motion.p>
          <motion.p {...fade(0.06)} className="mt-1 text-base text-muted md:text-[18px]">
            {site.jobTitle}
          </motion.p>

          <h1 className="mt-6 font-display text-[clamp(48px,6vw,84px)] leading-[1.08] font-bold tracking-[-0.02em] text-text">
            {words.map((word, i) => (
              <span key={`${word.text}-${i}`}>
                <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
                {reduced ? (
                  <span
                    className={`inline-block ${word.gradient ? "text-gradient-mint-cyan" : ""}`}
                  >
                    {word.text}
                  </span>
                ) : (
                  <motion.span
                    className={`inline-block ${word.gradient ? "text-gradient-mint-cyan" : ""}`}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.12 + i * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {word.text}
                  </motion.span>
                )}
                </span>
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>

          <motion.p
            {...fade(0.5)}
            className="mt-6 max-w-[62ch] text-base leading-[1.6] text-muted md:text-[18px]"
          >
            {site.hero.subline}
          </motion.p>

          <motion.div
            {...fade(0.62)}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticCta />
            <a
              href={site.cvPath}
              download="Marc-Kahwaji-CV.pdf"
              className="rounded-[6px] border border-line px-6 py-3 text-base text-text transition-colors duration-150 hover:border-mint md:text-[18px]"
            >
              {site.hero.secondaryCta}
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-live="polite"
              onClick={(e) => {
                if (e.detail === 0) return;
                e.preventDefault();
                navigator.clipboard?.writeText(site.email).catch(() => {});
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1500);
              }}
              className="inline-flex items-center gap-2 py-2.5 text-base text-mint transition-colors duration-150 hover:text-mint-deep md:py-0 md:text-[18px]"
            >
              {copied ? (
                <Check size={17} aria-hidden />
              ) : (
                <Mail size={17} aria-hidden />
              )}
              {copied ? site.hero.copied : site.email}
            </a>
          </motion.div>

          <motion.p
            {...fade(0.72)}
            className="mt-6 flex items-start gap-2 text-sm text-muted"
          >
            <span
              className="pulse-dot mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-mint"
              aria-hidden
            />
            {site.hero.status}
          </motion.p>
        </div>

        <div className="md:col-span-6">
          <div className="relative mx-auto w-full max-w-[320px] md:max-w-[520px] md:justify-self-end">
            <div
              aria-hidden
              className="absolute top-1/2 left-1/2 h-[640px] w-[640px] max-w-none -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  "radial-gradient(circle, rgba(61, 220, 151, 0.09), transparent 70%)",
              }}
            />
            <div className="relative">
              <AgentGraph labels={agentLabels} />
              <p className="mt-4 font-mono text-[13px] text-muted">
                {site.hero.graphCaption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
