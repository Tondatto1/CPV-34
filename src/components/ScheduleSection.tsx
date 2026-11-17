import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  ArrowUpRight,
  Clock,
} from 'lucide-react';
import { SCHEDULE_DAYS } from '../data/agroData';
import { ScheduleActivity } from '../types';

interface ScheduleSectionProps {
  onOpenCtaModal: () => void;
}

type PeriodFilter = 'all' | 'Manhã' | 'Tarde' | 'Noite' | 'saved';
type CardVariant = 'dark' | 'module' | 'practice' | 'break';

const STORAGE_KEY = 'agro_turma34_saved_sessions_v1';

const KEY_PHRASES = [
  'agenda de alta performance',
  'estratégias de segmentação de cliente',
  'Carteira de clientes',
  'Uso da Agenda',
  'Caderno de Atividades',
  'Perfil de Clientes',
  'Rapport',
  'confiança do cliente Agro',
  'Perguntas de investigação',
  'Perguntas de Necessidade',
  'Motivadores de compra',
  'Gerando necessidade no cliente',
  'dinâmica de vendas',
  'ganhos e conquistas',
  'entrega de material',
  'Confirmação da inscrição',
  'Desafios das Vendas no Agronegócio',
  'vender mais e melhor',
  'Troféu Exclusivo',
  'Certificado Conjunto Agrovendedor + Faculdade IBG',
  'sem queimar margem',
  'feedback direto dos treinadores',
  'relacionamento de longo prazo',
  'posicionamento comercial',
  'negociações de alta margem',
  'fechamento com segurança',
  'cliente ativo',
  'recompras contínuas',
  '7 módulos',
  'entrega de certificados e prêmios',
];

function buildSessionKey(dayId: string, idx: number): string {
  return `${dayId}-${idx}`;
}

function formatTimeRange(time: string): string {
  return time.replace(/\s+às\s+/i, ' – ');
}

function getDayNumberAndMonth(dateLabel: string): { dayNum: string; month: string } {
  const match = dateLabel.match(/^(\d+)\s+de\s+(.+)$/i);
  if (!match) return { dayNum: dateLabel, month: '' };
  return { dayNum: match[1].padStart(2, '0'), month: match[2] };
}

function getDayTimeSpan(activities: ScheduleActivity[]): string {
  if (!activities.length) return '';
  const start = activities[0].time.split(' ')[0];
  const end = activities[activities.length - 1].time.split(' ').pop() || '';
  return end && end !== start ? `${start} – ${end}` : start;
}

function getCardVariant(activity: ScheduleActivity): CardVariant {
  const titleUpper = activity.title.toUpperCase();
  if (titleUpper === 'INTERVALO') return 'break';
  if (
    titleUpper.includes('ENCERRAMENTO') ||
    titleUpper.includes('UNINDO OS MÓDULOS') ||
    titleUpper.includes('CERIMÔNIA')
  ) {
    return 'dark';
  }
  if (
    titleUpper.startsWith('MÓDULO') ||
    titleUpper.includes('BLINDAGEM DE MARGEM') ||
    titleUpper.includes('NEGOCIAÇÃO AVANÇADA')
  ) {
    return 'module';
  }
  return 'practice';
}

function splitTitle(title: string): { kicker?: string; main: string } {
  const colonIdx = title.indexOf(':');
  if (colonIdx === -1) return { main: title };
  const prefix = title.slice(0, colonIdx).trim();
  const rest = title.slice(colonIdx + 1).trim();
  if (!rest || prefix.length > 28) return { main: title };
  return { kicker: prefix, main: rest };
}

function renderHighlightedText(text: string, isDark: boolean): React.ReactNode {
  const escaped = KEY_PHRASES.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(regex);
  if (parts.length === 1) return text;

  return parts.map((part, i) => {
    const isMatch = KEY_PHRASES.some((p) => p.toLowerCase() === part.toLowerCase());
    if (!isMatch) return <React.Fragment key={i}>{part}</React.Fragment>;
    return (
      <strong
        key={i}
        className={
          isDark
            ? 'font-semibold text-emerald-300'
            : 'font-semibold text-slate-900'
        }
      >
        {part}
      </strong>
    );
  });
}

