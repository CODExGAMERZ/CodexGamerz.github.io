import { useEffect, useRef } from 'react';

export default function use3DTilt(maxRotation = 10, scale = 1.02) {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Accessibility and Touch checks:
    // 1. Disable tilt on systems with reduced-motion preferences
    // 2. Disable tilt on touch-only devices (coarse pointer like phone screen) to save overhead
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    if (prefersReducedMotion || isCoarsePointer) return;

    // Create glare element inside card if it doesn't exist
    let glare = el.querySelector('.card-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'card-glare';
      glare.style.position = 'absolute';
      glare.style.top = '0';
      glare.style.left = '0';
      glare.style.width = '100%';
      glare.style.height = '100%';
      glare.style.pointerEvents = 'none';
      glare.style.zIndex = '3';
      glare.style.opacity = '0';
      glare.style.transition = 'opacity 0.3s ease';
      glare.style.background = 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 80%)';
      
      // Ensure element has relative positioning to contain glare
      if (window.getComputedStyle(el).position === 'static') {
        el.style.position = 'relative';
      }
      
      // Prevent overflow issues
      el.style.overflow = 'hidden';
      el.appendChild(glare);
    }

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Absolute mouse coordinates inside the element
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Normalized coordinates (-0.5 to 0.5)
      const xVal = (mouseX / width) - 0.5;
      const yVal = (mouseY / height) - 0.5;

      // Compute tilt angles
      const rotateY = xVal * maxRotation;
      const rotateX = -yVal * maxRotation;

      // Update element transform directly via DOM mutation (No React state triggers / zero re-render thrashing)
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
      
      // Move glare reflection opposite to mouse to simulate light direction
      const glareX = (mouseX / width) * 100;
      const glareY = (mouseY / height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 70%)`;
    };

    const handleMouseEnter = () => {
      el.style.transition = 'transform 0.1s ease, box-shadow 0.15s ease';
      glare.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      // Smooth transition back to neutral state
      el.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease';
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      glare.style.opacity = '0';
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
      
      if (glare && el.contains(glare)) {
        el.removeChild(glare);
      }
    };
  }, [maxRotation, scale]);

  return elementRef;
}
