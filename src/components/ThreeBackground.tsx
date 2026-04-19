import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = ({isDark}: { isDark: boolean }) => {
  const ref = useRef<THREE.Points>(null);
  const scrollRef = useRef(0);

  const particles = useMemo(() => {
    const pos = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta / 10;
      ref.current.rotation.y += delta / 15;

      // Reactive to scroll
      scrollRef.current = window.scrollY / 1000;
      ref.current.position.y = -scrollRef.current;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? '#fff' : '#000'}
        size={isDark ? 0.005 : 0.008}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

const ThreeBackground = ({isDark}: { isDark: boolean }) => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleField isDark={isDark}/>
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
