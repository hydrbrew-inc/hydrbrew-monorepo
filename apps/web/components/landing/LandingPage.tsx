"use client";

import { BenefitsGrid } from "./BenefitsGrid";
import { BenefitsTicker } from "./BenefitsTicker";
import { CyberpunkMenu } from "./CyberpunkMenu";
import { DualWaveDivider } from "./DualWaveDivider";
import { FAQ } from "./FAQ";
import { FinalCTA } from "./FinalCTA";
import { FloatingNav } from "./FloatingNav";
import { Footer } from "./Footer";
import { FounderClosing } from "./FounderClosing";
import { HeroBifurcation } from "./HeroBifurcation";
import { ManifestoSection } from "./ManifestoSection";
import { NeuralBriefing } from "./NeuralBriefing";
import { PathSeparator } from "./PathSeparator";
import { ProductDNATicker } from "./ProductDNATicker";
import { ProductShowcase } from "./ProductShowcase";
import { ProtocolSection } from "./ProtocolSection";
import { ProtocolTicker } from "./ProtocolTicker";
import { SignupToast } from "./SignupToast";
import { TwoWaysToPlay } from "./TwoWaysToPlay";
import { UnitScanEvent } from "./UnitScanEvent";
import { VideoShowcase } from "./VideoShowcase";

export function LandingPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-black text-white antialiased">
      <CyberpunkMenu />
      <FloatingNav />
      <SignupToast />
      <NeuralBriefing />
      <div id="hero">
        <HeroBifurcation />
      </div>
      <ProductDNATicker />
      <div id="product">
        <ProductShowcase />
      </div>
      <ProtocolTicker />
      <ProtocolSection />
      <BenefitsTicker />
      <BenefitsGrid />
      <PathSeparator />
      <div id="email-capture">
        <FinalCTA />
      </div>
      <PathSeparator />
      <div id="manifesto">
        <ManifestoSection />
      </div>
      <div id="faq">
        <FAQ />
      </div>
      <TwoWaysToPlay />
      <div id="mission-intel-section">
        <VideoShowcase />
      </div>
      <div id="scan-event">
        <UnitScanEvent />
      </div>
      <DualWaveDivider />
      <div id="founder-closing">
        <FounderClosing />
      </div>
      <Footer />
    </div>
  );
}
