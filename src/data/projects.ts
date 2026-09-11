export type Project = {
  title: string;
  type: string;
  description: string;
  stack: string[];
  featured: boolean;
  pipeline?: string[];
  repo?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    title: "Multi-agent research orchestrator",
    type: "Multi-agent system",
    featured: true,
    pipeline: [
      "Plan",
      "Search",
      "Retrieve",
      "Summarise",
      "Synthesise",
      "Critique",
      "Report",
    ],
    description:
      "A seven-agent pipeline that researches any topic and writes a cited report. A dashboard streams each agent's progress over SSE, with Prometheus metrics behind it.",
    stack: [
      "Python",
      "LangGraph",
      "Groq",
      "FastAPI",
      "Next.js",
      "Docker",
      "SSE",
      "Prometheus",
    ],
    repo: "https://github.com/markcoffee121-HSCL/multi-agent-research-orchestrator",
  },
  {
    title: "Crypto trading multi-agent system",
    type: "Multi-agent system",
    featured: true,
    pipeline: ["Market data", "News sentiment", "Signals", "Charts", "Summary"],
    description:
      "Five agents split the work of market analysis: price retrieval, news sentiment, trading signals with confidence scores, Plotly charts, and an executive summary. The web UI shows each agent as it runs.",
    stack: [
      "Python",
      "FastAPI",
      "pyhypercycle_aim",
      "Groq",
      "Docker",
      "Flask",
      "Plotly",
      "CoinGecko API",
      "NewsAPI",
    ],
    repo: "https://github.com/markcoffee121-HSCL/Crypto-Trading-Multi-Agent",
  },
  {
    title: "E-commerce customer support AIM",
    type: "Multi-tenant AI service",
    featured: false,
    description:
      "Support agent with hybrid keyword and LLM routing across 26 FAQ categories, above 80 percent routing accuracy. Each tenant gets its own policies, responses, and sessions.",
    stack: ["Python", "FastAPI", "pyhypercycle_aim", "Docker"],
  },
  {
    title: "Quoz",
    type: "Client platform, contract work",
    featured: false,
    description:
      "A B2B platform for managing bespoke art programmes for large commercial clients. I work on the application layer: approval workflows, design versioning, and automated PDF lookbooks.",
    stack: ["React", "TypeScript", "Supabase", "Cloudflare"],
  },
  {
    title: "AI-based asset classification for ISMS",
    type: "Machine learning",
    featured: false,
    description:
      "Supervised model that classifies people and devices from log data (CERT r4.2), benchmarked against a rule-based baseline and mapped to ISO/IEC 27001 controls. Random Forest reached 97 percent accuracy against a 92 percent baseline.",
    stack: ["Python", "Random Forest", "ANN", "SVM"],
  },
  {
    title: "Dynamic AI-based Android malware detection",
    type: "Systematic review",
    featured: false,
    description:
      "PRISMA-based review of 42 studies, screened from 1,724 papers, on runtime malware detection for Android: analysis techniques, models, datasets, adversarial robustness, and reproducibility.",
    stack: ["PRISMA 2020", "literature synthesis"],
  },
];
