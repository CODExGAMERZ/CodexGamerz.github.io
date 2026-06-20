import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeHeroShape({ themeColor = '#06b6d4' }) {
  const containerRef = useRef(null);
  const materialRef = useRef(null);
  const particleMaterialRef = useRef(null);

  // Synchronous initial fallback check to prevent mounting WebGL if unsupported or prefers-reduced-data matches
  const [useFallback] = useState(() => {
    try {
      const prefersReducedData = window.matchMedia('(prefers-reduced-data: reduce)').matches;
      if (prefersReducedData) return true;

      const canvas = document.createElement('canvas');
      const hasWebGL = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('webgl2')));
      return !hasWebGL;
    } catch (e) {
      return true;
    }
  });

  // Sync color with active theme
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.color.set(themeColor);
    }
    if (particleMaterialRef.current) {
      particleMaterialRef.current.color.set(themeColor);
    }
  }, [themeColor]);

  useEffect(() => {
    if (useFallback || !containerRef.current) return;

    // Accessibility check: prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Input check: coarse pointer (touch device)
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    const container = containerRef.current;
    const width = container.clientWidth || 350;
    const height = container.clientHeight || 350;

    // Create Scene
    const scene = new THREE.Scene();

    // Create Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;

    // Create Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
    } catch (e) {
      console.warn('WebGL initialization failed for Hero Shape');
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create Main Mesh: Torus Knot Geometry
    const geometry = new THREE.TorusKnotGeometry(1.2, 0.38, 150, 20);
    
    // Wireframe Mesh Material
    const material = new THREE.MeshBasicMaterial({
      color: themeColor,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    materialRef.current = material;

    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Add Inner Particle Shell
    const particleGeometry = new THREE.IcosahedronGeometry(0.9, 3);
    
    // Generate soft circle texture dynamically for inner particles
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    const pTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      color: themeColor,
      size: 0.12,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.6,
      depthWrite: false,
    });
    particleMaterialRef.current = particleMaterial;

    const innerParticles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(innerParticles);

    // Add a floating outer ring/orbit
    const ringGeo = new THREE.RingGeometry(2.2, 2.22, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: themeColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const orbitRing = new THREE.Mesh(ringGeo, ringMat);
    orbitRing.rotation.x = Math.PI / 3;
    scene.add(orbitRing);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Interaction tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let pulseScale = 1.0;
    let targetPulseScale = 1.0;

    const handlePointerMove = (e) => {
      // Ignore cursor tracking/attraction for coarse pointers (touch-only devices)
      if (isCoarsePointer) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      targetMouseX = (x / rect.width) * 2;
      targetMouseY = -(y / rect.height) * 2;
    };

    const handlePointerDown = () => {
      targetPulseScale = 1.45;
      setTimeout(() => {
        targetPulseScale = 1.0;
      }, 250);
    };

    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerdown', handlePointerDown, { passive: true });

    // Debounced Resize and orientation handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!containerRef.current) return;
        const w = container.clientWidth || 350;
        const h = container.clientHeight || 350;

        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);

        if (prefersReducedMotion) {
          renderer.render(scene, camera);
        }
      }, 150);
    };

    const handleOrientationChange = () => {
      handleResize();
    };

    const viewport = window.visualViewport;
    if (viewport) {
      viewport.addEventListener('resize', handleResize);
    } else {
      window.addEventListener('resize', handleResize);
    }

    if (window.screen && window.screen.orientation) {
      window.screen.orientation.addEventListener('change', handleOrientationChange);
    } else {
      window.addEventListener('orientationchange', handleOrientationChange);
    }

    // Animation Loop Settings
    let animationFrameId;
    const clock = new THREE.Clock();
    let isRunning = false;
    let isTabVisible = !document.hidden;
    let isElementVisible = true;

    const animate = () => {
      if (!isRunning) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Lerp mouse and pulse scale
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;
      pulseScale += (targetPulseScale - pulseScale) * 0.15;

      // Base rotations
      torusKnot.rotation.y = elapsedTime * 0.45;
      torusKnot.rotation.x = elapsedTime * 0.2;

      innerParticles.rotation.y = -elapsedTime * 0.3;
      innerParticles.rotation.z = elapsedTime * 0.1;

      orbitRing.rotation.z = elapsedTime * 0.15;

      // Rotate torus based on mouse displacement
      torusKnot.rotation.y += mouseX * 0.8;
      torusKnot.rotation.x += mouseY * 0.8;

      // Apply dynamic pulse scale
      const currentScale = pulseScale + Math.sin(elapsedTime * 4) * 0.04;
      torusKnot.scale.set(currentScale, currentScale, currentScale);
      innerParticles.scale.set(currentScale * 0.95, currentScale * 0.95, currentScale * 0.95);

      renderer.render(scene, camera);
    };

    // State change checks to run or stop animation updates
    const runOrStopLoop = () => {
      const shouldRun = isTabVisible && isElementVisible && !prefersReducedMotion;
      if (shouldRun) {
        if (!isRunning) {
          isRunning = true;
          clock.start();
          animate();
        }
      } else {
        if (isRunning) {
          isRunning = false;
          cancelAnimationFrame(animationFrameId);
        }
      }
    };

    // Visibility events
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      runOrStopLoop();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Viewport Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isElementVisible = entry.isIntersecting;
          runOrStopLoop();
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Initial Trigger
    if (prefersReducedMotion) {
      renderer.render(scene, camera);
    } else {
      isElementVisible = true;
      runOrStopLoop();
    }

    // Clean up
    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
      
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      if (viewport) {
        viewport.removeEventListener('resize', handleResize);
      } else {
        window.removeEventListener('resize', handleResize);
      }

      if (window.screen && window.screen.orientation) {
        window.screen.orientation.removeEventListener('change', handleOrientationChange);
      } else {
        window.removeEventListener('orientationchange', handleOrientationChange);
      }
      
      observer.disconnect();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      pTexture.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, [useFallback]);

  if (useFallback) {
    return (
      <div 
        className="three-hero-visual" 
        style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
      >
        <svg viewBox="0 0 100 100" className="three-hero-fallback-svg" style={{ width: '100%', height: '100%', maxWidth: '280px' }}>
          <defs>
            <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={themeColor} />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke={themeColor} strokeWidth="0.75" opacity="0.3" transform="rotate(-30 50 50)" />
          <path d="M50,20 Q65,25 75,35 T80,50 T70,65 T50,80 T30,65 T20,50 T35,35 Z" fill="none" stroke="url(#glowGrad)" strokeWidth="2" filter="url(#neonGlow)" />
          <path d="M50,25 Q60,30 68,38 T72,50 T64,62 T50,75 T36,62 T28,50 T38,38 Z" fill="none" stroke="url(#glowGrad)" strokeWidth="0.75" strokeDasharray="1.5,1.5" opacity="0.6" />
          <circle cx="50" cy="50" r="10" fill="none" stroke="url(#glowGrad)" strokeWidth="1" opacity="0.8" />
          <circle cx="50" cy="50" r="2" fill="#fff" filter="url(#neonGlow)" />
          <circle cx="46" cy="46" r="1" fill={themeColor} />
          <circle cx="54" cy="54" r="0.8" fill="#6366f1" />
          <circle cx="48" cy="55" r="0.8" fill="#ec4899" />
        </svg>
      </div>
    );
  }

  return (
    <div 
      className="three-hero-visual" 
      ref={containerRef} 
      style={{ width: '100%', height: '100%', cursor: 'pointer' }}
    />
  );
}
