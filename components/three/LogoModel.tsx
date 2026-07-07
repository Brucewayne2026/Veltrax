"use client";

import { useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

export default function LogoModel() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/veltrax_logo.glb");

  // Clone so multiple instances (if ever reused) don't share state,
  // and give every mesh a touch of glass-like finish to match the
  // site's glassmorphism material language.
  const model = useMemo(() => {
    const cloned = scene.clone(true);
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const original = child.material as THREE.MeshStandardMaterial;
        child.material = new THREE.MeshPhysicalMaterial({
          vertexColors: true,
          roughness: 0.25,
          metalness: 0.55,
          ...(original?.color ? {} : {}),
        });
      }
    });
    return cloned;
  }, [scene]);

  useFrame((state) => {
    if (!group.current) return;

    group.current.rotation.y = state.clock.elapsedTime * 0.3;

    group.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.5) * 0.15;

    group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.18;

    group.current.rotation.y +=
      (state.pointer.x * 0.4 - group.current.rotation.y) * 0.03;

    group.current.rotation.x +=
      (-state.pointer.y * 0.2 - group.current.rotation.x) * 0.03;
  });

  return (
    <group ref={group}>
      <Center>
        <primitive object={model} scale={1.0} />
      </Center>
    </group>
  );
}

useGLTF.preload("/models/veltrax_logo.glb");