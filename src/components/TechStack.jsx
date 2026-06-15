import { TerminalIcon, BrainIcon, ScaffoldIcon } from './Icons';

export default function TechStack() {
  const categories = [
    {
      icon: <TerminalIcon />,
      title: 'Languages',
      pills: ['Python', 'TypeScript', 'JavaScript (ES6+)', 'Kotlin', 'C', 'HTML5', 'CSS3']
    },
    {
      icon: <BrainIcon />,
      title: 'AI / Deep Learning',
      pills: ['PyTorch', 'TensorFlow / Keras', 'FAISS', 'Sentence Transformers', 'NLP', 'Ollama', 'Tokenizers']
    },
    {
      icon: <ScaffoldIcon />,
      title: 'Tools & Infra',
      pills: [
        'Git', 'Node.js', 'WebAssembly', 'Tree-sitter', 'Android', 'Jetpack Compose', 'Supabase',
        'React', 'Vite', 'GitHub Pages', 'Flask', 'FastAPI', 'PyWebView', 'WebSockets', 'MinGW / GCC',
        'cppcheck', 'flake8', 'REST APIs'
      ]
    }
  ];

  return (
    <section id="tech" className="tech-section">
      <div className="container">
        <div className="tech-header">
          <span className="section-label reveal reveal--blur-in">// Tech Stack</span>
          <h2 className="section-title reveal reveal--blur-in reveal-delay-1">Tools &amp; Technologies</h2>
          <p className="section-subtitle reveal reveal--blur-in reveal-delay-2">
            The technologies I use to bring ideas to life.
          </p>
        </div>

        <div className="tech-categories stagger-children">
          {categories.map((cat, idx) => (
            <div className="tech-category reveal reveal--scale-up" key={idx}>
              <div className="tech-category__icon">{cat.icon}</div>
              <h3 className="tech-category__title">{cat.title}</h3>
              <div className="tech-pills">
                {cat.pills.map((pill, pillIdx) => (
                  <span className="tech-pill" key={pillIdx}>{pill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
