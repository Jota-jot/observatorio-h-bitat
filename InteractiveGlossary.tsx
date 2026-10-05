import React, { useState, useMemo, useEffect } from 'react';
import {
  GLOSSARY_TERMS,
  CITATIONS,
  GlossaryTerm
} from '../data/epidemiologyData';
import {
  BookOpen,
  Search,
  Sparkles,
  GraduationCap,
  Users,
  ArrowUpRight,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

interface InteractiveGlossaryProps {
  selectedTermId?: string | null;
  onSelectCitation: (citationId: string) => void;
}

export const InteractiveGlossary: React.FC<InteractiveGlossaryProps> = ({
  selectedTermId,
  onSelectCitation
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<
    'all' | 'Sistemas de Vigilancia' | 'Métricas Epidemiológicas' | 'Clínica y Biomecánica'
  >('all');
  const [readingMode, setReadingMode] = useState<'plain' | 'complete'>('complete');
  const [focusedTermId, setFocusedTermId] = useState<string>('gl-eu-idb');

  useEffect(() => {
    if (selectedTermId && GLOSSARY_TERMS.some((t) => t.id === selectedTermId)) {
      setFocusedTermId(selectedTermId);
      setActiveCategory('all');
      setSearchQuery('');
    }
  }, [selectedTermId]);

  const categories = [
    { id: 'all', label: `Todos los términos (${GLOSSARY_TERMS.length})` },
    { id: 'Sistemas de Vigilancia', label: 'Sistemas de Vigilancia (EU-IDB / Centinela)' },
    { id: 'Métricas Epidemiológicas', label: 'Métricas (Incidencia / Ingreso / Discapacidad)' },
    { id: 'Clínica y Biomecánica', label: 'Clínica y Mecanismos' }
  ] as const;

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        item.term.toLowerCase().includes(q) ||
        item.shortTag.toLowerCase().includes(q) ||
        item.plainLanguageSummary.toLowerCase().includes(q) ||
        item.technicalDefinition.toLowerCase().includes(q) ||
        item.siteExample.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const activeTerm: GlossaryTerm = useMemo(() => {
    return (
      GLOSSARY_TERMS.find((t) => t.id === focusedTermId) ||
      filteredTerms[0] ||
      GLOSSARY_TERMS[0]
    );
  }, [focusedTermId, filteredTerms]);

  const getCategoryColor = (cat: GlossaryTerm['category']) => {
    switch (cat) {
      case 'Sistemas de Vigilancia':
        return {
          text: 'text-[#0088CE]',
          border: 'border-[#0088CE]',
          bgLight: 'bg-[#0088CE]/10',
          accentBorder: 'border-t-[#0088CE]'
        };
      case 'Métricas Epidemiológicas':
        return {
          text: 'text-[#14A88B]',
          border: 'border-[#14A88B]',
          bgLight: 'bg-[#14A88B]/10',
          accentBorder: 'border-t-[#14A88B]'
        };
      case 'Clínica y Biomecánica':
        return {
          text: 'text-[#0A1D37]',
          border: 'border-[#7ED321]',
          bgLight: 'bg-[#7ED321]/15',
          accentBorder: 'border-t-[#7ED321]'
        };
    }
  };

  return (
    <section
      id="glosario-epidemiologico"
      className="py-16 border-b border-slate-200 scroll-mt-16"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-slate-500 mb-3">
            <span className="text-[#0088CE] font-semibold">
              05. Glosario Epidemiológico Interactivo
            </span>
            <span aria-hidden="true">·</span>
            <span>Guía de Lectura Ciudadana y Clínica</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-editorial text-[#0A1D37] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Diccionario claro de términos epidemiológicos (EU-IDB, Redes Centinela, Incidencia)
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
            Traducimos la terminología científica de los estudios europeos y españoles a un lenguaje claro y práctico para familias, cuidadores y gestores no especializados.
          </p>
        </div>

        {/* Reading Mode Switcher: Plain Language vs Complete */}
        <div className="flex flex-col sm:items-end gap-2 self-start lg:self-end no-print">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
            Nivel de detalle de las explicaciones
          </span>
          <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
            <button
              type="button"
              onClick={() => setReadingMode('plain')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                readingMode === 'plain'
                  ? 'bg-[#14A88B] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0A1D37]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Lenguaje Sencillo (Familias)</span>
            </button>
            <button
              type="button"
              onClick={() => setReadingMode('complete')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                readingMode === 'complete'
                  ? 'bg-[#0A1D37] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0A1D37]'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Sencillo + Definición Técnica</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access Bar for Most Consulted Terms */}
      <div className="mt-6 bg-white border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#0A1D37] shrink-0">
          <HelpCircle className="w-4 h-4 text-[#0088CE]" />
          <span>Consulta rápida de conceptos clave:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {GLOSSARY_TERMS.map((item) => {
            const isSelected = activeTerm.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFocusedTermId(item.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-[#0088CE] text-white border-[#0088CE] shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#0088CE] hover:text-[#0088CE]'
                }`}
              >
                {item.term.split(' (')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeCategory === cat.id
                  ? 'bg-[#0A1D37] text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-[#0088CE] hover:text-[#0A1D37]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar término (ej. EU-IDB, centinela, tasa)..."
            className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-[#0A1D37] placeholder:text-slate-400 focus:outline-none focus:border-[#0088CE]"
          />
        </div>
      </div>

      {/* Main Interactive Split View: Spotlight Inspector (Left 5 cols) + Term Cards Grid (Right 7 cols) */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT 5 COLUMNS: Interactive Concept Spotlight ("Lupa Pedagógica") */}
        <div className="lg:col-span-5 lg:sticky lg:top-20 bg-white border-2 border-[#0088CE] shadow-xs">
          <div className="bg-[#0A1D37] text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#7ED321] font-semibold">
              <BookOpen className="w-4 h-4" />
              <span>Lupa de Concepto Seleccionado</span>
            </div>
            <span className="text-[11px] font-mono-tabular text-slate-300">
              {activeTerm.category}
            </span>
          </div>

          <div className="p-6 sm:p-7 space-y-5">
            <div>
              <span className="inline-block text-[11px] font-mono-tabular uppercase tracking-wider px-2.5 py-0.5 rounded-sm bg-[#0088CE]/10 text-[#0088CE] font-semibold">
                {activeTerm.shortTag}
              </span>
              <h3 className="text-2xl font-editorial text-[#0A1D37] mt-2 leading-snug">
                {activeTerm.term}
              </h3>
            </div>

            {/* 1. Plain language explanation for non-specialists */}
            <div className="p-4 bg-[#F8FAFC] border-l-4 border-l-[#14A88B] border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#14A88B] mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>En palabras sencillas (sin tecnicismos)</span>
              </div>
              <p className="text-sm text-[#0A1D37] leading-relaxed">
                {activeTerm.plainLanguageSummary}
              </p>
            </div>

            {/* 2. How it appears in the report */}
            <div className="p-4 bg-white border border-slate-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0088CE] block mb-1.5">
                Cómo aparece en los datos de Europa y España
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-serif">
                «{activeTerm.siteExample}»
              </p>
            </div>

            {/* 3. Technical definition (shown when readingMode === 'complete') */}
            {readingMode === 'complete' && (
              <div className="pt-3 border-t border-slate-200">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Definición metodológica en salud pública
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeTerm.technicalDefinition}
                </p>
              </div>
            )}

            {/* 4. Practical takeaway for the household */}
            <div className="p-4 bg-[#7ED321]/10 border border-[#7ED321]/40">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0A1D37] mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#14A88B]" />
                <span>¿Por qué te importa en tu hogar?</span>
              </div>
              <p className="text-xs sm:text-sm text-[#0A1D37] leading-relaxed font-medium">
                {activeTerm.practicalTakeaway}
              </p>
            </div>

            {/* 5. Linked Scientific Citations */}
            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-slate-500">
                Estudios que utilizan este concepto:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {activeTerm.relatedCitations.map((cid) => {
                  const cit = CITATIONS[cid];
                  if (!cit) return null;
                  return (
                    <button
                      key={cid}
                      type="button"
                      onClick={() => onSelectCitation(cid)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono-tabular font-semibold text-[#0A1D37] bg-slate-100 hover:bg-[#0088CE] hover:text-white rounded-md transition-colors"
                    >
                      <span>
                        {cit.author} ({cit.year})
                      </span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT 7 COLUMNS: Interactive Grid of Glossary Cards */}
        <div className="lg:col-span-7">
          {filteredTerms.length === 0 ? (
            <div className="bg-white border border-slate-200 p-8 text-center">
              <p className="text-sm text-slate-600">
                No se encontraron términos que coincidan con «{searchQuery}».
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-3 px-4 py-2 text-xs font-semibold text-white bg-[#0088CE] rounded-lg"
              >
                Mostrar todos los términos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredTerms.map((item) => {
                const isSelected = activeTerm.id === item.id;
                const colors = getCategoryColor(item.category);

                return (
                  <div
                    key={item.id}
                    onClick={() => setFocusedTermId(item.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setFocusedTermId(item.id);
                      }
                    }}
                    className={`bg-white border border-t-4 ${colors.accentBorder} p-5 flex flex-col justify-between transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'ring-2 ring-[#0088CE] border-[#0088CE] bg-[#0088CE]/[0.02]'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 text-[11px] mb-2">
                        <span className={`font-semibold uppercase tracking-wider ${colors.text}`}>
                          {item.category}
                        </span>
                        <span className="font-mono-tabular text-slate-400">
                          {item.shortTag}
                        </span>
                      </div>

                      <h4 className="text-lg font-editorial text-[#0A1D37] leading-snug">
                        {item.term}
                      </h4>

                      <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {item.plainLanguageSummary}
                      </p>

                      {readingMode === 'complete' && (
                        <p className="mt-2.5 pt-2.5 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
                          <strong className="text-slate-700">Dato en el informe:</strong>{' '}
                          {item.siteExample}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span
                        className={`font-semibold ${
                          isSelected ? 'text-[#0088CE]' : 'text-slate-500'
                        }`}
                      >
                        {isSelected ? '● Seleccionado en la lupa' : 'Ver ejemplo y utilidad →'}
                      </span>

                      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        {item.relatedCitations.slice(0, 2).map((cid) => {
                          const cit = CITATIONS[cid];
                          if (!cit) return null;
                          return (
                            <button
                              key={cid}
                              type="button"
                              onClick={() => onSelectCitation(cid)}
                              className="text-[11px] font-mono-tabular text-slate-500 underline hover:text-[#0088CE]"
                            >
                              {cit.author.split(' ')[0]} {cit.year}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
