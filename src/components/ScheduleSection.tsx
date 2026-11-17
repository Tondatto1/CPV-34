import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  Bookmark,
} from 'lucide-react';
import { SCHEDULE_DAYS } from '../data/agroData';

interface ScheduleSectionProps {
  onOpenCtaModal: () => void;
}

type PeriodFilter = 'all' | 'Manhã' | 'Tarde';

const STORAGE_KEY = 'agro_turma34_saved_sessions_v1';

function buildSessionKey(dayId: string, idx: number): string {
  return `${dayId}-${idx}`;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = () => {
  const [selectedDayId, setSelectedDayId] = useState<string>(SCHEDULE_DAYS[0].id);
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('all');
  const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>({
    'dia-1-0': true,
    'dia-2-0': true,
  });
  const [savedKeys, setSavedKeys] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedKeys));
    } catch {
      // ignore storage errors
    }
  }, [savedKeys]);

  const selectedDay =
    SCHEDULE_DAYS.find((d) => d.id === selectedDayId) || SCHEDULE_DAYS[0];

  const indexedActivities = useMemo(
    () =>
      selectedDay.activities.map((activity, idx) => ({
        activity,
        idx,
        key: buildSessionKey(selectedDay.id, idx),
      })),
    [selectedDay]
  );

  const filteredActivities = useMemo(() => {
    return indexedActivities.filter(({ activity }) => {
      if (periodFilter === 'all') return true;
      if (periodFilter === 'Tarde') {
        return activity.period === 'Tarde' || activity.period === 'Encerramento';
      }
      return activity.period === periodFilter;
    });
  }, [indexedActivities, periodFilter]);

  const toggleExpand = (key: string) => {
    setExpandedKeys((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const allFilteredExpanded =
    filteredActivities.length > 0 &&
    filteredActivities.every(({ key }) => Boolean(expandedKeys[key]));

  const handleToggleExpandAll = () => {
    const nextValue = !allFilteredExpanded;
    setExpandedKeys((prev) => {
      const updated = { ...prev };
      filteredActivities.forEach(({ key }) => {
        updated[key] = nextValue;
      });
      return updated;
    });
  };

  const toggleSaveSession = (
    e: React.MouseEvent,
    key: string
  ) => {
    e.stopPropagation();
    setSavedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleDaySelect = (dayId: string) => {
    setSelectedDayId(dayId);
  };

  return (
    <section
      id="cronograma"
      className="py-16 sm:py-20 lg:py-28 bg-slate-50/70 text-slate-900 border-t border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Editorial Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
            <span>Turma 34 Presencial</span>
            <span aria-hidden="true" className="mx-2 text-slate-300">·</span>
            <span>Faculdade IBG</span>
            <span aria-hidden="true" className="mx-2 text-slate-300">·</span>
            <span>Rondonópolis - MT</span>
          </p>

          <h2 className="text-2xl min-[380px]:text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase text-balance">
            Cronograma da Turma 34
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Clique nos blocos para expandir os detalhes ou selecione os momentos que deseja salvar na sua agenda.
          </p>
        </div>

        {/* Asymmetric Interactive Agenda Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Sticky Day Navigator & Overview (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-5">
            {/* Day Switcher Tabs */}
            <div
              role="tablist"
              aria-label="Selecionar encontro presencial"
              className="grid grid-cols-2 lg:grid-cols-1 gap-2 p-1.5 rounded-2xl bg-slate-200/70 border border-slate-200"
            >
              {SCHEDULE_DAYS.map((day) => {
                const isActive = day.id === selectedDay.id;
                return (
                  <button
                    key={day.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleDaySelect(day.id)}
                    className={`relative text-left px-4 py-3.5 rounded-xl transition-colors cursor-pointer ${
                      isActive
                        ? 'text-slate-900'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="schedule-day-active-bg"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-200/80"
                      />
                    )}
                    <div className="relative z-10 flex items-center justify-between gap-2">
                      <div>
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                          {day.dayNumber} · {day.weekday}
                        </span>
                        <span className="block text-base sm:text-lg font-black tracking-tight mt-0.5 whitespace-nowrap">
                          {day.dateLabel}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-400 tabular-nums whitespace-nowrap shrink-0">
                        {day.activities.length} blocos
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Interactive Timeline & Expandable Sessions (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            {/* Period Filter & Utility Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-2xl border border-slate-200 px-4 py-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {(
                  [
                    { id: 'all', label: 'Todos' },
                    { id: 'Manhã', label: 'Manhã' },
                    { id: 'Tarde', label: 'Tarde' },
                  ] as const
                ).map((tab) => {
                  const active = periodFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setPeriodFilter(tab.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleToggleExpandAll}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors cursor-pointer whitespace-nowrap shrink-0 px-2 py-1"
              >
                {allFilteredExpanded ? 'Recolher tudo' : 'Expandir tudo'}
              </button>
            </div>

            {/* Interactive Vertical Spine Timeline */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedDay.id}-${periodFilter}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                {filteredActivities.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
                    <p className="text-sm font-bold text-slate-800">
                      Nenhum bloco salvo neste filtro ainda.
                    </p>
                    <p className="text-xs text-slate-500">
                      Clique no ícone de marcador ao lado de qualquer horário para montar sua agenda personalizada.
                    </p>
                    <button
                      type="button"
                      onClick={() => setPeriodFilter('all')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer"
                    >
                      Ver programação completa
                    </button>
                  </div>
                ) : (
                  <div className="relative pl-6 sm:pl-8 space-y-3 before:content-[''] before:absolute before:left-[9px] sm:before:left-[11px] before:top-4 before:bottom-4 before:w-px before:bg-slate-200">
                    {filteredActivities.map(({ activity, key }) => {
                      const isExpanded = Boolean(expandedKeys[key]);
                      const isSaved = savedKeys.includes(key);

                      return (
                        <div key={key} className="relative">
                          {/* Timeline Spine Node */}
                          <span
                            aria-hidden="true"
                            className={`absolute -left-6 sm:-left-8 top-6 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                              isExpanded
                                ? 'bg-emerald-600 border-emerald-200'
                                : isSaved
                                ? 'bg-amber-400 border-amber-100'
                                : 'bg-white border-slate-300'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isExpanded || isSaved ? 'bg-white' : 'bg-slate-400'
                              }`}
                            />
                          </span>

                          {/* Accordion Session Card */}
                          <div
                            className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                              isExpanded
                                ? 'border-emerald-400 shadow-md shadow-emerald-950/5'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 px-5 sm:px-6 py-4 sm:py-5">
                              <button
                                type="button"
                                aria-expanded={isExpanded}
                                onClick={() => toggleExpand(key)}
                                className="flex-1 text-left flex items-center justify-between gap-4 min-w-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg"
                              >
                                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-5 min-w-0 flex-1">
                                  <div className="flex items-baseline gap-2 sm:w-28 shrink-0">
                                    <span className="font-mono text-sm sm:text-base font-extrabold text-emerald-700 tabular-nums">
                                      {activity.time}
                                    </span>
                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                      {activity.period}
                                    </span>
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                                      {activity.title}
                                    </h4>
                                    {!isExpanded && activity.highlight && (
                                      <span className="text-[11px] font-semibold text-emerald-700 mt-0.5 block">
                                        {activity.highlight}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </button>

                              {/* Bookmark & Expand Affordances */}
                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  type="button"
                                  onClick={(e) => toggleSaveSession(e, key)}
                                  aria-label={
                                    isSaved
                                      ? 'Remover da minha agenda'
                                      : 'Salvar na minha agenda'
                                  }
                                  title={
                                    isSaved
                                      ? 'Salvo na sua agenda'
                                      : 'Salvar na sua agenda'
                                  }
                                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                                    isSaved
                                      ? 'bg-emerald-50 text-emerald-700'
                                      : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                                  }`}
                                >
                                  <Bookmark
                                    className={`w-4 h-4 ${
                                      isSaved ? 'fill-emerald-600 text-emerald-600' : ''
                                    }`}
                                  />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => toggleExpand(key)}
                                  aria-label={isExpanded ? 'Recolher detalhes' : 'Expandir detalhes'}
                                  aria-expanded={isExpanded}
                                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-transform duration-200 cursor-pointer ${
                                    isExpanded ? 'rotate-180 text-emerald-700' : ''
                                  }`}
                                >
                                  <ChevronDown className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Smooth Accordion Body */}
                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-slate-100 sm:pl-[calc(1.5rem+7rem+1.25rem)] space-y-2.5">
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                      {activity.description}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold text-slate-500">
                                      <span>Presencial · Faculdade IBG</span>
                                      {activity.highlight && (
                                        <>
                                          <span aria-hidden="true">·</span>
                                          <span className="text-emerald-700 font-bold">
                                            Destaque: {activity.highlight}
                                          </span>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