interface SpotlightScheduleCardProps {
  activity: ScheduleActivity;
  idx: number;
  isActive: boolean;
  isSaved: boolean;
  shouldReduceMotion: boolean | null;
  onSelect: () => void;
  onToggleSave: (e: React.MouseEvent) => void;
}

const SpotlightScheduleCard: React.FC<SpotlightScheduleCardProps> = ({
  activity,
  idx,
  isActive,
  isSaved,
  shouldReduceMotion,
  onSelect,
  onToggleSave,
}) => {
  const cardRef = useRef<HTMLElement | null>(null);
  const [spot, setSpot] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  });

  const variant = getCardVariant(activity);
  const isDark = variant === 'dark';
  const isModule = variant === 'module';
  const isBreak = variant === 'break';
  const { kicker, main } = splitTitle(activity.title);
  const metaLabel = activity.highlight || activity.period;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpot({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    });
  };

  const handleMouseLeave = () => {
    setSpot((prev) => ({ ...prev, visible: false }));
  };

  const containerClasses = isDark
    ? isActive
      ? 'bg-slate-950 text-white border-emerald-400/60 shadow-xl shadow-emerald-950/25'
      : 'bg-slate-950 text-white border-slate-800 hover:border-emerald-500/45 shadow-lg shadow-slate-950/15'
    : isBreak
    ? isActive
      ? 'bg-slate-100/90 text-slate-800 border-slate-300 shadow-sm'
      : 'bg-slate-50/95 text-slate-800 border-slate-200/75'
    : isModule
    ? isActive
      ? 'bg-gradient-to-b from-emerald-50/75 via-white to-white text-slate-900 border-emerald-500/70 shadow-lg shadow-emerald-900/10'
      : 'bg-gradient-to-b from-emerald-50/40 via-white to-white text-slate-900 border-emerald-200/85 hover:border-emerald-400/80 shadow-xs'
    : isActive
    ? 'bg-white text-slate-900 border-emerald-500/70 shadow-lg shadow-slate-900/8'
    : 'bg-white text-slate-900 border-slate-200/90 hover:border-slate-300 shadow-xs';

  const spotlightGradient = isDark
    ? `radial-gradient(360px circle at ${spot.x}px ${spot.y}px, rgba(16, 185, 129, 0.22), transparent 65%)`
    : `radial-gradient(360px circle at ${spot.x}px ${spot.y}px, rgba(16, 185, 129, 0.11), transparent 65%)`;

  return (
    <motion.article
      ref={cardRef}
      data-schedule-card
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: shouldReduceMotion ? 1 : isActive ? 1 : 0.985,
      }}
      transition={{
        duration: 0.28,
        delay: shouldReduceMotion ? 0 : Math.min(idx * 0.045, 0.24),
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={shouldReduceMotion || isBreak ? undefined : { y: -4, scale: 1 }}
      className={`group relative w-[84vw] sm:w-[365px] lg:w-[396px] shrink-0 snap-start rounded-2xl p-6 sm:p-7 border flex flex-col justify-between transition-[border-color,box-shadow] duration-200 cursor-pointer overflow-hidden ${containerClasses}`}
    >
      {/* Top Luminous Accent Strip */}
      {(isModule || isDark || isActive) && (
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{ opacity: isActive ? 1 : 0.7 }}
          className={`absolute top-0 left-0 right-0 h-[3px] ${
            isDark
              ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500/20'
              : 'bg-gradient-to-r from-emerald-600 via-teal-500 to-transparent'
          }`}
        />
      )}

      {/* Cursor-Tracking Clean Radial Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: spot.visible ? 1 : 0,
          background: spotlightGradient,
        }}
      />

      <div className="relative z-10">
        {/* Top Metadata Row + Animated Bookmark */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs min-w-0">
            <span
              className={`font-mono font-bold tabular-nums whitespace-nowrap ${
                isDark ? 'text-emerald-400' : 'text-emerald-700'
              }`}
            >
              {formatTimeRange(activity.time)}
            </span>
            <span
              className={isDark ? 'text-slate-700' : 'text-slate-300'}
              aria-hidden="true"
            >
              ·
            </span>
            <span
              className={`font-semibold truncate ${
                isDark
                  ? 'text-slate-300'
                  : isModule
                  ? 'text-emerald-800/85'
                  : 'text-slate-500'
              }`}
            >
              {metaLabel}
            </span>
          </div>

          <motion.button
            type="button"
            onClick={onToggleSave}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.85 }}
            animate={
              isSaved && !shouldReduceMotion ? { scale: [1, 1.2, 1] } : { scale: 1 }
            }
            transition={{ duration: 0.24 }}
            aria-label={isSaved ? 'Remover da minha agenda' : 'Salvar na minha agenda'}
            title={isSaved ? 'Salvo na sua agenda' : 'Salvar na sua agenda'}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
              isDark
                ? isSaved
                  ? 'bg-emerald-500/25 text-emerald-300'
                  : 'text-slate-500 hover:text-slate-200 hover:bg-white/10'
                : isSaved
                ? 'bg-emerald-100/80 text-emerald-700'
                : 'text-slate-300 hover:text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Bookmark
              className={`w-4 h-4 ${
                isSaved
                  ? isDark
                    ? 'fill-emerald-400 text-emerald-400'
                    : 'fill-emerald-600 text-emerald-600'
                  : ''
              }`}
            />
          </motion.button>
        </div>

        {/* Clean Two-Tier Editorial Title */}
        <div className="mt-4">
          {kicker && (
            <span
              className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                isDark
                  ? 'text-emerald-400'
                  : isModule
                  ? 'text-emerald-700'
                  : 'text-slate-500'
              }`}
            >
              {kicker}
            </span>
          )}
          <h3
            className={`text-base sm:text-[17px] font-bold leading-snug tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {main}
          </h3>
        </div>

        {/* Highlighted Content Bullets / Description */}
        {activity.bullets && activity.bullets.length > 0 ? (
          <ul
            className={`mt-3.5 space-y-2 text-[13.5px] sm:text-sm leading-relaxed list-disc pl-4 ${
              isDark
                ? 'text-slate-300 marker:text-emerald-400'
                : isModule
                ? 'text-slate-600 marker:text-emerald-600/80'
                : 'text-slate-600 marker:text-slate-300'
            }`}
          >
            {activity.bullets.map((bullet, bIdx) => (
              <motion.li
                key={bullet}
                initial={shouldReduceMotion ? false : { opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.2,
                  delay: shouldReduceMotion ? 0 : Math.min(idx * 0.03 + bIdx * 0.03, 0.28),
                }}
              >
                {renderHighlightedText(bullet, isDark)}
              </motion.li>
            ))}
          </ul>
        ) : (
          <p
            className={`mt-3.5 text-[13.5px] sm:text-sm leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {renderHighlightedText(activity.description, isDark)}
          </p>
        )}
      </div>

      {/* Subtle Bottom Focus Cue for Key Milestones Only */}
      {(isDark || isModule) && (
        <div className="relative z-10 mt-5 pt-3 flex items-center justify-between text-[11px] font-semibold">
          <span className={isDark ? 'text-emerald-400/95' : 'text-emerald-700/90'}>
            {isDark ? 'Momento-chave do encontro' : 'Conteúdo estratégico'}
          </span>
          <ArrowUpRight
            className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
              isDark ? 'text-emerald-400/80' : 'text-emerald-600/75'
            }`}
          />
        </div>
      )}
    </motion.article>
  );
};

