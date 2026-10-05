import React, { useState } from 'react';
import { ArrowDownRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface QuickRiskTriageProps {
  onApplyTriageToGuide: (preset: string) => void;
  onSelectCitation: (citationId: string) => void;
}

export const QuickRiskTriage: React.FC<QuickRiskTriageProps> = ({
  onApplyTriageToGuide,
  onSelectCitation
}) => {
  const [qAgeExtreme, setQAgeExtreme] = useState<boolean>(true);
  const [qPriorFall, setQPriorFall] = useState<boolean>(true);
  const [qPolypharmacy, setQPolypharmacy] = useState<boolean>(false);
  const [qUnadaptedBath, setQUnadaptedBath] = useState<boolean>(true);

  const activeFactorsCount = [
    qAgeExtreme,
    qPriorFall,
    qPolypharmacy,
    qUnadaptedBath
  ].filter(Boolean).length;

  const riskScore =
    12 +
    (qAgeExtreme ? 28 : 0) +
    (qPriorFall ? 24 : 0) +
    (qPolypharmacy ? 18 : 0) +
    (qUnadaptedBath ? 16 : 0);

  const mitigatedScore = Math.max(8, Math.round(riskScore * 0.32));

  const riskTier =
    activeFactorsCount >= 3
      ? {
          label: 'Prioridad Crítica — Intervención Inmediata',
          color: 'text-[#0088CE]',
          border: 'border-[#0088CE]',
          recommendation:
            'Tu hogar reúne los factores que concentran el pico de ingresos hospitalarios en ≥75 años (Alves 2025) y la discapacidad permanente (Guillén 2023).'
        }
      : activeFactorsCount >= 2
      ? {
          label: 'Prioridad Alta — Adaptación Preventiva',
          color: 'text-[#14A88B]',
          border: 'border-[#14A88B]',
          recommendation:
            'Existe riesgo elevado de caídas al mismo nivel (56.2%, Alves 2025) o accidentes domésticos evitables (57.1% ocurren en casa, Costa 2012).'
        }
      : {
          label: 'Riesgo Basal — Mantenimiento Preventivo',
          color: 'text-[#0A1D37]',
          border: 'border-slate-300',
          recommendation:
            'Aunque los episodios graves son menos probables, las caídas y los objetos cortantes en cocina siguen siendo frecuentes (Costa 2012).'
        };

  return (
    <div className="mt-12 bg-white border border-slate-200 border-l-4 border-l-[#0088CE] p-6 sm:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#0088CE] font-semibold">
            <span>Triaje Clínico Rápido AssureCareWare</span>
            <span aria-hidden="true">·</span>
            <span>Cribado en 30 segundos</span>
          </div>
          <h3 className="text-2xl font-editorial text-[#0A1D37] mt-1">
            Evalúa la vulnerabilidad actual de tu vivienda frente al estándar Hábitat Asistencial
          </h3>
        </div>

        <div className="text-xs font-mono-tabular text-slate-500">
          Factores activos: <strong className="text-[#0A1D37]">{activeFactorsCount} / 4</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-stretch">
        {/* Left 7 Cols: 4 Interactive Clinical Triage Questions */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setQAgeExtreme(!qAgeExtreme)}
            className={`text-left p-4 rounded-lg border transition-colors flex flex-col justify-between ${
              qAgeExtreme
                ? 'border-[#0088CE] bg-[#0088CE]/6'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono-tabular font-semibold text-[#0088CE]">
                  01 · EDAD VULNERABLE
                </span>
                <span
                  className={`font-semibold ${
                    qAgeExtreme ? 'text-[#14A88B]' : 'text-slate-400'
                  }`}
                >
                  {qAgeExtreme ? 'SÍ (Activo)' : 'NO'}
                </span>
              </div>
              <p className="text-sm font-semibold text-[#0A1D37]">
                ¿Residen mayores de 75 años o niños menores de 5 años?
              </p>
            </div>
            <p className="text-xs text-slate-500 mt-3 pt-2 border-t border-slate-100">
              Concentran la mayor tasa de ingreso (Alves 2025) y mortalidad infantil en 16 países (Sengoelge 2010).
            </p>
          </button>

          <button
            type="button"
            onClick={() => setQPriorFall(!qPriorFall)}
            className={`text-left p-4 rounded-lg border transition-colors flex flex-col justify-between ${
              qPriorFall
                ? 'border-[#0088CE] bg-[#0088CE]/6'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono-tabular font-semibold text-[#0088CE]">
                  02 · MECANISMO CAÍDAS
                </span>
                <span
                  className={`font-semibold ${
                    qPriorFall ? 'text-[#14A88B]' : 'text-slate-400'
                  }`}
                >
                  {qPriorFall ? 'SÍ (Activo)' : 'NO'}
                </span>
              </div>
              <p className="text-sm font-semibold text-[#0A1D37]">
                ¿Ha habido algún tropiezo, resbalón o caída en el último año?
              </p>
            </div>
            <p className="text-xs text-slate-500 mt-3 pt-2 border-t border-slate-100">
              Las caídas suponen el 56.2% de las lesiones en Europa y disparan la discapacidad tras los 55 años (Guillén 2023).
            </p>
          </button>

          <button
            type="button"
            onClick={() => setQPolypharmacy(!qPolypharmacy)}
            className={`text-left p-4 rounded-lg border transition-colors flex flex-col justify-between ${
              qPolypharmacy
                ? 'border-[#0088CE] bg-[#0088CE]/6'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono-tabular font-semibold text-[#0088CE]">
                  03 · FRAGILIDAD Y FÁRMACOS
                </span>
                <span
                  className={`font-semibold ${
                    qPolypharmacy ? 'text-[#14A88B]' : 'text-slate-400'
                  }`}
                >
                  {qPolypharmacy ? 'SÍ (Activo)' : 'NO'}
                </span>
              </div>
              <p className="text-sm font-semibold text-[#0A1D37]">
                ¿Hay limitación de movilidad, ánimo depresivo o &gt;3 fármacos/día?
              </p>
            </div>
            <p className="text-xs text-slate-500 mt-3 pt-2 border-t border-slate-100">
              En España se asocia fuertemente a accidentes en mujeres mayores e ingreso por intoxicación (López-Soto 2019).
            </p>
          </button>

          <button
            type="button"
            onClick={() => setQUnadaptedBath(!qUnadaptedBath)}
            className={`text-left p-4 rounded-lg border transition-colors flex flex-col justify-between ${
              qUnadaptedBath
                ? 'border-[#0088CE] bg-[#0088CE]/6'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono-tabular font-semibold text-[#0088CE]">
                  04 · BARRERAS EN VIVIENDA
                </span>
                <span
                  className={`font-semibold ${
                    qUnadaptedBath ? 'text-[#14A88B]' : 'text-slate-400'
                  }`}
                >
                  {qUnadaptedBath ? 'SÍ (Activo)' : 'NO'}
                </span>
              </div>
              <p className="text-sm font-semibold text-[#0A1D37]">
                ¿Hay bañera sin asideros, alfombras sin fijar o escaleras sin bloqueo?
              </p>
            </div>
            <p className="text-xs text-slate-500 mt-3 pt-2 border-t border-slate-100">
              El 57.1% de los accidentes ocurren en casa (Costa 2012) y el 14.4% en niños causan fracturas (Rivas García 2018).
            </p>
          </button>
        </div>

        {/* Right 5 Cols: Comparative Outcome Before vs After AssureCareWare */}
        <div className="lg:col-span-5 bg-[#0A1D37] text-white p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-300 pb-3 border-b border-slate-800">
              <span className="uppercase tracking-wider font-semibold text-[#7ED321]">
                Resultado del Triaje AssureCareWare
              </span>
              <span className="font-mono-tabular">Comparativa de Impacto</span>
            </div>

            <p className="text-sm font-semibold text-white mt-4">
              {riskTier.label}
            </p>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {riskTier.recommendation}
            </p>

            {/* Before vs After Bars */}
            <div className="mt-6 space-y-4 py-4 border-y border-slate-800">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Hogar sin adaptar (Riesgo actual)</span>
                  <span className="font-mono-tabular font-semibold text-[#0088CE]">
                    {riskScore} / 100
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-[#0088CE] transition-all duration-200"
                    style={{ width: `${riskScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#7ED321] font-medium">
                    Con Protocolo Hábitat Asistencial AssureCareWare
                  </span>
                  <span className="font-mono-tabular font-semibold text-[#7ED321]">
                    {mitigatedScore} / 100 (-{riskScore - mitigatedScore} pts)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-acw-gradient transition-all duration-200"
                    style={{ width: `${mitigatedScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() =>
                onApplyTriageToGuide(qAgeExtreme ? 'seniors_75_plus' : 'all')
              }
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-[#0A1D37] bg-[#7ED321] rounded-lg hover:bg-white transition-colors whitespace-nowrap"
            >
              <span>Aplicar al Configurador y Ver Soluciones</span>
              <ArrowDownRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
