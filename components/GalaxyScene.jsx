'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function GalaxyScene({ phase, logoData }) {
  const particlesRef = useRef();
  const starsRef = useRef();
  const morphProgress = useRef(0);
  const targetRotation = useRef(0);
  const isMobile = useRef();

  useEffect(() => {
    const checkMobile = () => {
      isMobile.current = window.innerWidth < 768;
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const guiChange = {
    radius: 8,
    spin: 0.8,
    branch: 4,
    power: 3,
    insideColor: '#ff6030',
    outsideColor: '#1b3984',
  };

  const { origins, galaxyColors, targetPositions, targetColors, starPos } = useMemo(() => {
    if (!logoData) return {};

    const count = logoData.count;
    const origins = new Float32Array(count * 3);
    const galaxyColors = new Float32Array(count * 3);
    const starPos = new Float32Array(100000 * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * guiChange.radius;
      const branch = ((i % guiChange.branch) / guiChange.branch) * Math.PI * 2;
      const spin = radius * guiChange.spin;
      
      const randomX = Math.pow(Math.random(), guiChange.power) * (Math.random() < 0.5 ? -1 : 1);
      const randomY = Math.pow(Math.random(), guiChange.power) * (Math.random() < 0.5 ? -1 : 1);
      const randomZ = Math.pow(Math.random(), guiChange.power) * (Math.random() < 0.5 ? -1 : 1);

      origins[i3] = Math.cos(branch + spin) * radius + randomX * 2;
      origins[i3 + 1] = randomY * 2;
      origins[i3 + 2] = Math.sin(branch + spin) * radius + randomZ * 2;

      const colorInside = new THREE.Color(guiChange.insideColor);
      const colorOutside = new THREE.Color(guiChange.outsideColor);
      const mixedColor = colorInside.clone().lerp(colorOutside, radius / guiChange.radius);
      
      galaxyColors[i3] = mixedColor.r;
      galaxyColors[i3 + 1] = mixedColor.g;
      galaxyColors[i3 + 2] = mixedColor.b;
    }

    for (let i = 0; i < 100000; i++) {
      starPos[i] = (Math.random() - 0.5) * 20;
    }

    return { origins, galaxyColors, targetPositions: logoData.targets, targetColors: logoData.colors, starPos };
  }, [logoData]);

  useEffect(() => {
    if (particlesRef.current && origins) {
      particlesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(origins), 3));
      particlesRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(galaxyColors), 3));
    }
  }, [origins, galaxyColors]);

  useFrame((state, delta) => {
    if (!logoData || !particlesRef.current) return;

    if (starsRef.current) {
      starsRef.current.rotation.y += delta/8;
    }

    if (phase === 0) {
        state.camera.position.lerp(new THREE.Vector3(0, 6, 10), 0.05);
      state.camera.lookAt(0, 0, 0);
    } 
    else if (phase >= 1) {
      state.camera.position.lerp(new THREE.Vector3(0, 0, 10), 0.05);
      state.camera.lookAt(0, 0, 0);
    }

    if (phase < 2) {
      particlesRef.current.rotation.y += delta * 0.15;
      targetRotation.current = Math.round(particlesRef.current.rotation.y / (Math.PI * 2)) * (Math.PI * 2);
    } else {
      particlesRef.current.rotation.y = THREE.MathUtils.lerp(particlesRef.current.rotation.y, targetRotation.current, 0.06);
    }

    if (phase >= 2) {
      morphProgress.current = THREE.MathUtils.lerp(morphProgress.current, 1, 0.04);
      particlesRef.current.material.size = THREE.MathUtils.lerp(0.01, 0.035, morphProgress.current);
      if(isMobile.current==true){
        state.camera.position.lerp(new THREE.Vector3(0, 0, 30), 0.05);
        state.camera.lookAt(0, 0, 0);
      }
      
      const positions = particlesRef.current.geometry.attributes.position.array;
      const colors = particlesRef.current.geometry.attributes.color.array;

      for (let i = 0; i < logoData.count; i++) {
        const i3 = i * 3;
        positions[i3] = THREE.MathUtils.lerp(origins[i3], targetPositions[i3], morphProgress.current);
        positions[i3 + 1] = THREE.MathUtils.lerp(origins[i3 + 1], targetPositions[i3 + 1], morphProgress.current);
        positions[i3 + 2] = THREE.MathUtils.lerp(origins[i3 + 2], targetPositions[i3 + 2], morphProgress.current);
        
        colors[i3] = THREE.MathUtils.lerp(galaxyColors[i3], targetColors[i3], morphProgress.current);
        colors[i3 + 1] = THREE.MathUtils.lerp(galaxyColors[i3 + 1], targetColors[i3 + 1], morphProgress.current);
        colors[i3 + 2] = THREE.MathUtils.lerp(galaxyColors[i3 + 2], targetColors[i3 + 2], morphProgress.current);
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  if (!logoData) return null;

  return (
    <>
      <color attach="background" args={['#00000c']} />
      <points ref={particlesRef}>
        <bufferGeometry />
        <pointsMaterial
          size={0.01}
          sizeAttenuation
          vertexColors
          transparent
          depthWrite={false}
        />
      </points>
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPos, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.01} color="#ffffff" sizeAttenuation transparent opacity={1} />
      </points>
    </>
  );
}