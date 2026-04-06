import "./landing.css";
import { CharacterMissionSection } from "../components/landing/CharacterMissionSection";
import { ClosingCtaSection } from "../components/landing/ClosingCtaSection";
import { FaqArchiveSection } from "../components/landing/FaqArchiveSection";
import { HeroSection } from "../components/landing/HeroSection";
import { HowItWorksSection } from "../components/landing/HowItWorksSection";
import { HydrCoreTerminalSection } from "../components/landing/HydrCoreTerminalSection";
import { LandingOuraSection } from "../components/landing/LandingOuraSection";
import { MeasuredManifestoSection } from "../components/landing/MeasuredManifestoSection";
import { PathForkSection } from "../components/landing/PathForkSection";
import { ProductStorySection } from "../components/landing/ProductStorySection";
import { FloatingBriefingButton } from "../components/landing/FloatingBriefingButton";
import { ProtocolTicker } from "../components/landing/ProtocolTicker";
import { ReferralSection } from "../components/landing/ReferralSection";
import { ScanGameHudSection } from "../components/landing/ScanGameHudSection";
import { SiteFooter } from "../components/landing/SiteFooter";
import { SiteHeader } from "../components/landing/SiteHeader";
import { TestimonialsSection } from "../components/landing/TestimonialsSection";
import { TwoWaysToPlaySection } from "../components/landing/TwoWaysToPlaySection";
import { UpgradeIntelSection } from "../components/landing/UpgradeIntelSection";
import { WaitlistNftSection } from "../components/landing/WaitlistNftSection";

export default function Home() {
  return (
    <div className="lp lp-pad-bottom-ticker">
      <SiteHeader />
      <main className="lp-main">
        <HeroSection />
        <PathForkSection />
        <ProductStorySection />
        <HowItWorksSection />
        <UpgradeIntelSection />
        <WaitlistNftSection />
        <TestimonialsSection />
        <ReferralSection />
        <MeasuredManifestoSection />
        <LandingOuraSection />
        <FaqArchiveSection />
        <TwoWaysToPlaySection />
        <HydrCoreTerminalSection />
        <CharacterMissionSection />
        <ScanGameHudSection />
        <ClosingCtaSection />
      </main>
      <SiteFooter />
      <FloatingBriefingButton />
      <ProtocolTicker />
    </div>
  );
}
