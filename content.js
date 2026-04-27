// Content data — edit this file to update your website content.

const CONTENT = {
  name: "Winfield Chiew",
  initials: "WC",
  role: "Digital Solutions, Data & AI · Social Services",
  roles: [
    "Technology Lead",
    "Full-Stack Problem Solver",
    "Data & AI Practitioner",
    "Low-Code Architect",
  ],
  tagline: "A curious technologist who loves solving problems — whether it's building dashboards, developing low-code apps, or exploring how AI can make everyday work better.",
  location: "Singapore",
  availability: "Open to collaborations",
  stats: [
    { k: "Years in tech", v: "3+" },
    { k: "Projects shipped", v: "10+" },
    { k: "Lives touched", v: "1" },
  ],

  about: {
    paragraphs: [
      "I work at the intersection of <strong>technology and social impact</strong>, embedded in a nonprofit tech team that handles everything from day-to-day IT support to building the tools that let frontline staff do their best work.",
      "My scope is broad by design. One week I'm troubleshooting a printer queue, the next I'm shipping a case-management dashboard, the week after that I'm prototyping an AI assistant that summarizes client notes. I like it that way — <strong>context is compounding</strong>.",
      "Outside of work I'm usually reading about product teardowns, messing with local LLMs, or on a long walk with a podcast. Always happy to chat tech, nonprofit ops, or career pivots into mission-driven work.",
    ],
    values: [
      { k: "Bias to ship", p: "A working prototype delivered today creates more learning and momentum than a polished solution that arrives next quarter." },
      { k: "Users first", p: "Effective tools are built by understanding the people who will use them before any design decision is made or a line of code is written." },
      { k: "Pragmatic stack", p: "The right technology is the one that solves the problem reliably and can be maintained by the team. Low-code, AI, and custom code each have their place." },
      { k: "Share the knowledge", p: "Documentation, teaching, and open communication multiply the value of every piece of work. Leave things better than you found them." },
    ],
  },

  experience: [
    {
      current: true,
      period: "2025 — Present",
      tag: "Full-time",
      role: "Digital Solutions, Data & AI",
      company: "TOUCH Community Services Limited",
      companyNote: "social services · 500+ staff",
      bullets: [
        "Lead a small tech team covering IT support, internal tools, and data platforms across 5 programme offices.",
        "Shipped a case-management dashboard in Power BI that cut monthly reporting time from 3 days to 20 minutes.",
        "Introduced an internal AI copilot (RAG over SOP documents) now used by 60+ frontline staff weekly.",
      ],
    },
    {
      period: "2023 — 2025",
      tag: "Full-time",
      role: "BI Developer & IT Analyst",
      company: "Synergy House Furniture Berhad",
      companyNote: "Household Goods",
      bullets: [
        "Owned tier-1 and tier-2 IT support for ~150 users; rebuilt onboarding playbook that halved laptop setup time.",
        "Built low-code workflows (Power Automate, Airtable) that replaced 12 standalone spreadsheets.",
        "Partnered with programme leads to define outcome metrics and standardise data collection across teams.",
      ],
    },
    {
      period: "2022 - 2022",
      tag: "Internship",
      role: "Data Analyst Intern",
      company: "StatWorks Group",
      companyNote: "Information Technology & Services",
      bullets: [
        "Full-stack feature delivery on a React + Node.js platform serving mid-market logistics clients.",
        "Wrote the team's first automated test suite, bringing deploy confidence from vibes to 78% coverage.",
      ],
    },

  ],

  education: {
    year: "2020 — 2023",
    degree: "Bachelor (Hons) in Computer Science with specialism in Data Analytics",
    school: "Asia Pacific University",
    extras: [
      { k: "Focus", v: "Data Management · HCI" },
      { k: "Thesis", v: "Adoption of civic tech in community services" },
      { k: "Honors", v: "Dean's List, 3 semesters" },
    ],
  },

  certifications: [
    { name: "Microsoft Certified: Power BI Data Analyst Associate", issuer: "Microsoft", year: "2024" },
    { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: "2023" },
    { name: "Professional Scrum Master I", issuer: "Scrum.org", year: "2023" },
    { name: "Google Cloud Digital Leader", issuer: "Google Cloud", year: "2022" },
    { name: "Microsoft 365 Certified: Endpoint Admin Associate", issuer: "Microsoft", year: "2022" },
    { name: "ITIL 4 Foundation", issuer: "AXELOS", year: "2021" },
  ],

  skills: [
    {
      group: "Tech Support & IT Ops",
      sub: "Keeping humans unblocked and systems boring",
      tags: ["Windows / macOS", "Microsoft 365", "Intune / MDM", "Networking", "Jamf", "Hardware Triage", "Onboarding Automation"],
      primary: ["Windows / macOS", "Microsoft 365"],
    },
    {
      group: "Software Development",
      sub: "From scripts to full-stack apps",
      tags: ["TypeScript", "React", "Node.js", "Python", "REST / GraphQL", "PostgreSQL", "Git", "Docker", "Next.js"],
      primary: ["TypeScript", "React", "Python"],
    },
    {
      group: "Data & AI",
      sub: "Turning scattered data into decisions",
      tags: ["Power BI", "SQL", "Pandas", "dbt", "LangChain", "OpenAI API", "RAG pipelines", "Vector DBs", "Tableau"],
      primary: ["Power BI", "SQL", "LangChain"],
    },
    {
      group: "Project Management",
      sub: "Shipping the right thing at the right time",
      tags: ["Agile / Scrum", "Kanban", "Stakeholder Mgmt", "Roadmapping", "Jira", "Notion", "Figma", "User Research"],
      primary: ["Agile / Scrum", "Stakeholder Mgmt"],
    },
  ],

  projects: [
    {
      name: "Casework Insights Dashboard",
      cat: "Data & AI",
      desc: "Power BI dashboard unifying caseload, outcomes, and capacity data across 5 programme teams. Now the weekly ops review.",
      tech: ["Power BI", "SQL", "dbt", "Azure"],
      links: { demo: "#", github: "#" },
      accent: 320,
    },
    {
      name: "Staff Knowledge Copilot",
      cat: "Data & AI",
      desc: "RAG copilot over internal SOPs and handbooks. Frontline staff ask questions in plain language; answers cite source docs.",
      tech: ["LangChain", "OpenAI", "Pinecone", "Next.js"],
      links: { demo: "#", github: "#" },
      accent: 295,
    },
    {
      name: "Referral Intake Portal",
      cat: "Development",
      desc: "Low-code intake portal replacing a 6-page PDF form. Cut submission time from 25 to 6 minutes with smarter validation.",
      tech: ["Power Apps", "Power Automate", "SharePoint"],
      links: { demo: "#", github: "#" },
      accent: 340,
    },
    {
      name: "Volunteer Match Engine",
      cat: "Development",
      desc: "Matching volunteers to service requests using skill + availability scoring. Weekend side project that shipped to prod.",
      tech: ["Python", "FastAPI", "React", "Postgres"],
      links: { demo: "#", github: "#" },
      accent: 280,
    },
    {
      name: "IT Ops Runbook",
      cat: "IT Support",
      desc: "A living runbook of every recurring IT task — scripts, screenshots, decision trees. Halved new-hire ramp time.",
      tech: ["Notion", "PowerShell", "Bash"],
      links: { demo: "#", github: "#" },
      accent: 305,
    },
    {
      name: "Programme ROI Model",
      cat: "PM",
      desc: "Interactive model for estimating social ROI across intervention types. Used in board decks and funder conversations.",
      tech: ["Excel", "Python", "Streamlit"],
      links: { demo: "#", github: "#" },
      accent: 355,
    },
  ],

  blog: [
    {
      title: "Running a RAG copilot for nonprofit SOPs — what actually worked",
      excerpt: "Most RAG tutorials assume clean docs and a developer audience. Real life: PDFs with scanned signatures and staff who just want an answer. Here's the stack, the dead-ends, and the accuracy numbers after 3 months.",
      tag: "AI",
      date: "Apr 2026",
      read: "12 min",
      accent: 320,
      feature: true,
    },
    {
      title: "Low-code is a superpower, not a shortcut",
      excerpt: "When I reach for Power Apps vs. when I reach for Next.js — a decision framework that's saved me a lot of rebuild pain.",
      tag: "Tools",
      date: "Mar 2026",
      read: "6 min",
      accent: 295,
    },
    {
      title: "The 5-minute laptop setup: my Intune baseline",
      excerpt: "How we cut new-hire laptop setup from 90 minutes of clicking to a script-and-coffee. Configs and gotchas included.",
      tag: "Tech Tips",
      date: "Feb 2026",
      read: "8 min",
      accent: 340,
    },
    {
      title: "Writing dashboards people actually open",
      excerpt: "Three small rituals that changed how our programme team uses data — none of which involved buying new tools.",
      tag: "Guides",
      date: "Jan 2026",
      read: "9 min",
      accent: 280,
    },
  ],

  contact: {
    email: "winfieldchiewf@gmail.com",
    linkedin: "linkedin.com/in/winfield28/",
    github: "github.com/WinfieldChiew",
  },
};

window.CONTENT = CONTENT;
