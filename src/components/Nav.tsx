"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/data/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = site.nav.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-150 ${
        scrolled || open
          ? "border-b border-line bg-ink/90 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 md:px-8">
        <a
          href="#"
          className="group inline-flex items-center gap-2.5 py-1.5 font-display text-2xl font-bold tracking-[-0.02em] text-text"
        >
          <span className="relative">
            <span className="transition-opacity duration-[250ms] group-hover:opacity-0">
              {site.name}
            </span>
            <span
              aria-hidden
              className="absolute inset-0 flex items-center font-sans text-[15px] font-medium whitespace-nowrap text-mint opacity-0 transition-opacity duration-[250ms] group-hover:opacity-100"
            >
              {site.availability}
            </span>
          </span>
          <span
            aria-hidden
            className="pulse-dot h-2 w-2 shrink-0 rounded-full bg-mint"
          />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {site.nav.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-sm transition-colors duration-150 hover:text-text ${
                  isActive ? "text-text" : "text-muted"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 400, damping: 34 }
                    }
                    className="absolute right-0 -bottom-1.5 left-0 h-[2px] rounded-full bg-mint"
                  />
                )}
              </a>
            );
          })}
          <a
            href={site.cvPath}
            download="Marc-Kahwaji-CV.pdf"
            className="rounded-[6px] border border-line px-3.5 py-1.5 text-sm text-text transition-colors duration-150 hover:border-mint"
          >
            {site.hero.secondaryCta}
          </a>
        </nav>

        <button
          type="button"
          className="-m-[11px] p-[11px] text-text md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
        </button>
      </div>

    </header>

    {open && (
      <div
        className="fixed inset-0 z-[90] flex flex-col bg-ink md:hidden"
        style={{
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
          <span className="font-display text-2xl font-bold tracking-[-0.02em] text-text">
            {site.name}
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="-m-[11px] p-[11px] text-text"
          >
            <X size={22} aria-hidden />
          </button>
        </div>
        <nav
          aria-label="Mobile"
          className="flex min-h-0 flex-1 flex-col items-center justify-center gap-1 overflow-y-auto px-5"
        >
          {site.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex min-h-[48px] items-center font-display text-[26px] font-medium text-text transition-colors duration-150 hover:text-mint"
            >
              {link.label}
            </a>
          ))}
          <a
            href={site.cvPath}
            download="Marc-Kahwaji-CV.pdf"
            onClick={() => setOpen(false)}
            className="mt-4 flex min-h-[48px] items-center rounded-[6px] border border-line px-6 text-lg text-text transition-colors duration-150 hover:border-mint"
          >
            {site.hero.secondaryCta}
          </a>
        </nav>
      </div>
    )}
    </>
  );
}
