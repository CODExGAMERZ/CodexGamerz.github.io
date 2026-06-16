import Terminal from './Terminal';

export default function Hero({ projects = [] }) {
  return (
    <section className="hero" id="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="pulse"></span>
            Open to opportunities
          </div>

          <h1 className="hero-name">
            Hey, I'm <span className="gradient-text">Aryan</span>
          </h1>

          <p className="hero-tagline">
            AI Engineer <span className="separator">·</span>
            ML Developer <span className="separator">·</span>
            Software Builder
          </p>

          <p className="hero-description">
            I build <strong>AI systems, developer tools, and performance-focused software</strong> designed for real-world usage — not just prototypes. From custom-trained LLMs to compiler-integrated IDEs.
          </p>

          <div className="hero-cta">
            <a href="#projects" className="btn btn--primary" id="cta-projects">
              View Projects
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" /></svg>
            </a>
            <a href="https://github.com/CODExGAMERZ" target="_blank" rel="noopener noreferrer" className="btn btn--ghost" id="cta-github">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12Z"/></svg>
              GitHub Profile
            </a>
          </div>
        </div>

        <div className="hero-terminal-wrapper">
          <Terminal projects={projects} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        <div className="mouse"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
