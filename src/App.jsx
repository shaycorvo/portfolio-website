import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Circle,
  Command,
  Download,
  Github,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Network,
  Orbit,
  ServerCog,
  Sparkles,
  TerminalSquare,
  X,
  Zap,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Work", target: "work" },
  { label: "Experience", target: "experience" },
  { label: "Stack", target: "stack" },
  { label: "Contact", target: "contact" },
];

const METRICS = [
  { value: "80K+", label: "tenants served", color: "lime" },
  { value: "2.8s→120ms", label: "p95 submission latency", color: "coral" },
  { value: "180+", label: "engineers using AI workflow", color: "paper" },
  { value: "6K", label: "daily AI users", color: "lime" },
];

const PROJECTS = [
  {
    id: "01",
    eyebrow: "Distributed reporting platform",
    title: "80K tenants. No request waits for Spark.",
    summary:
      "Decoupled report submission from heavy Spark compute with Kafka, allowing the API to absorb bursty workloads without blocking user requests.",
    impact: "2.8s → 120ms p95",
    detail:
      "Made execution idempotent with hashing and persisted state, then tuned partitioning and Parquet layout for analytical reads. The result: 10K reports per day, 25% lower compute cost, and predictable retries across a multi-tenant platform.",
    stack: ["Kafka", "Spark", "Kubernetes", "Parquet", "Java"],
    icon: Network,
    tone: "lime",
  },
  {
    id: "02",
    eyebrow: "Production GenAI product",
    title: "From user question to governed answer.",
    summary:
      "Built across a Python orchestration layer and React interface for RAG and NL2SQL workflows, combining governed retrieval, tool calling, tenant-aware access, and streamed responses.",
    impact: "TTFT 9s → 3s",
    detail:
      "The Python orchestrator routes requests through retrieval, NL2SQL, and external tools exposed through MCP-style interfaces. SSE carries the one-way token stream into React, while Postgres-backed RBAC isolates tenant data. OpenTelemetry, Jaeger, and Langfuse connect browser waits to service, retrieval, tool, and model spans for 6K daily users.",
    stack: ["Python", "RAG", "NL2SQL", "MCP", "React", "OpenTelemetry"],
    icon: Sparkles,
    tone: "coral",
  },
  {
    id: "03",
    eyebrow: "Agentic engineering platform",
    title: "An AI delivery system teams can inspect.",
    summary:
      "Created a reusable SDLC workflow that takes teams from raw requirements to architecture, OpenSpec changes, implementation, review, and pull request with human approval gates built in.",
    impact: "180+ engineers · 3 teams",
    detail:
      "Designed role-specific agents for requirements, planning, implementation, review, and rework; added deterministic quality and security gates around model-driven work. A companion React telemetry dashboard consumes Copilot hook events to show skill usage, workflow progression, adoption patterns, and friction points, helping teams improve how they use AI rather than merely counting prompts.",
    stack: ["AI agents", "OpenSpec", "MCP", "Copilot hooks", "React", "Telemetry"],
    icon: Orbit,
    tone: "lime",
  },
  {
    id: "04",
    eyebrow: "Independent product experiment",
    title: "Knowledge Vault",
    summary:
      "A deliberately scoped flashcard product built around a ten-minute review loop that continues to work without a network or AI provider.",
    impact: "Offline-first · encrypted sync",
    detail:
      "Kept local review and search independent from the cloud, while adding end-to-end encrypted sync through S3 and Postgres metadata. AI card generation remains optional through Ollama or a bring-your-own key, so the core workflow never depends on a model.",
    stack: ["React", "TypeScript", "Redux", "Node.js", "AWS"],
    icon: Layers3,
    tone: "paper",
  },
];

const EXPERIENCE = [
  {
    period: "AUG 2025 — NOW",
    role: "Software Engineer II",
    company: "Cisco",
    copy:
      "Own the PXP AI assistant and PVI reporting platform across interface, services, data flow, release, and production diagnostics. Shipped the 9s-to-3s streaming experience, the 2.8s-to-120ms reporting path, and an SDLC agent adopted by 180+ engineers across three teams.",
    tags: ["End-to-end ownership", "Distributed systems", "Production GenAI"],
  },
  {
    period: "AUG 2023 — AUG 2025",
    role: "Software Engineer",
    company: "Cisco",
    copy:
      "Re-architected Partner Locator as a React application, added Elasticsearch autocomplete and Redis caching, and reduced data freshness from 24 hours to five minutes. Built 20+ Java APIs supporting 20K partner registrations per day through resilient Kafka integrations.",
    tags: ["React", "Java", "Elasticsearch", "Kafka"],
  },
  {
    period: "JAN 2023 — JUL 2023",
    role: "Software Engineering Intern",
    company: "Cisco",
    copy:
      "Started on Cisco's partner-registration domain and grew into a full-time engineering role, contributing across APIs, persistence, integration workflows, and delivery.",
    tags: ["Java", "REST APIs", "Oracle", "Delivery"],
  },
  {
    period: "2019 — 2023",
    role: "B.Tech, Computer Science",
    company: "Amrita School of Engineering",
    copy:
      "Built the foundations in computer science and graduated with a 9.5/10 CGPA.",
    tags: ["Computer science", "9.5 CGPA"],
  },
];

