import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface EnergyCoreProps {
  intensity: number;
  temperature: number;
}

export const EnergyCore: React.FC<EnergyCoreProps> = ({ intensity, temperature }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const coreRef = useRef<THREE.Group | null>(null);

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
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0.05);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create core group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);
    coreRef.current = coreGroup;

    // Main sphere
    const coreGeometry = new THREE.IcosahedronGeometry(1, 8);
    const coreMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color().setHSL(0.55, 1, 0.5 + intensity * 0.2),
      emissive: new THREE.Color().setHSL(0.55, 1, 0.3 + intensity * 0.3),
      wireframe: false,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    coreGroup.add(core);

    // Glow layer
    const glowGeometry = new THREE.IcosahedronGeometry(1.1, 8);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(0.55, 1, 0.6),
      transparent: true,
      opacity: intensity * 0.4,
      side: THREE.BackSide,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    coreGroup.add(glow);

    // Lighting
    const light = new THREE.PointLight(0x00ff88, 1, 100);
    light.position.set(5, 5, 5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (coreGroup) {
        coreGroup.rotation.x += 0.002;
        coreGroup.rotation.y += 0.003;
        core.rotation.z += 0.001;

        // Update core color based on temperature
        const hue = 0.55 - (temperature - 1000) / 4000 * 0.15;
        coreMaterial.color.setHSL(hue, 1, 0.5 + intensity * 0.2);
        coreMaterial.emissive.setHSL(hue, 1, 0.3 + intensity * 0.3);
        glowMaterial.opacity = intensity * 0.4;
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
      coreGeometry.dispose();
      coreMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      renderer.dispose();
    };
  }, [intensity, temperature]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};
