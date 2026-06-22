# ⚡ Aryan (CODExGAMERZ) — Portfolio

A premium, dark-themed developer portfolio website built using **React, Vite, and Vanilla CSS** with smooth animations and modular components.

🔗 **Live:** [codexgamerz.github.io](https://codexgamerz.github.io)

---

## ✨ Design & Features

| Feature | Description |
|---|---|
| 🌑 **Dark Glassmorphism** | Deep obsidian dark theme with layered glass cards, ambient purple/teal/pink glows, and subtle grid overlay |
| 🎠 **Sideways Sliding Carousels** | Projects & interests slide sideways card-by-card in a continuous flex track, featuring dynamic pagination dots, swipe gestures, resize auto-clamping, and autoplay hover guards |
| ✨ **Cursor Glow** | A soft radial glow follows the mouse cursor with lerp-smoothed tracking (desktop only) |
| 📊 **Dynamic Counters** | Stats count up with eased animations when they scroll into view, pulling project lengths dynamically |
| 🔄 **Scroll Reveal** | Intersection Observer–powered staggered fade-in reveals across all sections |
| 📱 **Fully Responsive** | Fluid layouts from mobile to ultrawide with hamburger nav and adaptive columns |
| 🎨 **Modern Typography** | Outfit (headings), Inter (body), and JetBrains Mono (code/tags) via Google Fonts |
| 🖱️ **Micro-Animations** | Glowing brand developer SVG code brackets icon, hover lift transitions, icon tilts, shine sweeps, heartbeat footer, and spring-eased micro-interactions |
| 🔗 **Active Nav Tracking** | Navigation links highlight based on current scroll position |

---

## 📂 Structure

```
CodexGamerz.github.io/
├── docs/           ← Production-built assets (HTML, CSS, JS) served on GitHub Pages
├── public/         ← Static public assets (icons, images)
├── src/            ← React source code
│   ├── components/ ← Modular UI components (Navbar, Hero, About, Carousel, TechStack, Contact, Footer)
│   ├── hooks/      ← Custom React hooks (useCursorGlow, useIntersectionObserver, useCountUp)
│   ├── App.jsx     ← Main app view and projects configuration array
│   └── index.css   ← Premium CSS variables, styling framework, and keyframe animations
├── index.html      ← Entry template
├── package.json    ← Scripts and dependencies
└── README.md       ← You are here
```

---

## 🚀 Sections

1. **Hero** — Animated gradient name, tagline, availability badge, and CTA buttons alongside interactive command terminal
2. **About** — Focus areas grid (ML, LLMs, Systems, Optimization) + dynamically calculated stat counters (20+ Projects Built, 9+ Live Demos)
3. **Projects** — 20 featured builds in a smooth sideways sliding carousel with category filters and hover-pause autoplay
4. **Tech Stack** — Languages, AI/DL frameworks, and tools/infra in hoverable pill layouts
5. **Interests** — 6 research areas cycling in a smooth sideways sliding carousel
6. **Contact** — GitHub & Instagram cards with signature quote and responsive metrics cards

---

## 🛠️ Tech Used

- **React** — Component-driven architecture, state management, hooks
- **Vite** — High-performance frontend bundler
- **CSS3** — Custom variables, backdrop filters, CSS Grid, Flexbox, custom animations
- **JavaScript** — Intersection Observer, `requestAnimationFrame` cursor tracking, responsive carousel calculations

---

## 📋 Projects Showcased

| # | Project | Type | Links |
|---|---------|------|-------|
| 1 | **LogicScope** — VS Code extension rendering real-time DSA recursion trees, Mermaid.js flowcharts, and UML class hierarchies | Dev Tool | [Repo](https://github.com/CODExGAMERZ/LogicScope) · [Demo](https://logicscope.vercel.app/) |
| 2 | **LinguistReport** — Advanced NLP linguistic text profiler (human vs. AI text) and publication-quality Word (.docx) report generator | Dev Tool | [Repo](https://github.com/CODExGAMERZ/LinguistReport) |
| 3 | **scaffold-agent-skill** — Interactive CLI scaffolding utility to generate AI agent skills, plugins, and server stubs for Claude, OpenAI, and Gemini | Dev Tool / CLI | [Repo](https://github.com/CODExGAMERZ/create-agent-skill) |
| 4 | **DataMind AI** — Client-first Android app for research paper summarization and gamified stats sync using Jetpack Compose and Supabase | AI / ML | [Repo](https://github.com/CODExGAMERZ/DataMind-ai) |
| 5 | **SentinelRAG** — Local-first hybrid RAG CLI and Python engine indexing local Markdown/PDF files with LangGraph orchestration and Qdrant | AI / ML | [Repo](https://github.com/CODExGAMERZ/SentinelRAG) |
| 6 | **DataPrism** — Offline VS Code extension for dataset exploration & quality profiling | Dev Tool | [Repo](https://github.com/CODExGAMERZ/DataPrism) · [Demo](https://dataprismext.vercel.app/) |
| 7 | **ModelSight** — Local-first ML training monitor & VS Code dashboard | Dev Tool | [Repo](https://github.com/CODExGAMERZ/Model-Sight) · [Demo](https://modelsight.vercel.app/) |
| 8 | **Hybrid AI Chatbot** — Semantic memory + self-learning pipeline | AI / ML | [Repo](https://github.com/CODExGAMERZ/chatbot-ai) |
| 9 | **Code Autocomplete LLM** — Multilingual GPT decoder (Python/C/Java) with GPU support | AI / ML | [Repo](https://github.com/CODExGAMERZ/Code-AutoComplete-LLM) |
| 10 | **llm-advisor.dev** — LLM hardware compatibility calculator | Web App | [Repo](https://github.com/CODExGAMERZ/llm-advisor) · [Demo](https://llm-advisor-ai.vercel.app/) |
| 11 | **C-Code-Assistant** — Local AI-powered C programming IDE | Dev Tool | [Repo](https://github.com/CODExGAMERZ/C-Code-Assistant) |
| 12 | **Python-Code-Assistant** — Local AI-powered Python IDE | Dev Tool | [Repo](https://github.com/CODExGAMERZ/Python-Code-Assistant) |
| 13 | **KeyCode** — Custom VS Code fork built for Windows with local Ollama autocomplete | Dev Tool | [Repo](https://github.com/CODExGAMERZ/KeyCode) |
| 14 | **VoltC** — Native desktop C/C++ IDE built for Ubuntu Linux | Dev Tool | [Repo](https://github.com/CODExGAMERZ/VoltC) |
| 15 | **VoltC Showcase Website** — Obsidian glassmorphism landing page with in-browser IDE simulator | Web App | [Repo](https://github.com/CODExGAMERZ/VoltC-Website) · [Demo](https://volt-c.vercel.app/) |
| 16 | **Kryptonix** — Glassmorphism crypto dashboard | Web App | [Repo](https://github.com/CODExGAMERZ/crypto-website) · [Demo](https://kryptonix-tv.vercel.app/) |
| 17 | **FocusFlow** — Task stopwatch & analytics | Web App | [Repo](https://github.com/CODExGAMERZ/focusflow) · [Demo](https://focusflow-tv.vercel.app/) |
| 18 | **WebNotes** — Programming knowledge hub | Web App | [Repo](https://github.com/CODExGAMERZ/WebNotes) · [Demo](https://webynotes.netlify.app/) |
| 19 | **CineFinder** — Movie discovery engine | Web App | [Repo](https://github.com/CODExGAMERZ/Movie) |
| 20 | **QR Code Generator** — CLI with wizard & preview | CLI | [Repo](https://github.com/CODExGAMERZ/QrCODE-GENRATOR) |

---

## 🔗 Connect

- **GitHub:** [github.com/CODExGAMERZ](https://github.com/CODExGAMERZ)
- **Instagram:** [instagram.com/aryannotsinha](https://www.instagram.com/aryannotsinha)

---

> *"I enjoy building systems that are efficient, understandable, and genuinely useful — whether it's a custom-trained LLM, a developer tool, or a responsive caching client."*
