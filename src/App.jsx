import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Icon } from '@iconify/react';
import use3DTilt from './hooks/use3DTilt';
import useIntersectionObserver from './hooks/useIntersectionObserver';

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
  ShieldIcon,
  KeyCodeIcon,
  JarvisIcon
} from './components/Icons';

// ===== SUB-COMPONENTS =====

function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Create particles
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 20000));
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edge
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(185, 28, 28, ${p.alpha})`; // maroon/red particles
        ctx.fill();
      });

      // Constellation lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(185, 28, 28, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

function TypingText({ words }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 35 : 100;

    if (!isDeleting && displayText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayText === '') {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }, 100);
    } else {
      timer = setTimeout(() => {
        setDisplayText((prev) => 
          isDeleting 
            ? prev.slice(0, -1) 
            : currentWord.slice(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex, words]);

  return <span>{displayText}</span>;
}

function CountUp({ to }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(to, 10);
    if (isNaN(end) || end <= 0) return;
    
    const duration = 1200; // ms
    const incrementTime = Math.max(Math.floor(duration / end), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (duration / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [to]);

  return <span>{count}</span>;
}

function ProjectCard({ project }) {
  const cardRef = use3DTilt(6, 1.01);
  return (
    <div 
      ref={cardRef}
      className="card-glow relative rounded-xl border border-white/5 bg-[#0A0A0A] p-6 md:p-8 flex flex-col justify-between tilt-card group transition-all duration-300 hover:border-brand-red/30 min-h-[360px]"
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg border border-white/10 flex items-center justify-center bg-brand-maroon/30 text-brand-red group-hover:border-brand-red group-hover:text-white transition-all duration-300 flex-shrink-0">
              {project.icon || <Icon icon="mdi:folder-code-outline" className="text-2xl" />}
            </div>
            <h3 className="text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-brand-red transition-colors">{project.title}</h3>
          </div>
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 bg-white/5 px-2.5 py-1 rounded border border-white/5 flex-shrink-0">
            {project.category}
          </span>
        </div>
        <p className="text-sm text-neutral-300 leading-relaxed font-light mb-5">
          {project.desc}
        </p>
        {project.features && (
          <ul className="text-xs md:text-sm text-neutral-400 space-y-1.5 mb-6 list-disc pl-5 font-light">
            {project.features.map((feat, i) => (
              <li key={i}>{feat}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag, i) => (
            <span key={i} className="text-xs font-mono text-neutral-400 bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
          {project.links.map((link, i) => (
            <a 
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold tracking-wider uppercase flex items-center gap-2 transition-colors text-neutral-400 hover:text-white"
            >
              <Icon icon={link.isDemo ? "mdi:open-in-new" : "mdi:github"} className="text-base" />
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function InterestCard({ interest }) {
  const cardRef = use3DTilt(6, 1.01);
  return (
    <div 
      ref={cardRef}
      className="card-glow relative rounded-xl border border-white/5 bg-[#0A0A0A] p-6 md:p-8 flex flex-col justify-between tilt-card group transition-all duration-300 hover:border-brand-red/30 min-h-[160px]"
    >
      <div className="flex items-start gap-4 md:gap-5">
        <div className="w-12 h-12 rounded-lg border border-white/10 flex items-center justify-center bg-brand-maroon/30 text-brand-red group-hover:border-brand-red group-hover:text-white transition-all duration-300 flex-shrink-0">
          {interest.icon}
        </div>
        <div>
          <h3 className="text-base md:text-lg font-bold text-white group-hover:text-brand-red transition-colors mb-2">{interest.title}</h3>
          <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-light">{interest.desc}</p>
        </div>
      </div>
    </div>
  );
}

// Fallback Contribution Grid (Generated once outside render for purity)
const fallbackContributionGrid = (() => {
  const grid = [];
  for (let w = 0; w < 53; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const rand = Math.random();
      let level = 0;
      if (rand > 0.88) level = 4;
      else if (rand > 0.74) level = 3;
      else if (rand > 0.55) level = 2;
      else if (rand > 0.35) level = 1;
      week.push({
        level,
        isPlaceholder: false,
        date: '',
        count: level ? Math.floor(Math.random() * 5) + 1 : 0
      });
    }
    grid.push(week);
  }
  return grid;
})();

// ===== MAIN COMPONENT =====

export default function App() {
  // Trigger Intersection Observer for reveals
  useIntersectionObserver();

  // Navigation states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [isScrolled, setIsScrolled] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isExpanded, setIsExpanded] = useState(false);

  // Collapse projects grid when filters change
  useEffect(() => {
    const t = setTimeout(() => setIsExpanded(false), 0);
    return () => clearTimeout(t);
  }, [searchQuery, selectedCategory]);

  // Copy Handle State
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState('Copied!');
  const [copyFeedback, setCopyFeedback] = useState('Click to copy');

  const [contributionGrid, setContributionGrid] = useState(fallbackContributionGrid);

  // Fallback default activities
  const defaultActivities = useMemo(() => [
    { type: "push", icon: "mdi:source-commit", color: "#22c55e", title: "Pushed commits to", repo: "LogicScope", branch: "main", time: "2h ago" },
    { type: "star", icon: "mdi:star-outline", color: "#eab308", title: "Starred", repo: "google/jax", branch: "", time: "5h ago" },
    { type: "fork", icon: "mdi:source-fork", color: "#8b5cf6", title: "Forked", repo: "pytorch/pytorch", branch: "", time: "1d ago" },
    { type: "push", icon: "mdi:source-commit", color: "#22c55e", title: "Pushed commits to", repo: "SentinelRAG", branch: "dev", time: "2d ago" },
    { type: "repo", icon: "mdi:plus-circle-outline", color: "#3b82f6", title: "Created repository", repo: "scaffold-agent-skill", branch: "", time: "3d ago" },
  ], []);

  const [activities, setActivities] = useState(defaultActivities);

  // Live GitHub Metrics State
  const [gitStats, setGitStats] = useState({ repos: 24, followers: 4, following: 3 });

  // Fetch GitHub User Info
  useEffect(() => {
    fetch('https://api.github.com/users/CODExGAMERZ')
      .then(res => res.json())
      .then(data => {
        if (data && data.public_repos !== undefined) {
          setGitStats({
            repos: data.public_repos,
            followers: data.followers,
            following: data.following
          });
        }
      })
      .catch(err => console.error("Error fetching stats:", err));
  }, []);

  // Fetch Contribution Graph with Date-Aware Padding
  useEffect(() => {
    fetch('https://github-contributions-api.deno.dev/CODExGAMERZ.json')
      .then(res => res.json())
      .then(data => {
        if (data && data.contributions) {
          const processedGrid = data.contributions.map(week => {
            if (week.length === 0) return Array(7).fill({ isPlaceholder: true });

            // Calculate start day of week for this week timezone-independently
            const [year, month, day] = week[0].date.split('-').map(Number);
            const startDayOfWeek = new Date(Date.UTC(year, month - 1, day)).getUTCDay();

            const paddedWeek = [];
            for (let i = 0; i < 7; i++) {
              if (i < startDayOfWeek) {
                paddedWeek.push({ isPlaceholder: true });
              } else if (i < startDayOfWeek + week.length) {
                const dayData = week[i - startDayOfWeek];
                const levelsMap = {
                  'FIRST_QUARTILE': 1,
                  'SECOND_QUARTILE': 2,
                  'THIRD_QUARTILE': 3,
                  'FOURTH_QUARTILE': 4
                };
                const level = levelsMap[dayData.contributionLevel] || 0;
                paddedWeek.push({
                  level,
                  date: dayData.date,
                  count: dayData.contributionCount,
                  isPlaceholder: false
                });
              } else {
                paddedWeek.push({ isPlaceholder: true });
              }
            }
            return paddedWeek;
          });

          if (processedGrid.length > 53) {
            setContributionGrid(processedGrid.slice(-53));
          } else {
            setContributionGrid(processedGrid);
          }
        }
      })
      .catch(err => console.error("Error fetching contributions:", err));
  }, []);

  // Fetch and Parse Latest Activities
  useEffect(() => {
    const parseGitHubEvents = (eventsList) => {
      const parsed = [];
      const formatTime = (isoString) => {
        const date = new Date(isoString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) {
          return `${diffMins || 1}m ago`;
        } else if (diffHours < 24) {
          return `${diffHours}h ago`;
        } else if (diffDays === 1) {
          return `yesterday`;
        } else {
          return `${diffDays}d ago`;
        }
      };

      const getShortRepoName = (fullName) => {
        return fullName.replace(/^CODExGAMERZ\//, '');
      };

      eventsList.forEach(e => {
        if (parsed.length >= 6) return;

        let item = null;
        const timeStr = formatTime(e.created_at);
        const repoName = getShortRepoName(e.repo.name);

        if (e.type === 'PushEvent') {
          const commitCount = e.payload?.commits?.length || 1;
          const commitText = commitCount === 1 ? 'commit' : 'commits';
          const branch = e.payload?.ref?.replace('refs/heads/', '') || 'main';
          item = {
            type: "push",
            icon: "mdi:source-commit",
            color: "#22c55e",
            title: `Pushed ${commitCount} ${commitText} to`,
            repo: repoName,
            branch: branch,
            time: timeStr
          };
        } else if (e.type === 'WatchEvent' && e.payload?.action === 'started') {
          item = {
            type: "star",
            icon: "mdi:star-outline",
            color: "#eab308",
            title: "Starred",
            repo: repoName,
            branch: "",
            time: timeStr
          };
        } else if (e.type === 'ForkEvent') {
          item = {
            type: "fork",
            icon: "mdi:source-fork",
            color: "#8b5cf6",
            title: "Forked",
            repo: repoName,
            branch: "",
            time: timeStr
          };
        } else if (e.type === 'CreateEvent') {
          const refType = e.payload?.ref_type;
          if (refType === 'repository') {
            item = {
              type: "repo",
              icon: "mdi:plus-circle-outline",
              color: "#3b82f6",
              title: "Created repository",
              repo: repoName,
              branch: "",
              time: timeStr
            };
          } else if (refType === 'branch') {
            const branchName = e.payload?.ref;
            item = {
              type: "branch",
              icon: "mdi:source-branch",
              color: "#06b6d4",
              title: `Created branch ${branchName} in`,
              repo: repoName,
              branch: "",
              time: timeStr
            };
          }
        } else if (e.type === 'PullRequestEvent') {
          const action = e.payload?.action || 'opened';
          item = {
            type: "pr",
            icon: "mdi:source-pull",
            color: "#ec4899",
            title: `${action.charAt(0).toUpperCase() + action.slice(1)} PR in`,
            repo: repoName,
            branch: "",
            time: timeStr
          };
        }
        
        if (item) {
          parsed.push(item);
        }
      });

      return parsed;
    };

    fetch('https://api.github.com/users/CODExGAMERZ/events')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const parsed = parseGitHubEvents(data);
          if (parsed.length > 0) {
            setActivities(parsed);
          }
        }
      })
      .catch(err => console.error("Error fetching events:", err));
  }, []);

  // Active section scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);

      const sections = ['about', 'projects', 'tech', 'interests', 'contact'];
      let currentSection = '';
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            currentSection = sectionId;
            break;
          }
        }
      }
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial run

    return () => window.removeEventListener('scroll', handleScroll);
  }, [setIsScrolled, setActiveSection]);

  const handleCopyUsername = () => {
    navigator.clipboard.writeText('CODExGAMERZ')
      .then(() => {
        setCopyFeedback('Copied!');
        setToastMsg('Handle copied to clipboard!');
        setToastVisible(true);
        setTimeout(() => {
          setCopyFeedback('Click to copy');
          setToastVisible(false);
        }, 2500);
      })
      .catch(() => {
        setCopyFeedback('Failed to copy');
      });
  };

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'devtool', label: 'Developer Tools' },
    { id: 'web', label: 'Web Apps' },
    { id: 'cli', label: 'CLI & Utilities' }
  ];

  const projects = useMemo(() => [
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
      icon: <BrainIcon />,
      title: "B.Tech-AI-Tutor-7B",
      category: "ai",
      desc: "A fine-tuned, specialized LLM built on top of Qwen-2.5-7B-Instruct, designed as an academic study tutor for Computer Science & Engineering (AI & ML) students. Optimized for local GGUF running.",
      features: [
        "Specialized 5-layer training dataset comprising ~480K instruction-tuning samples and 15K custom preference alignment pairs",
        "Configured multi-phase pipeline executing supervised fine-tuning (SFT) and Direct Preference Optimization (DPO) via Unsloth",
        "Resource-optimized GGUF quantization allowing high-performance local inference on 4GB VRAM consumer laptops via Ollama"
      ],
      tags: ["PyTorch", "Qwen-2.5", "Unsloth", "DPO / SFT", "HuggingFace", "GGUF", "Ollama", "Fine-Tuning"],
      links: [
        { label: "Source Code", href: "https://github.com/CODExGAMERZ/B.Tech-AI-Tutor-7B", id: "link-btech-ai-tutor" }
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
      icon: <JarvisIcon />,
      title: "JarvisRAG",
      category: "ai",
      desc: "A local-first Retrieval-Augmented Generation application featuring a FastAPI backend that ingests documents into a FAISS vector store and synthesizes grounded answers with Gemini.",
      features: [
        "Inline RAG Console (/command.html) displaying a listening core orb that toggles into a holographic terminal with MathJax LaTeX and Marked.js rendering",
        "Retrieval Stream Dashboard (/stream.html) to monitor real-time RAG operations, search the index, and analyze source chunks with cosine similarity telemetry",
        "Knowledge Base Manager (/knowledge.html) supporting drag-and-drop file ingestion, document raw content preview, and background database sync"
      ],
      tags: ["FastAPI", "FAISS", "Gemini API", "Tailwind CSS", "Python", "Local Embeddings"],
      links: [
        { label: "Source Code", href: "https://github.com/CODExGAMERZ/JarvisRAG", id: "link-jarvisrag" }
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
      icon: <KeyCodeIcon />,
      title: "KeyCode",
      category: "devtool",
      desc: "A custom high-performance fork of VS Code (Code - OSS) built for Windows with an integrated local AI autocomplete extension.",
      features: [
        "Built-in KeyCode Ollama Autocomplete extension for zero-config offline inline completions",
        "Intelligent Fill-in-the-Middle (FIM) prompt generation supporting Qwen and DeepSeek models",
        "Custom status bar controls, quick-pick model selection, debounced requests, and local telemetry channels"
      ],
      tags: ["TypeScript", "Node.js", "Electron", "VS Code Fork", "Ollama", "Local AI"],
      links: [
        { label: "Source Code", href: "https://github.com/CODExGAMERZ/KeyCode", id: "link-keycode" }
      ]
    },
    {
      icon: <VoltIcon />,
      title: "VoltC",
      category: "devtool",
      desc: "A native desktop C/C++ IDE for Ubuntu Linux built to optimize the local compile-and-debug lifecycle.",
      features: [
        "Main Product: Native Ubuntu desktop app built on FastAPI, Monaco Editor, and PyWebView shell",
        "VoltC v2: AI Debug Assistant, built-in Git panel, clangd LSP, persistent PTY terminal, and memory diagrams",
        "Zero-configuration local compilation gates and custom sub-process process management"
      ],
      tags: ["FastAPI", "Monaco", "Python", "C/C++", "Git", "LSP", "PyWebView"],
      links: [
        { label: "Source Code", href: "https://github.com/CODExGAMERZ/VoltC", id: "link-voltc-repo" }
      ]
    },
    {
      icon: <VoltIcon />,
      title: "VoltC Showcase Website",
      category: "web",
      desc: "A premium obsidian glassmorphic landing page featuring an interactive web simulator for the VoltC IDE.",
      features: [
        "Interactive online Monaco IDE simulator allowing users to write, compile, and run C code in-browser",
        "High-fidelity mockup animations, layout break-downs, and custom CSS neon glow effects",
        "Automated deployment workflows powered by GitHub Actions and Vercel hosting"
      ],
      tags: ["HTML5/CSS3", "JavaScript", "Monaco Editor", "Vercel", "Web Design"],
      links: [
        { label: "Source Code", href: "https://github.com/CODExGAMERZ/VoltC-Website", id: "link-voltc-web-repo" },
        { label: "Live Demo", href: "https://volt-c.vercel.app/", id: "link-voltc-web-demo", isDemo: true }
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
  ], []);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            project.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [projects, searchQuery, selectedCategory]);

  const visibleProjects = useMemo(() => {
    return isExpanded ? filteredProjects : filteredProjects.slice(0, 3);
  }, [filteredProjects, isExpanded]);

  // Interests Data
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

  // Dynamic Portfolio stats calculations (matching original About.jsx)
  const portfolioStats = useMemo(() => {
    const liveDemosCount = projects.filter(p => p.links?.some(l => l.isDemo)).length;
    const aiMlSystemsCount = projects.filter(p => 
      p.category === 'ai' || 
      p.tags?.some(t => 
        ['ai', 'ml', 'nlp', 'learning', 'transformer', 'ollama', 'gemini', 'claude', 'openai'].some(k => t.toLowerCase().includes(k))
      ) ||
      p.desc?.toLowerCase().includes('ai') || 
      p.desc?.toLowerCase().includes('llm') || 
      p.desc?.toLowerCase().includes('machine learning')
    ).length;

    return {
      totalBuilt: projects.length,
      aiMlSystems: aiMlSystemsCount,
      liveDemos: liveDemosCount
    };
  }, [projects]);

  // Tech stack categories (matching original TechStack.jsx)
  const techCategories = [
    {
      title: 'Languages',
      pills: ['Python', 'TypeScript', 'JavaScript (ES6+)', 'Kotlin', 'C', 'HTML5', 'CSS3']
    },
    {
      title: 'AI / Deep Learning',
      pills: ['PyTorch', 'TensorFlow / Keras', 'FAISS', 'Sentence Transformers', 'NLP', 'Ollama', 'Tokenizers']
    },
    {
      title: 'Tools & Infra',
      pills: [
        'Git', 'Node.js', 'WebAssembly', 'Tree-sitter', 'Android', 'Jetpack Compose', 'Supabase',
        'React', 'Vite', 'GitHub Pages', 'Flask', 'FastAPI', 'PyWebView', 'WebSockets', 'MinGW / GCC',
        'cppcheck', 'flake8', 'REST APIs'
      ]
    }
  ];

  const profileCardRef = use3DTilt(5, 1.01);

  return (
    <div className="font-inter relative min-h-screen text-white select-none">
      
      {/* Dynamic particles in background */}
      <ParticlesBackground />

      {/* Navigation */}
      <nav className={`navbar fixed top-0 left-0 right-0 z-50 nav-glass border-b border-white/5 transition-all duration-300 ${isScrolled ? 'py-3 bg-brand-dark/95' : 'py-4'}`}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group" onClick={() => setMobileMenuOpen(false)}>
            <div className="w-9 h-9 rounded-lg border border-white/10 group-hover:border-brand-red flex items-center justify-center transition-all duration-300 bg-brand-maroon/30">
              <span className="text-brand-red text-sm font-mono font-bold">&lt;/&gt;</span>
            </div>
            <span className="text-base font-bold tracking-tight uppercase text-white">Aryan.</span>
          </a>
          <div className="hidden md:flex items-center gap-10">
            <a href="#about" className={`text-xs font-semibold tracking-widest uppercase transition-colors ${activeSection === 'about' ? 'text-brand-red' : 'text-neutral-400 hover:text-brand-red'}`}>About</a>
            <a href="#projects" className={`text-xs font-semibold tracking-widest uppercase transition-colors ${activeSection === 'projects' ? 'text-brand-red' : 'text-neutral-400 hover:text-brand-red'}`}>Projects</a>
            <a href="#tech" className={`text-xs font-semibold tracking-widest uppercase transition-colors ${activeSection === 'tech' ? 'text-brand-red' : 'text-neutral-400 hover:text-brand-red'}`}>Tech Stack</a>
            <a href="#interests" className={`text-xs font-semibold tracking-widest uppercase transition-colors ${activeSection === 'interests' ? 'text-brand-red' : 'text-neutral-400 hover:text-brand-red'}`}>Interests</a>
            <a href="#contact" className={`text-xs font-semibold tracking-widest uppercase transition-colors ${activeSection === 'contact' ? 'text-brand-red' : 'text-neutral-400 hover:text-brand-red'}`}>Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://github.com/CODExGAMERZ" target="_blank" rel="noopener noreferrer" className="px-5 py-2 bg-white text-black text-xs font-bold tracking-tight uppercase rounded hover:scale-105 transition-transform duration-150 flex items-center gap-2">
              <Icon icon="mdi:github" className="text-base" />
              GitHub
            </a>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg border border-white/5 bg-white/[0.02]"
              aria-label="Toggle Navigation Menu"
            >
              <span className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`}></span>
              <span className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-0' : ''}`}></span>
              <span className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`}></span>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'max-h-80 opacity-100 border-t border-white/5' : 'max-h-0 opacity-0'}`}>
          <div className="px-6 py-6 flex flex-col gap-5 bg-brand-dark/95">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium tracking-widest uppercase text-neutral-300 hover:text-brand-red transition-colors">About</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium tracking-widest uppercase text-neutral-300 hover:text-brand-red transition-colors">Projects</a>
            <a href="#tech" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium tracking-widest uppercase text-neutral-300 hover:text-brand-red transition-colors">Tech Stack</a>
            <a href="#interests" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium tracking-widest uppercase text-neutral-300 hover:text-brand-red transition-colors">Interests</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium tracking-widest uppercase text-neutral-300 hover:text-brand-red transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30"></div>
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-red/5 rounded-full blur-[150px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-brand-maroon/40 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

        {/* Decorative spinning rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/[0.02] rounded-full animate-spin-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-white/[0.015] rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '12s' }}></div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full py-12">
          <div className="flex flex-col lg:flex-row items-center gap-16 xl:gap-24">
            
            {/* Left Column: Text & Stats */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] mb-8 reveal">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs font-mono tracking-wider text-neutral-300 font-semibold">Open to opportunities</span>
              </div>

              <h1 className="text-6xl md:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.9] mb-6 reveal">
                Hey, I'm <span className="gradient-text">Aryan</span>
              </h1>

              {/* Typing subtitle */}
              <div className="h-10 mb-8 reveal">
                <span className="text-lg md:text-2xl font-semibold text-neutral-300 font-mono">
                  <TypingText words={["AI Engineer", "ML Developer", "Software Builder"]} />
                </span>
                <span className="terminal-cursor h-6 w-2"></span>
              </div>

              <p className="text-base md:text-lg text-neutral-300 font-light leading-relaxed max-w-xl mb-10 mx-auto lg:mx-0 reveal">
                I build <strong>AI systems, developer tools, and performance-focused software</strong> designed for real-world usage — not just prototypes. From custom-trained LLMs to compiler-integrated IDEs.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-5 justify-center lg:justify-start reveal">
                <a href="#projects" className="px-8 py-3.5 bg-brand-maroon text-white text-xs font-bold tracking-wider uppercase rounded hover:scale-105 transition-all duration-150 flex items-center gap-2.5 border border-brand-red/30 hover:border-brand-red/60 hover:shadow-[0_0_30px_rgba(185,28,28,0.4)] cursor-pointer">
                  View Projects
                  <Icon icon="mdi:arrow-right" className="text-sm" />
                </a>
                <a href="https://github.com/CODExGAMERZ" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 bg-transparent text-white text-xs font-bold tracking-wider uppercase rounded border border-white/10 hover:border-white/30 hover:scale-105 transition-all duration-150 flex items-center gap-2.5 cursor-pointer">
                  <Icon icon="mdi:github" className="text-sm" />
                  GitHub Profile
                </a>
              </div>

              {/* GitHub user stats */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-12 mt-12 justify-center lg:justify-start reveal">
                <div>
                  <div className="text-3xl md:text-5xl font-black tracking-tighter text-white">
                    <CountUp to={gitStats.repos} />
                  </div>
                  <div className="text-xs font-mono tracking-wider text-neutral-400 uppercase mt-1">Repositories</div>
                </div>
                <div className="hidden sm:block w-px h-12 bg-white/10"></div>
                <div>
                  <div className="text-3xl md:text-5xl font-black tracking-tighter text-white">
                    <CountUp to={gitStats.followers} />
                  </div>
                  <div className="text-xs font-mono tracking-wider text-neutral-400 uppercase mt-1">Followers</div>
                </div>
                <div className="hidden sm:block w-px h-12 bg-white/10"></div>
                <div>
                  <div className="text-3xl md:text-5xl font-black tracking-tighter text-white">
                    <CountUp to={gitStats.following} />
                  </div>
                  <div className="text-xs font-mono tracking-wider text-neutral-400 uppercase mt-1">Following</div>
                </div>
              </div>
            </div>

            {/* Right Column: Profile Card */}
            <div className="reveal w-full max-w-sm lg:w-80 lg:max-w-none">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-red/20 rounded-3xl blur-[60px] animate-pulse-slow"></div>
                <div 
                  ref={profileCardRef}
                  className="relative w-full h-[460px] rounded-2xl border border-white/10 bg-[#0A0A0A] overflow-hidden group tilt-card"
                >
                  {/* Scan line effect */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-brand-red/15 to-transparent" style={{ animation: 'scan 2.5s linear infinite' }}></div>
                  </div>
                  {/* Avatar section */}
                  <div className="h-56 bg-gradient-to-b from-brand-maroon/40 to-[#0A0A0A] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 dot-pattern opacity-20"></div>
                    <div className="w-36 h-36 rounded-full border-2 border-white/10 overflow-hidden relative pulse-ring">
                      <img 
                        src="https://github.com/CODExGAMERZ.png" 
                        alt="CODExGAMERZ" 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }} 
                      />
                      <div className="w-full h-full bg-brand-maroon/60 items-center justify-center hidden">
                        <Icon icon="mdi:account" className="text-4xl text-brand-red" />
                      </div>
                    </div>
                  </div>
                  {/* Info section */}
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold tracking-tight text-white">Aryan</h3>
                    <p className="text-xs font-mono text-neutral-500 mt-1">@CODExGAMERZ</p>
                    <div className="flex items-center justify-center gap-2.5 mt-4 text-xs text-neutral-300">
                      <Icon icon="mdi:map-marker-outline" className="text-brand-red text-base" />
                      <span>India</span>
                    </div>
                    <div className="flex items-center justify-center gap-2.5 mt-2.5 text-xs text-neutral-300">
                      <Icon icon="mdi:calendar-outline" className="text-brand-red text-base" />
                      <span>Joined 2023</span>
                    </div>
                    {/* Social links */}
                    <div className="flex items-center justify-center gap-4 mt-6">
                      <a href="https://github.com/CODExGAMERZ" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center hover:border-brand-red hover:bg-brand-maroon/30 transition-all duration-300">
                        <Icon icon="mdi:github" className="text-neutral-400 hover:text-white text-xl" />
                      </a>
                      <a href="https://www.instagram.com/aryannotsinha" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center hover:border-brand-red hover:bg-brand-maroon/30 transition-all duration-300">
                        <Icon icon="mdi:instagram" className="text-neutral-400 hover:text-white text-xl" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 reveal">
          <span className="text-[10px] font-mono tracking-widest text-neutral-600 uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-brand-red rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Marquee Tech Strip */}
      <div className="relative py-5 border-y border-white/5 overflow-hidden bg-[#030303]">
        <div className="flex animate-marquee whitespace-nowrap">
          {[1, 2].map((loop) => (
            <React.Fragment key={loop}>
              <span className="mx-10 text-xs font-mono tracking-widest text-neutral-500 uppercase flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-brand-red/60"></span>JavaScript
              </span>
              <span className="mx-10 text-xs font-mono tracking-widest text-neutral-500 uppercase flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-yellow-500/60"></span>Python
              </span>
              <span className="mx-10 text-xs font-mono tracking-widest text-neutral-500 uppercase flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-500/60"></span>TypeScript
              </span>
              <span className="mx-10 text-xs font-mono tracking-widest text-neutral-500 uppercase flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-orange-500/60"></span>HTML/CSS
              </span>
              <span className="mx-10 text-xs font-mono tracking-widest text-neutral-500 uppercase flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-green-500/60"></span>Node.js
              </span>
              <span className="mx-10 text-xs font-mono tracking-widest text-neutral-500 uppercase flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-cyan-500/60"></span>React
              </span>
              <span className="mx-10 text-xs font-mono tracking-widest text-neutral-500 uppercase flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-purple-500/60"></span>Game Dev
              </span>
              <span className="mx-10 text-xs font-mono tracking-widest text-neutral-500 uppercase flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-pink-500/60"></span>APIs
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="relative py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="reveal flex flex-col lg:flex-row gap-16 xl:gap-24 items-center">
            
            {/* Left: Terminal Window */}
            <div className="flex-1 w-full">
              <div className="rounded-xl border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-2xl shadow-black/50">
                <div className="flex items-center gap-2 px-4 py-3.5 bg-[#080808] border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span className="ml-3 text-[10px] font-mono text-neutral-600">developer.js</span>
                </div>
                <div className="p-6 font-mono text-xs sm:text-sm md:text-base leading-relaxed break-words whitespace-pre-wrap">
                  <p className="text-green-400">$ cat profile.js</p>
                  <p className="text-neutral-400 mt-3">const <span className="text-blue-400">developer</span> = &#123;</p>
                  <p className="text-neutral-400 ml-4">name: <span className="text-yellow-300">"Aryan"</span>,</p>
                  <p className="text-neutral-400 ml-4">handle: <span className="text-yellow-300">"CODExGAMERZ"</span>,</p>
                  <p className="text-neutral-400 ml-4">role: <span className="text-yellow-300">"AI Engineer & Software Builder"</span>,</p>
                  <p className="text-neutral-400 ml-4">location: <span className="text-yellow-300">"India"</span>,</p>
                  <p className="text-neutral-400 ml-4">languages: [<span className="text-yellow-300">"Python"</span>, <span className="text-yellow-300">"JS/TS"</span>, <span className="text-yellow-300">"C"</span>, <span className="text-yellow-300">"Kotlin"</span>],</p>
                  <p className="text-neutral-400 ml-4">funFact: <span className="text-yellow-300">"Code + Games = Life"</span></p>
                  <p className="text-neutral-400">&#125;;</p>
                  <p className="text-green-400 mt-3">$ <span className="terminal-cursor h-4 w-1.5"></span></p>
                </div>
              </div>
            </div>

            {/* Right: Description & Dynamic Stats */}
            <div className="flex-1">
              <div className="text-[10px] font-mono tracking-widest text-brand-red uppercase mb-3">// About Me</div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase mb-6 text-white leading-tight">
                Crafting Intelligent <br /><span className="gradient-text">Systems</span>
              </h2>
              <p className="text-base md:text-lg text-neutral-300 font-light leading-relaxed mb-6">
                I enjoy exploring how modern systems work internally — from <strong>Transformers and semantic retrieval</strong> to <strong>compilers, hybrid AI, and developer automation tools</strong>.
              </p>
              <p className="text-base md:text-lg text-neutral-300 font-light leading-relaxed mb-8">
                My work focuses on combining Machine Learning &amp; Deep Learning with practical software engineering, building systems that are efficient, understandable, and genuinely useful.
              </p>
              
              {/* Dynamic stats cards based on actual projects data */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-lg border border-white/5 bg-white/[0.02] hover:border-brand-red/30 transition-all duration-300 text-center">
                  <div className="text-3xl md:text-4xl font-black text-brand-red"><CountUp to={portfolioStats.totalBuilt} />+</div>
                  <div className="text-[10px] text-neutral-500 mt-2 uppercase tracking-wider font-mono">Projects Built</div>
                </div>
                <div className="p-5 rounded-lg border border-white/5 bg-white/[0.02] hover:border-brand-red/30 transition-all duration-300 text-center">
                  <div className="text-3xl md:text-4xl font-black text-brand-red"><CountUp to={portfolioStats.aiMlSystems} />+</div>
                  <div className="text-[10px] text-neutral-500 mt-2 uppercase tracking-wider font-mono">AI / ML Systems</div>
                </div>
                <div className="p-5 rounded-lg border border-white/5 bg-white/[0.02] hover:border-brand-red/30 transition-all duration-300 text-center">
                  <div className="text-3xl md:text-4xl font-black text-brand-red"><CountUp to={portfolioStats.liveDemos} />+</div>
                  <div className="text-[10px] text-neutral-500 mt-2 uppercase tracking-wider font-mono">Live Demos</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="relative py-24 md:py-32">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          
          <div className="reveal text-center mb-16">
            <div className="text-[10px] font-mono tracking-widest text-brand-red uppercase mb-3">// Featured Work</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase text-white leading-tight">
              Projects &amp; <span className="gradient-text">Builds</span>
            </h2>
            <p className="text-base text-neutral-400 max-w-lg mx-auto mt-3 font-light">
              From custom-trained LLMs to glassmorphic dashboards — each project solves a real problem.
            </p>
          </div>

          {/* Search and Category Filters */}
          <div className="reveal flex flex-col md:flex-row items-center justify-between gap-6 mb-12 max-w-[1360px] mx-auto">
            {/* Search Box */}
            <div className="relative w-full md:w-96 flex items-center bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-sm text-neutral-300 focus-within:border-brand-red/60 focus-within:text-white transition-all duration-300">
              <Icon icon="mdi:magnify" className="text-xl mr-3 text-neutral-500" />
              <input 
                id="search-projects"
                name="search-projects"
                type="text" 
                placeholder="Search by name, tags, description..." 
                aria-label="Search projects"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none w-full text-white placeholder-neutral-500 text-sm"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 hover:text-white transition-colors" aria-label="Clear Search">
                  <Icon icon="mdi:close" className="text-base" />
                </button>
              )}
            </div>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2.5 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2 rounded-full border text-xs font-mono transition-all duration-300 ${selectedCategory === cat.id ? 'bg-brand-red border-brand-red text-white' : 'bg-transparent border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid: Flexible columns for larger devices */}
          {filteredProjects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1360px] mx-auto">
                {visibleProjects.map((project, idx) => (
                  <ProjectCard project={project} key={idx} />
                ))}
              </div>
              {filteredProjects.length > 3 && (
                <div className="reveal text-center mt-10">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="inline-flex items-center gap-2.5 px-8 py-3 border border-white/10 rounded text-xs font-bold tracking-wider uppercase hover:border-brand-red/40 hover:bg-brand-maroon/20 transition-all duration-300 text-white cursor-pointer"
                  >
                    {isExpanded ? 'Show Less' : 'Show More'}
                    <Icon icon={isExpanded ? "mdi:chevron-up" : "mdi:chevron-down"} className="text-base" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="reveal text-center py-20 border border-white/5 bg-white/[0.01] rounded-xl max-w-md mx-auto">
              <Icon icon="mdi:alert-circle-outline" className="text-5xl text-neutral-600 mb-4 mx-auto" />
              <h3 className="text-base font-bold text-neutral-400">No projects found</h3>
              <p className="text-sm text-neutral-600 mt-2">No builds match your search parameters.</p>
            </div>
          )}

          <div className="reveal text-center mt-16">
            <a href="https://github.com/CODExGAMERZ?tab=repositories" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-8 py-3.5 border border-white/10 rounded text-xs font-bold tracking-wider uppercase hover:border-brand-red/40 hover:bg-brand-maroon/20 transition-all duration-300 text-white cursor-pointer">
              View All Repositories
              <Icon icon="mdi:arrow-right" className="text-sm" />
            </a>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="relative py-24 md:py-32">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="reveal text-center mb-16">
            <div className="text-[10px] font-mono tracking-widest text-brand-red uppercase mb-3">// Tech Stack</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase text-white leading-tight">
              Tools &amp; <span className="gradient-text">Technologies</span>
            </h2>
            <p className="text-base text-neutral-400 max-w-md mx-auto mt-3 font-light">
              The technologies I use to bring ideas to life.
            </p>
          </div>

          {/* Pillars layouts matching TechStack.jsx categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1360px] mx-auto mb-16">
            {techCategories.map((cat, idx) => (
              <div key={idx} className="reveal p-6 md:p-8 rounded-xl border border-white/5 bg-white/[0.01] hover:border-brand-red/30 transition-all duration-300 min-h-[220px]">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center bg-brand-maroon/25 text-brand-red flex-shrink-0">
                    <Icon icon={idx === 0 ? "mdi:code-tags" : idx === 1 ? "mdi:brain" : "mdi:tools"} className="text-lg" />
                  </div>
                  <h3 className="text-base font-bold text-white uppercase font-mono tracking-wider">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {cat.pills.map((pill, pillIdx) => (
                    <span key={pillIdx} className="px-3 py-1.5 bg-white/[0.02] border border-white/10 text-xs md:text-sm text-neutral-300 font-medium rounded-md hover:border-brand-red hover:text-white transition-all duration-150">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quick tech logo icons grid */}
          <div className="reveal mt-16 grid grid-cols-4 md:grid-cols-8 gap-5 max-w-4xl mx-auto">
            {[
              { icon: "mdi:language-javascript", hover: "group-hover:text-yellow-400" },
              { icon: "mdi:language-python", hover: "group-hover:text-blue-400" },
              { icon: "mdi:language-typescript", hover: "group-hover:text-blue-500" },
              { icon: "mdi:language-html5", hover: "group-hover:text-orange-500" },
              { icon: "mdi:language-css3", hover: "group-hover:text-blue-400" },
              { icon: "mdi:nodejs", hover: "group-hover:text-green-500" },
              { icon: "mdi:react", hover: "group-hover:text-cyan-400" },
              { icon: "mdi:git", hover: "group-hover:text-red-400" }
            ].map((logo, idx) => (
              <div key={idx} className="aspect-square rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-center hover:border-brand-red/30 hover:bg-brand-maroon/10 transition-all duration-300 group">
                <Icon icon={logo.icon} className={`text-4xl text-neutral-500 ${logo.hover} transition-colors duration-300`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contribution Graph Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-maroon/10 rounded-full blur-[150px]"></div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <div className="reveal text-center mb-12">
            <div className="text-[10px] font-mono tracking-widest text-brand-red uppercase mb-3">// Consistency</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase text-white leading-tight">
              Contribution <span className="gradient-text">Graph</span>
            </h2>
            <p className="text-sm text-neutral-400 mt-3 font-light">A visual representation of coding consistency</p>
          </div>

          <div className="reveal rounded-xl border border-white/10 bg-[#0A0A0A] p-6 md:p-8 overflow-x-auto max-w-4xl mx-auto custom-scrollbar">
            {/* Month labels dynamically placed */}
            <div className="flex gap-[3px] mb-3 text-[10px] font-mono text-neutral-500 pl-10 relative h-4">
              {contributionGrid.map((week, wIdx) => {
                const dayWithDate = week.find(d => d && d.date);
                if (!dayWithDate) return <div key={wIdx} className="w-3" />;
                
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const dateObj = new Date(dayWithDate.date);
                const monthVal = dateObj.getMonth();
                
                let isNewMonth = false;
                if (wIdx === 0) {
                  isNewMonth = true;
                } else {
                  const prevWeek = contributionGrid[wIdx - 1];
                  const prevDayWithDate = prevWeek.find(d => d && d.date);
                  if (prevDayWithDate) {
                    const prevDateObj = new Date(prevDayWithDate.date);
                    if (prevDateObj.getMonth() !== monthVal) {
                      isNewMonth = true;
                    }
                  }
                }
                
                return (
                  <div key={wIdx} className="w-3 relative flex-shrink-0">
                    {isNewMonth && (
                      <span className="absolute left-0 top-0 whitespace-nowrap">
                        {monthNames[monthVal]}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Contribution Cells */}
            <div className="flex gap-[3px]">
              <div className="flex flex-col justify-between text-[9px] font-mono text-neutral-500 pr-3 h-[102px] leading-tight select-none">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>
              
              <div className="flex gap-[3px]">
                {contributionGrid.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-[3px]">
                    {week.map((day, dIdx) => {
                      if (day.isPlaceholder) {
                        return (
                          <div 
                            key={dIdx} 
                            className="contrib-cell opacity-0 pointer-events-none"
                          />
                        );
                      }
                      
                      let colorClass = 'bg-white/[0.03]';
                      if (day.level === 1) colorClass = 'bg-[#3b0707]';
                      else if (day.level === 2) colorClass = 'bg-[#7f1d1d]';
                      else if (day.level === 3) colorClass = 'bg-[#b91c1c]';
                      else if (day.level === 4) colorClass = 'bg-[#ff0033]';
                      
                      return (
                        <div 
                          key={dIdx} 
                          className={`contrib-cell ${colorClass}`} 
                          title={day.date ? `${day.count} contributions on ${day.date}` : `Level ${day.level} activity`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-2.5 mt-5 text-[10px] font-mono text-neutral-500">
              <span>Less</span>
              <div className="w-3.5 h-3.5 rounded bg-white/[0.03]"></div>
              <div className="w-3.5 h-3.5 rounded bg-[#3b0707]"></div>
              <div className="w-3.5 h-3.5 rounded bg-[#7f1d1d]"></div>
              <div className="w-3.5 h-3.5 rounded bg-[#b91c1c]"></div>
              <div className="w-3.5 h-3.5 rounded bg-[#ff0033]"></div>
              <span>More</span>
            </div>
          </div>
        </div>
      </section>

      {/* Activity Timeline */}
      <section id="activity" className="relative py-24 md:py-32">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="reveal flex flex-col lg:flex-row gap-16 xl:gap-24 max-w-[1360px] mx-auto">
            
            {/* Left Title details */}
            <div className="lg:w-1/3">
              <div className="text-[10px] font-mono tracking-widest text-brand-red uppercase mb-3">// Recent Activity</div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase text-white leading-tight">
                Latest <br /><span className="gradient-text">Activity</span>
              </h2>
              <p className="text-base text-neutral-400 font-light leading-relaxed mt-5">
                Stay updated with latest commits, repo stars, and open source creations.
              </p>
            </div>

            {/* Right: Timeline list */}
            <div className="flex-1 space-y-0 relative pl-4">
              <div className="activity-line"></div>
              {activities.map((act, idx) => (
                <div key={idx} className="relative pl-12 pb-10 flex items-start gap-5">
                  {/* Timeline node */}
                  <div className="absolute left-[7px] top-1.5 w-7 h-7 rounded-full border border-white/15 bg-[#050505] flex items-center justify-center z-10 hover:border-brand-red transition-all duration-300">
                    <Icon icon={act.icon} style={{ color: act.color }} className="text-sm" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-neutral-500 block mb-2">{act.time}</span>
                    <p className="text-sm md:text-base text-neutral-300 font-light leading-relaxed">
                      <span className="text-neutral-400">{act.title} </span>
                      <a href={`https://github.com/CODExGAMERZ/${act.repo}`} target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline font-bold">
                        {act.repo}
                      </a>
                      {act.branch && <span className="font-mono text-neutral-600 text-xs"> [{act.branch}]</span>}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section id="interests" className="relative py-24 md:py-32">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="reveal text-center mb-16">
            <div className="text-[10px] font-mono tracking-widest text-brand-red uppercase mb-3">// Research</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase text-white leading-tight">
              Research <span className="gradient-text">Interests</span>
            </h2>
            <p className="text-base text-neutral-400 max-w-md mx-auto mt-3 font-light">
              Topics I'm passionate about exploring and building with.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1360px] mx-auto">
            {interests.map((interest, idx) => (
              <InterestCard interest={interest} key={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 md:py-32">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute inset-0 dot-pattern opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[150px]"></div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <div className="reveal max-w-3xl mx-auto text-center">
            <div className="text-[10px] font-mono tracking-widest text-brand-red uppercase mb-3">// Get In Touch</div>
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase mb-6 text-white leading-tight">
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-base md:text-lg text-neutral-300 font-light leading-relaxed mb-12">
              Interested in collaborating or have a question? Reach out through any of these channels.
            </p>

            {/* Contact links grid matching original exactly */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl mx-auto mb-12">
              <a href="https://github.com/CODExGAMERZ" target="_blank" rel="noopener noreferrer" className="p-6 md:p-8 rounded-xl border border-white/5 bg-white/[0.02] hover:border-brand-red/30 hover:bg-brand-maroon/10 transition-all duration-300 group flex flex-col items-center justify-center min-h-[140px]">
                <Icon icon="mdi:github" className="text-4xl text-neutral-400 group-hover:text-white transition-colors mb-3.5" />
                <div className="text-sm font-bold tracking-wider text-white uppercase font-mono">GitHub</div>
              </a>
              <a href="https://www.instagram.com/aryannotsinha" target="_blank" rel="noopener noreferrer" className="p-6 md:p-8 rounded-xl border border-white/5 bg-white/[0.02] hover:border-brand-red/30 hover:bg-brand-maroon/10 transition-all duration-300 group flex flex-col items-center justify-center min-h-[140px]">
                <Icon icon="mdi:instagram" className="text-4xl text-neutral-400 group-hover:text-pink-500 transition-colors mb-3.5" />
                <div className="text-sm font-bold tracking-wider text-white uppercase font-mono">Instagram</div>
              </a>
            </div>

            {/* Clipboard copy handle */}
            <div 
              onClick={handleCopyUsername}
              className="inline-flex items-center gap-4 px-6 py-3.5 rounded-xl border border-white/10 bg-[#0A0A0A] cursor-pointer hover:border-brand-red/30 transition-all duration-300 mb-16"
            >
              <Icon icon="mdi:content-copy" className="text-brand-red text-base" />
              <span className="text-base font-mono text-neutral-300">CODExGAMERZ</span>
              <span className="text-xs text-neutral-500 font-mono">{copyFeedback}</span>
            </div>

            <blockquote className="border-l-2 border-brand-red pl-5 italic text-neutral-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed text-left">
              "I enjoy building systems that are efficient, understandable, and genuinely useful — whether it's a custom-trained LLM, a developer tool, or a responsive caching client."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-10 border-t border-white/5 bg-brand-dark z-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded border border-white/10 flex items-center justify-center bg-brand-maroon/30 text-brand-red text-xs font-mono font-bold">
                &lt;&gt;
              </div>
              <span className="text-xs md:text-sm font-mono text-neutral-500">&copy; 2026 Aryan (CODExGAMERZ). Built with <span className="text-brand-red">♥</span> and React.</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-neutral-600">Built with</span>
              <Icon icon="mdi:heart" className="text-brand-red text-sm animate-pulse" />
              <span className="text-xs font-mono text-neutral-600">&amp; CSS3</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-lg bg-[#0A0A0A] border border-brand-red/30 shadow-2xl shadow-black/50 flex items-center gap-3.5 transition-all duration-500 pointer-events-none ${toastVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <Icon icon="mdi:check-circle" className="text-brand-red text-lg" />
        <span className="text-sm font-medium text-white">{toastMsg}</span>
      </div>

    </div>
  );
}