export const ScheduleSection: React.FC<ScheduleSectionProps> = () => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedDayId, setSelectedDayId] = useState<string>(SCHEDULE_DAYS[0].id);
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('all');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [savedKeys, setSavedKeys] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });

  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

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

  const savedCountForDay = useMemo(
    () => indexedActivities.filter((item) => savedKeys.includes(item.key)).length,
    [indexedActivities, savedKeys]
  );

  const availablePeriodTabs = useMemo(() => {
    const hasManha = selectedDay.activities.some((a) => a.period === 'Manhã');
    const hasTarde = selectedDay.activities.some((a) => a.period === 'Tarde');
    const hasNoite = selectedDay.activities.some((a) => a.period === 'Noite');

    const countFor = (filter: PeriodFilter) => {
      if (filter === 'all') return selectedDay.activities.length;
      if (filter === 'Noite') {
        return selectedDay.activities.filter(
          (a) => a.period === 'Noite' || a.period === 'Encerramento'
        ).length;
      }
      if (filter === 'Tarde') {
        return selectedDay.activities.filter(
          (a) => a.period === 'Tarde' || (!hasNoite && a.period === 'Encerramento')
        ).length;
      }
      if (filter === 'saved') return savedCountForDay;
      return selectedDay.activities.filter((a) => a.period === filter).length;
    };

    const tabs: { id: PeriodFilter; label: string; count: number }[] = [
      { id: 'all', label: 'Todos', count: countFor('all') },
    ];
    if (hasManha) tabs.push({ id: 'Manhã', label: 'Manhã', count: countFor('Manhã') });
    if (hasTarde) tabs.push({ id: 'Tarde', label: 'Tarde', count: countFor('Tarde') });
    if (hasNoite) tabs.push({ id: 'Noite', label: 'Noite', count: countFor('Noite') });
    if (savedCountForDay > 0) {
      tabs.push({ id: 'saved', label: 'Salvos', count: savedCountForDay });
    }
    return tabs;
  }, [selectedDay, savedCountForDay]);

  useEffect(() => {
    if (periodFilter === 'saved' && savedCountForDay === 0) {
      setPeriodFilter('all');
    }
  }, [periodFilter, savedCountForDay]);

  const filteredActivities = useMemo(() => {
    const hasNoite = selectedDay.activities.some((a) => a.period === 'Noite');
    return indexedActivities.filter(({ activity, key }) => {
      if (periodFilter === 'all') return true;
      if (periodFilter === 'saved') return savedKeys.includes(key);
      if (periodFilter === 'Noite') {
        return activity.period === 'Noite' || activity.period === 'Encerramento';
      }
      if (periodFilter === 'Tarde') {
        return (
          activity.period === 'Tarde' ||
          (!hasNoite && activity.period === 'Encerramento')
        );
      }
      return activity.period === periodFilter;
    });
  }, [indexedActivities, periodFilter, selectedDay, savedKeys]);

  const updateScrollState = useCallback(() => {
    const container = trackRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScroll = Math.max(0, scrollWidth - clientWidth);
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft < maxScroll - 8);
    setScrollProgress(maxScroll > 0 ? Math.min(1, Math.max(0, scrollLeft / maxScroll)) : 1);

    const cards = container.querySelectorAll<HTMLElement>('[data-schedule-card]');
    if (!cards.length) return;

    let closest = 0;
    let minDiff = Infinity;
    const containerLeft = container.getBoundingClientRect().left;

    cards.forEach((card, i) => {
      const diff = Math.abs(card.getBoundingClientRect().left - containerLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closest = i;
      }
    });

    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const container = trackRef.current;
    if (!container) return;

    container.scrollTo({ left: 0, behavior: 'auto' });
    setActiveIndex(0);

    const raf = requestAnimationFrame(() => {
      updateScrollState();
    });
    return () => cancelAnimationFrame(raf);
  }, [selectedDayId, periodFilter, updateScrollState]);

  useEffect(() => {
    const container = trackRef.current;
    if (!container) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollState();
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [updateScrollState]);

  const scrollToCard = (idx: number) => {
    const container = trackRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>('[data-schedule-card]');
    const target = cards[idx];
    if (!target) return;

    container.scrollTo({
      left: Math.max(0, target.offsetLeft),
      behavior: 'smooth',
    });
    setActiveIndex(idx);
  };

  const handleStep = (dir: 'prev' | 'next') => {
    if (dir === 'prev' && activeIndex > 0) {
      scrollToCard(activeIndex - 1);
    } else if (dir === 'next' && activeIndex < filteredActivities.length - 1) {
      scrollToCard(activeIndex + 1);
    }
  };

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || filteredActivities.length <= 1) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const targetIdx = Math.round(ratio * (filteredActivities.length - 1));
    scrollToCard(targetIdx);
  };

  const toggleSaveSession = (e: React.MouseEvent, key: string) => {
    e.stopPropagation();
    setSavedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleDaySelect = (dayId: string) => {
    setSelectedDayId(dayId);
    setPeriodFilter('all');
    setActiveIndex(0);
  };

  const minIndicatorWidth =
    filteredActivities.length > 0
      ? Math.max(12, Math.round((1 / filteredActivities.length) * 100))
      : 100;
  const indicatorWidth = Math.max(
    minIndicatorWidth,
    Math.round(minIndicatorWidth + scrollProgress * (100 - minIndicatorWidth))
  );

  const firstTime = filteredActivities[0]?.activity.time.split(' ')[0] || '';
  const lastTime =
    filteredActivities[filteredActivities.length - 1]?.activity.time.split(' ').pop() ||
    '';

  return (
    <section
      id="cronograma"
      className="relative py-16 sm:py-22 lg:py-28 bg-gradient-to-b from-slate-50/70 via-white to-white text-slate-900 border-t border-slate-200/80 overflow-hidden"
    >
      {/* Subtle Ambient Animated Glow */}
      <motion.div
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                opacity: [0.45, 0.7, 0.45],
                scale: [1, 1.04, 1],
              }
        }
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[780px] h-[340px] rounded-full bg-radial from-emerald-200/30 via-teal-100/15 to-transparent blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl min-[380px]:text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase text-balance">
            Cronograma da Turma 34
          </h2>
          <AnimatePresence mode="wait">
            <motion.p
              key={selectedDay.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -5 }}
              transition={{ duration: 0.18 }}
              className="mt-3 text-sm sm:text-base text-slate-600 font-medium text-balance"
            >
              {selectedDay.theme}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Highlighted 2-Day Selector Strip (04 de Dezembro & 05 de Dezembro) */}
        <div
          role="tablist"
          aria-label="Selecionar encontro presencial"
          className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-5"
        >
          {SCHEDULE_DAYS.map((day) => {
            const isActive = day.id === selectedDay.id;
            const { dayNum, month } = getDayNumberAndMonth(day.dateLabel);
            const timeSpan = getDayTimeSpan(day.activities);

            return (
              <motion.button
                key={day.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleDaySelect(day.id)}
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                transition={{ duration: 0.18 }}
                className={`relative text-left rounded-2xl p-4 sm:p-5 border transition-colors cursor-pointer overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                  isActive
                    ? 'border-emerald-500/60 shadow-lg shadow-emerald-950/15'
                    : 'bg-gradient-to-br from-emerald-50/75 via-white to-white border-emerald-200/90 hover:border-emerald-400 shadow-xs'
                }`}
              >
                {/* Sliding Active Date Obsidian Background */}
                {isActive && (
                  <motion.div
                    layoutId="schedule-active-day-card"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/90"
                  />
                )}

                {/* Top luminous hairline on active date */}
                {isActive && (
                  <motion.div
                    aria-hidden="true"
                    initial={false}
                    animate={{ opacity: 1 }}
                    className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-400 via-teal-400 to-transparent"
                  />
                )}

                <div className="relative z-10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                    {/* Highlighted Numeric Date Emblem */}
                    <div
                      className={`w-13 h-13 sm:w-14 sm:h-14 rounded-xl flex flex-col items-center justify-center shrink-0 border transition-colors ${
                        isActive
                          ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300'
                          : 'bg-emerald-100/80 border-emerald-300/70 text-emerald-800'
                      }`}
                    >
                      <span className="text-xl sm:text-2xl font-black leading-none tabular-nums">
                        {dayNum}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5 opacity-85">
                        DEZ
                      </span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider">
                        <span
                          className={
                            isActive ? 'text-emerald-400' : 'text-emerald-700'
                          }
                        >
                          {day.dayNumber}
                        </span>
                        <span
                          className={isActive ? 'text-slate-600' : 'text-slate-300'}
                          aria-hidden="true"
                        >
                          ·
                        </span>
                        <span
                          className={isActive ? 'text-slate-300' : 'text-slate-600'}
                        >
                          {day.weekday}
                        </span>
                      </div>

                      <div
                        className={`text-base sm:text-lg font-extrabold tracking-tight mt-0.5 truncate ${
                          isActive ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {dayNum} de {month}
                      </div>
                    </div>
                  </div>

                  {/* Right Schedule Time & Block Highlight */}
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold tabular-nums whitespace-nowrap ${
                        isActive ? 'text-emerald-300' : 'text-emerald-800'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 opacity-80" />
                      <span>{timeSpan}</span>
                    </span>
                    <span
                      className={`text-[11px] font-semibold tabular-nums whitespace-nowrap ${
                        isActive ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {day.activities.length} blocos
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Highlighted Top Options & Controls Bar Above Cards */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-100/80 border border-slate-200/90 rounded-2xl p-2.5 sm:px-3.5 sm:py-2.5 mb-7 shadow-2xs">
          {/* Highlighted Period Filter Options */}
          <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {availablePeriodTabs.map((tab) => {
              const active = periodFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setPeriodFilter(tab.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                    active
                      ? 'text-white'
                      : 'bg-white/90 text-slate-700 border border-slate-200/80 hover:border-emerald-300 hover:text-emerald-800'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="schedule-period-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-sm shadow-emerald-600/25"
                    />
                  )}
                  <span className="relative z-10 inline-flex items-center gap-1.5">
                    {tab.id === 'saved' && (
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                    )}
                    <span>{tab.label}</span>
                  </span>
                  <span
                    className={`relative z-10 text-[11px] font-mono tabular-nums ${
                      active ? 'text-emerald-100' : 'text-slate-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Highlighted Counter & Step Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/80 text-xs font-medium text-slate-600">
              <span className="text-slate-400">Bloco</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums whitespace-nowrap">
                {String(Math.min(activeIndex + 1, filteredActivities.length)).padStart(2, '0')}
                {' / '}
                {String(filteredActivities.length).padStart(2, '0')}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <motion.button
                type="button"
                onClick={() => handleStep('prev')}
                disabled={!canScrollLeft}
                whileTap={canScrollLeft && !shouldReduceMotion ? { scale: 0.92 } : undefined}
                aria-label="Bloco anterior"
                className={`group w-9 h-9 rounded-xl border flex items-center justify-center transition-all shrink-0 ${
                  canScrollLeft
                    ? 'bg-white border-slate-200 text-slate-800 hover:bg-emerald-600 hover:border-emerald-600 hover:text-white shadow-2xs cursor-pointer'
                    : 'bg-white/50 border-slate-200/50 text-slate-300 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-4 h-4 transition-transform duration-150 group-hover:-translate-x-0.5" />
              </motion.button>

              <motion.button
                type="button"
                onClick={() => handleStep('next')}
                disabled={!canScrollRight}
                whileTap={canScrollRight && !shouldReduceMotion ? { scale: 0.92 } : undefined}
                aria-label="Próximo bloco"
                className={`group w-9 h-9 rounded-xl border flex items-center justify-center transition-all shrink-0 ${
                  canScrollRight
                    ? 'bg-white border-slate-200 text-slate-800 hover:bg-emerald-600 hover:border-emerald-600 hover:text-white shadow-2xs cursor-pointer'
                    : 'bg-white/50 border-slate-200/50 text-slate-300 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Horizontal Snap Carousel Track */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedDay.id}-${periodFilter}`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <div
              ref={trackRef}
              className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pt-1.5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden items-stretch"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {filteredActivities.map(({ activity, key }, idx) => (
                <SpotlightScheduleCard
                  key={key}
                  activity={activity}
                  idx={idx}
                  isActive={idx === activeIndex}
                  isSaved={savedKeys.includes(key)}
                  shouldReduceMotion={shouldReduceMotion}
                  onSelect={() => scrollToCard(idx)}
                  onToggleSave={(e) => toggleSaveSession(e, key)}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Interactive Time-Anchored Scrubber Track */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="text-[11px] font-mono font-semibold text-slate-500 tabular-nums">
            {firstTime}
          </span>
          <div
            ref={progressBarRef}
            onClick={handleScrubberClick}
            role="slider"
            aria-label="Progresso no cronograma"
            aria-valuemin={1}
            aria-valuemax={Math.max(1, filteredActivities.length)}
            aria-valuenow={Math.min(activeIndex + 1, Math.max(1, filteredActivities.length))}
            tabIndex={0}
            className="relative w-full max-w-[260px] h-1.5 bg-slate-200/80 rounded-full overflow-hidden cursor-pointer hover:bg-slate-200 transition-colors"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 rounded-full"
              animate={{ width: `${indicatorWidth}%` }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <span className="text-[11px] font-mono font-semibold text-slate-500 tabular-nums">
            {lastTime}
          </span>
        </div>
      </div>
    </section>
  );
};
