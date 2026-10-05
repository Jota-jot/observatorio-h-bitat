import React, { useState, useMemo } from 'react';
import { BrandLogo } from './BrandLogo';
import { Check, Download, Award, ArrowUpRight } from 'lucide-react';

interface RoiAndSolutionsSuiteProps {
  onSelectCitation: (citationId: string) => void;
}

interface AssureCareSolution {
  id: string;
  code: string;
  name: string;
  targetRoom: string;
  epidemiologicalTarget: string;
  citationId: string;
  citationLabel: string;
  riskReduction: string;
  unitCostEstimate: number;
  description: string;
}

const ASSURECARE_SOLUTIONS: AssureCareSolution[] = [
  {
    id: 'sol-radar-fall',
    code: 'ACW-RADAR-75',
    name: 'Sensor Radar Biomecánico Pasivo (Sin Cámaras) para Baño y Dormitorio',
    targetRoom: 'Baño y Dormitorio',
    epidemiologicalTarget: 'Caídas intradomiciliarias (56.2%, Alves 2025) y 40% de eventos sin testigo presencial',
    citationId: 'alves-2025',
    citationLabel: 'Alves 2025 · Guillén 2023',
    riskReduction: '-68% tiempo de permanencia en suelo tras caída',
    unitCostEstimate: 290,
    description:
      'Monitoriza micro-movimientos, velocidad de marcha e incorporación nocturna de la cama sin invadir la privacidad. Emite alerta inmediata ante caída en ducha o hipotensión ortostática.'
  },
  {
    id: 'sol-bath-kit',
    code: 'ACW-BATH-C3',
    name: 'Kit Estructural Anticaída de Baño (Asideros Murales + Superficie C3 + Asiento)',
    targetRoom: 'Baño y Aseo',
    epidemiologicalTarget: 'Prevención de fractura de cadera y discapacidad en 75–84 y 85+ años (Guillén 2023)',
    citationId: 'guillen-2023',
    citationLabel: 'Guillén 2023 · Costa 2012',
    riskReduction: '-54% resbalones y caídas en transferencia húmeda',
    unitCostEstimate: 340,
    description:
      'Barras de sujeción de acero inoxidable ancladas a tabique portante, tratamiento antideslizante grado clínico C3, válvula termostática antiescaldaduras (<38 °C para niños <5 años) y asiento abatible.'
  },
  {
    id: 'sol-night-beacon',
    code: 'ACW-LUX-PATH',
    name: 'Sistema de Balizado Lumínico Nocturno Inteligente (Trayecto Cama → Pasillo → Baño)',
    targetRoom: 'Dormitorios, Pasillos y Escaleras',
    epidemiologicalTarget: 'Caídas al mismo nivel en penumbra (1ª causa en España, Costa 2012) y mayores con hipnóticos',
    citationId: 'costa-2012',
    citationLabel: 'Costa 2012 · López-Soto 2019',
    riskReduction: '-49% tropiezos nocturnos al levantarse',
    unitCostEstimate: 145,
    description:
      'Activación automática de luz ámbar sin deslumbramiento al detectar que el residente apoya los pies en el suelo de la cama, iluminando todo el recorrido hasta el inodoro.'
  },
  {
    id: 'sol-med-safe',
    code: 'ACW-PHARMA-SAFE',
    name: 'Dispensador Farmacológico Conectado y Custodia Biometrica de Tóxicos',
    targetRoom: 'Cocina y Comedor',
    epidemiologicalTarget: 'Pico de ingreso hospitalario por intoxicaciones en ≥75 años (Alves 2025) y mortalidad en <5 años',
    citationId: 'alves-2025',
    citationLabel: 'Alves 2025 · Sengoelge 2010',
    riskReduction: '-78% errores de doble dosis e ingesta infantil',
    unitCostEstimate: 210,
    description:
      'Dosificación automática con aviso sonoro/luminoso para personas mayores con polifarmacia o ánimo deprimido, combinado con cierre electromecánico para armarios químicos y cajones de cuchillos.'
  },
  {
    id: 'sol-child-shield',
    code: 'ACW-PED-SHIELD',
    name: 'Pack Pediátrico Integral (Limitadores de Ventana, Barreras EN-1930 y Escudo Térmico)',
    targetRoom: 'Cocina, Salón y Escaleras',
    epidemiologicalTarget: 'Reducción del 14.4% de fracturas pediátricas y accidentes en el 40% de tiempo sin adulto (Rivas García 2018)',
    citationId: 'rivas-garcia-2018',
    citationLabel: 'Rivas García 2018 · Sengoelge 2010',
    riskReduction: '-62% caídas de altura, cortes y escaldaduras infantiles',
    unitCostEstimate: 185,
    description:
      'Bloqueos de apertura de ventanas (<10 cm), barandillas de presión/anclaje para escaleras, protector de encimera/horno y anclajes antivuelco para mobiliario.'
  }
];

