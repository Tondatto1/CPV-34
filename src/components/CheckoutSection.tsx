import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  FileText,
  GraduationCap,
  Check,
} from 'lucide-react';
import { IbgRegistrationData } from '../types';
import { usePartner } from '../context/PartnerContext';

function formatPhoneMask(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function formatCpfMask(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function formatCnpjMask(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 14);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

const STEPS = [
  { id: 1, title: 'Dados Pessoais', short: '1. Pessoais' },
  { id: 2, title: 'Empresa & Pagamento', short: '2. Empresa' },
  { id: 3, title: 'Faturamento & NF', short: '3. Faturamento' },
  { id: 4, title: 'Termos & Envio', short: '4. Termos' },
] as const;

const INITIAL_FORM: IbgRegistrationData = {
  nomeCompleto: '',
  telefoneWhatsApp: '',
  email: '',
  cpf: '',
  nomeEmpresa: '',
  cargo: '',
  formaPagamento: '',
  formaPagamentoOutra: '',
  faturamento: '',
  cnpjNf: '',
  autorizaImagem: '',
  cienteDadosAcademicos: false,
};

export const CheckoutSection: React.FC = () => {
  const { activePartner } = usePartner();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [stepDirection, setStepDirection] = useState<1 | -1>(1);
  const [formData, setFormData] = useState<IbgRegistrationData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedRecord, setSubmittedRecord] = useState<IbgRegistrationData | null>(null);

  const formCardRef = useRef<HTMLDivElement | null>(null);

  const clearFieldError = (fieldKey: string) => {
    setErrors((prev) => {
      if (!prev[fieldKey]) return prev;
      const next = { ...prev };
      delete next[fieldKey];
      return next;
    });
  };

  const scrollCardIntoViewIfNeeded = () => {
    if (!formCardRef.current || typeof window === 'undefined') return;
    const rect = formCardRef.current.getBoundingClientRect();
    if (rect.top < 76 || rect.top > window.innerHeight * 0.65) {
      formCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const validateStep = (step: number): boolean => {
    const nextErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.nomeCompleto.trim() || formData.nomeCompleto.trim().length < 3) {
        nextErrors.nomeCompleto = 'Informe seu nome completo.';
      }
      const phoneDigits = formData.telefoneWhatsApp.replace(/\D/g, '');
      if (phoneDigits.length < 10 || phoneDigits.length > 11) {
        nextErrors.telefoneWhatsApp = 'Informe DDD + número com WhatsApp (10 ou 11 dígitos).';
      }
      if (!isValidEmail(formData.email)) {
        nextErrors.email = 'Informe um endereço de e-mail válido.';
      }
      const cpfDigits = formData.cpf.replace(/\D/g, '');
      if (cpfDigits.length !== 11) {
        nextErrors.cpf = 'O CPF deve conter exatamente 11 dígitos.';
      }
    }

    if (step === 2) {
      if (!formData.nomeEmpresa.trim()) {
        nextErrors.nomeEmpresa = 'Informe o nome da empresa.';
      }
      if (!formData.cargo.trim()) {
        nextErrors.cargo = 'Informe o seu cargo.';
      }
      if (!formData.formaPagamento) {
        nextErrors.formaPagamento = 'Selecione a forma de pagamento.';
      } else if (
        formData.formaPagamento === 'Outra' &&
        !formData.formaPagamentoOutra.trim()
      ) {
        nextErrors.formaPagamentoOutra = 'Especifique a outra forma de pagamento.';
      }
    }

    if (step === 3) {
      if (!formData.faturamento) {
        nextErrors.faturamento = 'Selecione Pessoa Física ou Pessoa Jurídica.';
      }
      if (
        formData.faturamento === 'Pessoa Jurídica' &&
        formData.cnpjNf.replace(/\D/g, '').length !== 14
      ) {
        nextErrors.cnpjNf =
          'Para faturamento Pessoa Jurídica, informe os 14 dígitos do CNPJ para NF.';
      }
    }

    if (step === 4) {
      if (!formData.autorizaImagem) {
        nextErrors.autorizaImagem = 'Selecione Sim ou Não para a autorização de imagem.';
      }
      if (!formData.cienteDadosAcademicos) {
        nextErrors.cienteDadosAcademicos =
          'Marque "Ciente" para prosseguir com a inscrição.';
      }
    }

    setErrors(nextErrors);

    const firstErrorKey = Object.keys(nextErrors)[0];
    if (firstErrorKey && typeof document !== 'undefined') {
      requestAnimationFrame(() => {
        const el = document.querySelector(`[data-field-key="${firstErrorKey}"]`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    }

    return Object.keys(nextErrors).length === 0;
  };

  const handleNextStep = () => {
    setSubmitError(null);
    if (!validateStep(currentStep)) return;
    setStepDirection(1);
    setCurrentStep((prev) => Math.min(4, prev + 1));
    scrollCardIntoViewIfNeeded();
  };

  const handlePrevStep = () => {
    setSubmitError(null);
    setErrors({});
    setStepDirection(-1);
    setCurrentStep((prev) => Math.max(1, prev - 1));
    scrollCardIntoViewIfNeeded();
  };

  const handleJumpToStep = (targetStep: number) => {
    if (targetStep === currentStep) return;
    if (targetStep < currentStep) {
      setStepDirection(-1);
      setErrors({});
      setCurrentStep(targetStep);
      return;
    }
    // Only allow jumping forward if all prior steps pass validation
    for (let s = currentStep; s < targetStep; s++) {
      if (!validateStep(s)) {
        setCurrentStep(s);
        return;
      }
    }
    setStepDirection(1);
    setCurrentStep(targetStep);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (currentStep < 4) {
      handleNextStep();
      return;
    }

    // Revalidate all steps before final submission
    for (let s = 1; s <= 4; s++) {
      if (!validateStep(s)) {
        setStepDirection(s < currentStep ? -1 : 1);
        setCurrentStep(s);
        return;
      }
    }

    setSubmitting(true);

    const finalPaymentLabel =
      formData.formaPagamento === 'Outra'
        ? `Outra: ${formData.formaPagamentoOutra.trim()}`
        : formData.formaPagamento;

    const payload = {
      ...formData,
      formaPagamentoFinal: finalPaymentLabel,
      parceiroRef: activePartner.isPartner ? activePartner.id : 'organico',
      turma: 'Turma 34 Presencial - Faculdade IBG (04 e 05/12)',
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('agro_ibg_registrations') || '[]');
      existing.push(payload);
      localStorage.setItem('agro_ibg_registrations', JSON.stringify(existing));

      const legacyLeads = JSON.parse(localStorage.getItem('agro_leads') || '[]');
      legacyLeads.push({
        fullName: formData.nomeCompleto,
        email: formData.email,
        phone: formData.telefoneWhatsApp,
        companyName: formData.nomeEmpresa,
        role: formData.cargo,
        createdAt: payload.createdAt,
      });
      localStorage.setItem('agro_leads', JSON.stringify(legacyLeads));

      if (typeof window !== 'undefined') {
        (window as unknown as { __lastSubmittedLead?: unknown }).__lastSubmittedLead = payload;
      }
    } catch {
      // Ignore storage errors
    }

    const webhookUrl =
      (import.meta as unknown as { env?: Record<string, string | undefined> }).env
        ?.VITE_GOOGLE_SHEETS_WEBHOOK_URL ||
      'https://script.google.com/macros/s/AKfycbxCmxMlZbHOBszH7BZ51GXlk6BvrARUbTqp-CkjwsHev5bcoLogCDNdKcYBYtzOqofkYw/exec';

    const sheetBody = JSON.stringify({
      dataHora: new Date().toLocaleString('pt-BR'),
      turma: 'Turma 34 Presencial - Faculdade IBG (Rondonópolis - MT)',
      nome: formData.nomeCompleto.trim(),
      whatsapp: formData.telefoneWhatsApp.trim(),
      email: formData.email.trim(),
      cpf: formData.cpf.trim(),
      empresa: formData.nomeEmpresa.trim(),
      cargo: formData.cargo.trim(),
      formaPagamento: finalPaymentLabel,
      faturamento: formData.faturamento,
      cnpjNf: formData.cnpjNf.trim(),
      autorizaImagem: formData.autorizaImagem,
      cienteDadosAcademicos: formData.cienteDadosAcademicos ? 'Ciente' : 'Não',
      parceiro: activePartner.isPartner ? activePartner.name : 'Orgânico',
    });

    let scriptErrorMessage: string | null = null;

    if (webhookUrl) {
      try {
        const res = await fetch(webhookUrl, {
          method: 'POST',
          mode: 'cors',
          redirect: 'follow',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: sheetBody,
        });

        const rawText = await res.text().catch(() => '');
        let json: { status?: string; mensagem?: string } | null = null;
        try {
          json = rawText ? JSON.parse(rawText) : null;
        } catch {
          json = null;
        }

        if (!res.ok) {
          scriptErrorMessage = `Erro HTTP ${res.status} ao gravar na planilha.`;
        } else if (json && json.status === 'erro') {
          scriptErrorMessage =
            json.mensagem || 'O Apps Script retornou um erro ao gravar os dados na planilha.';
        }
      } catch {
        // Fallback only when the browser blocks reading the cross-origin redirect response
        try {
          await fetch(webhookUrl, {
            method: 'POST',
            mode: 'no-cors',
            redirect: 'follow',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: sheetBody,
          });
        } catch {
          setSubmitting(false);
          setSubmitError(
            'Erro de conexão ao enviar sua inscrição. Tente novamente em alguns segundos.'
          );
          return;
        }
      }
    }

    if (scriptErrorMessage) {
      setSubmitting(false);
      setSubmitError(scriptErrorMessage);
      return;
    }

    setSubmitting(false);
    setSubmittedRecord({ ...formData });
  };

  const cpfDigitsCount = formData.cpf.replace(/\D/g, '').length;
  const phoneDigitsCount = formData.telefoneWhatsApp.replace(/\D/g, '').length;
  const cnpjDigitsCount = formData.cnpjNf.replace(/\D/g, '').length;
  const progressPercent = (currentStep / STEPS.length) * 100;

  return (
    <section
      id="checkout-section"
      className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-emerald-50/40 via-teal-50/20 to-slate-50 text-slate-900 relative overflow-hidden border-t border-slate-200/80"
    >
      {/* Decorative ambient backdrop */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] lg:w-[900px] h-[550px] bg-gradient-to-r from-emerald-200/25 via-teal-200/25 to-blue-200/20 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs font-extrabold uppercase tracking-widest">
            <GraduationCap className="w-4 h-4 text-emerald-700" />
            <span>Agrovendedor × Faculdade IBG · Turma 34</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">
            GARANTA SUA VAGA
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Preencha sua ficha em 4 etapas rápidas para os dias{' '}
            <strong className="text-slate-900">04 e 05 de Dezembro</strong> em{' '}
            <strong className="text-slate-900">Rondonópolis - MT</strong>.
          </p>
        </div>

        {/* Official IBG Multi-Step Registration Form Card */}
        <div
          ref={formCardRef}
          className="scroll-mt-24 bg-white rounded-3xl border-2 border-emerald-500/80 shadow-2xl shadow-emerald-900/10 overflow-hidden ring-4 ring-emerald-500/10"
        >
          {/* Card Header + Mobile-Friendly Progress Stepper */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-5 sm:p-7 text-white border-b border-emerald-500/30 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-lg sm:text-2xl font-black tracking-tight uppercase">
                  INSCRIÇÃO TREINAMENTOS IBG
                </h3>
                {!submittedRecord && (
                  <p className="text-xs text-slate-300 font-semibold mt-1">
                    Etapa {currentStep} de {STEPS.length} — {STEPS[currentStep - 1].title}
                  </p>
                )}
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-black uppercase tracking-wider tabular-nums whitespace-nowrap">
                Turma 34 · 04 e 05/12
              </span>
            </div>

            {!submittedRecord && (
              <div className="space-y-2.5">
                {/* Visual Progress Track */}
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Clickable Step Indicators */}
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                  {STEPS.map((step) => {
                    const isCompleted = step.id < currentStep;
                    const isActive = step.id === currentStep;
                    return (
                      <button
                        key={step.id}
                        type="button"
                        onClick={() => handleJumpToStep(step.id)}
                        className={`py-1.5 px-2 rounded-lg text-[11px] sm:text-xs font-bold text-center transition cursor-pointer truncate ${
                          isActive
                            ? 'bg-emerald-500 text-slate-950 font-black shadow-sm'
                            : isCompleted
                            ? 'bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30'
                            : 'bg-white/5 text-slate-400 hover:bg-white/10'
                        }`}
                      >
                        {isCompleted ? `✓ ${step.short}` : step.short}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {submittedRecord ? (
            <div className="p-8 sm:p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Suas informações foram registradas!
                </h4>
                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                  Em breve, nosso time comercial entrará em contato com você para dar continuidade ao atendimento.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="p-5 sm:p-8 lg:p-9 space-y-6">
              <AnimatePresence mode="wait" initial={false}>
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: stepDirection * 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: stepDirection * -18 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4 sm:space-y-5"
                  >
                    {/* 1. Nome Completo */}
                    <div data-field-key="nomeCompleto">
                      <label htmlFor="ibg-nome" className="block text-sm font-bold text-slate-900 mb-1.5">
                        1. Nome Completo <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="ibg-nome"
                        type="text"
                        autoComplete="name"
                        required
                        placeholder="Insira seu nome completo"
                        value={formData.nomeCompleto}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData({ ...formData, nomeCompleto: value });
                          if (value.trim().length >= 3) clearFieldError('nomeCompleto');
                        }}
                        className="w-full min-h-[48px] px-4 py-3 text-base sm:text-sm rounded-xl border border-slate-300 bg-slate-50/70 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                      />
                      {errors.nomeCompleto && (
                        <p className="mt-1.5 text-xs font-semibold text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.nomeCompleto}</span>
                        </p>
                      )}
                    </div>

                    {/* 2. Telefone WhatsApp */}
                    <div data-field-key="telefoneWhatsApp">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <label htmlFor="ibg-telefone" className="block text-sm font-bold text-slate-900">
                          2. Telefone para contato (celular com whatsApp) <span className="text-rose-600">*</span>
                        </label>
                        {phoneDigitsCount >= 10 && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 shrink-0">
                            <Check className="w-3.5 h-3.5" /> OK
                          </span>
                        )}
                      </div>
                      <input
                        id="ibg-telefone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                        placeholder="(66) 99999-9999"
                        value={formData.telefoneWhatsApp}
                        onChange={(e) => {
                          const masked = formatPhoneMask(e.target.value);
                          setFormData({ ...formData, telefoneWhatsApp: masked });
                          const d = masked.replace(/\D/g, '').length;
                          if (d >= 10 && d <= 11) clearFieldError('telefoneWhatsApp');
                        }}
                        className="w-full min-h-[48px] px-4 py-3 text-base sm:text-sm rounded-xl border border-slate-300 bg-slate-50/70 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition tabular-nums"
                      />
                      {errors.telefoneWhatsApp && (
                        <p className="mt-1.5 text-xs font-semibold text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.telefoneWhatsApp}</span>
                        </p>
                      )}
                    </div>

                    {/* 3. Email */}
                    <div data-field-key="email">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <label htmlFor="ibg-email" className="block text-sm font-bold text-slate-900">
                          3. Email <span className="text-rose-600">*</span>
                        </label>
                        {isValidEmail(formData.email) && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 shrink-0">
                            <Check className="w-3.5 h-3.5" /> OK
                          </span>
                        )}
                      </div>
                      <input
                        id="ibg-email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        required
                        placeholder="seuemail@empresa.com.br"
                        value={formData.email}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData({ ...formData, email: value });
                          if (isValidEmail(value)) clearFieldError('email');
                        }}
                        className="w-full min-h-[48px] px-4 py-3 text-base sm:text-sm rounded-xl border border-slate-300 bg-slate-50/70 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs font-semibold text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* 4. CPF */}
                    <div data-field-key="cpf">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <label htmlFor="ibg-cpf" className="block text-sm font-bold text-slate-900">
                          4. CPF <span className="text-rose-600">*</span>
                        </label>
                        <span
                          className={`text-[11px] font-bold tabular-nums ${
                            cpfDigitsCount === 11 ? 'text-emerald-700' : 'text-slate-400'
                          }`}
                        >
                          {cpfDigitsCount === 11 ? '✓ 11/11 dígitos' : `${cpfDigitsCount}/11 dígitos`}
                        </span>
                      </div>
                      <input
                        id="ibg-cpf"
                        type="text"
                        inputMode="numeric"
                        required
                        placeholder="000.000.000-00"
                        value={formData.cpf}
                        onChange={(e) => {
                          const masked = formatCpfMask(e.target.value);
                          setFormData({ ...formData, cpf: masked });
                          if (masked.replace(/\D/g, '').length === 11) {
                            clearFieldError('cpf');
                          }
                        }}
                        className="w-full min-h-[48px] px-4 py-3 text-base sm:text-sm rounded-xl border border-slate-300 bg-slate-50/70 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition tabular-nums"
                      />
                      {errors.cpf && (
                        <p className="mt-1.5 text-xs font-semibold text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.cpf}</span>
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: stepDirection * 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: stepDirection * -18 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4 sm:space-y-5"
                  >
                    {/* 5. Nome da Empresa */}
                    <div data-field-key="nomeEmpresa">
                      <label htmlFor="ibg-empresa" className="block text-sm font-bold text-slate-900 mb-1.5">
                        5. Nome da Empresa <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="ibg-empresa"
                        type="text"
                        autoComplete="organization"
                        required
                        placeholder="Nome da revenda, cooperativa, fazenda ou indústria"
                        value={formData.nomeEmpresa}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData({ ...formData, nomeEmpresa: value });
                          if (value.trim()) clearFieldError('nomeEmpresa');
                        }}
                        className="w-full min-h-[48px] px-4 py-3 text-base sm:text-sm rounded-xl border border-slate-300 bg-slate-50/70 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                      />
                      {errors.nomeEmpresa && (
                        <p className="mt-1.5 text-xs font-semibold text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.nomeEmpresa}</span>
                        </p>
                      )}
                    </div>

                    {/* 6. Cargo */}
                    <div data-field-key="cargo">
                      <label htmlFor="ibg-cargo" className="block text-sm font-bold text-slate-900 mb-1.5">
                        6. Cargo <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="ibg-cargo"
                        type="text"
                        autoComplete="organization-title"
                        required
                        placeholder="Ex.: RTV, Consultor de Vendas, Gerente Comercial..."
                        value={formData.cargo}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData({ ...formData, cargo: value });
                          if (value.trim()) clearFieldError('cargo');
                        }}
                        className="w-full min-h-[48px] px-4 py-3 text-base sm:text-sm rounded-xl border border-slate-300 bg-slate-50/70 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                      />
                      {errors.cargo && (
                        <p className="mt-1.5 text-xs font-semibold text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.cargo}</span>
                        </p>
                      )}
                    </div>

                    {/* 7. Valor e Formas de Pagamento */}
                    <div
                      data-field-key="formaPagamento"
                      className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 space-y-3"
                    >
                      <span className="block text-sm font-bold text-slate-900">
                        7. Valor e Formas de Pagamento <span className="text-rose-600">*</span>
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {(['À vista -', 'Pix', 'Cartão', 'Outra'] as const).map((option) => (
                          <label
                            key={option}
                            className={`flex items-center gap-3 p-3.5 min-h-[48px] rounded-xl border cursor-pointer transition ${
                              formData.formaPagamento === option
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-2xs'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="formaPagamento"
                              value={option}
                              checked={formData.formaPagamento === option}
                              onChange={() => {
                                setFormData({ ...formData, formaPagamento: option });
                                clearFieldError('formaPagamento');
                                if (option !== 'Outra') clearFieldError('formaPagamentoOutra');
                              }}
                              className="accent-emerald-600 w-4 h-4 shrink-0"
                            />
                            <span className="text-sm">{option}</span>
                          </label>
                        ))}
                      </div>

                      {formData.formaPagamento === 'Outra' && (
                        <div className="pt-1">
                          <input
                            type="text"
                            placeholder="Especifique a outra forma de pagamento"
                            value={formData.formaPagamentoOutra}
                            onChange={(e) => {
                              const value = e.target.value;
                              setFormData({ ...formData, formaPagamentoOutra: value });
                              if (value.trim()) clearFieldError('formaPagamentoOutra');
                            }}
                            className="w-full min-h-[48px] px-4 py-2.5 text-base sm:text-sm rounded-xl border border-emerald-300 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                          />
                          {errors.formaPagamentoOutra && (
                            <p className="mt-1.5 text-xs font-semibold text-rose-600 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{errors.formaPagamentoOutra}</span>
                            </p>
                          )}
                        </div>
                      )}

                      {errors.formaPagamento && (
                        <p className="text-xs font-semibold text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.formaPagamento}</span>
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: stepDirection * 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: stepDirection * -18 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4 sm:space-y-5"
                  >
                    {/* 8. Faturamento */}
                    <div
                      data-field-key="faturamento"
                      className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 space-y-4"
                    >
                      <div>
                        <span className="block text-sm font-bold text-slate-900 mb-2.5">
                          8. Faturamento <span className="text-rose-600">*</span>
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {(['Pessoa Física', 'Pessoa Jurídica'] as const).map((tipo) => (
                            <label
                              key={tipo}
                              className={`flex items-center gap-3 p-3.5 min-h-[48px] rounded-xl border cursor-pointer transition ${
                                formData.faturamento === tipo
                                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-2xs'
                                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                              }`}
                            >
                              <input
                                type="radio"
                                name="faturamento"
                                value={tipo}
                                checked={formData.faturamento === tipo}
                                onChange={() => {
                                  setFormData({ ...formData, faturamento: tipo });
                                  clearFieldError('faturamento');
                                  if (tipo === 'Pessoa Física') clearFieldError('cnpjNf');
                                }}
                                className="accent-emerald-600 w-4 h-4 shrink-0"
                              />
                              <span className="text-sm">{tipo}</span>
                            </label>
                          ))}
                        </div>
                        {errors.faturamento && (
                          <p className="mt-1.5 text-xs font-semibold text-rose-600 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.faturamento}</span>
                          </p>
                        )}
                      </div>

                      {/* 9. CNPJ para NF */}
                      <div data-field-key="cnpjNf">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <label htmlFor="ibg-cnpj" className="block text-sm font-bold text-slate-900">
                            9. Para Faturamento Pessoa Jurídica Informar CNPJ para NF .{' '}
                            {formData.faturamento === 'Pessoa Jurídica' && (
                              <span className="text-rose-600">*</span>
                            )}
                          </label>
                          {formData.faturamento === 'Pessoa Jurídica' && (
                            <span
                              className={`text-[11px] font-bold tabular-nums shrink-0 ${
                                cnpjDigitsCount === 14 ? 'text-emerald-700' : 'text-slate-400'
                              }`}
                            >
                              {cnpjDigitsCount === 14 ? '✓ 14/14' : `${cnpjDigitsCount}/14`}
                            </span>
                          )}
                        </div>
                        <input
                          id="ibg-cnpj"
                          type="text"
                          inputMode="numeric"
                          placeholder={
                            formData.faturamento === 'Pessoa Física'
                              ? 'Opcional para Pessoa Física (00.000.000/0000-00)'
                              : '00.000.000/0000-00'
                          }
                          value={formData.cnpjNf}
                          onChange={(e) => {
                            const masked = formatCnpjMask(e.target.value);
                            setFormData({ ...formData, cnpjNf: masked });
                            if (masked.replace(/\D/g, '').length === 14) {
                              clearFieldError('cnpjNf');
                            }
                          }}
                          className={`w-full min-h-[48px] px-4 py-3 text-base sm:text-sm rounded-xl border bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition tabular-nums ${
                            formData.faturamento === 'Pessoa Jurídica'
                              ? 'border-emerald-400'
                              : 'border-slate-300'
                          }`}
                        />
                        {errors.cnpjNf && (
                          <p className="mt-1.5 text-xs font-semibold text-rose-600 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.cnpjNf}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, x: stepDirection * 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: stepDirection * -18 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4 sm:space-y-5"
                  >
                    {/* 10. Autorização de uso de imagem */}
                    <div
                      data-field-key="autorizaImagem"
                      className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 space-y-3"
                    >
                      <span className="block text-sm font-bold text-slate-900 leading-relaxed">
                        10. Eu, AUTORIZO o uso de minha imagem, com o fim específico de divulgação nas redes sociais da Faculdade IBG, sem qualquer ônus, podendo solicitar a cessação a qualquer tempo.{' '}
                        <span className="text-rose-600">*</span>
                      </span>
                      <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
                        {(['Sim', 'Não'] as const).map((choice) => (
                          <label
                            key={choice}
                            className={`flex items-center justify-center sm:justify-start gap-2.5 px-5 py-3 min-h-[48px] rounded-xl border cursor-pointer transition sm:min-w-[120px] ${
                              formData.autorizaImagem === choice
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-2xs'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="autorizaImagem"
                              value={choice}
                              checked={formData.autorizaImagem === choice}
                              onChange={() => {
                                setFormData({ ...formData, autorizaImagem: choice });
                                clearFieldError('autorizaImagem');
                              }}
                              className="accent-emerald-600 w-4 h-4 shrink-0"
                            />
                            <span className="text-sm">{choice}</span>
                          </label>
                        ))}
                      </div>
                      {errors.autorizaImagem && (
                        <p className="text-xs font-semibold text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.autorizaImagem}</span>
                        </p>
                      )}
                    </div>

                    {/* 11. Informações de uso dos dados coletados - Sistema Acadêmico Sophia */}
                    <div
                      data-field-key="cienteDadosAcademicos"
                      className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/90 space-y-3"
                    >
                      <div className="flex items-start gap-2.5">
                        <FileText className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                          11. <strong>INFORMAÇÕES DE USO DOS DADOS ACIMA COLETADOS</strong> Para cumprimento das obrigações legais pertinentes as atividades da instituição, os dados serão armazenados no Sistema Acadêmico Sophia e em Arquivo Físico. A finalidade de tratamento desses dados será para: a) Gerar documentos acadêmicos relativos ao curso matriculado(a); b) Gerar Contrato de Prestação de Serviços Educacionais, os boletos dos valores acordados e Documentos Fiscais; c) E-mail: Envio de informações acadêmicas e financeira e d) Experiencia Profissional: Para montar o perfil da turma e melhorias de material didático.{' '}
                          <span className="text-rose-600">*</span>
                        </p>
                      </div>

                      <label
                        className={`flex sm:inline-flex items-center justify-center sm:justify-start gap-3 px-5 py-3 min-h-[48px] rounded-xl border cursor-pointer transition ${
                          formData.cienteDadosAcademicos
                            ? 'bg-emerald-600 border-emerald-600 text-white font-black shadow-sm'
                            : 'bg-white border-slate-300 text-slate-800 hover:border-emerald-400 font-bold'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.cienteDadosAcademicos}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setFormData({
                              ...formData,
                              cienteDadosAcademicos: checked,
                            });
                            if (checked) clearFieldError('cienteDadosAcademicos');
                          }}
                          className="accent-white w-4 h-4 shrink-0"
                        />
                        <span className="text-sm">Ciente</span>
                      </label>

                      {errors.cienteDadosAcademicos && (
                        <p className="text-xs font-semibold text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.cienteDadosAcademicos}</span>
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* API Submit Error Feedback */}
              {submitError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Step Navigation Footer */}
              <div className="pt-2 space-y-3">
                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      disabled={submitting}
                      className="sm:w-auto py-3.5 px-5 min-h-[48px] rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                    >
                      <ArrowLeft className="w-4 h-4 shrink-0" />
                      <span>Voltar</span>
                    </button>
                  )}

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-1 py-4 px-6 min-h-[52px] bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.99] text-white font-black text-sm sm:text-base uppercase tracking-wider rounded-2xl shadow-lg shadow-emerald-600/25 transition flex items-center justify-center gap-2.5 cursor-pointer border border-emerald-300/60"
                    >
                      <span>Prosseguir</span>
                      <ArrowRight className="w-5 h-5 shrink-0" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group relative flex-1 py-4 px-6 min-h-[52px] bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.99] text-white font-black text-sm sm:text-base uppercase tracking-wider rounded-2xl shadow-xl shadow-emerald-600/30 hover:shadow-emerald-500/45 transition-all flex items-center justify-center gap-2.5 cursor-pointer text-center border border-emerald-300/60 overflow-hidden disabled:opacity-60"
                    >
                      <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 pointer-events-none" />
                      <span>
                        {submitting ? 'Enviando Inscrição...' : 'Enviar Inscrição Turma 34'}
                      </span>
                      <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium text-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dados protegidos e integrados ao registro acadêmico da Faculdade IBG.</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
