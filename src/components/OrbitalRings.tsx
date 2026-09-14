import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface OrbitalRingsProps {
  speed: number;
  intensity: number;
}

export const OrbitalRings: React.FC<OrbitalRingsProps> = ({ speed, intensity }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const ringsRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0.05);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create rings group
    const ringsGroup = new THREE.Group();
    scene.add(ringsGroup);
    ringsRef.current = ringsGroup;

    // Create orbital rings
    const ringColors = [0x00ff88, 0xff0088, 0x0088ff];
    const ringRadii = [1.5, 2.5, 3.5];

    ringRadii.forEach((radius, index) => {
      const geometry = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];

      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
      }

      geometry.setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: ringColors[index],
        transparent: true,
        opacity: 0.6 + intensity * 0.2,
      });

      const ring = new THREE.Line(geometry, material);
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      ringsGroup.add(ring);
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (ringsGroup) {
        ringsGroup.children.forEach((ring, index) => {
          ring.rotation.x += 0.001 * speed * (index % 2 === 0 ? 1 : -1);
          ring.rotation.y += 0.002 * speed * (index % 2 === 0 ? 1 : -1);
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      ringsGroup.children.forEach((ring) => {
        (ring as THREE.Line).geometry.dispose();
        ((ring as THREE.Line).material as THREE.LineBasicMaterial).dispose();
      });
      renderer.dispose();
    };
  }, [speed, intensity]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};
