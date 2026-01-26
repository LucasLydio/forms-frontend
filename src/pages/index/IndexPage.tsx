import React from "react";

import { HeroSection } from "./sections/HeroSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { StatsSection } from "./sections/StatsSection";
import { CtaSection } from "./sections/CtaSection";

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CtaSection />
    </div>
  );
}
