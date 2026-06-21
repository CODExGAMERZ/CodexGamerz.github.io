import { useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Carousel from './components/Carousel';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Footer from './components/Footer';

import useCursorGlow from './hooks/useCursorGlow';
import useIntersectionObserver from './hooks/useIntersectionObserver';
import ThreeBackground from './components/ThreeBackground';
import use3DTilt from './hooks/use3DTilt';

import {
  CodeScopeIcon,
  ScaffoldIcon,
  MindIcon,
  PrismIcon,
  SightIcon,
  ChatbotIcon,
  BrainIcon,
  AdvisorIcon,
  CompilerIcon,
  TerminalIcon,
  VoltIcon,
  CryptoIcon,
  StopwatchIcon,
  NotesIcon,
  MovieIcon,
  QrIcon,
  CpuIcon,
  LayersIcon,
  ZapIcon,
  ReportIcon,
  ShieldIcon
} from './components/Icons';

// SVG components for clean markup
function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12Z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}

function ProjectCard({ project }) {
  const cardRef = use3DTilt(8, 1.02);
  return (
    <div ref={cardRef} className="project-card" data-category={project.category}>
      <div className="project-card__icon">{project.icon}</div>
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__desc">{project.desc}</p>
      <ul className="project-card__features">
        {project.features.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>
      <div className="project-card__tags">
        {project.tags.map((tag, idx) => (
          <span className="tag" key={idx}>{tag}</span>
        ))}
      </div>
      <div className="project-card__links">
        {project.links.map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
            id={link.id}
          >
            {link.isDemo ? <ExternalIcon /> : <GithubIcon />}
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function InterestCard({ interest }) {
  const cardRef = use3DTilt(10, 1.03);
  return (
    <div ref={cardRef} className="interest-card">
      <div className="interest-card__icon">{interest.icon}</div>
      <h3 className="interest-card__title">{interest.title}</h3>
      <p className="interest-card__desc">{interest.desc}</p>
    </div>
  );
}

export default function App() {
  // Cursor glow hooks
  const glowRef = useCursorGlow();

  // Scroll reveal hooks
  useIntersectionObserver();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'devtool', label: 'Developer Tools' },
    { id: 'web', label: 'Web Apps' },
    { id: 'cli', label: 'CLI & Utilities' }
  ];

  const projects = [
    {
      icon: <CodeScopeIcon />,
      title: "LogicScope",
      category: "devtool",
      desc: "A real-time DSA & OOP visualizer extension for VS Code that automatically generates control flows, UML diagrams, and recursion trees as you type.",
      features: [
        "Real-time visualization canvas rendering Mermaid.js flowcharts, UML class hierarchies, and recursion execution trees",
        "Offline-first, secure local parsing architecture powered by WebAssembly-based Tree-sitter compilers",
        "Configurable update modes (Auto/Manual/Snapshot) and Bring-Your-Own-Key (BYOK) AI explanation layer"
      ],
      tags: ["VS Code Extension", "TypeScript", "WebAssembly", "Tree-sitter", "Mermaid.js"],
      links: [
        { label: "Source Code", href: "https://github.com/CODExGAMERZ/LogicScope", id: "link-logicscope" },
        { label: "Live Demo", href: "https://logicscope.vercel.app/", id: "link-logicscope-demo", isDemo: true }
      ]
    },
    {
      icon: <ReportIcon />,
      title: "LinguistReport",
      category: "devtool",
      desc: "A unified NLP text analysis tool and Python suite that performs advanced comparative linguistic profiling and compiles publication-quality Microsoft Word (.docx) reports from structured Excel data.",
      features: [
        "Extracts detailed language metrics: stylometric richness (lexical diversity), readability indices (Flesch, Gunning Fog), VADER sentiment polarity, and affective emotions (NRCLex)",
        "Generates professional executive Word reports featuring KPI callout panels, custom styled tables, layout rules, and automated page number pagination",
        "Renders dynamic comparative matplotlib visualizations including side-by-side emotion graphs, readability grades, and horizontal variable distributions"
      ],
      tags: ["Python", "NLP", "Pandas", "Matplotlib", "python-docx", "NLTK", "Data Analysis"],
      links: [
        { label: "Source Code", href: "https://github.com/CODExGAMERZ/LinguistReport", id: "link-linguist-report" }
      ]
    },
    {
      icon: <ScaffoldIcon />,
      title: "scaffold-agent-skill",
      category: "cli",
      desc: "An interactive, multi-platform CLI scaffolding tool to generate AI agent skills, plugins, and production-ready server stubs from a single specification.",
      features: [
        "Generates fully structured code for Claude Code, OpenAI Custom GPTs, OpenClaw, and Google ADK (Gemini) simultaneously",
        "Built-in security guards: path traversal checks, safe string escaping, and casing converters to prevent syntax/compiler errors",
        "Comprehensive input validation, ID collision resolution, overwrite protection, and automated smoke test suites"
      ],
      tags: ["Node.js", "CLI", "Claude Code", "OpenAI", "Gemini", "Security"],
      links: [
        { label: "Source Code", href: "https://github.com/CODExGAMERZ/create-agent-skill", id: "link-scaffoldagentskill" }
      ]
    },
    {
      icon: <BrainIcon />,
      title: "DataMind AI",
      category: "ai",
      desc: "A secure, client-first Android platform for AI research paper summaries, smart dataset profiling, automated EDA, and coding assistant tools.",
      features: [
        "Direct integration with the Google Generative AI SDK (Gemini API) featuring secure BYOG key storage and client-side privacy",
        "Comprehensive research summarization (EL12, MCQ generation), auto-EDA visualizations, and mock interview helpers",
        "Modern Jetpack Compose architecture with local SharedPreferences caching and Supabase integration for stats tracking"
      ],
      tags: ["Android", "Kotlin", "Jetpack Compose", "Gemini API", "Supabase", "EDA", "Material 3"],
      links: [
        { label: "Source Code", href: "https://github.com/CODExGAMERZ/DataMind-ai", id: "link-datamindai" }
      ]
    },
    {
      icon: <ShieldIcon />,
      title: "SentinelRAG",
      category: "ai",
      desc: "A high-performance, privacy-first local hybrid RAG engine that turns your local files and Obsidian Markdown Vaults into a private, highly-contextualized query engine.",
      features: [
        "Local ingestion pipeline parsing Wikilinks, structural headers, and metadata, backed by debounced real-time Watchdog watchers",
        "Hybrid retrieval fusing local Qdrant vector similarity with SQLite document-level eigenvector centrality via Reciprocal Rank Fusion (RRF)",
        "Hardware-adaptive LangGraph agent workflows orchestrating query planning, grounding verification, and cited synthesis via local Ollama inference"
      ],
      tags: ["Python", "LangGraph", "Qdrant", "Ollama", "CLI", "SQLite", "Local First"],
      links: [
        { label: "Source Code", href: "https://github.com/CODExGAMERZ/SentinelRAG", id: "link-sentinelrag" }
      ]
    },
    {
      icon: <PrismIcon />,
      title: "DataPrism",
      category: "devtool",
      desc: "A local-first VS Code extension for instant dataset exploration, profiling, and data quality analysis for CSV and JSON files — 100% offline.",
      features: [
        "Tabbed interface: sortable preview grid, correlation heatmaps, data quality grading, and column-level statistical insights",
        "TypeScript math engine: descriptive statistics, IQR outlier profiling, type consistency audits, and a 0-100 cleanliness score",
        "Zero-configuration local parsing with UTF-8/Latin-1 CSV support and automatic nested JSON flattening"
      ],
      tags: ["VS Code Extension", "TypeScript", "React", "Vite", "EDA", "Statistics"],
      links: [
        { label: "Source Code", href: "https://github.com/CODExGAMERZ/DataPrism", id: "link-dataprism" },
        { label: "Live Demo", href: "https://dataprismext.vercel.app/", id: "link-dataprism-demo", isDemo: true }
      ]
    },
    {
      icon: <SightIcon />,
      title: "ModelSight",
      category: "devtool",
      desc: "A local-first VS Code extension serving as a real-time machine learning training monitor and interactive runtime error explainer.",
      features: [
        "Real-time telemetry plots for loss, accuracy, and system metrics (RAM/GPU)",
        "Instant offline error analysis decoding training crashes into checklists",
        "Zero-config integration for PyTorch, Keras, and Jupyter Notebooks"
      ],
      tags: ["VS Code Extension", "Python", "JavaScript", "HTML5/CSS3", "Telemetry"],
      links: [
        { label: "Source Code", href: "https://github.com/CODExGAMERZ/Model-Sight", id: "link-modelsight" },
        { label: "Live Demo", href: "https://modelsight.vercel.app/", id: "link-modelsight-demo", isDemo: true }
      ]
    },
    {
      icon: <ChatbotIcon />,
      title: "Hybrid AI Chatbot",
      category: "ai",
      desc: "A production-oriented AI assistant with semantic memory, self-learning pipeline, and custom LLM teacher fallback.",
      features: [
        "FAISS Semantic Memory → Local KB → Intent Classifier → LLM Fallback",
        "Self-improving loop: clusters inputs, generates, retrains locally",
        "Hybrid architecture minimizing external API costs"
      ],
      tags: ["Python", "TensorFlow", "FAISS", "NLP", "ML"],
      links: [
        { label: "Source Code", href: "https://github.com/CODExGAMERZ/chatbot-ai", id: "link-chatbot" }
      ]
    },
    {
      icon: <MindIcon />,
      title: "Code Autocomplete LLM",
      category: "ai",
      desc: "A GPT-style autoregressive Transformer trained from scratch for multilingual code autocompletion (Python, C, Java) with GPU support.",
      features: [
        "Expanded support for Python, C, and Java codebases (~38.7M training tokens)",
        "True GPT Decoder with causal self-attention, KV-cache, and GPU acceleration",
        "Google Colab / Kaggle integration and VS Code extension embedding architecture"
      ],
      tags: ["PyTorch", "Transformers", "GPU Acceleration", "Multilingual", "Deep Learning"],
      links: [
        { label: "Source Code", href: "https://github.com/CODExGAMERZ/Code-AutoComplete-LLM", id: "link-autocomplete" }
      ]
    },
    {
      icon: <AdvisorIcon />,
      title: "llm-advisor.dev",
      category: "web",
      desc: "A precision advisor for running LLMs on local consumer rigs, workstations, servers, and Apple Silicon.",
      features: [
        "Dynamic VRAM breakdown: Weights vs. KV Cache vs. Overhead",
        "Multi-mode: Model→Specs, Specs→Model, Custom Model",
        "Apple Silicon unified memory with command guides"
      ],
      tags: ["JavaScript", "ESM", "Math Estimation", "Web Design"],
      links: [
        { label: "Source Code", href: "https://github.com/CODExGAMERZ/llm-advisor", id: "link-llmadvisor-repo" },
        { label: "Live Demo", href: "https://llm-advisor-ai.vercel.app/", id: "link-llmadvisor-demo", isDemo: true }
      ]
    },
    {
      icon: <CompilerIcon />,
      title: "C-Code-Assistant",
      category: "devtool",
      desc: "Fully local, AI-powered C programming IDE with code completions, linting, error fixing, and execution.",
      features: [
        "In-browser runners with GCC sub-process execution",
        "Live gutter-marker linting via cppcheck/gcc",
        "Quality-Retry Gate: LLM self-corrects if validations fail"
      ],
      tags: ["Python", "Flask", "JavaScript", "Ollama", "GCC"],
      links: [
        { label: "Source Code", href: "https://github.com/CODExGAMERZ/C-Code-Assistant", id: "link-c-assistant" }
      ]
    },
    {
      icon: <TerminalIcon />,
      title: "Python-Code-Assistant",
      category: "devtool",
      desc: "Fully local, AI-powered Python IDE with code completions, linting, error fixing, and execution.",
      features: [
        "In-browser Python sub-process execution",
        "Live gutter-marker linting via flake8/py_compile",
        "Same-Origin Flask proxy for Ollama traffic"
      ],
      tags: ["Python", "Flask", "JavaScript", "Ollama", "flake8"],
      links: [
        { label: "Source Code", href: "https://github.com/CODExGAMERZ/Python-Code-Assistant", id: "link-py-assistant" }
      ]
    },
    {
      icon: <VoltIcon />,
      title: "VoltC",
      category: "devtool",
      desc: "A native desktop C/C++ IDE for Ubuntu Linux, showcased via an interactive web simulator landing page.",
      features: [
        "Main Product: Native Ubuntu desktop app built on FastAPI, Monaco Editor, and PyWebView shell",
        "Showcase Site: Landing page featuring a mockup and interactive online IDE simulator for users",
        "VoltC v2: AI Debug Assistant, built-in Git panel, clangd LSP, persistent PTY terminal, and memory diagrams"
      ],
      tags: ["FastAPI", "Monaco", "Python", "C/C++", "Git", "LSP", "PyWebView"],
      links: [
        { label: "Source Code", href: "https://github.com/CODExGAMERZ/VoltC", id: "link-voltc-repo" },
        { label: "Live Demo", href: "https://volt-c.vercel.app/", id: "link-voltc-demo", isDemo: true }
      ]
    },
    {
      icon: <CryptoIcon />,
      title: "Kryptonix",
      category: "web",
      desc: "A premium dark-first obsidian glassmorphism crypto dashboard with dual-level caching and resilient fallbacks.",
      features: [
        "Live markets portal with exchange tracking & growth categories",
        "Double caching with 5-minute localStorage protection",
        "TradingView interactive charting widgets"
      ],
      tags: ["JavaScript", "Chart.js", "TradingView", "REST APIs"],
      links: [
        { label: "Source Code", href: "https://github.com/CODExGAMERZ/crypto-website", id: "link-kryptonix-repo" },
        { label: "Live Demo", href: "https://kryptonix-tv.vercel.app/", id: "link-kryptonix-demo", isDemo: true }
      ]
    },
    {
      icon: <StopwatchIcon />,
      title: "FocusFlow",
      category: "web",
      desc: "A lightweight task stopwatch and analytics app optimized for fluid micro-animations and zero state loss.",
      features: [
        "Per-task independent concurrent stopwatches",
        "Focus analytics with today's time & all-time records",
        "Safe tick persistence via instant localStorage writes"
      ],
      tags: ["JavaScript", "Performance", "UI Engineering", "LocalStorage"],
      links: [
        { label: "Source Code", href: "https://github.com/CODExGAMERZ/focusflow", id: "link-focusflow-repo" },
        { label: "Live Demo", href: "https://focusflow-tv.vercel.app/", id: "link-focusflow-demo", isDemo: true }
      ]
    },
    {
      icon: <NotesIcon />,
      title: "WebNotes",
      category: "web",
      desc: "A premium, interactive web client for organizing, reading, and studying programming guides and notes.",
      features: [
        "3-card rotating carousel with scale/opacity effects",
        "Markdown import with auto-theme from 24 language configs",
        "Print-ready PDF export with custom CSS stylesheets"
      ],
      tags: ["JavaScript", "Marked.js", "Highlight.js", "Html2pdf"],
      links: [
        { label: "Source Code", href: "https://github.com/CODExGAMERZ/WebNotes", id: "link-webnotes-repo" },
        { label: "Live Demo", href: "https://webynotes.netlify.app/", id: "link-webnotes-demo", isDemo: true }
      ]
    },
    {
      icon: <MovieIcon />,
      title: "CineFinder",
      category: "web",
      desc: "A modern glassmorphic movie discovery engine with film statistics, cast lineups, ratings, and box office data.",
      features: [
        "OMDb API key checker wizard with UI helpers",
        "Skeleton loaders preserving layout dimensions",
        "Responsive flex/CSS grid layout"
      ],
      tags: ["JavaScript", "OMDb API", "Glassmorphism", "HTML5"],
      links: [
        { label: "Source Code", href: "https://github.com/CODExGAMERZ/Movie", id: "link-cinefinder" }
      ]
    },
    {
      icon: <QrIcon />,
      title: "QR Code Generator CLI",
      category: "cli",
      desc: "An interactive CLI utility to customize, generate, and preview QR codes with wizard setup and automation flags.",
      features: [
        "Showcase Site: Landing page featuring a mockup and interactive online IDE simulator for users",
        "High-fidelity ASCII QR preview in terminal",
        "Silent generation with automation script flags"
      ],
      tags: ["Python", "qrcode", "Pillow", "CLI Design"],
      links: [
        { label: "Source Code", href: "https://github.com/CODExGAMERZ/QrCODE-GENRATOR", id: "link-qr" }
      ]
    }
  ];

  const interests = [
    {
      icon: <CpuIcon />,
      title: "AI & Machine Learning",
      desc: "Neural networks, classification, and intelligent automation"
    },
    {
      icon: <BrainIcon />,
      title: "Deep Learning & Transformers",
      desc: "Attention mechanisms, GPT architectures, and training from scratch"
    },
    {
      icon: <LayersIcon />,
      title: "Hybrid AI Systems",
      desc: "Combining traditional ML, vector DBs, and LLMs for robust pipelines"
    },
    {
      icon: <ZapIcon />,
      title: "Local AI & Inference Optimization",
      desc: "Running models on consumer hardware with minimal latency"
    },
    {
      icon: <CompilerIcon />,
      title: "Developer Tooling & Static Analysis",
      desc: "Linting integrations, code assistants, and compiler toolchains"
    },
    {
      icon: <CodeScopeIcon />,
      title: "Performance-First Web Engineering",
      desc: "Caching, resilient UIs, and zero-dependency architectures"
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* 3D WebGL Cosmic Background */}
      <ThreeBackground />

      {/* Cursor glow */}
      <div className="cursor-glow" id="cursorGlow" ref={glowRef}></div>

      {/* Background Effects */}
      <div className="bg-grid"></div>
      <div className="bg-glow bg-glow--purple"></div>
      <div className="bg-glow bg-glow--teal"></div>
      <div className="bg-glow bg-glow--pink"></div>

      {/* Navigation */}
      <Navbar />

      {/* Hero */}
      <Hero projects={projects} />

      {/* About */}
      <About projects={projects} />

      {/* Projects Carousel Section */}
      <section id="projects">
        <div className="container">
          <div className="projects-header">
            <span className="section-label reveal reveal--blur-in">// Featured Work</span>
            <h2 className="section-title reveal reveal--blur-in reveal-delay-1">Projects &amp; Builds</h2>
            <p className="section-subtitle reveal reveal--blur-in reveal-delay-2">
              From custom-trained LLMs to glassmorphic dashboards — each project solves a real problem.
            </p>
          </div>

          <div className="projects-filter-bar reveal reveal--blur-in reveal-delay-3">
            <div className="search-box-wrapper">
              <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
              </svg>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search by name, tags, description..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')} aria-label="Clear Search">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <div className="category-tags-wrapper">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`category-tag-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {filteredProjects.length > 0 ? (
            <Carousel autoplayMs={5000} ariaLabel="Featured Projects">
              {filteredProjects.map((project, idx) => (
                <ProjectCard project={project} key={idx} />
              ))}
            </Carousel>
          ) : (
            <div className="no-results-card reveal reveal--scale-up">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <h3>No projects found</h3>
              <p>No builds match your search "{searchQuery}" or category filter.</p>
              <button className="btn btn--ghost btn--small" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Tech Stack */}
      <TechStack />

      {/* Interests Section */}
      <section id="interests">
        <div className="container">
          <div className="interests-header">
            <span className="section-label reveal reveal--blur-in">// Interests</span>
            <h2 className="section-title reveal reveal--blur-in reveal-delay-1">Research Areas</h2>
            <p className="section-subtitle reveal reveal--blur-in reveal-delay-2">
              Topics I'm passionate about exploring and building with.
            </p>
          </div>

          <Carousel autoplayMs={4000} ariaLabel="Research Interests">
            {interests.map((interest, idx) => (
              <InterestCard interest={interest} key={idx} />
            ))}
          </Carousel>
        </div>
      </section>

      {/* GitHub Activity Metrics */}
      <section id="github-metrics" className="metrics-section reveal reveal--scale-up">
        <div className="container">
          <div className="metrics-header">
            <span className="section-label reveal reveal--blur-in">// GitHub Metrics</span>
            <h2 className="section-title reveal reveal--blur-in reveal-delay-1">Open Source Activity</h2>
          </div>
          
          <div className="metrics-grid reveal reveal--scale-up reveal-delay-2">
            <img src="https://github-readme-stats.vercel.app/api?username=CODExGAMERZ&show_icons=true&theme=calm&hide_border=true&bg_color=09090b&title_color=6366f1&icon_color=6366f1&text_color=a1a1aa&cache_seconds=1800" alt="Aryan's GitHub Stats" className="metric-card" />
            <img src="https://github-readme-streak-stats.herokuapp.com/?user=CODExGAMERZ&theme=dark&hide_border=true&background=09090b&ring=6366f1&fire=10b981&currStreakNum=f4f4f5&sideNums=a1a1aa&sideLabels=a1a1aa&dates=a1a1aa&cache_seconds=1800" alt="Aryan's Streak Stats" className="metric-card" />
          </div>
        </div>
      </section>

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </>
  );
}
