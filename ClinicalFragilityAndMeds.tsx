import React, { useState, useMemo } from 'react';
import { FileText, CheckCircle2, Download } from 'lucide-react';

interface ClinicalFragilityAndMedsProps {
  onSelectCitation: (citationId: string) => void;
}

interface MedFactor {
  id: string;
  name: string;
  mechanism: string;
  riskWeight: number;
  clinicalNote: string;
}

const MED_FACTORS: MedFactor[] = [
  {
    id: 'sedatives',
    name: 'Hipnóticos, sedantes o benzodiacepinas para dormir',
    mechanism: 'Somnolencia matutina, ataxia nocturna y pérdida de reflejos posturales',
    riskWeight: 28,
    clinicalNote: 'Multiplica el riesgo de caída en el trayecto cama → baño durante la noche.'
  },
  {
    id: 'antidepressants',
    name: 'Antidepresivos o sintomatología depresiva activa',
    mechanism: 'Asociación estadística directa en mayores españoles (López-Soto 2019)',
    riskWeight: 26,
    clinicalNote: 'López-Soto (2019) identifica la depresión y el género femenino como predictores clave en España.'
  },
  {
    id: 'antihypertensives',
    name: 'Antihipertensivos o diuréticos de acción rápida',
    mechanism: 'Hipotensión ortostática al incorporarse de cama o inodoro y urgencia miccional',
    riskWeight: 20,
    clinicalNote: 'Provoca mareo súbito en los primeros 15 segundos tras ponerse en pie.'
  },
  {
    id: 'polypharmacy',
    name: 'Polifarmacia (≥ 5 medicamentos diarios sin pastillero supervisado)',
    mechanism: 'Riesgo de confusión de dosis e ingreso por intoxicación en ≥75 años (Alves 2025)',
    riskWeight: 26,
    clinicalNote: 'En vigilancia europea (Alves 2025), las intoxicaciones y la edad ≥75 disparan el ingreso hospitalario.'
  }
];

const FUNCTIONAL_TESTS = [
  {
    id: 'chair-stand',
    title: 'Test de levantarse de la silla (5 repeticiones)',
    question: '¿Necesita apoyarse con los brazos o tarda más de 15 segundos en levantarse 5 veces?',
    implication: 'Indica déficit de fuerza en cuádriceps; eleva el riesgo de caída al mismo nivel (Costa 2012).'
  },
  {
    id: 'night-walk',
    title: 'Deambulación nocturna sin iluminación automática',
    question: '¿Se levanta al baño de noche a oscuras o con zapatillas abiertas/destalonadas?',
    implication: 'Escenario principal de fractura de cadera e inicio de discapacidad severa en 75–84 y 85+ (Guillén 2023).'
  },
  {
    id: 'unwitnessed-time',
    title: 'Tiempo en soledad o sin supervisión (>3 horas seguidas)',
    question: '¿Pasa la persona mayor horas sola en casa o quedan niños sin contacto visual adulto?',
    implication: 'El 40% de los accidentes pediátricos ocurren sin adulto presente (Rivas García 2018) y en mayores retrasa el rescate.'
  }
];