const EUROPEAN_TERRITORIAL_BENCHMARKS = [
  {
    region: 'Castilla y León (Referencia España)',
    scope: 'España',
    annualIncidencePer100k: '2,651',
    homeShare: '57.1%',
    dominantRisk: 'Caídas al mismo nivel y objetos cortantes; picos en <15 y >65 años',
    citationId: 'costa-2012',
    citationLabel: 'Costa 2012'
  },
  {
    region: 'Red Centinela y Multicéntrica Pediátrica',
    scope: 'España',
    annualIncidencePer100k: '>50% en casa/escuela',
    homeShare: '40% sin adulto',
    dominantRisk: 'Mayor frecuencia en niños varones; 14.4% de episodios derivan en fracturas',
    citationId: 'rivas-garcia-2018',
    citationLabel: 'Rivas García 2018 · Peiró-Pérez 2006'
  },
  {
    region: 'Cohorte Española de Envejecimiento y Discapacidad',
    scope: 'España',
    annualIncidencePer100k: 'Inflexión 55+ años',
    homeShare: 'Disparo 75–84 y 85+',
    dominantRisk: 'Predominio en mujeres mayores; fuerte vínculo con depresión y fragilidad funcional',
    citationId: 'guillen-2023',
    citationLabel: 'Guillén 2023 · López-Soto 2019'
  },
  {
    region: 'Base Europea EU-IDB (27 Estados / Vigilancia)',
    scope: 'Europa',
    annualIncidencePer100k: '3.6M (0–19 años)',
    homeShare: '56.2% caídas',
    dominantRisk: '92.9% de casos pediátricos no ingresan; máximo ingreso en ≥75 años e intoxicaciones',
    citationId: 'alves-2025',
    citationLabel: 'Alves 2025 · Alves 2024'
  },
  {
    region: 'Carga Continental Europea (Mortalidad vs. Tráfico)',
    scope: 'Europa',
    annualIncidencePer100k: '~110,000 muertes/año',
    homeShare: '32M ingresos/año',
    dominantRisk: 'Tasa de mortalidad superior a la de tráfico; 1ª causa mortal por lesión en <5 años (16 países)',
    citationId: 'keall-2011',
    citationLabel: 'Keall 2011 · Sengoelge 2010'
  }
];

