import { useEffect } from 'react';

export default function useIntersectionObserver() {
  useEffect(() => {
    // Wait a brief tick to ensure DOM is fully populated by React
    const timer = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal');
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      );

      revealElements.forEach((el) => revealObserver.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);
}
