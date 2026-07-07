"use client";

import Navbar from "@/components/layout/Navbar";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import ProductionTicker from "./ProductionTicker";
import ScrollIndicator from "./ScrollIndicator";
import dynamic from "next/dynamic";

const CanvasWrapper = dynamic(() => import("@/components/three/CanvasWrapper"), {
  ssr: false,
});

export default function Hero() {
  return (
    <>
      <Navbar />

      <section className="relative min-h-screen overflow-hidden">
        <HeroBackground />

        {/* 3D Logo Canvas */}
        <CanvasWrapper />

        <HeroContent />

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <ProductionTicker />
        </div>

        <ScrollIndicator />
      </section>
    </>
  );
}