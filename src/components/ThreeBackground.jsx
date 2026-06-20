import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Accessibility check: prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL not supported');
      return;
    }

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create Scene
    const scene = new THREE.Scene();

    // Create Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 150);
    camera.position.set(0, 0, 28);

    // Configure Renderer
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create soft circular texture dynamically for nodes
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(99, 102, 241, 0.8)'); // Indigo
      grad.addColorStop(0.7, 'rgba(20, 184, 166, 0.2)'); // Teal
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
      return new THREE.CanvasTexture(canvas);
    };

    const nodeTexture = createCircleTexture();

    // Create a parent group to hold nodes and lines for uniform rotations
    const plexusGroup = new THREE.Group();
    scene.add(plexusGroup);

    // Configuration for a tall, page-spanning plexus network
    const maxNodes = 400;
    const maxConnections = 650;
    const connectionDistance = 7.0;

    // Generate Nodes
    const nodes = [];
    const nodePositions = new Float32Array(maxNodes * 3);
    const nodeColors = new Float32Array(maxNodes * 3);

    const colorIndigo = new THREE.Color('#6366f1');
    const colorTeal = new THREE.Color('#14b8a6');
    const colorPink = new THREE.Color('#ec4899');
    const colorsList = [colorIndigo, colorTeal, colorPink];

    // Center Y at -70, spanning from -190 to +50 (covers up to 4500px scroll depth)
    const centerY = -70;
    const spanY = 240;

    for (let i = 0; i < maxNodes; i++) {
      const x = (Math.random() - 0.5) * 55;
      const y = (Math.random() - 0.5) * spanY + centerY;
      const z = (Math.random() - 0.5) * 45;

      nodes.push({
        x, y, z,
        vx: (Math.random() - 0.5) * 0.04,
        vy: (Math.random() - 0.5) * 0.04,
        vz: (Math.random() - 0.5) * 0.04,
      });

      nodePositions[i * 3] = x;
      nodePositions[i * 3 + 1] = y;
      nodePositions[i * 3 + 2] = z;

      // Assign palette color
      const mixColor = colorsList[Math.floor(Math.random() * colorsList.length)];
      nodeColors[i * 3] = mixColor.r;
      nodeColors[i * 3 + 1] = mixColor.g;
      nodeColors[i * 3 + 2] = mixColor.b;
    }

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    nodeGeometry.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));

    const nodeMaterial = new THREE.PointsMaterial({
      size: 0.9,
      sizeAttenuation: true,
      map: nodeTexture,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });

    const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
    plexusGroup.add(nodePoints);

    // Create Line Segments for connection plexus lines
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    const lineColors = new Float32Array(maxConnections * 2 * 3);

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false,
    });

    const plexusLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    plexusGroup.add(plexusLines);

    // Track scroll and cursor inputs
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('scroll', handleScroll);
    }

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      
      // If motion is reduced, render static scene on resize
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      }
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop Variables
    let animationFrameId;
    const clock = new THREE.Clock();
    let isRunning = !prefersReducedMotion;

    // Spatial partitioning grid bucketing settings
    const cellSize = connectionDistance;

    const animate = () => {
      if (!isRunning) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Lerp mouse and scroll inputs
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.06;

      // Slowly rotate the plexus
      plexusGroup.rotation.y = elapsedTime * 0.02 + scrollY * 0.0001;
      plexusGroup.rotation.x = elapsedTime * 0.008;

      // Map scrollY to camera position: camera moves down as user scrolls down
      const cameraY = -scrollY * 0.038;
      camera.position.y = cameraY;
      camera.position.x = mouseX * 2.5;

      // Update Node positions (Drift inside boundary box)
      const nodePosArray = nodeGeometry.attributes.position.array;
      for (let i = 0; i < maxNodes; i++) {
        const node = nodes[i];
        
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        const boundaryX = 26;
        const boundaryZ = 22;
        const halfSpanY = spanY / 2;

        if (Math.abs(node.x) > boundaryX) node.vx *= -1;
        if (Math.abs(node.z) > boundaryZ) node.vz *= -1;

        // Bounce relative to the center Y coordinate
        if (Math.abs(node.y - centerY) > halfSpanY) node.vy *= -1;

        nodePosArray[i * 3] = node.x;
        nodePosArray[i * 3 + 1] = node.y;
        nodePosArray[i * 3 + 2] = node.z;
      }
      nodeGeometry.attributes.position.needsUpdate = true;

      // SPATIAL PARTITIONING (Grid Bucketing) to achieve O(N) connections pass
      const grid = {};
      for (let i = 0; i < maxNodes; i++) {
        const node = nodes[i];
        const cx = Math.floor(node.x / cellSize);
        const cy = Math.floor(node.y / cellSize);
        const cz = Math.floor(node.z / cellSize);
        const key = `${cx},${cy},${cz}`;
        if (!grid[key]) grid[key] = [];
        grid[key].push(i);
      }

      // Update Connections (Plexus Lines)
      const linePosArray = lineGeometry.attributes.position.array;
      const lineColArray = lineGeometry.attributes.color.array;
      
      let vertexIdx = 0;
      let colorIdx = 0;
      let connectionCount = 0;

      // Mouse vector in local space for interactive connection lines
      const mouse3D = new THREE.Vector3(mouseX * 25, cameraY + mouseY * 15, 0);
      mouse3D.applyMatrix4(new THREE.Matrix4().copy(plexusGroup.matrixWorld).invert());

      // Find node-to-node connections within adjacent cells in 3D grid
      for (let i = 0; i < maxNodes; i++) {
        const nodeA = nodes[i];
        const cx = Math.floor(nodeA.x / cellSize);
        const cy = Math.floor(nodeA.y / cellSize);
        const cz = Math.floor(nodeA.z / cellSize);

        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            for (let dz = -1; dz <= 1; dz++) {
              const key = `${cx + dx},${cy + dy},${cz + dz}`;
              const cellNodes = grid[key];
              if (!cellNodes) continue;

              for (let k = 0; k < cellNodes.length; k++) {
                const j = cellNodes[k];
                if (j <= i) continue; // prevent double checking or self-checks
                if (connectionCount >= maxConnections) break;

                const nodeB = nodes[j];
                const distX = nodeA.x - nodeB.x;
                const distY = nodeA.y - nodeB.y;
                const distZ = nodeA.z - nodeB.z;
                const distSq = distX * distX + distY * distY + distZ * distZ;

                if (distSq < connectionDistance * connectionDistance) {
                  linePosArray[vertexIdx++] = nodeA.x;
                  linePosArray[vertexIdx++] = nodeA.y;
                  linePosArray[vertexIdx++] = nodeA.z;
                  
                  linePosArray[vertexIdx++] = nodeB.x;
                  linePosArray[vertexIdx++] = nodeB.y;
                  linePosArray[vertexIdx++] = nodeB.z;

                  lineColArray[colorIdx++] = nodeColors[i * 3];
                  lineColArray[colorIdx++] = nodeColors[i * 3 + 1];
                  lineColArray[colorIdx++] = nodeColors[i * 3 + 2];

                  lineColArray[colorIdx++] = nodeColors[j * 3];
                  lineColArray[colorIdx++] = nodeColors[j * 3 + 1];
                  lineColArray[colorIdx++] = nodeColors[j * 3 + 2];

                  connectionCount++;
                }
              }
            }
          }
        }
      }

      // Check grid surrounding the mouse position to link nodes to cursor in O(1)
      const mcx = Math.floor(mouse3D.x / cellSize);
      const mcy = Math.floor(mouse3D.y / cellSize);
      const mcz = Math.floor(mouse3D.z / cellSize);

      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dz = -1; dz <= 1; dz++) {
            const key = `${mcx + dx},${mcy + dy},${mcz + dz}`;
            const cellNodes = grid[key];
            if (!cellNodes) continue;

            for (let k = 0; k < cellNodes.length; k++) {
              const i = cellNodes[k];
              if (connectionCount >= maxConnections) break;

              const nodeA = nodes[i];
              const mdx = nodeA.x - mouse3D.x;
              const mdy = nodeA.y - mouse3D.y;
              const mdz = nodeA.z - mouse3D.z;
              const mDistSq = mdx * mdx + mdy * mdy + mdz * mdz;

              if (mDistSq < (connectionDistance * 1.3) * (connectionDistance * 1.3)) {
                linePosArray[vertexIdx++] = nodeA.x;
                linePosArray[vertexIdx++] = nodeA.y;
                linePosArray[vertexIdx++] = nodeA.z;

                linePosArray[vertexIdx++] = mouse3D.x;
                linePosArray[vertexIdx++] = mouse3D.y;
                linePosArray[vertexIdx++] = mouse3D.z;

                lineColArray[colorIdx++] = nodeColors[i * 3];
                lineColArray[colorIdx++] = nodeColors[i * 3 + 1];
                lineColArray[colorIdx++] = nodeColors[i * 3 + 2];

                lineColArray[colorIdx++] = 0.03;
                lineColArray[colorIdx++] = 0.71;
                lineColArray[colorIdx++] = 0.83;

                connectionCount++;
              }
            }
          }
        }
      }

      lineGeometry.setDrawRange(0, connectionCount * 2);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      camera.lookAt(0, cameraY, 0);

      renderer.render(scene, camera);
    };

    // VISIBILITY GATING: Pause loop when tab is hidden, resume when active
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

    // Initial render / Start loop
    if (prefersReducedMotion) {
      // Just render static scene once
      renderer.render(scene, camera);
    } else {
      clock.start();
      animate();
    }

    // Clean up
    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      nodeGeometry.dispose();
      nodeMaterial.dispose();
      nodeTexture.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div className="three-bg" ref={containerRef} />;
}
