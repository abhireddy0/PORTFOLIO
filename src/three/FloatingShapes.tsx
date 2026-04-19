import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 18;

export default function FloatingShapes() {
  const group = useRef<THREE.Group>(null);

  const shapes = useRef(
    Array.from({ length: COUNT }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4 - 2,
      ] as [number, number, number],
      scale: 0.05 + Math.random() * 0.12,
      speed: 0.2 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
      kind: i % 3,
    }))
  );

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const s = shapes.current[i];
      child.position.y += Math.sin(t * s.speed + s.phase) * 0.002;
      child.rotation.x += 0.003 * s.speed;
      child.rotation.y += 0.004 * s.speed;
    });
  });

  return (
    <group ref={group}>
      {shapes.current.map((s, i) => (
        <mesh key={i} position={s.position} scale={s.scale}>
          {s.kind === 0 && <octahedronGeometry args={[1, 0]} />}
          {s.kind === 1 && <tetrahedronGeometry args={[1, 0]} />}
          {s.kind === 2 && <torusGeometry args={[1, 0.35, 8, 24]} />}
          <meshStandardMaterial
            color={i % 2 === 0 ? '#00E5FF' : '#FF2EC4'}
            emissive={i % 2 === 0 ? '#00E5FF' : '#FF2EC4'}
            emissiveIntensity={0.6}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}
