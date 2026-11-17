import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AboutUsSectionProps {
  onOpenCtaModal: () => void;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ onOpenCtaModal }) => {
  return (
    <section
      id="quem-somos"
      className="py-16 sm:py-20 lg:py-28 bg-gradient-to-tr from-emerald-100/60 via-blue-50/70 to-white text-slate-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-3 sm:space-y-4">
          <h2 className="text-2xl min-[380px]:text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase">
            QUEM SOMOS
          </h2>
        </div>

        {/* Authority Column */}
        <div className="mt-10 sm:mt-14 max-w-4xl mx-auto">
          {/* Column 1: Agrovendedor Authority */}
          <div className="bg-white/95 border border-slate-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col justify-between">
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 text-center space-y-1">
                  <span className="block text-2xl sm:text-3xl font-black text-emerald-700">+19 Anos</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-700">de história</span>
                </div>
                <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 text-center space-y-1">
                  <span className="block text-2xl sm:text-3xl font-black text-emerald-700">+25 Mil</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-700">alunos formados</span>
                </div>
                <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 text-center space-y-1">
                  <span className="block text-2xl sm:text-3xl font-black text-emerald-700">+150</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-700">empresas atendidas</span>
                </div>
                <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 text-center space-y-1 sm:col-span-2">
                  <span className="block text-2xl sm:text-3xl font-black text-emerald-700">+1 BILHÃO</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-700 leading-tight">
                    de receita incremental gerada no Agro
                  </span>
                </div>
                <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 text-center space-y-1 col-span-2 sm:col-span-1">
                  <span className="block text-2xl sm:text-3xl font-black text-emerald-700">+ de 40</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-700">segmentos</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 text-center sm:text-left">
              <span className="inline-block text-xs sm:text-sm font-extrabold text-emerald-800 bg-emerald-100/80 px-4 py-2 rounded-full border border-emerald-300/80 shadow-2xs">
                🌱 Treinadores e mentores que vivem o campo!
              </span>
            </div>
          </div>
        </div>

        {/* Section CTA */}
        <div className="mt-12 sm:mt-16 text-center space-y-4">
          <div>
            <button
              onClick={onOpenCtaModal}
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 sm:px-10 py-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm sm:text-base uppercase tracking-wider rounded-2xl border border-emerald-300/60 ring-2 ring-emerald-500/20 shadow-lg shadow-emerald-600/30 transition-all transform hover:-translate-y-1 active:translate-y-0 cursor-pointer"
            >
              <span>REALIZAR INSCRIÇÃO!</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