export const ClinicalFragilityAndMeds: React.FC<ClinicalFragilityAndMedsProps> = ({
  onSelectCitation
}) => {
  const [selectedMeds, setSelectedMeds] = useState<Record<string, boolean>>({
    sedatives: true,
    antidepressants: true,
    antihypertensives: false,
    polypharmacy: false
  });

  const [selectedFunctional, setSelectedFunctional] = useState<Record<string, boolean>>({
    'chair-stand': true,
    'night-walk': true,
    'unwitnessed-time': false
  });

  const toggleMed = (id: string) => {
    setSelectedMeds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFunc = (id: string) => {
    setSelectedFunctional((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const clinicalAssessment = useMemo(() => {
    let score = 10;
    MED_FACTORS.forEach((m) => {
      if (selectedMeds[m.id]) score += m.riskWeight * 0.65;
    });
    FUNCTIONAL_TESTS.forEach((f) => {
      if (selectedFunctional[f.id]) score += 14;
    });
    const finalScore = Math.min(99, Math.round(score));

    const actions: string[] = [];
    if (selectedMeds.sedatives || selectedMeds.antidepressants) {
      actions.push(
        'Solicitar en consulta médica revisión de psicofármacos (criterios STOPP/START) y evaluación del estado de ánimo (López-Soto 2019).'
      );
    }
    if (selectedMeds.polypharmacy) {
      actions.push(
        'Implantar sistema de dosificación personalizada (SPD) o dispensador inteligente AssureCareWare para evitar intoxicaciones en ≥75 años (Alves 2025).'
      );
    }
    if (selectedFunctional['chair-stand'] || selectedFunctional['night-walk']) {
      actions.push(
        'Instalar asideros estructurales en baño, balizado lumínico nocturno automático y pauta de fortalecimiento de tren inferior (Guillén 2023).'
      );
    }
    if (selectedFunctional['unwitnessed-time']) {
      actions.push(
        'Activar sensorización pasiva AssureCareWare sin cámaras para detección temprana de caídas y permanencia anómala en baño.'
      );
    }
    if (actions.length === 0) {
      actions.push(
        'Mantener revisión anual de agudeza visual, calzado doméstico cerrado y orden en zonas de paso (Costa 2012).'
      );
    }

    return { finalScore, actions };
  }, [selectedMeds, selectedFunctional]);

  const handleDownloadMedicalSheet = () => {
    const activeMedNames = MED_FACTORS.filter((m) => selectedMeds[m.id]).map((m) => `- ${m.name}`);
    const activeFuncNames = FUNCTIONAL_TESTS.filter((f) => selectedFunctional[f.id]).map(
      (f) => `- ${f.title}: POSITIVO`
    );

    const content = [
      'HÁBITAT ASISTENCIAL · ASSURECAREWARE',
      'HOJA DE DERIVACIÓN Y CRIBADO CLÍNICO-FUNCIONAL (MÓDULO LÓPEZ-SOTO 2019 / ALVES 2025)',
      '====================================================================================',
      `Índice de Fragilidad y Riesgo Farmacológico en el Hogar: ${clinicalAssessment.finalScore}/100`,
      '',
      '1. FACTORES FARMACOLÓGICOS Y DE ESTADO DE ÁNIMO DETECTADOS:',
      ...(activeMedNames.length > 0 ? activeMedNames : ['- Ningún factor farmacológico crítico marcado']),
      '',
      '2. PRUEBAS DE AUTONOMÍA FUNCIONAL Y ENTORNO:',
      ...(activeFuncNames.length > 0 ? activeFuncNames : ['- Sin limitaciones funcionales reportadas']),
      '',
      '3. RECOMENDACIONES PARA REVISIÓN EN ATENCIÓN PRIMARIA / GERIATRÍA:',
      ...clinicalAssessment.actions.map((a, i) => `0${i + 1}. ${a}`),
      '',
      'Referencias científicas: Alves et al. (2025), López-Soto et al. (2019), Guillén et al. (2023), Rivas García et al. (2018).'
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hoja-consulta-medica-assurecareware.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-12 bg-white border border-slate-200 p-6 sm:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#14A88B] font-semibold">
            <span>Módulo Clínico de Fragilidad y Polifarmacia</span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onSelectCitation('lopez-soto-2019')}
              className="underline hover:text-[#0088CE]"
            >
              Evidencia López-Soto 2019 & Alves 2025
            </button>
          </div>
          <h3 className="text-2xl font-editorial text-[#0A1D37] mt-1">
            Evaluador de Riesgo Farmacológico, Estado Funcional y Hoja para Consulta Médica
          </h3>
        </div>

        <button
          type="button"
          onClick={handleDownloadMedicalSheet}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0A1D37] rounded-lg hover:bg-[#0088CE] transition-colors whitespace-nowrap self-start lg:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Descargar Hoja para el Médico (.txt)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Left 4 Cols: Pharmacological Screening */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0088CE] mb-2">
            A. Cribado de Fármacos y Estado de Ánimo
          </div>
          {MED_FACTORS.map((med) => {
            const isChecked = !!selectedMeds[med.id];
            return (
              <label
                key={med.id}
                className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-colors ${
                  isChecked
                    ? 'border-[#0088CE] bg-[#0088CE]/5'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleMed(med.id)}
                  className="mt-0.5 h-4 w-4 accent-[#0088CE] rounded shrink-0"
                />
                <div className="text-xs">
                  <span className="font-semibold text-[#0A1D37] block">{med.name}</span>
                  <span className="text-slate-500 mt-1 block leading-relaxed">
                    {med.clinicalNote}
                  </span>
                </div>
              </label>
            );
          })}
        </div>

        {/* Center 4 Cols: Functional Autonomy Screening */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#14A88B] mb-2">
            B. Pruebas Rápidas de Autonomía y Supervisión
          </div>
          {FUNCTIONAL_TESTS.map((test) => {
            const isChecked = !!selectedFunctional[test.id];
            return (
              <label
                key={test.id}
                className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-colors ${
                  isChecked
                    ? 'border-[#14A88B] bg-[#14A88B]/5'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleFunc(test.id)}
                  className="mt-0.5 h-4 w-4 accent-[#14A88B] rounded shrink-0"
                />
                <div className="text-xs">
                  <span className="font-semibold text-[#0A1D37] block">{test.title}</span>
                  <span className="text-slate-700 mt-0.5 block">{test.question}</span>
                  <span className="text-slate-500 mt-1 block italic">{test.implication}</span>
                </div>
              </label>
            );
          })}
        </div>

        {/* Right 4 Cols: Generated Clinical Protocol Card */}
        <div className="lg:col-span-4 bg-[#F8FAFC] border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-200">
              <span className="font-semibold uppercase tracking-wider text-[#0A1D37]">
                Informe Clínico-Asistencial
              </span>
              <span className="font-mono-tabular text-[#0088CE] font-semibold">
                Índice: {clinicalAssessment.finalScore}/100
              </span>
            </div>

            <div className="my-4">
              <div className="w-full h-2.5 bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-acw-gradient transition-all duration-200"
                  style={{ width: `${clinicalAssessment.finalScore}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                Ponderación basada en factores de ingreso (Alves 2025) y fragilidad en España (López-Soto 2019).
              </p>
            </div>

            <div className="space-y-3 mt-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0A1D37] block">
                Pautas para Atención Primaria y Hogar:
              </span>
              {clinicalAssessment.actions.map((act, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed"
                >
                  <strong className="font-mono-tabular text-[#0088CE] mr-1.5">
                    0{idx + 1}.
                  </strong>
                  {act}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Válido para revisión geriátrica o pediátrica</span>
            <span className="font-mono-tabular text-[#14A88B] font-semibold">AssureCareWare</span>
          </div>
        </div>
      </div>
    </div>
  );
};
