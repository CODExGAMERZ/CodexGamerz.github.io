import { useState, useEffect, useRef } from 'react';

export default function Carousel({ children, autoplayMs = 5000, ariaLabel = 'Carousel' }) {
  const [current, setCurrent] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const trackRef = useRef(null);
  const carouselRef = useRef(null);
  const touchStartXRef = useRef(0);

  // Convert React children to an array
  const cards = Array.isArray(children) ? children : [children];

  const calculateLimits = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const cardEl = track.children[0];
    if (!cardEl) return 0;

    const cardWidth = cardEl.getBoundingClientRect().width || 100;
    const gap = parseFloat(window.getComputedStyle(track).gap) || 24;
    const denominator = cardWidth + gap;
    const cardsPerView = denominator > 0 ? Math.round((track.offsetWidth + gap) / denominator) : 1;
    const computedMaxIndex = Math.max(0, cards.length - cardsPerView);
    return computedMaxIndex;
  };

  const updateLimitsAndDots = () => {
    const computedMaxIndex = calculateLimits();
    setMaxIndex(computedMaxIndex);
    setCurrent((prev) => Math.min(prev, computedMaxIndex));
  };

  useEffect(() => {
    // Initial calculation after mount
    const timer = setTimeout(updateLimitsAndDots, 150);

    // Debounced resize
    let resizeTimer = null;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateLimitsAndDots, 150);
    };

    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
    };
  }, [cards.length]);

  const goTo = (index) => {
    const computedMaxIndex = calculateLimits();
    setMaxIndex(computedMaxIndex);

    let nextIndex = index;
    if (index > computedMaxIndex) {
      nextIndex = 0;
    } else if (index < 0) {
      nextIndex = computedMaxIndex;
    }
    setCurrent(nextIndex);
  };

  // Autoplay Effect
  useEffect(() => {
    if (isHovered || isFocused) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(timer);
      } else {
        // Re-establish timer
        clearInterval(timer);
        timer = setInterval(() => {
          goTo(current + 1);
        }, autoplayMs);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    let timer = setInterval(() => {
      goTo(current + 1);
    }, autoplayMs);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [current, isHovered, isFocused, autoplayMs]);

  // Touch Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartXRef.current - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1);
    }
  };

  // Keyboard Arrow Handlers
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      goTo(current - 1);
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      goTo(current + 1);
      e.preventDefault();
    }
  };

  // Get current translation offset
  const getTransformOffset = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const cardEl = track.children[0];
    if (!cardEl) return 0;
    const cardWidth = cardEl.getBoundingClientRect().width || 100;
    const gap = parseFloat(window.getComputedStyle(track).gap) || 24;
    return current * (cardWidth + gap);
  };

  const dots = [];
  for (let i = 0; i <= maxIndex; i++) {
    dots.push(i);
  }

  const offset = getTransformOffset();

  return (
    <div 
      className="carousel reveal reveal--scale-up reveal-delay-3"
      ref={carouselRef}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={handleKeyDown}
    >
      <div className="carousel__viewport">
        <div 
          className="carousel__track" 
          ref={trackRef}
          style={{ transform: `translateX(-${offset}px)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {children}
        </div>
      </div>

      <div className="carousel__nav">
        <button 
          className="carousel__arrow" 
          onClick={() => goTo(current - 1)}
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        <div className="carousel__dots">
          {dots.map((dotIndex) => (
            <button
              key={dotIndex}
              className={`carousel__dot ${dotIndex === current ? 'active' : ''}`}
              onClick={() => goTo(dotIndex)}
              aria-label={`Go to slide ${dotIndex + 1}`}
            />
          ))}
        </div>

        <button 
          className="carousel__arrow" 
          onClick={() => goTo(current + 1)}
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
