import React, { useState } from 'react';
import {
  KEY_FIGURES_TABLE,
  CITATIONS,
  Citation
} from '../data/epidemiologyData';
import { Search, X, BookOpen, ArrowUpRight } from 'lucide-react';

interface KeyFiguresAndCitationsProps {
  activeCitationId: string | null;
  onSelectCitation: (citationId: string | null) => void;
}

export const KeyFiguresAndCitations: React.FC<KeyFiguresAndCitationsProps> = ({
  activeCitationId,
  onSelectCitation
}) => {
  const [scopeFilter, setScopeFilter] = useState<'all' | 'Europa' | 'España'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredRows = KEY_FIGURES_TABLE.filter((row) => {
    const matchesScope = scopeFilter === 'all' || row.scope === scopeFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      row.finding.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.context.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.citationLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesScope && matchesSearch;
  });

  const activeCitation: Citation | null = activeCitationId ? CITATIONS[activeCitationId] || null : null;

  return (
    <>
      {/* SECTION 4: FIGURE 1 TABLE & SYNTHESIS */}
      <section id="cifras-clave" className="py-16 border-b border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-slate-500 mb-3">
              <span className="text-[#0088CE] font-semibold">04. Figura 1 y Síntesis Clínica</span>
              <span aria-hidden="true">·</span>
              <span>Registro de Evidencia Consolidada</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-editorial text-[#0A1D37] tracking-tight" style={{ textWrap: 'balance' }}>
              Cifras clave y significado epidemiológico para Europa y España
            </h2>
          </div>

          {/* Search & Scope Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar hallazgo o autor..."
                className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-[#0A1D37] placeholder:text-slate-400 focus:outline-none focus:border-[#0088CE]"
              />
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
              {(['all', 'Europa', 'España'] as const).map((scope) => (
                <button
                  key={scope}
                  type="button"
                  onClick={() => setScopeFilter(scope)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    scopeFilter === scope
                      ? 'bg-[#0088CE] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#0A1D37]'
                  }`}
                >
                  {scope === 'all' ? 'Todos (9)' : scope}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* High-Density Data Table (Figure 1) */}
        <div className="mt-8 bg-white border border-slate-200 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 bg-slate-50/70">
                <th className="py-3.5 px-4 sm:px-6 font-semibold">Ámbito</th>
                <th className="py-3.5 px-4 sm:px-6 font-semibold">Hallazgo Principal</th>
                <th className="py-3.5 px-4 sm:px-6 font-semibold text-right">Cifra Clave</th>
                <th className="py-3.5 px-4 sm:px-6 font-semibold hidden md:table-cell">
                  Contexto Clínico y Epidemiológico
                </th>
                <th className="py-3.5 px-4 sm:px-6 font-semibold text-right">Cita</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {filteredRows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onSelectCitation(row.citationId)}
                  className="hover:bg-[#0088CE]/5 transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        row.scope === 'Europa' ? 'text-[#0088CE]' : 'text-[#14A88B]'
                      }`}
                    >
                      {row.scope}
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6 font-medium text-[#0A1D37]">
                    {row.finding}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-right font-mono-tabular font-semibold text-[#0A1D37] whitespace-nowrap">
                    {row.metricValue}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-xs text-slate-600 hidden md:table-cell max-w-md leading-relaxed">
                    {row.context}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-xs font-mono-tabular text-[#0A1D37] group-hover:text-[#0088CE] underline decoration-slate-300 underline-offset-4">
                      <span>{row.citationLabel}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 font-serif italic">
            <span>
              Figure 1 — Cifras simples para Europa y España sobre accidentes domésticos. Haz clic en cualquier fila para abrir la ficha metodológica de la cita.
            </span>
            <span className="not-italic font-mono-tabular text-[#0088CE] font-semibold">
              Mostrando {filteredRows.length} de {KEY_FIGURES_TABLE.length} registros clave
            </span>
          </div>
        </div>

        {/* QUÉ SIGNIFICA: 4-Column Editorial Synthesis */}
        <div className="mt-14">
          <div className="text-xs tracking-widest uppercase text-[#0088CE] font-semibold mb-6">
            Qué Significa · Interpretación de Salud Pública AssureCareWare
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200 border-t-4 border-t-[#0088CE] p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono-tabular text-[#0088CE] font-semibold block mb-2">
                  01 / VOLUMEN VS. ADMISIONES
                </span>
                <h3 className="text-lg font-editorial text-[#0A1D37] mb-3">
                  Problema masivo por volumen en Europa
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  En Europa, la carga global es enorme (~110,000 muertes y 32 millones de ingresos anuales, superando al tráfico), aunque en población general y pediátrica la gran mayoría de episodios atendidos en urgencias no acaba en ingreso (92.9% de altas en 0–19 años).
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <button
                  type="button"
                  onClick={() => onSelectCitation('alves-2024')}
                  className="underline hover:text-[#0088CE]"
                >
                  Alves 2024
                </button>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={() => onSelectCitation('keall-2011')}
                  className="underline hover:text-[#0088CE]"
                >
                  Keall 2011
                </button>
              </div>
            </div>

            <div className="bg-white border border-slate-200 border-t-4 border-t-[#14A88B] p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono-tabular text-[#14A88B] font-semibold block mb-2">
                  02 / CONVERGENCIA ESPAÑA–EUROPA
                </span>
                <h3 className="text-lg font-editorial text-[#0A1D37] mb-3">
                  Patrón español simétrico al europeo
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  En España (2,651 casos/100,000 hab. al año en Castilla y León, 57.1% en el domicilio), el riesgo se concentra igualmente en niños (con predominio masculino y 40% sin adulto presente) y en mayores, dominando las caídas al mismo nivel y los objetos cortantes.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <button
                  type="button"
                  onClick={() => onSelectCitation('costa-2012')}
                  className="underline hover:text-[#14A88B]"
                >
                  Costa 2012
                </button>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={() => onSelectCitation('peiro-perez-2006')}
                  className="underline hover:text-[#14A88B]"
                >
                  Peiró-Pérez 2006
                </button>
              </div>
            </div>

            <div className="bg-white border border-slate-200 border-t-4 border-t-[#7ED321] p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono-tabular text-[#14A88B] font-semibold block mb-2">
                  03 / IMPACTO CLÍNICO Y SOCIAL
                </span>
                <h3 className="text-lg font-editorial text-[#0A1D37] mb-3">
                  Mayor peso en adultos mayores y dependencia
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  El verdadero peso clínico, hospitalario y social recae en los adultos mayores (especialmente mujeres con fragilidad funcional o depresión), donde la discapacidad de larga duración crece tras los 55 años y se dispara en los grupos de 75–84 y 85+ años.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <button
                  type="button"
                  onClick={() => onSelectCitation('lopez-soto-2019')}
                  className="underline hover:text-[#0088CE]"
                >
                  López-Soto 2019
                </button>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={() => onSelectCitation('guillen-2023')}
                  className="underline hover:text-[#0088CE]"
                >
                  Guillén 2023
                </button>
              </div>
            </div>

            <div className="bg-[#0A1D37] text-slate-100 p-6 flex flex-col justify-between border-t-4 border-t-[#7ED321]">
              <div>
                <span className="text-xs font-mono-tabular text-[#7ED321] font-semibold block mb-2">
                  04 / CONCLUSIÓN OPERATIVA
                </span>
                <h3 className="text-lg font-editorial text-white mb-3">
                  Dónde concentrar la prevención crítica
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  En resumen, centrado en Europa y España, la gravedad real se concentra en mayores de 75 años, niños menores de 5 años (1ª causa de muerte por lesión en 16 países) y en mecanismos específicos como las caídas (56.2%) y las intoxicaciones.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
                <button
                  type="button"
                  onClick={() => onSelectCitation('alves-2025')}
                  className="underline hover:text-[#7ED321] text-slate-200"
                >
                  Alves 2025
                </button>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={() => onSelectCitation('sengoelge-2010')}
                  className="underline hover:text-[#7ED321] text-slate-200"
                >
                  Sengoelge 2010
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full Bibliographic Index Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <span className="text-xs uppercase tracking-widest text-slate-500 block mb-4">
            Índice Bibliográfico Interactivo (Haz clic para inspeccionar cada fuente)
          </span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            {Object.values(CITATIONS).map((cit, idx) => (
              <React.Fragment key={cit.id}>
                {idx > 0 && <span className="text-slate-300" aria-hidden="true">/</span>}
                <button
                  type="button"
                  onClick={() => onSelectCitation(cit.id)}
                  className="font-mono-tabular text-[#0A1D37] hover:text-[#0088CE] underline decoration-slate-300 underline-offset-4 transition-colors py-1"
                >
                  {cit.author} ({cit.year}) — {cit.scope}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* CITATION INSPECTOR MODAL / DRAWER */}
      {activeCitation && (
        <div
          className="fixed inset-0 z-50 bg-[#0A1D37]/60 flex items-center justify-center p-4"
          onClick={() => onSelectCitation(null)}
        >
          <div
            className="bg-[#F8FAFC] border border-slate-300 border-t-4 border-t-[#0088CE] max-w-xl w-full p-6 sm:p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#0088CE] font-semibold">
                <BookOpen className="w-4 h-4" />
                <span>Ficha de Evidencia Científica · {activeCitation.scope}</span>
              </div>
              <button
                type="button"
                onClick={() => onSelectCitation(null)}
                className="p-1 text-slate-500 hover:text-[#0A1D37] transition-colors"
                aria-label="Cerrar ficha de cita"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5">
              <div className="text-xs font-mono-tabular text-slate-500">
                Referencia Documental: {activeCitation.author} ({activeCitation.year})
              </div>
              <h3 className="text-2xl font-editorial text-[#0A1D37] mt-1">
                {activeCitation.topic}
              </h3>

              <div className="my-5 p-4 bg-white border border-slate-200">
                <span className="text-xs uppercase tracking-wider text-slate-400 block">
                  Indicador Principal Reportado
                </span>
                <span className="text-lg font-mono-tabular font-semibold text-[#0088CE] mt-1 block">
                  {activeCitation.headlineMetric}
                </span>
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <div>
                  <strong className="text-[#0A1D37] block text-xs uppercase tracking-wider mb-1">
                    Síntesis de los datos:
                  </strong>
                  <p>{activeCitation.summary}</p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <strong className="text-[#14A88B] block text-xs uppercase tracking-wider mb-1">
                    Implicación para la prevención doméstica:
                  </strong>
                  <p className="text-[#0A1D37] font-medium">
                    {activeCitation.clinicalImplication}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => onSelectCitation(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0A1D37] rounded-lg hover:bg-[#0088CE] transition-colors"
              >
                Cerrar ficha
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
