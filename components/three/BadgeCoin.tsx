"use client";

// Lighter, standalone version of the coin renderer described in the FAQ —
// same idea (category-differentiated 3D badge, drag to inspect), rebuilt
// procedurally here since the marketing site doesn't share a bundle with
// the app. Front/back faces are canvas-generated textures; the category
// only changes color/material, matching how the real award engine
// differentiates Streak / Points / Anniversary / Special badges.

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type BadgeCategory = "streak" | "points" | "anniversary" | "special";

const CATEGORY_STYLE: Record<
  BadgeCategory,
  { color: string; emissive: string; metalness: number; roughness: number }
> = {
  streak: { color: "#FF7B54", emissive: "#FF7B54", metalness: 0.55, roughness: 0.35 },
  points: { color: "#4F8CFF", emissive: "#4F8CFF", metalness: 0.6, roughness: 0.3 },
  anniversary: { color: "#F5C15A", emissive: "#F5C15A", metalness: 0.75, roughness: 0.22 },
  special: { color: "#9D7DFF", emissive: "#47D7FF", metalness: 0.65, roughness: 0.25 },
};

function makeFaceTexture(label: string, color: string) {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#0E1323";
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = color;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 14, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.font = "bold 220px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, size / 2, size / 2 + 16);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function BadgeCoin({
  category,
  dragRef,
}: {
  category: BadgeCategory;
  dragRef: React.MutableRefObject<{ dx: number; dy: number; dragging: boolean }>;
}) {
  const group = useRef<THREE.Group>(null);
  const style = CATEGORY_STYLE[category];

  // Bake the 90° rotation into the geometry itself (not a mesh/group
  // transform) so the coin's flat caps face the camera (+Z/-Z) by default,
  // and every sibling mesh can be positioned/rotated in the same simple
  // Z-axis terms without fighting a parent transform.
  const coinGeometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(1.15, 1.15, 0.22, 64);
    geo.rotateX(Math.PI / 2);
    return geo;
  }, []);

  const frontTexture = useMemo(() => makeFaceTexture("V", style.color), [style.color]);
  const backTexture = useMemo(
    () => makeFaceTexture(category === "anniversary" ? "\u2605" : "\u2713", style.color),
    [category, style.color]
  );

  useFrame((_, delta) => {
    if (!group.current) return;
    const drag = dragRef.current;

    if (drag.dragging) {
      group.current.rotation.y += drag.dx * 0.01;
      group.current.rotation.x = THREE.MathUtils.clamp(
        group.current.rotation.x + drag.dy * 0.01,
        -0.6,
        0.6
      );
      drag.dx = 0;
      drag.dy = 0;
    } else {
      // Gentle idle spin so the coin never looks static while waiting to be dragged.
      group.current.rotation.y += delta * 0.35;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0, 0.02);
    }
  });

  return (
    <group ref={group}>
      {/* Coin body */}
      <mesh geometry={coinGeometry}>
        <meshStandardMaterial
          color={style.color}
          metalness={style.metalness}
          roughness={style.roughness}
          emissive={style.emissive}
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Front face — circle's default normal (+Z) already faces the camera */}
      <mesh position={[0, 0, 0.111]}>
        <circleGeometry args={[1.1, 64]} />
        <meshStandardMaterial map={frontTexture} metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Back face — flipped 180° so its normal faces -Z, outward on that side */}
      <mesh position={[0, 0, -0.111]} rotation={[0, Math.PI, 0]}>
        <circleGeometry args={[1.1, 64]} />
        <meshStandardMaterial map={backTexture} metalness={0.3} roughness={0.4} />
      </mesh>
    </group>
  );
}
