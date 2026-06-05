"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
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
import { UnitScanEvent } from "./UnitScanEvent";
import { VideoShowcase } from "./VideoShowcase";
import { LiveCountersProvider } from "./useLiveCounters";

export function LandingPage() {
  const [missionIntelOpen, setMissionIntelOpen] = useState(false);
  const [scanEventOpen, setScanEventOpen] = useState(false);

  return (
    <LiveCountersProvider>
      <div className="min-h-screen bg-black text-white antialiased overflow-x-hidden w-full">
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
        <div id="protocol">
          <ProtocolSection />
        </div>
        <BenefitsTicker />
        <div id="benefits">
          <BenefitsGrid />
        </div>
        <PathSeparator />
        <div id="email-capture">
          <FinalCTA />
        </div>
        <div className="hidden md:block">
          <PathSeparator />
        </div>
        <div id="manifesto" className="hidden md:block">
          <ManifestoSection />
        </div>
        <div id="faq">
          <FAQ />
        </div>
        <AnimatePresence>
          {missionIntelOpen && (
            <motion.div
              id="mission-intel-section"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <VideoShowcase />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {scanEventOpen && (
            <motion.div
              id="scan-event"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <UnitScanEvent />
            </motion.div>
          )}
        </AnimatePresence>
        <DualWaveDivider />
        <div id="founder-closing">
          <FounderClosing />
        </div>
        <Footer />
      </div>
    </LiveCountersProvider>
  );
}
