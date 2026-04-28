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
    { k: "Domains Covered", v: "5" },
  ],

  about: {
    paragraphs: [
      "I work at the intersection of <strong>technology and social impact</strong>, embedded in a nonprofit tech team that handles everything from day-to-day IT support to building the tools that let frontline staff do their best work.",
      "My role is wonderfully varied. One week I'm building Power BI dashboards, the next I'm developing low-code apps using OutSystems and Power Apps or working on AI solutions. I like being a mixture of <strong>builder, problem solver, and knowledge sharer</strong>, it keeps me learning and lets me have impact in different ways.",
      "I believe good technology should feel invisible, it just works, helps people do their jobs better and doesn't get in the way. Always happy to chat tech, nonprofit ops, or career pivots into mission-driven work.",
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
        "Develop and maintain business applications using OutSystems, Power Apps, and custom code to streamline operations across organisation.",
        "Build interactive Power BI dashboards and reports that unify data across programmes, improving visibility and decision-making for leadership and frontline staff.",
      ],
    },
    {
      period: "2023 — 2025",
      tag: "Full-time",
      role: "BI Developer & IT Analyst",
      company: "Synergy House Furniture Berhad",
      companyNote: "Household Goods",
      bullets: [
        "Increase reporting efficiency by 25% and accelerated decision-making speed.",
        "Boosted Power BI adoption by 50% through custom metrics and stakeholder training.",
        "Developed automated ETL pipelines integrating multiple data sources.",
        "Streamlined operations through Wrike Project Management Automation.",
        "Reduced downtime through fast technical support and system optimization.",
      ],
    },
    {
      period: "2022 - 2022",
      tag: "Internship",
      role: "Data Analyst Intern",
      company: "StatWorks Group",
      companyNote: "Information Technology & Services",
      bullets: [
        "Enhance organizational decision-making through Power BI dashboards and competitive market intelligence.",
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
    { name: "Associate Developer (ODC)", issuer: "OutSystems", year: "2025" },
    { name: "Google Project Management: Specialization", issuer: "Google", year: "2025" },
    { name: "Programming with JavaScript", issuer: "Meta", year: "2024" },
    { name: "SAS - Asia Pacific Univeristy of Technology and Innovation Joint Certificate in Computer Science and Data Analytics", issuer: "SAS", year: "2023" },
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
