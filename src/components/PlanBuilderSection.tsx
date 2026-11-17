import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Shirt,
  Trophy,
  GraduationCap,
  CalendarCheck,
  Target,
  Users,
  MessageSquare,
  BookOpenCheck,
  ChevronLeft,
  ChevronRight,
  MapPin,
  ArrowRight
} from 'lucide-react';

interface PlanBuilderSectionProps {
  onOpenCtaModal: (planName?: string) => void;
}

export const PlanBuilderSection: React.FC<PlanBuilderSectionProps> = ({ onOpenCtaModal }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Entregáveis refinados para a Turma 34 100% Presencial (04 e 05/12 · Faculdade IBG)
  const deliverables = [
    {
      id: 'camiseta',
      icon: Shirt,
      title: 'Camiseta Oficial do Agrovendedor',
      description: 'Entregue presencialmente no credenciamento do 1º encontro na Faculdade IBG para você vestir a identidade da Turma 34.',
      highlight: 'Kit Presencial',
    },
    {
      id: 'trofeu',
      icon: Trophy,
      title: 'Troféu Exclusivo de Conclusão',
      description: 'Reconhecimento físico entregue na cerimônia de encerramento do dia 05/12 para celebrar sua formação comercial no agro.',
      highlight: 'Reconhecimento',
    },
    {
      id: 'certificado',
      icon: GraduationCap,
      title: 'Certificado Conjunto Agrovendedor + Faculdade IBG',
      description: 'Certificação oficial chancelada pela maior escola comercial do agro e pela Faculdade IBG, com registro acadêmico.',
      highlight: 'Certificação IBG',
    },
    {
      id: 'imersao',
      icon: CalendarCheck,
      title: '2 Dias de Imersão 100% Presencial (04 e 05/12)',
      description: 'Dois encontros completos em Rondonópolis - MT com acompanhamento direto dos treinadores em sala e dinâmicas em grupo.',
      highlight: 'Turma 34 Presencial',
    },
    {
      id: 'metodo',
      icon: Target,
      title: 'Método 21 em 7 Aplicado à Realidade do Campo',
      description: 'Domine prospecção estratégica, demonstração de ROI por saca/hectare e defesa de margem para vender até 5x mais.',
      highlight: 'Método Prático',
    },
    {
      id: 'objecoes',
      icon: MessageSquare,
      title: 'Simulações Reais & Contorno de Objeções',
      description: 'Roleplays presenciais de negociação, barter, prazo e resposta imediata contra leilão de preços no balcão e na fazenda.',
      highlight: 'Treino Ao Vivo',
    },
    {
      id: 'networking',
      icon: Users,
      title: 'Networking Estratégico do Agronegócio de MT',
      description: 'Conexão presencial com RTVs, agrônomos, consultores, gerentes e líderes de revendas e cooperativas da região.',
      highlight: 'Conexões Reais',
    },
    {
      id: 'material',
      icon: BookOpenCheck,
      title: 'Material Didático & Plano de Ação Imediato',
      description: 'Ferramentas práticas, matriz de objeções e roteiros de visita prontos para aplicar na segunda-feira pós-imersão.',
      highlight: 'Ferramentas',
    },
  ];

  const featuredPhysicalKit = [
    {
      icon: Shirt,
      label: 'Camiseta Oficial',
      sub: 'Kit de boas-vindas Turma 34',
      accent: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    {
      icon: Trophy,
      label: 'Troféu Exclusivo',
      sub: 'Entrega na cerimônia dia 05/12',
      accent: 'bg-amber-100 text-amber-800 border-amber-300',
    },
    {
      icon: GraduationCap,
      label: 'Certificado IBG + Agro',
      sub: 'Validação acadêmica conjunta',
      accent: 'bg-blue-100 text-blue-800 border-blue-300',
    },
  ];

  const checkScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const cards = container.querySelectorAll<HTMLElement>('[data-carousel-item]');
    if (!cards.length) return;

    let closestIdx = 0;
    let minDistance = Infinity;
    const containerCenter = container.getBoundingClientRect().left + container.clientWidth / 2;

    cards.forEach((card, idx) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    setCurrentIndex(closestIdx);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          checkScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleScroll, { passive: true });
    }

    checkScroll();

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleScroll);
    };
  }, [checkScroll]);

  const scrollToIndex = (idx: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>('[data-carousel-item]');
    if (!cards[idx]) return;

    const targetCard = cards[idx];
    const targetLeft = targetCard.offsetLeft - (container.clientWidth - targetCard.offsetWidth) / 2;

    container.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: 'smooth',
    });
    setCurrentIndex(idx);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    } else if (direction === 'right' && currentIndex < deliverables.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  return (
    <section
      id="planos"
      className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-blue-100/60 via-emerald-50/60 to-white text-slate-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-2xl min-[380px]:text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase">
            O QUE VOCÊ RECEBE
          </h2>

          {/* Highlighted Presencial Format */}
          <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2 text-slate-700 text-sm sm:text-base">
            <div className="flex items-center gap-2 bg-emerald-50/95 border border-emerald-200/90 px-4 py-1.5 rounded-full shadow-2xs">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
              <span className="text-slate-600 font-bold uppercase tracking-wider text-xs sm:text-sm">Formato:</span>
              <span className="text-emerald-900 font-black text-xs sm:text-base">
                2 Dias Presenciais (04 e 05/12) · Faculdade IBG
              </span>
            </div>
          </div>
        </div>

        {/* Highlighted Physical + Institutional Kit Strip */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {featuredPhysicalKit.map((kit, index) => {
            const Icon = kit.icon;
            return (
              <button
                key={kit.label}
                type="button"
                onClick={() => scrollToIndex(index)}
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all text-left cursor-pointer"
              >
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${kit.accent}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-black text-sm sm:text-base text-slate-900 leading-tight">
                    {kit.label}
                  </span>
                  <span className="block text-xs font-medium text-slate-600 mt-0.5">
                    {kit.sub}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative">
          {/* Desktop Floating Side Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Entregável anterior"
            className={`hidden md:flex absolute -left-5 lg:-left-7 top-[48%] -translate-y-1/2 z-20 w-11 h-11 rounded-full border items-center justify-center transition-all duration-200 shadow-md ${
              canScrollLeft
                ? 'bg-white/95 backdrop-blur-xs border-slate-200 text-slate-800 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:scale-105 active:scale-95 cursor-pointer'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Próximo entregável"
            className={`hidden md:flex absolute -right-5 lg:-right-7 top-[48%] -translate-y-1/2 z-20 w-11 h-11 rounded-full border items-center justify-center transition-all duration-200 shadow-md ${
              canScrollRight
                ? 'bg-white/95 backdrop-blur-xs border-slate-200 text-slate-800 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:scale-105 active:scale-95 cursor-pointer'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Horizontal Carousel Track */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth py-3 px-1 sm:px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {deliverables.map((item, idx) => {
              const IconComponent = item.icon;
              const isActive = currentIndex === idx;

              return (
                <div
                  key={item.id}
                  data-carousel-item
                  className="w-[88vw] min-[400px]:w-[84vw] sm:w-[580px] md:w-[720px] max-w-full shrink-0 snap-center transition-transform duration-300"
                >
                  <div
                    className={`h-full flex flex-col justify-center p-5 min-[380px]:p-6 sm:p-7 lg:p-8 bg-white border rounded-2xl sm:rounded-3xl shadow-lg transition-all duration-300 ${
                      isActive
                        ? 'border-emerald-500/90 ring-2 ring-emerald-500/15 shadow-emerald-500/10'
                        : 'border-slate-200/90 hover:border-emerald-400/60'
                    }`}
                  >
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-2.5 sm:mb-3">
                        <div className="flex items-center gap-3 sm:gap-3.5">
                          <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-emerald-100/90 text-emerald-800 flex items-center justify-center shrink-0 shadow-xs ring-1 ring-emerald-300/40">
                            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 leading-snug">
                            {item.title}
                          </h3>
                        </div>

                        <span className="self-start sm:self-center text-[10px] min-[380px]:text-[11px] sm:text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/90 border border-emerald-200/90 px-3 py-1.5 rounded-full shrink-0 shadow-2xs">
                          {item.highlight}
                        </span>
                      </div>

                      <p className="text-xs min-[380px]:text-sm sm:text-base text-slate-600 font-normal leading-relaxed pl-0 sm:pl-16">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Indicator Dots / Pills */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-7">
            {deliverables.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => scrollToIndex(idx)}
                aria-label={`Ir para ${item.title}`}
                className={`h-2.5 sm:h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? 'w-7 sm:w-9 bg-emerald-600 shadow-xs'
                    : 'w-2.5 sm:w-3 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <div className="sm:hidden text-center mt-3">
            <span className="text-[11px] font-medium text-slate-400 inline-flex items-center gap-1">
              Deslize para ver todos os entregáveis ➔
            </span>
          </div>
        </div>

        {/* Section CTA */}
        <div className="mt-10 sm:mt-12 text-center">
          <button
            onClick={() => onOpenCtaModal('Turma 34 Presencial')}
            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 sm:px-10 py-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm sm:text-base uppercase tracking-wider rounded-2xl border border-emerald-300/60 ring-2 ring-emerald-500/20 shadow-lg shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>GARANTIR KIT E VAGA NA TURMA 34</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
