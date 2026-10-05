import React, { useState, useMemo } from 'react';

interface PopulationSimulatorProps {
  onSelectCitation: (citationId: string) => void;
}

export const PopulationSimulator: React.FC<PopulationSimulatorProps> = ({
  onSelectCitation
}) => {
  const [populationSize, setPopulationSize] = useState<number>(100000);
  const [preventionAdherence, setPreventionAdherence] = useState<number>(35);

  const projections = useMemo(() => {
    const totalAccidents = Math.round((populationSize / 100000) * 2651);
    const domesticAccidents = Math.round(totalAccidents * 0.571);
    const domesticFalls = Math.round(domesticAccidents * 0.562);
    const pediatricEpisodes = Math.round(domesticAccidents * 0.34);
    const pediatricFractures = Math.round(pediatricEpisodes * 0.144);
    const pediatricUnwitnessed = Math.round(pediatricEpisodes * 0.40);
    const pediatricAdmissions = Math.round(pediatricEpisodes * 0.071);

    const effectivenessFactor = (preventionAdherence / 100) * 0.62;
    const preventedDomestic = Math.round(domesticAccidents * effectivenessFactor);
    const preventedFalls = Math.round(domesticFalls * effectivenessFactor);
    const preventedFractures = Math.round(pediatricFractures * effectivenessFactor);

    return {
      totalAccidents,
      domesticAccidents,
      domesticFalls,
      pediatricEpisodes,
      pediatricFractures,
      pediatricUnwitnessed,
      pediatricAdmissions,
      preventedDomestic,
      preventedFalls,
      preventedFractures
    };
  }, [populationSize, preventionAdherence]);

  return (
    <div className="mt-8 bg-white border border-slate-200 p-6 sm:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#0088CE] font-semibold">
            <span>Simulador Epidemiológico de Carga y Prevención</span>
            <span aria-hidden="true">·</span>
            <span>Modelo paramétrico (Costa 2012 · Alves 2025 · Rivas García 2018)</span>
          </div>
          <h3 className="text-2xl font-editorial text-[#0A1D37] mt-1">
            Calculadora de Incidencia Anual y Episodios Evitables por Población
          </h3>
        </div>

        {/* Preset Population Sizes */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { label: 'Municipio (25k)', value: 25000 },
            { label: 'Base Estudio (100k)', value: 100000 },
            { label: 'Provincia (500k)', value: 500000 },
            { label: 'Área Metropolitana (1.5M)', value: 1500000 }
          ].map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => setPopulationSize(preset.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                populationSize === preset.value
                  ? 'bg-[#0088CE] text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-[#0A1D37]'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sliders + Output Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center">
        {/* Left 5 Cols: Interactive Sliders */}
        <div className="lg:col-span-5 space-y-6 bg-[#F8FAFC] border border-slate-200 p-6">
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <label htmlFor="pop-slider" className="font-semibold text-[#0A1D37]">
                Población de Referencia (Habitantes)
              </label>
              <span className="font-mono-tabular font-semibold text-base text-[#0088CE]">
                {populationSize.toLocaleString('es-ES')} hab.
              </span>
            </div>
            <input
              id="pop-slider"
              type="range"
              min={10000}
              max={2000000}
              step={10000}
              value={populationSize}
              onChange={(e) => setPopulationSize(Number(e.target.value))}
              className="w-full accent-[#0088CE] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono-tabular text-slate-400 mt-1">
              <span>10,000 hab.</span>
              <span>100,000 (Base CyL)</span>
              <span>2,000,000 hab.</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between text-xs mb-2">
              <label htmlFor="prev-slider" className="font-semibold text-[#0A1D37]">
                Cobertura de Prevención Doméstica AssureCareWare
              </label>
              <span className="font-mono-tabular font-semibold text-base text-[#14A88B]">
                {preventionAdherence}% hogares
              </span>
            </div>
            <input
              id="prev-slider"
              type="range"
              min={0}
              max={80}
              step={5}
              value={preventionAdherence}
              onChange={(e) => setPreventionAdherence(Number(e.target.value))}
              className="w-full accent-[#14A88B] cursor-pointer"
            />
            <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
              Simula el impacto de implantar barras de baño, retirada de alfombras en mayores de 65+ y supervisión activa en menores de 14 años.
            </p>
          </div>
        </div>

        {/* Right 7 Cols: Calculated Epidemiological Outcomes */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="p-4 border border-slate-200 bg-white">
            <span className="text-xs text-slate-500 block">Accidentes Totales / Año</span>
            <span className="text-2xl font-mono-tabular font-semibold text-[#0A1D37] mt-1 block">
              {projections.totalAccidents.toLocaleString('es-ES')}
            </span>
            <button
              type="button"
              onClick={() => onSelectCitation('costa-2012')}
              className="text-[11px] text-slate-500 underline hover:text-[#0088CE] mt-1 inline-block"
            >
              Tasa 2,651/100k · Costa 2012
            </button>
          </div>

          <div className="p-4 border border-slate-200 bg-white">
            <span className="text-xs text-slate-500 block">Ocurren en el Hogar (57.1%)</span>
            <span className="text-2xl font-mono-tabular font-semibold text-[#0088CE] mt-1 block">
              {projections.domesticAccidents.toLocaleString('es-ES')}
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Episodios intradomiciliarios/año
            </span>
          </div>

          <div className="p-4 border border-slate-200 bg-white">
            <span className="text-xs text-slate-500 block">Por Caídas en Casa (56.2%)</span>
            <span className="text-2xl font-mono-tabular font-semibold text-[#14A88B] mt-1 block">
              {projections.domesticFalls.toLocaleString('es-ES')}
            </span>
            <button
              type="button"
              onClick={() => onSelectCitation('alves-2025')}
              className="text-[11px] text-slate-500 underline hover:text-[#14A88B] mt-1 inline-block"
            >
              Proporción UE · Alves 2025
            </button>
          </div>

          <div className="p-4 border border-slate-200 bg-white">
            <span className="text-xs text-slate-500 block">Sin Presencia Adulta (~40%)</span>
            <span className="text-2xl font-mono-tabular font-semibold text-[#0A1D37] mt-1 block">
              {projections.pediatricUnwitnessed.toLocaleString('es-ES')}
            </span>
            <button
              type="button"
              onClick={() => onSelectCitation('rivas-garcia-2018')}
              className="text-[11px] text-slate-500 underline hover:text-[#0088CE] mt-1 inline-block"
            >
              Pediatría · Rivas García 2018
            </button>
          </div>

          <div className="p-4 border border-slate-200 bg-white">
            <span className="text-xs text-slate-500 block">Fracturas Pediátricas (14.4%)</span>
            <span className="text-2xl font-mono-tabular font-semibold text-[#0A1D37] mt-1 block">
              {projections.pediatricFractures.toLocaleString('es-ES')}
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Ingresos est. (7.1%): {projections.pediatricAdmissions.toLocaleString('es-ES')}
            </span>
          </div>

          <div className="p-4 bg-[#0A1D37] text-white border border-[#0A1D37]">
            <span className="text-xs text-[#7ED321] font-semibold block">
              Episodios Evitables ({preventionAdherence}% cob.)
            </span>
            <span className="text-2xl font-mono-tabular font-semibold text-white mt-1 block">
              -{projections.preventedDomestic.toLocaleString('es-ES')}
            </span>
            <span className="text-[11px] text-slate-300 mt-1 block font-mono-tabular">
              {projections.preventedFalls.toLocaleString('es-ES')} caídas y {projections.preventedFractures.toLocaleString('es-ES')} fracturas menos
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