const STACK_GROUPS = [
  {
    title: "Backend core",
    icon: ServerCog,
    items: ["Java", "Spring Boot", "Python", "FastAPI", "REST APIs"],
  },
  {
    title: "GenAI systems",
    icon: Sparkles,
    items: ["RAG", "NL2SQL", "MCP", "Tool calling", "LangChain"],
  },
  {
    title: "Data & events",
    icon: Network,
    items: ["Kafka", "Spark", "PostgreSQL", "Redis", "Elasticsearch"],
  },
  {
    title: "Product interface",
    icon: Braces,
    items: ["React", "TypeScript", "Redux", "SSE", "Responsive UI"],
  },
  {
    title: "Ship & observe",
    icon: Zap,
    items: ["Kubernetes", "Docker", "AWS", "OpenTelemetry", "Langfuse"],
  },
];

function scrollToSection(target) {
  document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
}

function CommandPalette({ open, onClose }) {
  if (!open) return null;

  const actions = [
    ...NAV_ITEMS.map((item) => ({
      label: `Go to ${item.label}`,
      icon: ChevronRight,
      action: () => scrollToSection(item.target),
    })),
    {
      label: "Open GitHub",
      icon: Github,
      action: () => window.open("https://github.com/shaycorvo", "_blank"),
    },
    {
      label: "Send an email",
      icon: Mail,
      action: () => {
        window.location.href = "mailto:aditysingh8223@gmail.com";
      },
    },
  ];

  return (
    <div className="command-backdrop" onMouseDown={onClose} role="presentation">
      <div
        className="command-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Quick navigation"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="command-input">
          <TerminalSquare size={18} />
          <span>Where to?</span>
          <button type="button" onClick={onClose} aria-label="Close command palette">
            <X size={17} />
          </button>
        </div>
        <div className="command-list">
          {actions.map(({ label, icon: Icon, action }) => (
            <button
              type="button"
              key={label}
              onClick={() => {
                action();
                onClose();
              }}
            >
              <Icon size={17} />
              <span>{label}</span>
              <ArrowDownRight size={15} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Header({ onCommand }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Aditya Singh, home">
        <span className="brand-mark">AS</span>
        <span className="brand-copy">
          ADITYA SINGH
          <small>FULL-STACK + GENAI ENGINEER</small>
        </span>
      </a>

      <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <button
            type="button"
            key={item.target}
            onClick={() => {
              scrollToSection(item.target);
              setMenuOpen(false);
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="header-actions">
        <button className="command-button" type="button" onClick={onCommand} aria-label="Open quick navigation">
          <Command size={16} />
          <span>Navigate</span>
        </button>
        <button
          className="menu-button"
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <main id="top" className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-copy">
        <div className="status-line reveal reveal-1">
          <span className="pulse-dot" />
          Bangalore, India · Cisco · 4+ years
        </div>
        <p className="hero-kicker reveal reveal-2">JAVA + PYTHON / GENAI / REACT</p>
        <h1 className="reveal reveal-3">
          Full-stack range.
          <span>Backend depth.</span>
        </h1>
        <p className="hero-intro reveal reveal-4">
          Full-stack engineer with a backend core, building Java and Python platforms, production GenAI orchestration, and the React interfaces that make them useful. My systems serve 80K+ tenants, 6K daily AI users, and 180+ engineers adopting agentic delivery workflows.
        </p>
        <div className="hero-actions reveal reveal-5">
          <button className="primary-action" type="button" onClick={() => scrollToSection("work")}>
            Enter selected work <ArrowDownRight size={19} />
          </button>
          <a className="text-action" href="/Aditya_Singh_Resume.pdf" download>
            <Download size={17} /> Download resume
          </a>
        </div>
      </div>

      <div className="hero-visual reveal reveal-3">
        <div className="portrait-frame">
          <div className="portrait-label">PROFILE_NODE: SHAYCORVO</div>
          <img src="/aditya.jpg" alt="Aditya Singh's GitHub profile avatar" />
          <div className="scan-line" aria-hidden="true" />
          <span className="corner corner-a" />
          <span className="corner corner-b" />
          <div className="portrait-readout">
            <span>MODE</span>
            <strong>FULL STACK + GENAI</strong>
            <span>FOCUS</span>
            <strong>ORCHESTRATE + SCALE</strong>
          </div>
        </div>
        <div className="floating-chip chip-one">
          <Circle size={8} fill="currentColor" /> SYSTEMS ONLINE
        </div>
        <div className="floating-chip chip-two">CISCO / JAN 2023 — NOW</div>
      </div>

      <div className="hero-index" aria-hidden="true">
        <span>00</span>
        <div />
        <span>06</span>
      </div>
    </main>
  );
}

function Metrics() {
  return (
    <section className="metrics" aria-label="Career impact">
      {METRICS.map((metric) => (
        <article key={metric.label} className={`metric metric-${metric.color}`}>
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
        </article>
      ))}
    </section>
  );
}

function Work() {
  return (
    <section className="section work-section" id="work">
      <div className="section-heading">
        <div>
          <p className="section-label">01 / SELECTED ENGINEERING WORK</p>
          <h2>Decisions. Systems. Outcomes.</h2>
        </div>
        <p>
          Four systems viewed through their backend architecture, AI orchestration, product interface, and measurable production outcome.
        </p>
      </div>

      <div className="project-list">
        {PROJECTS.map((project) => {
          const Icon = project.icon;
          return (
            <article className={`project project-${project.tone}`} key={project.id}>
              <div className="project-number">{project.id}</div>
              <div className="project-icon"><Icon /></div>
              <div className="project-main">
                <p>{project.eyebrow}</p>
                <h3>{project.title}</h3>
                <p className="project-summary">{project.summary}</p>
                <div className="project-stack">
                  {project.stack.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
              <div className="project-outcome">
                <span>OUTCOME</span>
                <strong>{project.impact}</strong>
                <p>{project.detail}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section experience-section" id="experience">
      <div className="section-heading light-heading">
        <div>
          <p className="section-label">02 / EXPERIENCE</p>
          <h2>Own the whole path.</h2>
        </div>
        <p>From requirements and design through release and production operations, I stay with the problem across the full delivery path.</p>
      </div>

      <div className="timeline">
        {EXPERIENCE.map((item, index) => (
          <article className="timeline-row" key={`${item.role}-${item.period}`}>
            <div className="timeline-period">
              <span>{item.period}</span>
              <i className={index === 0 ? "active" : ""} />
            </div>
            <div className="timeline-title">
              <h3>{item.role}</h3>
              <p>{item.company}</p>
            </div>
            <div className="timeline-copy">
              <p>{item.copy}</p>
              <div>
                {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section className="section stack-section" id="stack">
      <div className="stack-intro">
        <p className="section-label">03 / ENGINEERING TOOLKIT</p>
        <h2>Backend first.<br />Product complete.</h2>
        <p>
          Java and Python are my engineering core. I use React to expose those systems as usable products, then instrument the entire path across events, retrieval, tools, models, services, and browser behavior.
        </p>
      </div>
      <div className="stack-grid">
        {STACK_GROUPS.map(({ title, icon: Icon, items }, index) => (
          <article key={title}>
            <div className="stack-card-head">
              <span>0{index + 1}</span>
              <Icon size={23} />
            </div>
            <h3>{title}</h3>
            <ul>
              {items.map((item) => (
                <li key={item}><Check size={14} /> {item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about-section">
      <div className="about-signal" aria-hidden="true">
        <span>BUILD</span><span>MEASURE</span><span>LEARN</span><span>SHIP</span>
      </div>
      <div className="about-content">
        <p className="section-label">04 / HOW I WORK</p>
        <blockquote>
          “Make the difficult system feel simple. Make the production behavior boring.”
        </blockquote>
        <div className="about-copy">
          <p>
            I take on systems where the data is too large, the latency is too high, or AI behavior is too opaque. I clarify the contract, design the backend path, and carry it through orchestration, interface, and production operations.
          </p>
          <p>
            For me, ownership includes implementation, testing, release, observability, production debugging, code review, and stakeholder communication. Shipping is the midpoint; understanding how the system behaves is the rest of the job.
          </p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-grid" aria-hidden="true" />
      <p className="section-label">05 / START A CONVERSATION</p>
      <h2>Let’s build something<br />that has to work.</h2>
      <div className="contact-paths">
        <a href="mailto:aditysingh8223@gmail.com?subject=Engineering%20role%20for%20Aditya">
          Discuss a role <ArrowUpRight />
        </a>
        <a href="mailto:aditysingh8223@gmail.com?subject=Freelance%20project%20for%20Aditya">
          Start a project <ArrowUpRight />
        </a>
      </div>
      <a className="contact-email" href="mailto:aditysingh8223@gmail.com">
        aditysingh8223@gmail.com <ArrowUpRight />
      </a>
      <div className="contact-footer">
        <div className="social-links">
          <a href="https://github.com/shaycorvo" target="_blank" rel="noreferrer"><Github /> GitHub</a>
          <a href="https://www.linkedin.com/in/aditya-singh-511454213/" target="_blank" rel="noreferrer"><Linkedin /> LinkedIn</a>
          <a href="/Aditya_Singh_Resume.pdf" download><BriefcaseBusiness /> Resume</a>
        </div>
        <p>Designed and engineered by Aditya Singh · 2026</p>
      </div>
    </section>
  );
}

function App() {
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((current) => !current);
      }
      if (event.key === "Escape") setCommandOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Header onCommand={() => setCommandOpen(true)} />
      <Hero />
      <Metrics />
      <Work />
      <Experience />
      <Stack />
      <About />
      <Contact />
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
    </>
  );
}

export default App;