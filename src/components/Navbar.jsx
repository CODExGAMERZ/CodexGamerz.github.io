import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = ['about', 'projects', 'tech', 'interests', 'contact'];
    let sectionOffsets = [];

    const cacheOffsets = () => {
      sectionOffsets = sections.map(id => {
        const el = document.getElementById(id);
        if (el) {
          return {
            id,
            top: el.offsetTop - 120,
            bottom: el.offsetTop - 120 + el.offsetHeight
          };
        }
        return null;
      }).filter(Boolean);
    };

    // Initial cache after DOM renders
    const timer = setTimeout(cacheOffsets, 150);

    let resizeTimer = null;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(cacheOffsets, 200);
    };

    const onScroll = () => {
      const scrollY = window.scrollY;
      let current = '';
      for (let i = 0; i < sectionOffsets.length; i++) {
        const s = sectionOffsets[i];
        if (scrollY >= s.top && scrollY < s.bottom) {
          current = s.id;
          break;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Click outside and Escape key to close mobile menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && 
          navRef.current && !navRef.current.contains(e.target) && 
          hamburgerRef.current && !hamburgerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Tech Stack', href: '#tech', id: 'tech' },
    { label: 'Interests', href: '#interests', id: 'interests' },
    { label: 'Contact', href: '#contact', id: 'contact' }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <a href="#" className="nav-logo" onClick={() => setIsOpen(false)}>Aryan.</a>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`} ref={navRef}>
        {navLinks.map(link => (
          <li key={link.id}>
            <a 
              href={link.href} 
              className={activeSection === link.id ? 'active' : ''}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <div 
        className={`nav-hamburger ${isOpen ? 'active' : ''}`} 
        id="navHamburger" 
        ref={hamburgerRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}
