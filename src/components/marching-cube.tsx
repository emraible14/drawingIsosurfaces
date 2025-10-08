import { useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

export function MarchingCube({ offset }: { offset: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + offset; // phase offset

    const stepTime = 2.5;
    const phase = (t % stepTime) / stepTime;
    const direction = Math.floor(t / stepTime) % 2 === 0 ? 1 : -1;

    const rollAngle = Math.sin(phase * Math.PI) * (Math.PI / 4) * direction;
    const x = THREE.MathUtils.lerp(-8, 8, ((t / (stepTime * 4)) % 1));
    const y = Math.sin(phase * Math.PI) * 1.0;

    meshRef.current.rotation.set(rollAngle, rollAngle, rollAngle);
    meshRef.current.position.set(x, y - 1, 0);
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color="skyblue" transparent opacity={0.3} />
      <Edges color="black" />
    </mesh>
  );
}