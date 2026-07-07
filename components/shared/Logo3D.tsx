"use client";

import Image from "next/image";

export default function Logo3D({ size = 36 }: { size?: number }) {
  return (
    <div
      className="logo3d-scene"
      style={{ width: size, height: size }}
    >
      <div className="logo3d-inner">
        {/* Front face — the real mark */}
        <div className="logo3d-face logo3d-front">
          <Image
            src="/logo.png"
            alt="Veltrax"
            width={size}
            height={size}
            className="drop-shadow-lg drop-shadow-blue-500/30"
            priority
          />
        </div>

        {/* Back face — abstract data mark, only visible when rotated */}
        <div className="logo3d-face logo3d-back">
          <div className="logo3d-back-mark">
            <span className="logo3d-back-dot" />
          </div>
        </div>
      </div>
    </div>
  );
}