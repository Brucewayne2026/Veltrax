"use client";

export default function Lights() {
  return (
    <>
      <ambientLight intensity={1.2} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
      />

      <pointLight
        position={[-5, 3, 5]}
        intensity={3}
        color="#3b82f6"
      />

      <pointLight
        position={[5, -3, 5]}
        intensity={2}
        color="#8b5cf6"
      />
    </>
  );
}