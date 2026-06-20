import { useState, useEffect, useRef } from 'react';

const COLOR_THEMES = {
  green: '#10b981',
  cyan: '#06b6d4',
  amber: '#f59e0b',
  pink: '#ec4899',
  white: '#e2e8f0'
};

export default function Terminal({ projects = [], onThemeChange }) {
  const [input, setInput] = useState('');
  const [theme, setTheme] = useState('cyan');
  const [history, setHistory] = useState([
    { type: 'output', text: 'Aryan\'s Interactive Developer Shell [Version 1.0.0]' },
    { type: 'output', text: 'Type "help" to see a list of available commands.' },
    { type: 'output', text: '' }
  ]);

  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom of terminal when history updates
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const trimmedInput = input.trim();
      const newHistory = [...history, { type: 'input', text: trimmedInput }];

      if (trimmedInput === '') {
        setHistory(newHistory);
        setInput('');
        return;
      }

      const parts = trimmedInput.split(' ');
      const command = parts[0].toLowerCase();
      const arg = parts.slice(1).join(' ').toLowerCase();

      let outputs = [];

      switch (command) {
        case 'help':
          outputs = [
            'Available commands:',
            '  about     - Brief profile summary',
            '  skills    - Core technical expertise',
            '  projects  - Highlighted builds & links',
            '  contact   - Get in touch',
            '  neofetch  - Display system specs & ASCII art',
            '  theme     - Change terminal color (theme [green|cyan|amber|pink|white])',
            '  clear     - Clear terminal buffer',
            '  help      - Print this help menu'
          ];
          break;
        case 'about':
          outputs = [
            'Aryan — AI Engineer, ML Developer & Software Builder.',
            'I design and train deep learning models, optimize local inference, and',
            'craft performance-first devtools and full-stack platforms.',
            'Passionate about transitioning AI models from prototypes to real-world applications.'
          ];
          break;
        case 'skills':
          outputs = [
            'Technical Expertise & Stack:',
            '  - AI/ML: PyTorch, TensorFlow, Deep Learning, Transformers, NLP, FAISS',
            '  - Languages: Python, JavaScript, TypeScript, C/C++, Kotlin, HTML/CSS',
            '  - Platforms: Android (Jetpack Compose), VS Code Extensions, Flask, FastAPI',
            '  - Tools/Database: Git, GCC, Ollama, Supabase, Local Storage Caching'
          ];
          break;
        case 'projects':
          outputs = [
            'Featured Projects:',
            ...projects.map(p => `  * ${p.title} (${p.category}) - ${p.desc.slice(0, 60)}...`)
          ];
          break;
        case 'contact':
          outputs = [
            'Get in touch:',
            '  - GitHub: https://github.com/CODExGAMERZ',
            '  - Email: codexgamerz.dev@gmail.com (or use the contact form below!)',
            '  - Location: India'
          ];
          break;
        case 'neofetch':
          outputs = [
            '       /\\          guest@aryan-portfolio',
            '      /  \\         ---------------------',
            '     /    \\        OS: Web Browser',
            '    /  /\\  \\       Kernel: React Engine v18',
            '   /  /__\\  \\      Shell: Portfolio Interactive Console',
            '  /  ______  \\     Uptime: ' + Math.round(performance.now() / 1000) + 's',
            ' /_/        \\_\\    Projects Count: ' + projects.length + ' builds',
            '                   Theme: ' + theme,
            '                   Interests: Deep Learning, Local AI, DevTools'
          ];
          break;
        case 'theme':
          if (COLOR_THEMES[arg]) {
            setTheme(arg);
            outputs = [`Terminal theme changed to ${arg}.`];
            if (onThemeChange) {
              onThemeChange(COLOR_THEMES[arg]);
            }
          } else {
            outputs = [
              `Unknown theme: ${arg}`,
              `Supported themes: ${Object.keys(COLOR_THEMES).join(', ')}`,
              'Usage: theme [color_name]'
            ];
          }
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        default:
          outputs = [
            `Command not found: ${command}`,
            'Type "help" to see a list of available commands.'
          ];
      }

      setHistory([...newHistory, ...outputs.map(text => ({ type: 'output', text }))]);
      setInput('');
    }
  };

  const currentColor = COLOR_THEMES[theme] || COLOR_THEMES.cyan;

  return (
    <div 
      className="terminal-window" 
      onClick={focusInput}
      style={{ '--terminal-color': currentColor }}
    >
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot dot--red"></span>
          <span className="dot dot--yellow"></span>
          <span className="dot dot--green"></span>
        </div>
        <div className="terminal-title">guest@aryan-portfolio: ~</div>
      </div>
      <div className="terminal-body" ref={bodyRef}>
        <div className="terminal-history">
          {history.map((line, idx) => (
            <div 
              key={idx} 
              className={`terminal-line terminal-line--${line.type}`}
            >
              {line.type === 'input' && (
                <span className="terminal-prompt">guest@aryan-portfolio:~$ </span>
              )}
              {line.type === 'input' ? line.text : line.text}
            </div>
          ))}
        </div>
        <div className="terminal-input-row">
          <span className="terminal-prompt">guest@aryan-portfolio:~$ </span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            autoFocus
            aria-label="Terminal Command Input"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
}
