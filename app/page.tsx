import Hero from "@/components/hero/Hero";
import BootSequence from "@/components/effects/BootSequence";
import TrustedCompanies from "@/components/sections/TrustedCompanies";
import ProductShowcase from "@/components/sections/ProductShowcase";
import Features from "@/components/sections/Features";
import Dashboard from "@/components/sections/Dashboard";
import AI from "@/components/sections/AI";
import Automation from "@/components/sections/Automation";
import Security from "@/components/sections/Security";
import Statistics from "@/components/sections/Statistics";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="dark:bg-black dark:text-white light:bg-white light:text-black">
      <Hero />
      <BootSequence />
      <TrustedCompanies />
      <ProductShowcase />
      <Features />
      <Dashboard />
      <AI />
      <Automation />
      <Security />
      <Statistics />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}