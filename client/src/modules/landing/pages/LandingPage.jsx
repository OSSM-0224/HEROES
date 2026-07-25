import React, { useState } from 'react';
import { Navbar } from '../../../components/common/Navbar.jsx';
import { Footer } from '../../../components/common/Footer.jsx';
import { useLandingAnimations } from '../hooks/useLandingAnimations.js';
import { useDemoLogin } from '../hooks/useDemoLogin.js';
import { HeroSection } from '../components/HeroSection.jsx';
import { SocialProofStrip } from '../components/SocialProofStrip.jsx';
import { ProductShowcase } from '../components/ProductShowcase.jsx';
import { FeaturesSection } from '../components/FeaturesSection.jsx';
import { WorkflowSection } from '../components/WorkflowSection.jsx';
import { TestimonialsSection } from '../components/TestimonialsSection.jsx';
import { CTABanner } from '../components/CTABanner.jsx';
import { VideoModal } from '../components/VideoModal.jsx';

export const LandingPage = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const refs = useLandingAnimations();
  const { handleDemoLogin } = useDemoLogin();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      <Navbar />
      <HeroSection refs={refs} onDemoLogin={handleDemoLogin} onWatchVideo={() => setIsVideoModalOpen(true)} />
      <SocialProofStrip />
      <ProductShowcase refs={refs} />
      <FeaturesSection refs={refs} />
      <WorkflowSection refs={refs} />
      <TestimonialsSection refs={refs} />
      <CTABanner onDemoLogin={handleDemoLogin} />
      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} onDemoLogin={handleDemoLogin} />
      <Footer />
    </div>
  );
};
