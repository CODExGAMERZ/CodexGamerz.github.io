import { useEffect, useRef } from 'react';

export default function useCursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const isDesktop = window.matchMedia('(pointer: fine)').matches;
    const glowEl = glowRef.current;
    if (!isDesktop || !glowEl) return;

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    let rafId = null;

    const updateGlow = () => {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      if (glowEl) {
        glowEl.style.left = `${glowX}px`;
        glowEl.style.top = `${glowY}px`;
      }
      rafId = requestAnimationFrame(updateGlow);
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (glowEl && !glowEl.classList.contains('visible')) {
        glowEl.classList.add('visible');
      }
    };

    const onMouseLeave = () => {
      if (glowEl) {
        glowEl.classList.remove('visible');
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(updateGlow);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return glowRef;
}
