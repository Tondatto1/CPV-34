import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TargetSection } from './components/TargetSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ScheduleSection } from './components/ScheduleSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { TrustCompaniesSection } from './components/TrustCompaniesSection';
import { AboutUsSection } from './components/AboutUsSection';
import { PlanBuilderSection } from './components/PlanBuilderSection';
import { LocationSection } from './components/LocationSection';
import { CheckoutSection } from './components/CheckoutSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';
import { PartnerModal } from './components/PartnerModal';
import { PartnerProvider } from './context/PartnerContext';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState<string | undefined>();

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlanName(undefined);
  };

  const handleScrollToCheckout = () => {
    const section = document.getElementById('checkout-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PartnerProvider>
      <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-blue-50/80 via-emerald-50/40 via-white to-slate-50 font-sans text-slate-900 antialiased selection:bg-emerald-600 selection:text-white scroll-smooth">

        {/* Top Fixed Header */}
        <Header onOpenCtaModal={handleScrollToCheckout} />

        <main className="w-full overflow-x-hidden">
          {/* 1ª SEÇÃO: Hero Banner */}
          <HeroSection onOpenCtaModal={handleScrollToCheckout} />

          {/* 2ª SEÇÃO: Para Quem É o Programa? */}
          <TargetSection onOpenCtaModal={handleScrollToCheckout} />

          {/* 3ª SEÇÃO: Como Funciona (Vídeo) */}
          <HowItWorksSection onOpenCtaModal={handleScrollToCheckout} />

          {/* 4ª SEÇÃO: Cronograma dos 2 Encontros (04 e 05/12) */}
          <ScheduleSection onOpenCtaModal={handleScrollToCheckout} />

          {/* 5ª SEÇÃO: O Que Dizem (Depoimentos) */}
          <TestimonialsSection onOpenCtaModal={handleScrollToCheckout} />

          {/* 6ª SEÇÃO: Empresas que Confiam em Nós */}
          <TrustCompaniesSection />

          {/* 7ª SEÇÃO: Autoridade Conjunta (Agrovendedor + Faculdade IBG) */}
          <AboutUsSection onOpenCtaModal={handleScrollToCheckout} />

          {/* 8ª SEÇÃO: O Que Você Recebe */}
          <PlanBuilderSection onOpenCtaModal={handleScrollToCheckout} />

          {/* 9ª SEÇÃO: Local (Faculdade IBG · Rondonópolis - MT + Mapa 3D) */}
          <LocationSection onOpenCtaModal={handleScrollToCheckout} />

          {/* 10ª SEÇÃO: Inscrição Treinamentos IBG */}
          <CheckoutSection />

          {/* 11ª SEÇÃO: FAQ */}
          <FaqSection onOpenCtaModal={handleScrollToCheckout} />
        </main>

        {/* RODAPÉ */}
        <Footer onOpenCtaModal={handleScrollToCheckout} />

        {/* Interactive Lead Proposal Modal */}
        <LeadModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          defaultPlan={selectedPlanName}
        />

        {/* Gestão e Gerador de Links de Parceiros */}
        <PartnerModal />
      </div>
    </PartnerProvider>
  );
}
