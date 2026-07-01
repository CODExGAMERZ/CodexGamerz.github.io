# ⚡ Aryan (CODExGAMERZ) — Portfolio

A premium, dark-themed developer portfolio website built using **React, Vite, and Vanilla CSS** with smooth animations and modular components.

🔗 **Live:** [codexgamerz.github.io](https://codexgamerz.github.io)

---

## ✨ Design & Features

| Feature | Description |
|---|---|
| 🌑 **Dark Glassmorphism** | Deep obsidian dark theme with layered glass cards, ambient dark-red glows, and subtle grid overlays |
| 🗂️ **Responsive Grid & Toggle** | Projects grid initially showing exactly 3 featured cards with a smooth "Show More" / "Show Less" toggle to view the full list |
| 📊 **Dynamic Counters** | Stats count up with eased animations when they scroll into view, pulling project lengths and GitHub API stats dynamically |
| 🔄 **Scroll Reveal** | Intersection Observer–powered staggered fade-in reveals across all sections |
| 📱 **Flexible & Responsive** | Fluid, responsive layouts built for all screen sizes (from 375px mobile up to ultrawide desktop) with clean vertical flow and no horizontal overflow |
| 📆 **Date-Aligned Contribution Graph** | Custom, date-aware contribution graph that pads weeks timezone-independently, vertically aligning columns, hiding future days, and placing month labels dynamically |
| ⚡ **Live GitHub Activity Timeline** | Real-time, timezone-independent feed mapping push events, watches, forks, and repository creations directly from the GitHub events API |
| 🎨 **Modern Typography** | Outfit (headings), Inter (body), and JetBrains Mono (code/tags) via Google Fonts |
| 🖱️ **Micro-Animations** | Responsive 3D hover tilt effects, hover lift transitions, animated availability badges, typing subtitle carousel, and marquee tech strips |

---

## 📂 Structure

```
CodexGamerz.github.io/
├── docs/           ← Production-built assets (HTML, CSS, JS) served on GitHub Pages
├── public/         ← Static public assets (icons, SVG maps)
├── src/            ← React source code
│   ├── components/ ← Inline sub-components & custom SVGs (Icons.jsx)
│   ├── hooks/      ← Custom hooks (use3DTilt.js, useIntersectionObserver.js)
│   ├── App.css     ← App container styles
│   ├── App.jsx     ← Main monolithic application controller, configuration, and data arrays
│   ├── index.css   ← Premium CSS variables, styling framework, and keyframe animations
│   └── main.jsx    ← React DOM entry point
├── index.html      ← Entry template
├── package.json    ← Scripts and dependencies
└── README.md       ← You are here
```

---

## 🚀 Sections

1. **Hero** — Animated gradient name, typing role subtitle, availability badge, live GitHub followers/repos stats, and interactive profile card
2. **About** — Mono terminal profile code mock + dynamically calculated stat counters (Total Built, AI/ML Systems, Live Demos)
3. **Projects** — 20 featured builds displayed in a clean, categorized, and searchable responsive grid
4. **Tech Stack** — Categorized languages, AI/DL frameworks, and developer tools in hoverable pill layouts
5. **Contribution Graph** — Date-padded activity grid displaying live-aligned code contributions
6. **Activity Timeline** — Vertical timeline list of recent public GitHub events
7. **Interests** — Research focus cards highlighting technical areas of expertise
8. **Contact** — Signature quote, email copy utility, and links to GitHub & Instagram

---

## 🛠️ Tech Used

- **React** — Component-driven architecture, state management, hooks
- **Vite** — High-performance frontend bundler
- **CSS3** — Custom variables, backdrop filters, CSS Grid, Flexbox, custom animations
- **JavaScript** — Intersection Observer, 3D card tilt tracking, and date-padded contribution API processing

---

## 📋 Projects Showcased

| # | Project | Type | Links |
|---|---------|------|-------|
| 1 | **LogicScope** — VS Code extension rendering real-time DSA recursion trees, Mermaid.js flowcharts, and UML class hierarchies | Dev Tool | [Repo](https://github.com/CODExGAMERZ/LogicScope) · [Demo](https://logicscope.vercel.app/) |
| 2 | **B.Tech-AI-Tutor-7B** — Fine-tuned academic study tutor built on top of Qwen-2.5-7B-Instruct, optimized for Colab training & local GGUF running | AI / ML | [Repo](https://github.com/CODExGAMERZ/B.Tech-AI-Tutor-7B) |
| 3 | **LinguistReport** — Advanced NLP linguistic text profiler (human vs. AI text) and publication-quality Word (.docx) report generator | Dev Tool | [Repo](https://github.com/CODExGAMERZ/LinguistReport) |
| 4 | **scaffold-agent-skill** — Interactive CLI scaffolding utility to generate AI agent skills, plugins, and server stubs for Claude, OpenAI, and Gemini | Dev Tool / CLI | [Repo](https://github.com/CODExGAMERZ/create-agent-skill) |
| 5 | **DataMind AI** — Client-first Android app for research paper summarization and gamified stats sync using Jetpack Compose and Supabase | AI / ML | [Repo](https://github.com/CODExGAMERZ/DataMind-ai) |
| 6 | **SentinelRAG** — Local-first hybrid RAG CLI and Python engine indexing local Markdown/PDF files with LangGraph orchestration and Qdrant | AI / ML | [Repo](https://github.com/CODExGAMERZ/SentinelRAG) |
| 7 | **JarvisRAG** — Local-first RAG application with FastAPI backend, FAISS vector store, local embeddings, and a stunning browser dashboard | AI / ML | [Repo](https://github.com/CODExGAMERZ/JarvisRAG) |
| 8 | **DataPrism** — Offline VS Code extension for dataset exploration & quality profiling | Dev Tool | [Repo](https://github.com/CODExGAMERZ/DataPrism) · [Demo](https://dataprismext.vercel.app/) |
| 9 | **ModelSight** — Local-first ML training monitor & VS Code dashboard | Dev Tool | [Repo](https://github.com/CODExGAMERZ/Model-Sight) · [Demo](https://modelsight.vercel.app/) |
| 10 | **Hybrid AI Chatbot** — Semantic memory + self-learning pipeline | AI / ML | [Repo](https://github.com/CODExGAMERZ/chatbot-ai) |
| 11 | **Code Autocomplete LLM** — Multilingual GPT decoder (Python/C/Java) with GPU support | AI / ML | [Repo](https://github.com/CODExGAMERZ/Code-AutoComplete-LLM) |
| 12 | **llm-advisor.dev** — LLM hardware compatibility calculator | Web App | [Repo](https://github.com/CODExGAMERZ/llm-advisor) · [Demo](https://llm-advisor-ai.vercel.app/) |
| 13 | **C-Code-Assistant** — Local AI-powered C programming IDE | Dev Tool | [Repo](https://github.com/CODExGAMERZ/C-Code-Assistant) |
| 14 | **Python-Code-Assistant** — Local AI-powered Python IDE | Dev Tool | [Repo](https://github.com/CODExGAMERZ/Python-Code-Assistant) |
| 15 | **KeyCode** — Custom VS Code fork built for Windows with local Ollama autocomplete | Dev Tool | [Repo](https://github.com/CODExGAMERZ/KeyCode) |
| 16 | **VoltC** — Native desktop C/C++ IDE built for Ubuntu Linux | Dev Tool | [Repo](https://github.com/CODExGAMERZ/VoltC) |
| 17 | **VoltC Showcase Website** — Obsidian glassmorphism landing page with in-browser IDE simulator | Web App | [Repo](https://github.com/CODExGAMERZ/VoltC-Website) · [Demo](https://volt-c.vercel.app/) |
| 18 | **Kryptonix** — Glassmorphism crypto dashboard | Web App | [Repo](https://github.com/CODExGAMERZ/crypto-website) · [Demo](https://kryptonix-tv.vercel.app/) |
| 19 | **FocusFlow** — Task stopwatch & analytics | Web App | [Repo](https://github.com/CODExGAMERZ/focusflow) · [Demo](https://focusflow-tv.vercel.app/) |
| 20 | **WebNotes** — Programming knowledge hub | Web App | [Repo](https://github.com/CODExGAMERZ/WebNotes) · [Demo](https://webynotes.netlify.app/) |
| 21 | **CineFinder** — Movie discovery engine | Web App | [Repo](https://github.com/CODExGAMERZ/Movie) |
| 22 | **QR Code Generator** — CLI with wizard & preview | CLI | [Repo](https://github.com/CODExGAMERZ/QrCODE-GENRATOR) |

---

## 🔗 Connect

- **GitHub:** [github.com/CODExGAMERZ](https://github.com/CODExGAMERZ)
- **Instagram:** [instagram.com/aryannotsinha](https://www.instagram.com/aryannotsinha)

---

> *"I enjoy building systems that are efficient, understandable, and genuinely useful — whether it's a custom-trained LLM, a developer tool, or a responsive caching client."*