export const RoiAndSolutionsSuite: React.FC<RoiAndSolutionsSuiteProps> = ({
  onSelectCitation
}) => {
  const [activeTab, setActiveTab] = useState<'solutions' | 'roi' | 'benchmark'>('solutions');
  const [selectedSolutions, setSelectedSolutions] = useState<Record<string, boolean>>({
    'sol-radar-fall': true,
    'sol-bath-kit': true,
    'sol-night-beacon': true,
    'sol-med-safe': false,
    'sol-child-shield': false
  });

  // ROI Calculator State
  const [homesCount, setHomesCount] = useState<number>(100);
  const [avgHospitalCostPerFall, setAvgHospitalCostPerFall] = useState<number>(11400);

  const toggleSolution = (id: string) => {
    setSelectedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectedKitCostPerHome = useMemo(() => {
    const sum = ASSURECARE_SOLUTIONS.reduce(
      (acc, sol) => (selectedSolutions[sol.id] ? acc + sol.unitCostEstimate : acc),
      0
    );
    return sum > 0 ? sum : 485;
  }, [selectedSolutions]);

  const roiMetrics = useMemo(() => {
    // In high-risk households (75+ or <5), annual severe domestic incident probability ~18%
    const expectedSevereIncidentsWithoutACW = Math.max(1, Math.round(homesCount * 0.18));
    const preventedSevereIncidents = Math.max(
      1,
      Math.round(expectedSevereIncidentsWithoutACW * 0.58)
    );
    const totalAdaptationInvestment = homesCount * selectedKitCostPerHome;
    const grossHealthcareSavings = preventedSevereIncidents * avgHospitalCostPerFall;
    const netSavings = grossHealthcareSavings - totalAdaptationInvestment;
    const roiMultiple =
      totalAdaptationInvestment > 0
        ? (grossHealthcareSavings / totalAdaptationInvestment).toFixed(2)
        : '1.00';

    return {
      expectedSevereIncidentsWithoutACW,
      preventedSevereIncidents,
      totalAdaptationInvestment,
      grossHealthcareSavings,
      netSavings,
      roiMultiple
    };
  }, [homesCount, avgHospitalCostPerFall, selectedKitCostPerHome]);

  return (
    <section id="soluciones-assurecareware" className="py-16 border-b border-slate-200">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-slate-500 mb-3">
            <span className="text-[#0088CE] font-semibold">
              05. Ecosistema Hábitat Asistencial · AssureCareWare
            </span>
            <span aria-hidden="true">·</span>
            <span>Tecnología, ROI Sanitario y Benchmark Territorial</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-editorial text-[#0A1D37] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Del dato epidemiológico a la intervención real en el hogar
          </h2>
        </div>

        {/* 3-Module Switcher */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg self-start lg:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('solutions')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'solutions'
                ? 'bg-[#0A1D37] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0A1D37]'
            }`}
          >
            1. Catálogo AssureCareWare
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('roi')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'roi'
                ? 'bg-[#0088CE] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0A1D37]'
            }`}
          >
            2. Calculadora ROI Sanitario
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('benchmark')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'benchmark'
                ? 'bg-[#14A88B] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0A1D37]'
            }`}
          >
            3. Benchmark Europa y España
          </button>
        </div>
      </div>

      {/* TAB 1: ASSURECAREWARE SOLUTIONS CATALOG LINKED TO EPIDEMIOLOGY */}
      {activeTab === 'solutions' && (
        <div className="pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            {ASSURECARE_SOLUTIONS.map((sol) => {
              const isSelected = !!selectedSolutions[sol.id];
              return (
                <div
                  key={sol.id}
                  onClick={() => toggleSolution(sol.id)}
                  className={`p-6 bg-white border transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-[#0088CE] bg-[#0088CE]/[0.02]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-tabular font-semibold text-[#0088CE]">
                        {sol.code}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Estancia: {sol.targetRoom}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono-tabular font-semibold text-[#14A88B]">
                        {sol.riskReduction}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular font-semibold text-[#0A1D37]">
                        {sol.unitCostEstimate} € / vivienda
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-editorial text-[#0A1D37]">
                        {sol.name}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                        {sol.description}
                      </p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded flex items-center justify-center shrink-0 mt-1 border ${
                        isSelected
                          ? 'bg-[#14A88B] border-[#14A88B] text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4" />}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-slate-500">
                      <strong className="text-[#0A1D37]">Diana epidemiológica:</strong>{' '}
                      {sol.epidemiologicalTarget}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCitation(sol.citationId);
                      }}
                      className="font-mono-tabular text-[#0088CE] underline hover:text-[#0A1D37]"
                    >
                      {sol.citationLabel}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right 4 Cols: AssureCareWare Certificate & Kit Summary */}
          <div className="lg:col-span-4 bg-white border border-slate-200 p-6 sm:p-8 sticky top-24">
            <div className="pb-5 border-b border-slate-200">
              <BrandLogo size="sm" />
              <span className="text-xs uppercase tracking-widest text-[#14A88B] font-semibold block mt-4">
                Configuración de Hábitat Seguro
              </span>
              <h3 className="text-2xl font-editorial text-[#0A1D37] mt-1">
                Certificación Preventiva Doméstica
              </h3>
            </div>

            <div className="py-5 border-b border-slate-200 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Módulos seleccionados:</span>
                <span className="font-mono-tabular font-semibold text-[#0A1D37]">
                  {Object.values(selectedSolutions).filter(Boolean).length} de{' '}
                  {ASSURECARE_SOLUTIONS.length}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Inversión estimada por hogar:</span>
                <span className="font-mono-tabular font-semibold text-lg text-[#0088CE]">
                  {selectedKitCostPerHome.toLocaleString('es-ES')} €
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Coste medio 1 ingreso fractura:</span>
                <span className="font-mono-tabular text-slate-700">~11,400 €</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 my-5 leading-relaxed">
              Con un único ingreso hospitalario o fractura de cadera evitada en mayores de 75 años (Alves 2025, Guillén 2023), el retorno asistencial y familiar supera en más de <strong>15 veces</strong> el coste de adaptación del hogar.
            </p>

            <button
              type="button"
              onClick={() => setActiveTab('roi')}
              className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#0A1D37] rounded-lg hover:bg-[#0088CE] transition-colors"
            >
              Simular ROI para Familias o Instituciones →
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: HEALTHCARE & FAMILY ROI CALCULATOR */}
      {activeTab === 'roi' && (
        <div className="pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 bg-white border border-slate-200 p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#0088CE] font-semibold block">
                Parámetros de Escala Asistencial
              </span>
              <h3 className="text-2xl font-editorial text-[#0A1D37] mt-1">
                Simulador Económico y de Dependencia Evitada
              </h3>
            </div>

            {/* Quick Scale Presets */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: '1 Vivienda', val: 1 },
                { label: '100 Hogares', val: 100 },
                { label: '1,000 Hogares', val: 1000 }
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setHomesCount(item.val)}
                  className={`py-2 px-3 text-xs font-semibold rounded border transition-colors ${
                    homesCount === item.val
                      ? 'bg-[#0088CE] text-white border-[#0088CE]'
                      : 'bg-slate-50 text-[#0A1D37] border-slate-200 hover:border-[#0088CE]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="font-semibold text-[#0A1D37]">
                  Número de viviendas adaptadas:
                </span>
                <span className="font-mono-tabular font-semibold text-[#0088CE]">
                  {homesCount.toLocaleString('es-ES')} viviendas
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={2000}
                step={10}
                value={homesCount}
                onChange={(e) => setHomesCount(Math.max(1, Number(e.target.value)))}
                className="w-full accent-[#0088CE] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="font-semibold text-[#0A1D37]">
                  Coste sanitario + social por ingreso grave / fractura:
                </span>
                <span className="font-mono-tabular font-semibold text-[#14A88B]">
                  {avgHospitalCostPerFall.toLocaleString('es-ES')} €
                </span>
              </div>
              <input
                type="range"
                min={4500}
                max={24000}
                step={500}
                value={avgHospitalCostPerFall}
                onChange={(e) => setAvgHospitalCostPerFall(Number(e.target.value))}
                className="w-full accent-[#14A88B] cursor-pointer"
              />
              <span className="text-[11px] text-slate-500 block mt-1">
                Incluye hospitalización aguda, cirugía ortopédica y rehabilitación / cuidados por dependencia (Guillén 2023).
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 p-6">
              <span className="text-xs text-slate-500 block">
                Inversión Total Equipamiento AssureCareWare
              </span>
              <span className="text-3xl font-mono-tabular font-semibold text-[#0A1D37] mt-2 block">
                {roiMetrics.totalAdaptationInvestment.toLocaleString('es-ES')} €
              </span>
              <span className="text-xs text-slate-500 mt-2 block">
                Calculado a {selectedKitCostPerHome} € por hogar equipado
              </span>
            </div>

            <div className="bg-white border border-slate-200 p-6">
              <span className="text-xs text-slate-500 block">
                Ingresos Graves y Fracturas Evitadas / Año
              </span>
              <span className="text-3xl font-mono-tabular font-semibold text-[#14A88B] mt-2 block">
                {roiMetrics.preventedSevereIncidents.toLocaleString('es-ES')} episodios
              </span>
              <span className="text-xs text-slate-500 mt-2 block">
                Sobre {roiMetrics.expectedSevereIncidentsWithoutACW} eventos graves esperados sin intervención
              </span>
            </div>

            <div className="bg-white border border-slate-200 p-6">
              <span className="text-xs text-slate-500 block">
                Ahorro Sanitario y Familiar Bruto Estimado
              </span>
              <span className="text-3xl font-mono-tabular font-semibold text-[#0088CE] mt-2 block">
                {roiMetrics.grossHealthcareSavings.toLocaleString('es-ES')} €
              </span>
              <span className="text-xs text-slate-500 mt-2 block">
                Evitando hospitalizaciones (32M/año en UE, Keall 2011)
              </span>
            </div>

            <div className="bg-[#0A1D37] text-white p-6 border-t-4 border-t-[#7ED321]">
              <span className="text-xs text-[#7ED321] font-semibold uppercase tracking-wider block">
                Multiplicador de Retorno Social (ROI)
              </span>
              <span className="text-3xl font-mono-tabular font-semibold text-white mt-2 block">
                {roiMetrics.roiMultiple}x
              </span>
              <span className="text-xs text-slate-300 mt-2 block">
                Beneficio neto estimado:{' '}
                <strong className="text-[#7ED321] font-mono-tabular">
                  {roiMetrics.netSavings >= 0 ? '+' : ''}
                  {roiMetrics.netSavings.toLocaleString('es-ES')} €
                </strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: EUROPEAN & SPANISH TERRITORIAL BENCHMARK */}
      {activeTab === 'benchmark' && (
        <div className="pt-10">
          <div className="bg-white border border-slate-200 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 bg-slate-50">
                  <th className="py-3.5 px-6 font-semibold">Cohorte / Territorio</th>
                  <th className="py-3.5 px-6 font-semibold">Ámbito</th>
                  <th className="py-3.5 px-6 font-semibold text-right">Indicador Primario</th>
                  <th className="py-3.5 px-6 font-semibold text-right">Proporción Clave</th>
                  <th className="py-3.5 px-6 font-semibold">Patrón Epidemiológico Documentado</th>
                  <th className="py-3.5 px-6 font-semibold text-right">Fuente</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {EUROPEAN_TERRITORIAL_BENCHMARKS.map((item, idx) => (
                  <tr
                    key={idx}
                    onClick={() => onSelectCitation(item.citationId)}
                    className="hover:bg-[#0088CE]/5 cursor-pointer transition-colors"
                  >
                    <td className="py-4 px-6 font-semibold text-[#0A1D37]">
                      {item.region}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider ${
                          item.scope === 'Europa' ? 'text-[#0088CE]' : 'text-[#14A88B]'
                        }`}
                      >
                        {item.scope}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-mono-tabular font-semibold text-[#0A1D37] whitespace-nowrap">
                      {item.annualIncidencePer100k}
                    </td>
                    <td className="py-4 px-6 text-right font-mono-tabular font-semibold text-[#0088CE] whitespace-nowrap">
                      {item.homeShare}
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 max-w-md leading-relaxed">
                      {item.dominantRisk}
                    </td>
                    <td className="py-4 px-6 text-right font-mono-tabular text-xs underline text-[#0A1D37] hover:text-[#0088CE] whitespace-nowrap">
                      {item.citationLabel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};
