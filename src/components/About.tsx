import FigureCounter from "@/components/FigureCounter";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";

export default function About() {
  return (
    <section id="about" className="border-t border-line py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal>
          <h2 className="font-display text-[34px] leading-[1.1] font-bold tracking-[-0.02em] text-text md:text-[52px]">
            {site.about.title}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <div className="space-y-6 md:col-span-7">
            {site.about.paragraphs.map((p, i) => (
              <Reveal key={p.slice(0, 24)} delay={i * 0.1}>
                <p className="max-w-[62ch] text-base leading-[1.6] text-muted md:text-[18px]">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
          <div className="space-y-8 md:col-span-4 md:col-start-9 md:pt-7">
            {site.about.figures.map((f, i) => (
              <Reveal key={f.label} delay={0.1 + i * 0.12}>
                <FigureCounter value={f.value} label={f.label} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
