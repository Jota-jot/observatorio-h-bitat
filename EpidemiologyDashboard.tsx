import React, { useState, useMemo } from 'react';
import {
  AGE_GROUP_STATS,
  MECHANISM_STATS,
  EU_COUNTRY_COMPARISONS,
  AgeGroupStat,
  MechanismStat,
  EUCountryStat
} from '../data/epidemiologyData';
import { ArrowUpRight, Globe } from 'lucide-react';
import { PopulationSimulator } from './PopulationSimulator';
import { PdfExportPanel } from './PdfExportPanel';

interface EpidemiologyDashboardProps {
  externalPresetGroup?: string | null;
  onSelectCitation: (citationId: string) => void;
  onJumpToPreventionWithGroup: (groupKey: string) => void;
}

export const EpidemiologyDashboard: React.FC<EpidemiologyDashboardProps> = ({
  externalPresetGroup = null,
  onSelectCitation,
  onJumpToPreventionWithGroup
}) => {
  const [selectedAgeId, setSelectedAgeId] = useState<string>('75-84');
  const [activeMetricFilter, setActiveMetricFilter] = useState<'all' | 'incidence' | 'admission' | 'disability'>('all');
  const [selectedMechanismId, setSelectedMechanismId] = useState<string>('falls');
  const [territoryView, setTerritoryView] = useState<'comparative' | 'europa' | 'espana'>('comparative');

  // EU Regional & Country Comparison State
  const [selectedCluster, setSelectedCluster] = useState<string>('all');
  const [onlySengoelgeCohort, setOnlySengoelgeCohort] = useState<boolean>(false);
  const [selectedCountryId, setSelectedCountryId] = useState<string>('es-spain');
  const [comparisonBenchmarkId, setComparisonBenchmarkId] = useState<string>('eu-average');
  const [regionalChartMetric, setRegionalChartMetric] = useState<
    'fallsSharePct' | 'incidencePer100k' | 'pediatricNonAdmissionPct' | 'senior75AdmissionIndex'
  >('fallsSharePct');

  const currentAgeGroup: AgeGroupStat =
    AGE_GROUP_STATS.find((g) => g.id === selectedAgeId) || AGE_GROUP_STATS[5];

  const currentMechanism: MechanismStat =
    MECHANISM_STATS.find((m) => m.id === selectedMechanismId) || MECHANISM_STATS[0];

  const filteredCountries = useMemo(() => {
    return EU_COUNTRY_COMPARISONS.filter((c) => {
      const matchesCluster =
        selectedCluster === 'all' || c.regionCluster === selectedCluster;
      const matchesSengoelge =
        !onlySengoelgeCohort || c.under5LeadingCauseMortality;
      return matchesCluster && matchesSengoelge;
    });
  }, [selectedCluster, onlySengoelgeCohort]);

  const activeCountry: EUCountryStat =
    EU_COUNTRY_COMPARISONS.find((c) => c.id === selectedCountryId) ||
    EU_COUNTRY_COMPARISONS[1];

  const benchmarkCountry: EUCountryStat =
    EU_COUNTRY_COMPARISONS.find((c) => c.id === comparisonBenchmarkId) ||
    EU_COUNTRY_COMPARISONS[0];

  const mapAgeIdToPreventionPreset = (ageId: string) => {
    if (ageId === '0-4') return 'children_under_5';
    if (ageId === '5-14') return 'children_5_14';
    if (ageId === '55-64' || ageId === '65-74') return 'adults_55_74';
    if (ageId === '75-84' || ageId === '85+') return 'seniors_75_plus';
    return 'all';
  };

  const getMetricValueDisplay = (
    country: EUCountryStat,
    metric: typeof regionalChartMetric
  ) => {
    if (metric === 'fallsSharePct') return `${country.fallsSharePct.toFixed(1)}%`;
    if (metric === 'incidencePer100k') return `${country.incidencePer100k.toLocaleString('es-ES')}/100k`;
    if (metric === 'pediatricNonAdmissionPct') return `${country.pediatricNonAdmissionPct.toFixed(1)}%`;
    return `${country.senior75AdmissionIndex}/100`;
  };

  const getMetricBarWidth = (
    country: EUCountryStat,
    metric: typeof regionalChartMetric
  ) => {
    if (metric === 'fallsSharePct') return Math.min(100, (country.fallsSharePct / 65) * 100);
    if (metric === 'incidencePer100k') return Math.min(100, (country.incidencePer100k / 3000) * 100);
    if (metric === 'pediatricNonAdmissionPct') return country.pediatricNonAdmissionPct;
    return country.senior75AdmissionIndex;
  };

  return (
    <section id="infografia" className="py-16 border-b border-slate-200">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-slate-500 mb-3">
            <span className="text-[#0088CE] font-semibold">02. Infografía Interactiva</span>
            <span aria-hidden="true">·</span>
            <span>Análisis por Edad, Mecanismo y País de la UE</span>
            <span aria-hidden="true">·</span>
            <span>EU-IDB & Redes Centinela España</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial text-[#0A1D37] tracking-tight" style={{ textWrap: 'balance' }}>
            La paradoja clínica: alta frecuencia infantil, máxima gravedad geriátrica
          </h2>
        </div>

        {/* Interactive Territory Lens Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg self-start lg:self-auto">
          <button
            type="button"
            onClick={() => setTerritoryView('comparative')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              territoryView === 'comparative'
                ? 'bg-white text-[#0A1D37] shadow-xs'
                : 'text-slate-600 hover:text-[#0A1D37]'
            }`}
          >
            Europa + España
          </button>
          <button
            type="button"
            onClick={() => setTerritoryView('europa')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              territoryView === 'europa'
                ? 'bg-[#0088CE] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0A1D37]'
            }`}
          >
            Foco Europa
          </button>
          <button
            type="button"
            onClick={() => setTerritoryView('espana')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              territoryView === 'espana'
                ? 'bg-[#14A88B] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0A1D37]'
            }`}
          >
            Foco España
          </button>
        </div>
      </div>

      {/* PART 1: AGE-GROUP BIMODAL CURVE & INTERACTIVE INSPECTOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10">
        {/* Left 7 Cols: Interactive Multi-Bar / Curve Chart */}
        <div className="lg:col-span-7 bg-white border border-slate-200 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-semibold text-[#0A1D37]">
                  Gradiente Etario: Incidencia, Ingreso y Discapacidad
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Selecciona un tramo de edad en el gráfico para inspeccionar su comportamiento epidemiológico
                </p>
              </div>

              {/* Metric Layer Selector */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-md self-start">
                <button
                  type="button"
                  onClick={() => setActiveMetricFilter('all')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                    activeMetricFilter === 'all'
                      ? 'bg-[#0A1D37] text-white'
                      : 'text-slate-600 hover:text-[#0A1D37]'
                  }`}
                >
                  3 Indicadores
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMetricFilter('incidence')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                    activeMetricFilter === 'incidence'
                      ? 'bg-[#0088CE] text-white'
                      : 'text-slate-600 hover:text-[#0A1D37]'
                  }`}
                >
                  Frecuencia
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMetricFilter('admission')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                    activeMetricFilter === 'admission'
                      ? 'bg-[#14A88B] text-white'
                      : 'text-slate-600 hover:text-[#0A1D37]'
                  }`}
                >
                  Ingreso
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMetricFilter('disability')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                    activeMetricFilter === 'disability'
                      ? 'bg-[#0A1D37] text-[#7ED321]'
                      : 'text-slate-600 hover:text-[#0A1D37]'
                  }`}
                >
                  Discapacidad
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-6 py-4 text-xs text-slate-600">
              {(activeMetricFilter === 'all' || activeMetricFilter === 'incidence') && (
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#0088CE] inline-block" />
                  <span>Frecuencia en Urgencias (Pico &lt;14 y 65+)</span>
                </div>
              )}
              {(activeMetricFilter === 'all' || activeMetricFilter === 'admission') && (
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#14A88B] inline-block" />
                  <span>Probabilidad de Ingreso (Pico 75+ años)</span>
                </div>
              )}
              {(activeMetricFilter === 'all' || activeMetricFilter === 'disability') && (
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#0A1D37] inline-block" />
                  <span>Discapacidad Larga Duración (Inflexión 55+ → 85+)</span>
                </div>
              )}
            </div>

            {/* Interactive SVG & Column Chart */}
            <div className="pt-4 pb-2">
              <div className="grid grid-cols-7 gap-2 sm:gap-3 items-end h-64 pt-6 pb-2 border-b border-slate-200 relative">
                <div className="absolute inset-x-0 top-6 border-t border-dashed border-slate-200 pointer-events-none flex justify-end">
                  <span className="text-[10px] font-mono-tabular text-slate-400 -mt-4 bg-white px-1">
                    Nivel Crítico (100)
                  </span>
                </div>
                <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-slate-200 pointer-events-none flex justify-end">
                  <span className="text-[10px] font-mono-tabular text-slate-400 -mt-4 bg-white px-1">
                    Nivel Medio (50)
                  </span>
                </div>

                {AGE_GROUP_STATS.map((group) => {
                  const isSelected = group.id === selectedAgeId;
                  return (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => setSelectedAgeId(group.id)}
                      className={`group relative h-full flex flex-col justify-end items-center px-1 py-1 rounded transition-colors focus:outline-none ${
                        isSelected
                          ? 'bg-[#0088CE]/8 ring-1 ring-[#0088CE]/40'
                          : 'hover:bg-slate-50'
                      }`}
                      aria-label={`Ver estadísticas para ${group.label}`}
                    >
                      <div className="w-full h-48 flex items-end justify-center gap-1 sm:gap-1.5 px-0.5">
                        {(activeMetricFilter === 'all' || activeMetricFilter === 'incidence') && (
                          <div
                            className="w-full max-w-[14px] bg-[#0088CE] transition-transform duration-150 origin-bottom group-hover:opacity-90"
                            style={{ height: `${group.incidenceIndex}%` }}
                            title={`Frecuencia relativa: ${group.incidenceIndex}/100`}
                          />
                        )}
                        {(activeMetricFilter === 'all' || activeMetricFilter === 'admission') && (
                          <div
                            className="w-full max-w-[14px] bg-[#14A88B] transition-transform duration-150 origin-bottom group-hover:opacity-90"
                            style={{ height: `${group.admissionRisk}%` }}
                            title={`Riesgo relativo de ingreso: ${group.admissionRisk}/100`}
                          />
                        )}
                        {(activeMetricFilter === 'all' || activeMetricFilter === 'disability') && (
                          <div
                            className="w-full max-w-[14px] bg-[#0A1D37] transition-transform duration-150 origin-bottom group-hover:opacity-90"
                            style={{ height: `${group.disabilityBurden}%` }}
                            title={`Impacto en discapacidad: ${group.disabilityBurden}/100`}
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* X-Axis Labels */}
              <div className="grid grid-cols-7 gap-2 sm:gap-3 pt-3">
                {AGE_GROUP_STATS.map((group) => {
                  const isSelected = group.id === selectedAgeId;
                  return (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => setSelectedAgeId(group.id)}
                      className={`text-center py-1 rounded transition-colors ${
                        isSelected
                          ? 'text-[#0A1D37] font-semibold underline decoration-[#0088CE] decoration-2 underline-offset-4'
                          : 'text-slate-500 hover:text-[#0A1D37]'
                      }`}
                    >
                      <span className="text-[11px] sm:text-xs font-mono-tabular block whitespace-nowrap">
                        {group.shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <span>
              Fig. 1A — Patrón bimodal en frecuencia (&lt;14 y ≥65) frente a curva exponencial de ingreso y discapacidad (≥55 y ≥75).
            </span>
            <span className="font-mono-tabular text-slate-700">
              Fuentes: Alves 2025 · Alves 2024 · Guillén 2023 · Piffer 2021
            </span>
          </div>
        </div>

        {/* Right 5 Cols: Selected Age Group Detail Card */}
        <div className="lg:col-span-5 bg-white border border-slate-200 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 pb-4 border-b border-slate-100">
              <span className="uppercase tracking-wider font-semibold text-[#0088CE]">
                Ficha Epidemiológica por Edad
              </span>
              <span className="font-mono-tabular">Tramo seleccionado: {currentAgeGroup.shortLabel}</span>
            </div>

            <h3 className="text-2xl font-editorial text-[#0A1D37] mt-4">
              {currentAgeGroup.label}
            </h3>

            {/* 3 Quantitative Index Bars */}
            <div className="grid grid-cols-3 gap-4 my-6 py-4 border-y border-slate-100">
              <div>
                <span className="text-xs text-slate-500 block">Volumen Urgencias</span>
                <span className="text-2xl font-mono-tabular font-semibold text-[#0088CE]">
                  {currentAgeGroup.incidenceIndex}
                  <span className="text-xs font-normal text-slate-400">/100</span>
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Riesgo Ingreso</span>
                <span className="text-2xl font-mono-tabular font-semibold text-[#14A88B]">
                  {currentAgeGroup.admissionRisk}
                  <span className="text-xs font-normal text-slate-400">/100</span>
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Discapacidad</span>
                <span className="text-2xl font-mono-tabular font-semibold text-[#0A1D37]">
                  {currentAgeGroup.disabilityBurden}
                  <span className="text-xs font-normal text-slate-400">/100</span>
                </span>
              </div>
            </div>

            {/* Mechanisms */}
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 block">
                  Mecanismo Dominante
                </span>
                <p className="font-medium text-[#0A1D37] mt-0.5">
                  {currentAgeGroup.dominantMechanism}
                </p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 block">
                  Mecanismo Secundario
                </span>
                <p className="text-slate-700 mt-0.5">{currentAgeGroup.secondaryMechanism}</p>
              </div>
            </div>

            {/* Territory Evidence Notes */}
            <div className="mt-6 space-y-4 pt-4 border-t border-slate-100 text-sm">
              {(territoryView === 'comparative' || territoryView === 'europa') && (
                <div className="pl-3 border-l-2 border-[#0088CE]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#0088CE] block">
                    Evidencia en Europa
                  </span>
                  <p className="text-slate-700 mt-1 leading-relaxed">
                    {currentAgeGroup.europeNote}
                  </p>
                </div>
              )}

              {(territoryView === 'comparative' || territoryView === 'espana') && (
                <div className="pl-3 border-l-2 border-[#14A88B]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#14A88B] block">
                    Evidencia en España
                  </span>
                  <p className="text-slate-700 mt-1 leading-relaxed">
                    {currentAgeGroup.spainNote}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Citations & Action CTA */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span>Citas:</span>
              {currentAgeGroup.citations.map((citId, idx) => (
                <React.Fragment key={citId}>
                  {idx > 0 && <span aria-hidden="true">·</span>}
                  <button
                    type="button"
                    onClick={() => onSelectCitation(citId)}
                    className="text-[#0A1D37] underline decoration-slate-300 underline-offset-4 hover:text-[#0088CE] hover:decoration-[#0088CE] transition-colors whitespace-nowrap"
                  >
                    {citId.replace('-', ' ').toUpperCase()}
                  </button>
                </React.Fragment>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                onJumpToPreventionWithGroup(mapAgeIdToPreventionPreset(currentAgeGroup.id))
              }
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0A1D37] rounded-lg hover:bg-[#0088CE] transition-colors whitespace-nowrap"
            >
              <span>Ver protocolo para {currentAgeGroup.shortLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* PART 2: MECHANISM DISTRIBUTION & ADMISSION FUNNELS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Mechanism Breakdown (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-semibold text-[#0A1D37]">
                Distribución por Tipo de Accidente en el Hogar
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Haz clic en cada mecanismo para comparar su peso en Europa y España y su severidad de ingreso
              </p>
            </div>
            <span className="text-xs font-mono-tabular text-slate-500 whitespace-nowrap">
              Base: Vigilancia Europea (Alves 2025)
            </span>
          </div>

          <div className="space-y-4 mt-6">
            {MECHANISM_STATS.map((mech) => {
              const isSelected = mech.id === selectedMechanismId;
              return (
                <button
                  key={mech.id}
                  type="button"
                  onClick={() => setSelectedMechanismId(mech.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    isSelected
                      ? 'border-[#0088CE] bg-[#0088CE]/5'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="font-medium text-sm text-[#0A1D37]">{mech.name}</span>
                    <div className="flex items-center gap-3 text-xs whitespace-nowrap">
                      <span className="text-slate-500">
                        Ingreso: <strong className="text-[#0A1D37]">{mech.admissionSeverity}</strong>
                      </span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="font-mono-tabular font-semibold text-base text-[#0088CE]">
                        {mech.europeShare.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-2.5 bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full transition-transform duration-200 origin-left ${
                        mech.id === 'falls'
                          ? 'bg-acw-gradient'
                          : mech.id === 'poisoning'
                          ? 'bg-[#0088CE]'
                          : 'bg-[#0A1D37]'
                      }`}
                      style={{ width: `${mech.europeShare}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 mb-2">
              <span className="uppercase tracking-wider font-semibold text-[#0088CE]">
                Detalle del mecanismo: {currentMechanism.name}
              </span>
              <span>Población diana: {currentMechanism.primaryAffected}</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {currentMechanism.description}{' '}
              <span className="text-[#0A1D37] font-medium">{currentMechanism.spainContext}</span>
            </p>
          </div>
        </div>

        {/* Pediatric vs Senior Clinical Funnel & Traffic Comparison (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="bg-white border border-slate-200 p-6 sm:p-8 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
                <span className="uppercase tracking-wider font-semibold text-[#0088CE]">
                  Embudo Pediátrico (0–19 años)
                </span>
                <button
                  type="button"
                  onClick={() => onSelectCitation('alves-2024')}
                  className="font-mono-tabular underline hover:text-[#0088CE]"
                >
                  Alves 2024 · Rivas García 2018
                </button>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-mono-tabular font-semibold text-[#0A1D37]">
                    3,600,000
                  </span>
                  <span className="text-xs text-slate-500 block mt-0.5">
                    Episodios HLA registrados en 10 años (EU-IDB)
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-mono-tabular font-semibold text-[#14A88B]">
                    92.9%
                  </span>
                  <span className="text-xs text-slate-500 block mt-0.5">
                    Alta sin ingreso hospitalario
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <div className="h-5 w-full flex overflow-hidden border border-slate-200">
                  <div
                    className="bg-[#0088CE] h-full flex items-center pl-2 text-[11px] font-mono-tabular text-white"
                    style={{ width: '92.9%' }}
                  >
                    92.9% Sin admisión (Urgencias)
                  </div>
                  <div
                    className="bg-[#7ED321] h-full"
                    style={{ width: '7.1%' }}
                    title="7.1% Requiere ingreso hospitalario"
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono-tabular">
                  <span>Esp. Pediatría: ~40% sin adulto presente</span>
                  <span className="text-[#14A88B] font-semibold">14.4% Fracturas (España)</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-4 pt-3 border-t border-slate-100 leading-relaxed">
              En menores de 5 años, pese a que la mayoría de episodios son leves, las lesiones graves en casa constituyen la <strong>1ª causa de muerte por lesión en 16 países europeos</strong> (Sengoelge 2010).
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 sm:p-8 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
                <span className="uppercase tracking-wider font-semibold text-[#14A88B]">
                  Magnitud Letal e Incidencia Territorial
                </span>
                <button
                  type="button"
                  onClick={() => onSelectCitation('keall-2011')}
                  className="font-mono-tabular underline hover:text-[#0088CE]"
                >
                  Keall 2011 · Costa 2012
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs text-slate-500 block">Mortalidad Anual Europa</span>
                  <span className="text-2xl font-mono-tabular font-semibold text-[#0088CE] mt-0.5 block">
                    ~110,000
                  </span>
                  <span className="text-xs text-slate-600 mt-1 block">
                    Supera la tasa de mortalidad por tráfico
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Hospitalizaciones Europa</span>
                  <span className="text-2xl font-mono-tabular font-semibold text-[#0A1D37] mt-0.5 block">
                    32,000,000
                  </span>
                  <span className="text-xs text-slate-600 mt-1 block">
                    Ingresos anuales por hogar y ocio
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">
                    Incidencia España (Castilla y León)
                  </span>
                  <span className="text-xl font-mono-tabular font-semibold text-[#0A1D37]">
                    2,651 <span className="text-xs font-normal text-slate-500">/ 100,000 hab/año</span>
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Ocurre en el domicilio</span>
                  <span className="text-xl font-mono-tabular font-semibold text-[#14A88B]">
                    57.1%
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-4 pt-3 border-t border-slate-100 leading-relaxed">
              En personas mayores españolas predominan las <strong>mujeres</strong> y los eventos se asocian a edad, depresión y fragilidad funcional (López-Soto 2019).
            </p>
          </div>
        </div>
      </div>

      {/* PART 3: INTERACTIVE EU COUNTRY & REGIONAL COMPARISON VIEW */}
      <div className="mt-8 bg-white border border-slate-200 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#0088CE] font-semibold">
              <Globe className="w-3.5 h-3.5" />
              <span>Comparativa Regional por País de la UE</span>
              <span aria-hidden="true">·</span>
              <span>Sistemas Nacionales EU-IDB y Cohorte Sengoelge (16 países)</span>
            </div>
            <h3 className="text-2xl font-editorial text-[#0A1D37] mt-1">
              Explorador de Indicadores por País Europeo frente a España y la Media UE
            </h3>
          </div>

          {/* Sengoelge 16-Country Cohort Toggle */}
          <label className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-[#F8FAFC] cursor-pointer text-xs font-medium text-[#0A1D37] self-start lg:self-auto">
            <input
              type="checkbox"
              checked={onlySengoelgeCohort}
              onChange={() => setOnlySengoelgeCohort(!onlySengoelgeCohort)}
              className="h-4 w-4 accent-[#0088CE] rounded"
            />
            <span>
              Filtrar cohorte Sengoelge 2010 (Hogar = 1ª causa mortal en &lt;5 años)
            </span>
          </label>
        </div>

        {/* Filter Bar: Region Cluster + Indicator Metric */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 py-4 border-b border-slate-100">
          {/* Cluster Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'Todos los países UE (8)' },
              { id: 'Sur de Europa / Ibérica', label: 'Sur de Europa / Ibérica' },
              { id: 'Europa Occidental', label: 'Europa Occidental' },
              { id: 'Europa Central y Alpina', label: 'Europa Central' },
              { id: 'Europa del Norte', label: 'Europa del Norte' }
            ].map((cluster) => (
              <button
                key={cluster.id}
                type="button"
                onClick={() => setSelectedCluster(cluster.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  selectedCluster === cluster.id
                    ? 'bg-[#0A1D37] text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-[#0A1D37]'
                }`}
              >
                {cluster.label}
              </button>
            ))}
          </div>

          {/* Plotted Metric Selector */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg self-start">
            {[
              { id: 'fallsSharePct', label: '% Caídas en Casa (Alves 2025)' },
              { id: 'incidencePer100k', label: 'Incidencia / 100k (Costa 2012)' },
              { id: 'pediatricNonAdmissionPct', label: '% Sin Ingreso 0–19a (Alves 2024)' },
              { id: 'senior75AdmissionIndex', label: 'Índice Ingreso 75+ (Guillén 2023)' }
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() =>
                  setRegionalChartMetric(
                    m.id as typeof regionalChartMetric
                  )
                }
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  regionalChartMetric === m.id
                    ? 'bg-[#0088CE] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0A1D37]'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Regional Grid: Left Country Ranking Bars (7 cols) + Right Bilateral Country Inspector (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-start">
          {/* Left 7 Cols: Interactive Country Ranking List */}
          <div className="lg:col-span-7 space-y-3">
            {filteredCountries.map((country) => {
              const isSelected = country.id === activeCountry.id;
              const isBenchmark = country.id === benchmarkCountry.id;
              const barWidth = getMetricBarWidth(country, regionalChartMetric);

              return (
                <button
                  key={country.id}
                  type="button"
                  onClick={() => setSelectedCountryId(country.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    isSelected
                      ? 'border-[#0088CE] bg-[#0088CE]/6'
                      : isBenchmark
                      ? 'border-[#14A88B]/60 bg-[#14A88B]/[0.03]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono-tabular text-xs font-semibold text-[#0088CE] w-11">
                        {country.isoCode}
                      </span>
                      <span className="font-semibold text-sm text-[#0A1D37]">
                        {country.name}
                      </span>
                      <span className="text-xs text-slate-400 hidden sm:inline">
                        · {country.regionCluster}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono-tabular">
                      {country.under5LeadingCauseMortality && (
                        <span className="text-[11px] text-[#14A88B] font-medium">
                          1ª causa &lt;5a (Sengoelge)
                        </span>
                      )}
                      <span className="text-base font-semibold text-[#0A1D37]">
                        {getMetricValueDisplay(country, regionalChartMetric)}
                      </span>
                    </div>
                  </div>

                  {/* Bar */}
                  <div className="w-full h-2.5 bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-200 ${
                        country.id === 'es-spain'
                          ? 'bg-acw-gradient'
                          : country.id === 'eu-average'
                          ? 'bg-[#0A1D37]'
                          : isSelected
                          ? 'bg-[#0088CE]'
                          : 'bg-[#14A88B]'
                      }`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right 5 Cols: Bilateral Country Comparison Inspector */}
          <div className="lg:col-span-5 bg-[#F8FAFC] border border-slate-200 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-200">
                <span className="uppercase tracking-wider font-semibold text-[#0088CE]">
                  Ficha Nacional Comparada
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">Comparar con:</span>
                  <select
                    value={comparisonBenchmarkId}
                    onChange={(e) => setComparisonBenchmarkId(e.target.value)}
                    className="bg-white border border-slate-300 rounded px-2 py-0.5 text-xs font-medium text-[#0A1D37] focus:outline-none focus:border-[#0088CE]"
                    aria-label="Seleccionar país o referencia para comparar"
                  >
                    {EU_COUNTRY_COMPARISONS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs font-mono-tabular text-slate-500">
                  {activeCountry.isoCode} · {activeCountry.surveillanceNetwork}
                </div>
                <h4 className="text-2xl font-editorial text-[#0A1D37] mt-1">
                  {activeCountry.name}
                </h4>
              </div>

              {/* 4 Side-by-Side Comparison Metrics */}
              <div className="grid grid-cols-2 gap-3 my-5">
                <div className="bg-white border border-slate-200 p-3.5">
                  <span className="text-[11px] text-slate-500 block">
                    Mecanismo Caídas
                  </span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-xl font-mono-tabular font-semibold text-[#0088CE]">
                      {activeCountry.fallsSharePct.toFixed(1)}%
                    </span>
                    <span className="text-[11px] font-mono-tabular text-slate-400">
                      vs {benchmarkCountry.fallsSharePct.toFixed(1)}% ({benchmarkCountry.isoCode})
                    </span>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-3.5">
                  <span className="text-[11px] text-slate-500 block">
                    Incidencia / 100k hab.
                  </span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-xl font-mono-tabular font-semibold text-[#0A1D37]">
                      {activeCountry.incidencePer100k.toLocaleString('es-ES')}
                    </span>
                    <span className="text-[11px] font-mono-tabular text-slate-400">
                      vs {benchmarkCountry.incidencePer100k.toLocaleString('es-ES')}
                    </span>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-3.5">
                  <span className="text-[11px] text-slate-500 block">
                    Sin Ingreso (0–19 años)
                  </span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-xl font-mono-tabular font-semibold text-[#14A88B]">
                      {activeCountry.pediatricNonAdmissionPct.toFixed(1)}%
                    </span>
                    <span className="text-[11px] font-mono-tabular text-slate-400">
                      vs {benchmarkCountry.pediatricNonAdmissionPct.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-3.5">
                  <span className="text-[11px] text-slate-500 block">
                    Ocurren en Domicilio
                  </span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-xl font-mono-tabular font-semibold text-[#0A1D37]">
                      {activeCountry.homeLocationSharePct.toFixed(1)}%
                    </span>
                    <span className="text-[11px] font-mono-tabular text-slate-400">
                      vs {benchmarkCountry.homeLocationSharePct.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Country Specific Narrative & Mortality vs Traffic */}
              <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <div className="p-3 bg-white border border-slate-200 border-l-2 border-l-[#0088CE]">
                  <strong className="text-[#0A1D37] block mb-0.5">
                    Hallazgo nacional documentado:
                  </strong>
                  {activeCountry.countrySpecificFinding}
                </div>

                <div className="p-3 bg-white border border-slate-200 border-l-2 border-l-[#14A88B]">
                  <strong className="text-[#0A1D37] block mb-0.5">
                    Carga hospitalaria y comparativa con tráfico:
                  </strong>
                  <span className="font-mono-tabular text-[#0088CE] font-semibold block mb-1">
                    Mortalidad Hogar vs. Tráfico: {activeCountry.domesticVsTrafficRatio}
                  </span>
                  {activeCountry.regionalHighlight}
                </div>
              </div>
            </div>

            {/* Citations Footer */}
            <div className="mt-5 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span>Fuentes del país:</span>
              <div className="flex flex-wrap items-center gap-2">
                {activeCountry.citations.map((citId, idx) => (
                  <React.Fragment key={citId}>
                    {idx > 0 && <span aria-hidden="true">·</span>}
                    <button
                      type="button"
                      onClick={() => onSelectCitation(citId)}
                      className="font-mono-tabular text-[#0A1D37] underline hover:text-[#0088CE]"
                    >
                      {citId.replace('-', ' ').toUpperCase()}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PART 4: INTERACTIVE POPULATION EPIDEMIOLOGICAL SIMULATOR */}
      <PopulationSimulator onSelectCitation={onSelectCitation} />

      {/* PART 5: PRINT-OPTIMIZED PDF EXPORT COMPONENT (jsPDF) */}
      <PdfExportPanel
        selectedAgeGroup={currentAgeGroup}
        selectedMechanism={currentMechanism}
        selectedCountry={activeCountry}
        benchmarkCountry={benchmarkCountry}
        externalPresetGroup={externalPresetGroup}
        onSelectCitation={onSelectCitation}
      />

      {/* Methodological Disclaimer Notice inside Dashboard */}
      <div className="mt-6 px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span>
          <strong>Nota metodológica:</strong> Los índices 0–100 y los valores por país son estimaciones ilustrativas basadas en las fuentes citadas, no datos oficiales.
        </span>
        <span className="font-mono-tabular text-slate-500 shrink-0">
          Fuentes base: Alves 2024/2025 · Costa 2012 · Keall 2011 · Sengoelge 2010
        </span>
      </div>
    </section>
  );
};
