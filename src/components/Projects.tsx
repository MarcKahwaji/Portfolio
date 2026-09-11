import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import PipelineDiagram from "@/components/PipelineDiagram";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { site } from "@/data/site";
import { projects, type Project } from "@/data/projects";
import { ACCENT_HEX, typeAccent } from "@/lib/colors";

function isUrl(value?: string): value is string {
  return typeof value === "string" && value.startsWith("http");
}

function CardLinks({ project }: { project: Project }) {
  const hasRepo = isUrl(project.repo);
  const hasLive = isUrl(project.live);
  if (!hasRepo && !hasLive) return null;
  return (
    <div className="mt-4 flex items-center gap-5">
      {hasRepo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-mint transition-colors duration-150 hover:text-mint-deep"
        >
          <GithubIcon size={14} aria-hidden />
          Code
        </a>
      )}
      {hasLive && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-mint transition-colors duration-150 hover:text-mint-deep"
        >
          <ExternalLink size={14} aria-hidden />
          Live
        </a>
      )}
    </div>
  );
}

function CardBody({ project, accent }: { project: Project; accent: string }) {
  return (
    <>
      <h3 className="font-display text-[20px] font-medium tracking-[-0.02em] text-text md:text-[22px]">
        {project.title}
      </h3>
      <p className="mt-1 text-base" style={{ color: accent }}>
        {project.type}
      </p>
      {project.pipeline && (
        <div className="mt-5">
          <PipelineDiagram pipeline={project.pipeline} accent={accent} />
        </div>
      )}
      <p className="mt-4 text-base leading-[1.6] text-text md:text-[18px]">
        {project.description}
      </p>
      <p className="mt-4 text-sm text-muted">{project.stack.join(", ")}</p>
      <CardLinks project={project} />
    </>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const compact = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="border-t border-line py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal>
          <h2 className="font-display text-[34px] leading-[1.1] font-bold tracking-[-0.02em] text-text md:text-[52px]">
            {site.projects.title}
          </h2>
          <p className="mt-4 max-w-[62ch] text-base leading-[1.6] text-muted md:text-[18px]">
            {site.projects.intro}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {featured.map((project, i) => {
            const accent = ACCENT_HEX[typeAccent(project.type)];
            return (
              <Reveal key={project.title} delay={i * 0.1} className="h-full">
                <TiltCard accent={accent} featured>
                  <CardBody project={project} accent={accent} />
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {compact.map((project, i) => {
            const accent = ACCENT_HEX[typeAccent(project.type)];
            return (
              <Reveal key={project.title} delay={i * 0.08} className="h-full">
                <TiltCard accent={accent}>
                  <CardBody project={project} accent={accent} />
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
