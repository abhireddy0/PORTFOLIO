import { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import DistortedSphere from './DistortedSphere';
import FloatingShapes from './FloatingShapes';

export default function HeroScene() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const rectRef = useRef<DOMRect | null>(null);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 4], fov: 45 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      onPointerMove={(e) => {
        if (!rectRef.current) {
          rectRef.current = (e.target as HTMLCanvasElement).getBoundingClientRect();
        }
        const r = rectRef.current;
        setPointer({
          x: ((e.clientX - r.left) / r.width) * 2 - 1,
          y: -(((e.clientY - r.top) / r.height) * 2 - 1),
        });
      }}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
    >
      <color attach="background" args={['#05060A']} />
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 4, 4]} intensity={2.2} color="#00E5FF" />
      <pointLight position={[-4, -3, 3]} intensity={1.8} color="#FF2EC4" />

      <DistortedSphere pointer={pointer} />
      <FloatingShapes />

      <EffectComposer>
        <Bloom intensity={0.35} luminanceThreshold={0.3} luminanceSmoothing={0.7} mipmapBlur />
        <ChromaticAberration
          offset={new THREE.Vector2(0.0008, 0.0008)}
          blendFunction={BlendFunction.NORMAL}
          radialModulation={false}
          modulationOffset={0}
        />
      </EffectComposer>
    </Canvas>
  );
}
