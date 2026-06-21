import { BrainIcon, CpuIcon, LayersIcon, ZapIcon } from './Icons';
import useCountUp from '../hooks/useCountUp';

function StatCard({ label, countTarget }) {
  const [count, countRef] = useCountUp(countTarget, 1200);
  return (
    <div className="stat-card reveal reveal--scale-up">
      <div className="stat-number" ref={countRef}>
        {count}+
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function About({ projects = [] }) {
  const focusAreas = [
    {
      icon: <BrainIcon />,
      title: 'ML & Deep Learning',
      desc: 'Custom models, training pipelines, and inference optimization'
    },
    {
      icon: <CpuIcon />,
      title: 'LLMs & Local Inference',
      desc: 'Building and deploying language models on consumer hardware'
    },
    {
      icon: <LayersIcon />,
      title: 'System Design',
      desc: 'Compiler integration, proxy architectures, and hybrid systems'
    },
    {
      icon: <ZapIcon />,
      title: 'Client Optimization',
      desc: 'Caching architectures, performance tuning, and resilient UIs'
    }
  ];

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

  return (
    <section id="about">
      <div className="container">
        <div className="about-header">
          <span className="section-label reveal reveal--blur-in">// About Me</span>
          <h2 className="section-title reveal reveal--blur-in reveal-delay-1">Crafting Intelligent Systems</h2>
        </div>

        <div className="about-grid">
          <div className="about-text">
            <p className="reveal reveal--blur-in reveal-delay-2">
              I enjoy exploring how modern systems work internally — from <strong>Transformers and semantic retrieval</strong> to <strong>compilers, hybrid AI, and developer automation tools</strong>.
            </p>
            <p className="reveal reveal--blur-in reveal-delay-3">
              My work focuses on combining Machine Learning &amp; Deep Learning with practical software engineering, building systems that are efficient, understandable, and genuinely useful.
            </p>

            <div className="focus-areas stagger-children">
              {focusAreas.map((area, idx) => (
                <div className="focus-item reveal reveal--scale-up" key={idx}>
                  <div className="focus-icon">{area.icon}</div>
                  <div>
                    <h4>{area.title}</h4>
                    <p>{area.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="stats-strip stagger-children">
            <StatCard label="Projects Built" countTarget={projects.length} />
            <StatCard label="AI / ML Systems" countTarget={aiMlSystemsCount} />
            <StatCard label="Live Demos" countTarget={liveDemosCount} />
          </div>
        </div>
      </div>
    </section>
  );
}
