export type ExperienceEntry = {
  title: string;
  dates: string;
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    title: "Software developer, HyperCycle",
    dates: "May 2025 to present",
    bullets: [
      "Designed, built, and deployed 15+ production AI microservices (AIMs) with Python, FastAPI, and Docker on HyperCycle's decentralised infrastructure.",
      "Built an internal AI tool that moved from pilot to daily production use and is now part of the core workflow of roughly 80 percent of company staff.",
      "Architected multi-agent systems of six to seven coordinated agents (LangGraph, LangChain, CrewAI, Groq) and multi-tenant deployments serving several organisations with isolated data and custom configuration.",
      "Implemented CI/CD pipelines (GitHub Actions and Aimifier) for automated deployment to Ubuntu nodes and hardened reliability across all services.",
    ],
  },
  {
    title: "Freelance AI and software developer",
    dates: "April 2025 to present",
    bullets: [
      "Contract developer on Quoz, a B2B art programme management platform: approval workflows, design versioning, and automated PDF generation.",
      "Built full-stack websites (React, Tailwind CSS, Node.js) with integrated AI backends and real-time chat.",
      "Scoped and delivered CRM integrations, WhatsApp automation bots, AI-powered telephony systems, and machine learning solutions for dataset analysis and predictive modelling.",
      "Designed and delivered technical training on LLMs, multi-agent systems, prompt engineering, and Python to learners from complete beginners to working developers.",
    ],
  },
  {
    title:
      "BSc in Management Information Systems, American University of Science and Technology (AUST)",
    dates: "2021 to January 2027, expected",
    bullets: [
      "Relevant coursework: AI and information systems, database management, software engineering, statistics.",
      "Capstone: multi-agent research system, seven orchestrated agents with a real-time monitoring dashboard (LangGraph, Groq, FastAPI, Docker).",
    ],
  },
];
