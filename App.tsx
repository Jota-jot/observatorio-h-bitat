/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import heroArchitectureImg from './assets/images/hero_domestic_architecture_1791058702758.jpg';
import { BrandLogo } from './components/BrandLogo';
import { QuickRiskTriage } from './components/QuickRiskTriage';
import { EpidemiologyDashboard } from './components/EpidemiologyDashboard';
import { PreventionGuide } from './components/PreventionGuide';
import { RoiAndSolutionsSuite } from './components/RoiAndSolutionsSuite';
import { KeyFiguresAndCitations } from './components/KeyFiguresAndCitations';
import { InteractiveGlossary } from './components/InteractiveGlossary';
import { WebIntegrationGuideModal } from './components/WebIntegrationGuideModal';
import { ArrowDownRight, Globe, Eye, Download } from 'lucide-react';

export default function App() {
  const [activeCitationId, setActiveCitationId] = useState<string | null>(null);
  const [presetPreventionGroup, setPresetPreventionGroup] = useState<string | null>(null);
  const [selectedGlossaryTermId, setSelectedGlossaryTermId] = useState<string | null>(null);
  const [heroImageError, setHeroImageError] = useState<boolean>(false);
  const [activeNarrativeTab, setActiveNarrativeTab] = useState<'both' | 'europa' | 'espana'>('both');
  const [isIntegrationModalOpen, setIsIntegrationModalOpen] = useState<boolean>(false);
  const [isHighVisibility, setIsHighVisibility] = useState<boolean>(() => {
    try {
      return localStorage.getItem('acw_high_visibility_mode') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isHighVisibility) {
      root.classList.add('high-visibility-mode');
    } else {
      root.classList.remove('high-visibility-mode');
    }
    try {
      localStorage.setItem('acw_high_visibility_mode', String(isHighVisibility));
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [isHighVisibility]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJumpToGlossaryTerm = (termId: string) => {
    setSelectedGlossaryTermId(termId);
    scrollToSection('glosario-epidemiologico');
  };

  const handleJumpToPreventionWithGroup = (groupKey: string) => {
    setPresetPreventionGroup(groupKey);
    scrollToSection('guia-prevencion');
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors ${
        isHighVisibility ? 'bg-white text-[#030B17]' : 'bg-[#F8FAFC] text-[#0A1D37]'
      }`}
    >
      {/* Top Brand Accent Bar */}
      <div className="h-1.5 w-full bg-acw-gradient no-print" />

      {/* STRICT 3-ZONE TOP BAR CONTRACT WITH ACCESSIBILITY HIGH-VISIBILITY SWITCH */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-6 lg:px-12 py-3.5 flex items-center justify-between gap-4 no-print">
        {/* Zone 1: Brand Logo Lockup */}
        <a
          href="#panorama"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('panorama');
          }}
          className="focus:outline-none shrink-0"
          aria-label="Hábitat Asistencial AssureCareWare — Inicio"
        >
          <BrandLogo size="md" />
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a
            href="#panorama"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('panorama');
            }}
            className="hover:text-[#0088CE] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
          >
            Panorama
          </a>
          <a
            href="#infografia"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('infografia');
            }}
            className="hover:text-[#0088CE] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
          >
            Infografía y Datos
          </a>
          <a
            href="#guia-prevencion"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('guia-prevencion');
            }}
            className="hover:text-[#0088CE] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
          >
            Guía de Prevención
          </a>
          <a
            href="#soluciones-assurecareware"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('soluciones-assurecareware');
            }}
            className="hover:text-[#0088CE] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
          >
            Soluciones y ROI
          </a>
          <a
            href="#cifras-clave"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('cifras-clave');
            }}
            className="hover:text-[#0088CE] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
          >
            Cifras Clave
          </a>
          <a
            href="#glosario-epidemiologico"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('glosario-epidemiologico');
            }}
            className="hover:text-[#0088CE] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
          >
            Glosario
          </a>
        </nav>

        {/* Zone 3: Accessibility High-Visibility Switch + Primary Action */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            role="switch"
            aria-checked={isHighVisibility}
            aria-label="Activar o desactivar Modo Alta Visibilidad para lectura accesible"
            onClick={() => setIsHighVisibility((prev) => !prev)}
            title="Aumenta el tamaño de letra (+19%) y refuerza el contraste (WCAG AAA) para personas mayores o con baja visión"
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              isHighVisibility
                ? 'bg-[#0A1D37] text-[#7ED321] border-[#0A1D37] shadow-xs'
                : 'bg-slate-100 text-[#0A1D37] border-slate-300 hover:border-[#0088CE] hover:bg-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Modo Alta Visibilidad</span>
            <span className="font-mono-tabular font-bold px-1.5 py-0.5 rounded bg-white/15 border border-current/20 text-[11px]">
              {isHighVisibility ? 'A+ ON' : 'A+'}
            </span>
            <span
              className={`w-7 h-4 flex items-center rounded-full p-0.5 transition-colors ${
                isHighVisibility ? 'bg-[#7ED321]' : 'bg-slate-300'
              }`}
              aria-hidden="true"
            >
              <span
                className={`bg-white w-3 h-3 rounded-full shadow-xs transform transition-transform ${
                  isHighVisibility ? 'translate-x-3' : 'translate-x-0'
                }`}
              />
            </span>
          </button>

          <a
            href="/observatorio-habitat-asistencial.zip"
            download="observatorio-habitat-asistencial.zip"
            title="Descargar paquete completo del proyecto en formato .ZIP listo para subir a otro perfil de GitHub"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#0A1D37] bg-[#7ED321]/25 border border-[#7ED321] rounded-lg hover:bg-[#7ED321] hover:text-[#0A1D37] transition-colors whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span>Descargar .ZIP</span>
          </a>

          <button
            type="button"
            onClick={() => scrollToSection('guia-prevencion')}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0A1D37] rounded-lg hover:bg-[#0088CE] transition-colors whitespace-nowrap"
          >
            Evaluar mi Hogar
          </button>
        </div>
      </header>

      {/* Active High-Visibility Accessibility Notice Bar */}
      {isHighVisibility && (
        <div
          role="status"
          aria-live="polite"
          className="bg-[#0A1D37] text-white border-b-2 border-[#7ED321] px-6 lg:px-12 py-2.5 text-xs flex flex-wrap items-center justify-between gap-3 no-print"
        >
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#7ED321]" />
            <span>
              <strong>Modo Alta Visibilidad Activado (Accesibilidad Senior AAA):</strong> Tamaño tipográfico ampliado (+19%), interlineado extendido y contraste reforzado para facilitar la lectura.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsHighVisibility(false)}
            className="underline text-[#7ED321] font-semibold hover:text-white whitespace-nowrap"
          >
            Restaurar vista estándar
          </button>
        </div>
      )}

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-1 max-w-[1360px] w-full mx-auto px-6 lg:px-12">
        {/* SECTION 01: HERO & PANORAMA EJECUTIVO (EUROPA Y ESPAÑA) */}
        <section id="panorama" className="py-10 lg:py-14 border-b border-slate-200">
          {/* Institutional Brand Showcase Banner so Logo is 100% prominent */}
          <div className="mb-8 pb-8 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <BrandLogo size="xl" showCard={true} />

            <div className="flex flex-col md:items-end justify-center text-xs text-slate-600 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 uppercase tracking-widest font-semibold text-[#0088CE]">
                <span>Observatorio de Seguridad Intradomiciliaria</span>
                <span aria-hidden="true">·</span>
                <span>Europa y España</span>
              </div>
              <p className="text-slate-500 max-w-md md:text-right leading-relaxed">
                Inteligencia epidemiológica (2006–2025) aplicada al diseño de entornos domésticos seguros para la infancia y la longevidad.
              </p>
            </div>
          </div>

          {/* Asymmetric Hero Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 7 Columns: Dominant Editorial Thesis */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <h1
                  className="text-4xl sm:text-5xl lg:text-[52px] font-editorial text-[#0A1D37] leading-[1.08] tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Europa y España: panorama de los accidentes en el hogar y prevención asistencial
                </h1>

                <p className="mt-6 text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl first-letter:text-5xl first-letter:font-editorial first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-[#0088CE]">
                  En Europa y España, el patrón epidemiológico es claro: los accidentes en casa son frecuentes, afectan sobre todo a niños y personas mayores, y las caídas dominan la mayoría de los registros (Alves 2025, Costa 2012). Aunque la mayoría de los episodios atendidos en urgencias son leves, la carga poblacional, el ingreso hospitalario y el impacto en discapacidad aumentan mucho con la edad (Alves 2024, Piffer 2021, Guillén 2023).
                </p>

                {/* Primary Hero CTAs */}
                <div className="mt-8 flex flex-wrap items-center gap-4 no-print">
                  <button
                    type="button"
                    onClick={() => scrollToSection('guia-prevencion')}
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#0088CE] rounded-lg hover:bg-[#0A1D37] transition-colors whitespace-nowrap"
                  >
                    <span>Generar Guía Personalizada de Prevención</span>
                    <ArrowDownRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('infografia')}
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-[#0A1D37] bg-white border border-slate-300 rounded-lg hover:border-[#14A88B] hover:text-[#14A88B] transition-colors whitespace-nowrap"
                  >
                    <span>Explorar Infografía por Edad y Tipo</span>
                  </button>
                </div>
              </div>

              {/* 4 Macro Epidemiological Benchmarks */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-8 border-t border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 block">Mecanismo Caídas (UE)</span>
                  <span className="text-3xl font-mono-tabular font-semibold text-[#0088CE] mt-1 block">
                    56.2%
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveCitationId('alves-2025')}
                    className="text-xs text-slate-500 underline hover:text-[#0088CE] mt-1 inline-block"
                  >
                    Alves 2025
                  </button>
                </div>

                <div>
                  <span className="text-xs text-slate-500 block">Mortalidad Anual UE</span>
                  <span className="text-3xl font-mono-tabular font-semibold text-[#0A1D37] mt-1 block">
                    110,000
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveCitationId('keall-2011')}
                    className="text-xs text-slate-500 underline hover:text-[#0088CE] mt-1 inline-block"
                  >
                    Supera al tráfico · Keall 2011
                  </button>
                </div>

                <div>
                  <span className="text-xs text-slate-500 block">Episodios 0–19 Años</span>
                  <span className="text-3xl font-mono-tabular font-semibold text-[#14A88B] mt-1 block">
                    3.6 M
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveCitationId('alves-2024')}
                    className="text-xs text-slate-500 underline hover:text-[#14A88B] mt-1 inline-block"
                  >
                    92.9% sin ingreso · Alves 2024
                  </button>
                </div>

                <div>
                  <span className="text-xs text-slate-500 block">Incidencia España</span>
                  <span className="text-3xl font-mono-tabular font-semibold text-[#0A1D37] mt-1 block">
                    2,651
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveCitationId('costa-2012')}
                    className="text-xs text-slate-500 underline hover:text-[#0088CE] mt-1 inline-block"
                  >
                    por 100k hab · Costa 2012
                  </button>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Documentary Visual Anchor + Caption */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200 p-3">
                <div className="relative aspect-16/10 overflow-hidden bg-[#0A1D37]">
                  {!heroImageError ? (
                    <img
                      src={heroArchitectureImg}
                      alt="Interior arquitectónico de vivienda europea con escalera iluminada por luz natural"
                      referrerPolicy="no-referrer"
                      onError={() => setHeroImageError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#0A1D37] text-slate-100">
                      <span className="text-xs uppercase tracking-widest text-[#7ED321]">
                        Hábitat Asistencial · AssureCareWare
                      </span>
                      <p className="text-lg font-editorial mt-2">
                        Escaleras, baño y cocina concentran más del 57% de la accidentalidad
                      </p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D37]/90 via-[#0A1D37]/30 to-transparent flex flex-col justify-end p-5">
                    <span className="text-[11px] uppercase tracking-widest text-[#7ED321] font-semibold">
                      Alerta en Primera Infancia y Longevidad
                    </span>
                    <p className="text-sm text-white mt-1 leading-snug">
                      En 16 países europeos, las lesiones mortales en casa son la 1ª causa de muerte por lesión en menores de 5 años (Sengoelge 2010).
                    </p>
                  </div>
                </div>
                <div className="pt-3 px-1 flex items-center justify-between text-xs font-serif italic text-slate-500">
                  <span>
                    Fig. 0 — El entorno intradomiciliario concentra el 57.1% de los accidentes registrados en España (Costa 2012).
                  </span>
                  <span className="not-italic font-mono-tabular text-[#0088CE] font-semibold">
                    32M hosp./año UE
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 30-SECOND CLINICAL TRIAGE & BEFORE/AFTER ASSURECAREWARE IMPACT */}
          <QuickRiskTriage
            onApplyTriageToGuide={handleJumpToPreventionWithGroup}
            onSelectCitation={(id) => setActiveCitationId(id)}
          />

          {/* NARRATIVE COMPARISON: EUROPA VS ESPAÑA READING COLUMNS */}
          <div className="mt-14 pt-10 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-editorial text-[#0A1D37]">
                  Radiografía Comparada: Evidencia en Europa y Evidencia en España
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Haz clic en cualquier autor subrayado para consultar su ficha metodológica o en los <span className="text-[#0088CE] font-medium">términos punteados</span> para abrir su explicación en el Glosario
                </p>
              </div>

              <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg self-start">
                <button
                  type="button"
                  onClick={() => setActiveNarrativeTab('both')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    activeNarrativeTab === 'both'
                      ? 'bg-white text-[#0A1D37] shadow-xs'
                      : 'text-slate-600 hover:text-[#0A1D37]'
                  }`}
                >
                  Vista Paralela
                </button>
                <button
                  type="button"
                  onClick={() => setActiveNarrativeTab('europa')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    activeNarrativeTab === 'europa'
                      ? 'bg-[#0088CE] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#0A1D37]'
                  }`}
                >
                  Solo Europa
                </button>
                <button
                  type="button"
                  onClick={() => setActiveNarrativeTab('espana')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    activeNarrativeTab === 'espana'
                      ? 'bg-[#14A88B] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#0A1D37]'
                  }`}
                >
                  Solo España
                </button>
              </div>
            </div>

            <div
              className={`grid grid-cols-1 ${
                activeNarrativeTab === 'both' ? 'lg:grid-cols-2' : 'lg:grid-cols-1 max-w-3xl'
              } gap-8`}
            >
              {/* EUROPA COLUMN */}
              {(activeNarrativeTab === 'both' || activeNarrativeTab === 'europa') && (
                <div className="bg-white border border-slate-200 border-t-4 border-t-[#0088CE] p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs pb-4 border-b border-slate-100">
                      <span className="font-semibold uppercase tracking-widest text-[#0088CE]">
                        Ámbito 01 · Panorama en Europa
                      </span>
                      <span className="font-mono-tabular text-slate-500">
                        Sistemas EU-IDB & Vigilancia Continental
                      </span>
                    </div>

                    <div className="space-y-4 mt-5 text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                      <p>
                        Los datos europeos de vigilancia muestran que las lesiones en el hogar son más frecuentes en <strong>menores de 14 años y en mayores de 65</strong>, con un <strong className="font-mono-tabular text-[#0088CE]">56.2%</strong> de los mecanismos debidos a caídas (
                        <button
                          type="button"
                          onClick={() => setActiveCitationId('alves-2025')}
                          className="underline decoration-slate-400 hover:text-[#0088CE]"
                        >
                          Alves 2025
                        </button>
                        ). En esa misma base, la probabilidad de ingreso por lesión doméstica es mucho mayor en personas de <strong>75 años o más</strong> y también aumenta en <strong>intoxicaciones</strong> (
                        <button
                          type="button"
                          onClick={() => setActiveCitationId('alves-2025')}
                          className="underline decoration-slate-400 hover:text-[#0088CE]"
                        >
                          Alves 2025
                        </button>
                        ).
                      </p>

                      <p>
                        En niños y adolescentes de 0 a 19 años, el sistema{' '}
                        <button
                          type="button"
                          onClick={() => handleJumpToGlossaryTerm('gl-eu-idb')}
                          title="Ver definición sencilla de EU-IDB en el Glosario"
                          className="font-semibold text-[#0088CE] border-b border-dashed border-[#0088CE] hover:bg-[#0088CE]/10 px-0.5 transition-colors"
                        >
                          EU-IDB
                        </button>{' '}
                        registró <strong className="font-mono-tabular text-[#0A1D37]">3.6 millones</strong> de episodios de{' '}
                        <button
                          type="button"
                          onClick={() => handleJumpToGlossaryTerm('gl-hla')}
                          title="Ver definición de Accidentes Domésticos y de Ocio (HLA)"
                          className="font-semibold text-[#0088CE] border-b border-dashed border-[#0088CE] hover:bg-[#0088CE]/10 px-0.5 transition-colors"
                        >
                          accidentes domésticos y de ocio
                        </button>{' '}
                        en diez años, y las caídas fueron la causa más común en todos los grupos de edad (
                        <button
                          type="button"
                          onClick={() => setActiveCitationId('alves-2024')}
                          className="underline decoration-slate-400 hover:text-[#0088CE]"
                        >
                          Alves 2024
                        </button>
                        ). La mayoría de estos episodios no requirió{' '}
                        <button
                          type="button"
                          onClick={() => handleJumpToGlossaryTerm('gl-admision-hospitalaria')}
                          title="Ver definición de Ingreso / Admisión Hospitalaria"
                          className="font-semibold text-[#0088CE] border-b border-dashed border-[#0088CE] hover:bg-[#0088CE]/10 px-0.5 transition-colors"
                        >
                          ingreso hospitalario
                        </button>
                        , con un <strong className="font-mono-tabular text-[#14A88B]">92.9%</strong> sin admisión (
                        <button
                          type="button"
                          onClick={() => setActiveCitationId('alves-2024')}
                          className="underline decoration-slate-400 hover:text-[#0088CE]"
                        >
                          Alves 2024
                        </button>
                        ).
                      </p>

                      <p>
                        En Europa en conjunto, la carga es grande: se estimaron casi <strong className="font-mono-tabular text-[#0A1D37]">110,000 muertes anuales</strong> por lesiones en hogar y ocio y unos <strong className="font-mono-tabular text-[#0A1D37]">32 millones de hospitalizaciones</strong>, con una tasa de mortalidad superior a la de tráfico (
                        <button
                          type="button"
                          onClick={() => setActiveCitationId('keall-2011')}
                          className="underline decoration-slate-400 hover:text-[#0088CE]"
                        >
                          Keall 2011
                        </button>
                        ). En menores de 5 años, las lesiones mortales en casa destacan especialmente, y en <strong>16 países europeos</strong> fueron la principal causa de muerte por lesión en ese grupo (
                        <button
                          type="button"
                          onClick={() => setActiveCitationId('sengoelge-2010')}
                          className="underline decoration-slate-400 hover:text-[#0088CE]"
                        >
                          Sengoelge 2010
                        </button>
                        ).
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Citas clave: Alves 2025 · Alves 2024 · Keall 2011 · Sengoelge 2010</span>
                  </div>
                </div>
              )}

              {/* ESPAÑA COLUMN */}
              {(activeNarrativeTab === 'both' || activeNarrativeTab === 'espana') && (
                <div className="bg-white border border-slate-200 border-t-4 border-t-[#14A88B] p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs pb-4 border-b border-slate-100">
                      <span className="font-semibold uppercase tracking-widest text-[#14A88B]">
                        Ámbito 02 · Panorama en España
                      </span>
                      <span className="font-mono-tabular text-slate-500">
                        Redes Centinela, Pediatría y Discapacidad
                      </span>
                    </div>

                    <div className="space-y-4 mt-5 text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                      <p>
                        En Castilla y León, la{' '}
                        <button
                          type="button"
                          onClick={() => handleJumpToGlossaryTerm('gl-incidencia')}
                          title="Ver explicación sencilla de Incidencia Anual en el Glosario"
                          className="font-semibold text-[#14A88B] border-b border-dashed border-[#14A88B] hover:bg-[#14A88B]/10 px-0.5 transition-colors"
                        >
                          incidencia anual
                        </button>{' '}
                        fue de <strong className="font-mono-tabular text-[#0A1D37]">2,651 casos por 100,000 habitantes</strong>, con más accidentes en menores de 15 años y mayores de 65, y el <strong className="font-mono-tabular text-[#14A88B]">57.1%</strong> ocurrieron en el hogar (
                        <button
                          type="button"
                          onClick={() => setActiveCitationId('costa-2012')}
                          className="underline decoration-slate-400 hover:text-[#14A88B]"
                        >
                          Costa 2012
                        </button>
                        ). Las causas más comunes fueron las{' '}
                        <button
                          type="button"
                          onClick={() => handleJumpToGlossaryTerm('gl-caida-mismo-nivel')}
                          title="Ver explicación de Caídas al Mismo Nivel en el Glosario"
                          className="font-semibold text-[#14A88B] border-b border-dashed border-[#14A88B] hover:bg-[#14A88B]/10 px-0.5 transition-colors"
                        >
                          caídas al mismo nivel
                        </button>{' '}
                        y los <strong>objetos cortantes</strong> (
                        <button
                          type="button"
                          onClick={() => setActiveCitationId('costa-2012')}
                          className="underline decoration-slate-400 hover:text-[#14A88B]"
                        >
                          Costa 2012
                        </button>
                        ).
                      </p>

                      <p>
                        En España, las{' '}
                        <button
                          type="button"
                          onClick={() => handleJumpToGlossaryTerm('gl-redes-centinela')}
                          title="Ver explicación sencilla de Redes Centinela en el Glosario"
                          className="font-semibold text-[#14A88B] border-b border-dashed border-[#14A88B] hover:bg-[#14A88B]/10 px-0.5 transition-colors"
                        >
                          redes centinela
                        </button>{' '}
                        y encuestas coinciden en que el domicilio concentra muchas lesiones infantiles, que <strong>los niños se lesionan más que las niñas</strong> y que la mayoría no requiere ingreso (
                        <button
                          type="button"
                          onClick={() => setActiveCitationId('peiro-perez-2006')}
                          className="underline decoration-slate-400 hover:text-[#14A88B]"
                        >
                          Peiró-Pérez 2006
                        </button>
                        ). En una{' '}
                        <button
                          type="button"
                          onClick={() => handleJumpToGlossaryTerm('gl-serie-multicentrica')}
                          title="Ver explicación de Serie Multicéntrica Pediátrica en el Glosario"
                          className="font-semibold text-[#14A88B] border-b border-dashed border-[#14A88B] hover:bg-[#14A88B]/10 px-0.5 transition-colors"
                        >
                          serie multicéntrica pediátrica
                        </button>{' '}
                        española, más de la mitad de las lesiones no intencionales ocurrieron en casa o en la escuela, cerca del <strong className="font-mono-tabular text-[#0A1D37]">40%</strong> no fueron presenciadas por un adulto, y las fracturas aparecieron en el <strong className="font-mono-tabular text-[#0088CE]">14.4%</strong> de los casos (
                        <button
                          type="button"
                          onClick={() => setActiveCitationId('rivas-garcia-2018')}
                          className="underline decoration-slate-400 hover:text-[#14A88B]"
                        >
                          Rivas García 2018
                        </button>
                        ).
                      </p>

                      <p>
                        En mayores españoles, los accidentes domésticos afectan sobre todo a <strong>mujeres</strong> y se asocian con edad, depresión y{' '}
                        <button
                          type="button"
                          onClick={() => handleJumpToGlossaryTerm('gl-fragilidad-funcional')}
                          title="Ver explicación de Fragilidad Funcional en el Glosario"
                          className="font-semibold text-[#14A88B] border-b border-dashed border-[#14A88B] hover:bg-[#14A88B]/10 px-0.5 transition-colors"
                        >
                          limitación funcional
                        </button>{' '}
                        (
                        <button
                          type="button"
                          onClick={() => setActiveCitationId('lopez-soto-2019')}
                          className="underline decoration-slate-400 hover:text-[#14A88B]"
                        >
                          López-Soto 2019
                        </button>
                        ). A escala de{' '}
                        <button
                          type="button"
                          onClick={() => handleJumpToGlossaryTerm('gl-prevalencia-discapacidad')}
                          title="Ver explicación de Prevalencia de Discapacidad de Larga Duración"
                          className="font-semibold text-[#14A88B] border-b border-dashed border-[#14A88B] hover:bg-[#14A88B]/10 px-0.5 transition-colors"
                        >
                          discapacidad de larga duración
                        </button>
                        , los accidentes del hogar aumentan de forma marcada después de los <strong>55 años</strong> y su prevalencia se dispara en los grupos de <strong>75–84 y 85+</strong> (
                        <button
                          type="button"
                          onClick={() => setActiveCitationId('guillen-2023')}
                          className="underline decoration-slate-400 hover:text-[#14A88B]"
                        >
                          Guillén 2023
                        </button>
                        ).
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Citas clave: Costa 2012 · Peiró-Pérez 2006 · Rivas García 2018 · López-Soto 2019 · Guillén 2023</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 02: INTERACTIVE EPIDEMIOLOGICAL INFOGRAPHIC & DASHBOARD */}
        <EpidemiologyDashboard
          externalPresetGroup={presetPreventionGroup}
          onSelectCitation={(id) => setActiveCitationId(id)}
          onJumpToPreventionWithGroup={handleJumpToPreventionWithGroup}
        />

        {/* SECTION 03: PERSONALIZED DOMESTIC ACCIDENT PREVENTION GUIDE */}
        <PreventionGuide
          externalPresetGroup={presetPreventionGroup}
          onSelectCitation={(id) => setActiveCitationId(id)}
        />

        {/* SECTION 04: ASSURECAREWARE SOLUTIONS, HEALTHCARE ROI & TERRITORIAL BENCHMARK */}
        <RoiAndSolutionsSuite
          onSelectCitation={(id) => setActiveCitationId(id)}
        />

        {/* SECTION 05: KEY FIGURES (FIGURE 1) & SYNTHESIS */}
        <KeyFiguresAndCitations
          activeCitationId={activeCitationId}
          onSelectCitation={(id) => setActiveCitationId(id)}
        />

        {/* SECTION 06: INTERACTIVE EPIDEMIOLOGICAL GLOSSARY FOR NON-SPECIALISTS */}
        <InteractiveGlossary
          selectedTermId={selectedGlossaryTermId}
          onSelectCitation={(id) => setActiveCitationId(id)}
        />
      </main>

      {/* QUIET EDITORIAL FOOTER WITH BRAND LOCKUP & VISIBLE METHODOLOGICAL DISCLAIMER */}
      <footer className="max-w-[1360px] w-full mx-auto px-6 lg:px-12 py-10 text-xs text-slate-500 space-y-6">
        <div className="p-4 bg-white border border-slate-200 border-l-4 border-l-[#0088CE] text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="leading-relaxed">
            <strong className="text-[#0A1D37]">Aviso metodológico:</strong> Los índices 0–100 y los valores por país son estimaciones ilustrativas basadas en las fuentes citadas, no datos oficiales.
          </p>
          <span className="font-mono-tabular text-[11px] text-[#0088CE] font-semibold shrink-0">
            10 Fuentes Científicas Verificadas (2006–2025)
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 no-print">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <BrandLogo size="sm" />
            <span className="hidden sm:inline text-slate-300" aria-hidden="true">|</span>
            <span>
              habitatasistencial.es — Plataforma de Epidemiología y Prevención de Lesiones en el Hogar.
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/observatorio-habitat-asistencial.zip"
              download="observatorio-habitat-asistencial.zip"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0088CE] text-white rounded-md font-semibold hover:bg-[#0A1D37] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar Proyecto Completo (.ZIP)</span>
            </a>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setIsIntegrationModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-[#0088CE] font-semibold hover:underline underline-offset-4"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Integrar en habitatasistencial.es (DNS / Vercel)</span>
            </button>
            <span aria-hidden="true">·</span>
            <a
              href="#panorama"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('panorama');
              }}
              className="hover:text-[#0088CE] underline underline-offset-4"
            >
              Volver arriba
            </a>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => window.print()}
              className="hover:text-[#0088CE] underline underline-offset-4"
            >
              Imprimir informe completo
            </button>
          </div>
        </div>
      </footer>

      <WebIntegrationGuideModal
        isOpen={isIntegrationModalOpen}
        onClose={() => setIsIntegrationModalOpen(false)}
      />
    </div>
  );
}
