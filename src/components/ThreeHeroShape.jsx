import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeHeroShape({ themeColor = '#06b6d4' }) {
  const containerRef = useRef(null);
  const materialRef = useRef(null);
  const particleMaterialRef = useRef(null);

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
    if (!containerRef.current) return;

    // Accessibility check: prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      targetMouseX = (x / rect.width) * 2;
      targetMouseY = -(y / rect.height) * 2;
    };

    const handleClick = () => {
      targetPulseScale = 1.45;
      setTimeout(() => {
        targetPulseScale = 1.0;
      }, 250);
    };

    if (!prefersReducedMotion) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('click', handleClick);
    }

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = container.clientWidth || 350;
      const h = container.clientHeight || 350;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      }
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop Settings
    let animationFrameId;
    const clock = new THREE.Clock();
    let isRunning = !prefersReducedMotion;

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

    // VISIBILITY GATING: Pause when hidden
    const startLoop = () => {
      if (!isRunning && !prefersReducedMotion) {
        isRunning = true;
        clock.start();
        animate();
      }
    };

    const stopLoop = () => {
      if (isRunning) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initial render
    if (prefersReducedMotion) {
      renderer.render(scene, camera);
    } else {
      clock.start();
      animate();
    }

    // Clean up
    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

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
  }, []);

  return (
    <div 
      className="three-hero-visual" 
      ref={containerRef} 
      style={{ width: '100%', height: '100%', cursor: 'pointer' }}
    />
  );
}
