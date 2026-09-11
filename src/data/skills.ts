export type SkillRow = {
  group: string;
  tools: string[];
};

export const skills: SkillRow[] = [
  {
    group: "AI and machine learning",
    tools: [
      "LangGraph",
      "LangChain",
      "CrewAI",
      "multi-agent orchestration",
      "RAG",
      "prompt engineering",
      "OpenAI",
      "Groq",
      "Ollama",
      "FAISS",
      "NLP",
      "computer vision",
      "predictive modelling",
    ],
  },
  {
    group: "Languages",
    tools: ["Python", "TypeScript", "JavaScript", "C++", "Java", "Bash"],
  },
  {
    group: "Backend",
    tools: [
      "FastAPI",
      "Node.js",
      "tRPC",
      "Hono",
      "Bun",
      "REST APIs",
      "WebSockets",
      "webhooks",
    ],
  },
  {
    group: "Frontend and mobile",
    tools: ["React", "Next.js", "React Native", "Expo", "Tailwind CSS"],
  },
  {
    group: "Data and infrastructure",
    tools: [
      "PostgreSQL",
      "Supabase",
      "SQLite",
      "Docker",
      "GitHub Actions",
      "AWS EC2",
      "Linux",
      "Nginx",
      "Vercel",
      "Prometheus",
    ],
  },
  {
    group: "Integrations",
    tools: [
      "Stripe",
      "WhatsApp Business API (Twilio)",
      "n8n",
      "Zapier",
      "SMTP",
    ],
  },
  {
    group: "Languages spoken",
    tools: [
      "Arabic (native)",
      "English (fluent, IELTS C1)",
      "French (fluent)",
      "German (B1)",
    ],
  },
];
