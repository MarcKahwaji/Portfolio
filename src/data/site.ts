export const site = {
  name: "Marc Kahwaji",
  metaTitle: "Marc Kahwaji, AI developer and full-stack engineer",
  metaDescription:
    "Marc Kahwaji builds multi-agent systems, AI microservices, and full-stack applications. Software developer at HyperCycle, freelance for clients.",
  jobTitle: "AI developer and full-stack engineer",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://TODO",
  email: "kahwajiimark@gmail.com",
  github: "https://github.com/MarcKahwaji",
  linkedin: "none",
  cvPath: "/cv/Marc-Kahwaji-CV.pdf",
  availability: "Available for work",
  nav: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    headline: "I build multi-agent systems and the apps around them.",
    headlineHighlight: "multi-agent systems",
    subline:
      "Software developer at HyperCycle, where I have put 15+ AI services into production. I work in Python, FastAPI, Docker, React, and TypeScript, from first prototype to running system.",
    primaryCta: "See projects",
    secondaryCta: "Download CV",
    status: "Open to full-time, contract, and freelance work. Based in Lebanon.",
    graphCaption: "Agent layout from the research orchestrator project.",
    copied: "Copied",
  },
  about: {
    title: "About",
    paragraphs: [
      "I am a software developer at HyperCycle, where I build AI microservices and multi-agent systems on decentralised infrastructure. On the side I take freelance work for clients who need AI features, a web app, or training for their team.",
      "Most of my recent work is orchestration: systems of six or seven agents that hand work to each other, multi-tenant deployments that serve several organisations from one instance, and platforms with real-time AI support built in. I work across the whole stack, from Python backends and React or React Native frontends to Docker, CI/CD, and deployment.",
      "I am in my final year of a BSc in Management Information Systems at the American University of Science and Technology, graduating in January 2027. My habit on every project is the same: get a working version out early, then improve it with real usage.",
    ],
    figures: [
      { value: "15+", label: "AI services in production" },
      { value: "12+", label: "projects shipped" },
      { value: "8+", label: "websites launched" },
    ],
  },
  projects: {
    title: "Projects",
    intro:
      "Work from HyperCycle, freelance clients, and research. Client work is described without internal detail.",
    ctaText: "Want something like this built?",
    ctaLink: "Send a message.",
  },
  experienceTitle: "Experience",
  skillsTitle: "Skills",
  contact: {
    title: "Contact",
    intro:
      "If you need an AI system built, a web app shipped, or a team trained, send a message. I reply within two working days.",
    fields: {
      name: "Name",
      email: "Email",
      need: "What do you need",
      message: "Message",
    },
    needOptions: [
      "AI system or agent",
      "Web or mobile app",
      "Technical training",
      "Something else",
    ] as const,
    submit: "Send message",
    sending: "Sending",
    success: "Message sent. I will reply within two working days.",
    error:
      "The message did not send. Email me directly at kahwajiimark@gmail.com.",
  },
  footer: {
    left: "Marc Kahwaji, 2026",
    links: [
      { label: "GitHub", kind: "github" },
      { label: "Email", kind: "email" },
      { label: "Download CV", kind: "cv" },
    ] as { label: string; kind: "github" | "email" | "cv" }[],
  },
};
