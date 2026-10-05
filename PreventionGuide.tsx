import React, { useState, useMemo, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import {
  PREVENTION_RECOMMENDATIONS
} from '../data/epidemiologyData';
import { Printer, RotateCcw, Download, FileDown } from 'lucide-react';
import { InteractiveFloorplan } from './InteractiveFloorplan';
import { ClinicalFragilityAndMeds } from './ClinicalFragilityAndMeds';

interface HouseholdProfile {
  children_under_5: boolean;
  children_5_14: boolean;
  adults_15_54: boolean;
  adults_55_74: boolean;
  seniors_75_plus: boolean;
  fragility: boolean;
  stairs_rugs: boolean;
}

interface PreventionGuideProps {
  externalPresetGroup?: string | null;
  onSelectCitation: (citationId: string) => void;
}

export const PreventionGuide: React.FC<PreventionGuideProps> = ({
  externalPresetGroup,
  onSelectCitation
}) => {
  const [profile, setProfile] = useState<HouseholdProfile>({
    children_under_5: true,
    children_5_14: false,
    adults_15_54: true,
    adults_55_74: false,
    seniors_75_plus: true,
    fragility: true,
    stairs_rugs: true
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRoom, setSelectedRoom] = useState<string>('all');
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!externalPresetGroup) return;
    if (externalPresetGroup === 'children_under_5') {
      setProfile({
        children_under_5: true,
        children_5_14: false,
        adults_15_54: true,
        adults_55_74: false,
        seniors_75_plus: false,
        fragility: false,
        stairs_rugs: true
      });
    } else if (externalPresetGroup === 'children_5_14') {
      setProfile({
        children_under_5: false,
        children_5_14: true,
        adults_15_54: true,
        adults_55_74: false,
        seniors_75_plus: false,
        fragility: false,
        stairs_rugs: true
      });
    } else if (externalPresetGroup === 'adults_55_74') {
      setProfile({
        children_under_5: false,
        children_5_14: false,
        adults_15_54: false,
        adults_55_74: true,
        seniors_75_plus: false,
        fragility: false,
        stairs_rugs: true
      });
    } else if (externalPresetGroup === 'seniors_75_plus') {
      setProfile({
        children_under_5: false,
        children_5_14: false,
        adults_15_54: false,
        adults_55_74: false,
        seniors_75_plus: true,
        fragility: true,
        stairs_rugs: true
      });
    }
  }, [externalPresetGroup]);

  const toggleProfileField = (field: keyof HouseholdProfile) => {
    setProfile((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const applyArchetype = (type: 'multigen' | 'seniors' | 'young_family' | 'adults_only') => {
    if (type === 'multigen') {
      setProfile({
        children_under_5: true,
        children_5_14: true,
        adults_15_54: true,
        adults_55_74: false,
        seniors_75_plus: true,
        fragility: true,
        stairs_rugs: true
      });
    } else if (type === 'seniors') {
      setProfile({
        children_under_5: false,
        children_5_14: false,
        adults_15_54: false,
        adults_55_74: true,
        seniors_75_plus: true,
        fragility: true,
        stairs_rugs: true
      });
    } else if (type === 'young_family') {
      setProfile({
        children_under_5: true,
        children_5_14: true,
        adults_15_54: true,
        adults_55_74: false,
        seniors_75_plus: false,
        fragility: false,
        stairs_rugs: true
      });
    } else {
      setProfile({
        children_under_5: false,
        children_5_14: false,
        adults_15_54: true,
        adults_55_74: true,
        seniors_75_plus: false,
        fragility: false,
        stairs_rugs: false
      });
    }
  };

  const tailoredRecommendations = useMemo(() => {
    return PREVENTION_RECOMMENDATIONS.filter((rec) => {
      const matchesProfile =
        rec.targetGroups.includes('all') ||
        (profile.children_under_5 && rec.targetGroups.includes('children_under_5')) ||
        (profile.children_5_14 && rec.targetGroups.includes('children_5_14')) ||
        (profile.adults_55_74 && rec.targetGroups.includes('adults_55_74')) ||
        (profile.seniors_75_plus && rec.targetGroups.includes('seniors_75_plus')) ||
        (profile.fragility && rec.targetGroups.includes('fragility')) ||
        (profile.stairs_rugs && rec.targetGroups.includes('stairs_rugs'));

      if (!matchesProfile) return false;
      if (selectedCategory !== 'all' && rec.category !== selectedCategory) return false;
      if (selectedRoom !== 'all' && rec.room !== selectedRoom) return false;
      return true;
    });
  }, [profile, selectedCategory, selectedRoom]);

  const totalActionItems = useMemo(() => {
    return tailoredRecommendations.reduce((acc, rec) => acc + rec.actionSteps.length, 0);
  }, [tailoredRecommendations]);

  const completedCount = useMemo(() => {
    let count = 0;
    tailoredRecommendations.forEach((rec) => {
      rec.actionSteps.forEach((_, idx) => {
        if (completedSteps[`${rec.id}-${idx}`]) count++;
      });
    });
    return count;
  }, [tailoredRecommendations, completedSteps]);

  const toggleStepCompletion = (key: string) => {
    setCompletedSteps((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const riskAssessment = useMemo(() => {
    let admissionScore = 15;
    let disabilityScore = 12;
    const mechanisms: string[] = ['Objetos cortantes en cocina (Costa 2012)'];

    if (profile.children_under_5) {
      admissionScore += 20;
      mechanisms.unshift('Caídas de mobiliario, escaldaduras e intoxicaciones en <5 años (Sengoelge 2010)');
    }
    if (profile.children_5_14) {
      admissionScore += 10;
      mechanisms.push('Caídas y fracturas pediátricas (14.4%) en tramos sin supervisión (Rivas García 2018)');
    }
    if (profile.adults_55_74) {
      admissionScore += 25;
      disabilityScore += 35;
      mechanisms.push('Caídas al mismo nivel con inicio de curva de discapacidad (Guillén 2023)');
    }
    if (profile.seniors_75_plus) {
      admissionScore += 45;
      disabilityScore += 55;
      mechanisms.unshift('Caídas intradomiciliarias (56.2%) e intoxicaciones en ≥75 años (Alves 2025)');
    }
    if (profile.fragility) {
      admissionScore += 15;
      disabilityScore += 20;
    }

    return {
      admissionScore: Math.min(98, admissionScore),
      disabilityScore: Math.min(99, disabilityScore),
      primaryAlerts: mechanisms.slice(0, 2)
    };
  }, [profile]);

  const handleDownloadReport = () => {
    const lines: string[] = [
      'HÁBITAT ASISTENCIAL · ASSURECAREWARE — PROTOCOLO DE PREVENCIÓN DOMÉSTICA',
      '========================================================================',
      `Vulnerabilidad Estimada de Ingreso Hospitalario: ${riskAssessment.admissionScore}/100`,
      `Riesgo Estimado de Discapacidad de Larga Duración: ${riskAssessment.disabilityScore}/100`,
      `Progreso de Verificación en Casa: ${completedCount} de ${totalActionItems} medidas completadas`,
      '',
      'RIESGOS EPIDEMIOLÓGICOS PRIORITARIOS DETECTADOS:',
      ...riskAssessment.primaryAlerts.map((a) => `- ${a}`),
      '',
      'PLAN DE ACCIÓN PERSONALIZADO POR ESTANCIAS Y MECANISMOS:',
      '--------------------------------------------------------'
    ];

    tailoredRecommendations.forEach((rec, i) => {
      lines.push(`\n0${i + 1}. ${rec.title.toUpperCase()}`);
      lines.push(`   Categoría: ${rec.categoryLabel} | Estancia: ${rec.room} | Prioridad: ${rec.priority}`);
      lines.push(`   Respaldo científico: ${rec.citationLabel} — ${rec.scientificRationale}`);
      rec.actionSteps.forEach((step, idx) => {
        const mark = completedSteps[`${rec.id}-${idx}`] ? '[✓]' : '[ ]';
        lines.push(`   ${mark} ${step}`);
      });
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'protocolo-prevencion-assurecareware.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportGuidePdf = () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;
    let y = 22;

    // Top AssureCareWare Brand Bar
    doc.setFillColor(0, 136, 206);
    doc.rect(0, 0, pageWidth * 0.5, 3, 'F');
    doc.setFillColor(20, 168, 139);
    doc.rect(pageWidth * 0.5, 0, pageWidth * 0.3, 3, 'F');
    doc.setFillColor(126, 211, 33);
    doc.rect(pageWidth * 0.8, 0, pageWidth * 0.2, 3, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(10, 29, 55);
    doc.text('HÁBITAT ASISTENCIAL · AssureCareWare', margin, 13);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(
      `Guía Personalizada de Prevención · Ingreso: ${riskAssessment.admissionScore}/100 · Discapacidad: ${riskAssessment.disabilityScore}/100`,
      margin,
      18
    );

    doc.setDrawColor(226, 232, 240);
    doc.line(margin, 21, pageWidth - margin, 21);
    y = 28;

    tailoredRecommendations.forEach((rec, i) => {
      if (y + 30 > pageHeight - 18) {
        doc.addPage();
        y = 20;
      }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(0, 136, 206);
      doc.text(`0${i + 1}. ${rec.title} (${rec.room} · Prioridad ${rec.priority})`, margin, y);
      y += 5.5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);
      rec.actionSteps.forEach((step, idx) => {
        const mark = completedSteps[`${rec.id}-${idx}`] ? '[X]' : '[  ]';
        const stepLines = doc.splitTextToSize(`${mark} ${step}`, contentWidth - 4);
        if (y + stepLines.length * 4.2 > pageHeight - 18) {
          doc.addPage();
          y = 20;
        }
        doc.text(stepLines, margin + 2, y);
        y += stepLines.length * 4.2 + 1;
      });

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.8);
      doc.setTextColor(100, 116, 139);
      const ratLines = doc.splitTextToSize(
        `Evidencia (${rec.citationLabel}): ${rec.scientificRationale}`,
        contentWidth - 4
      );
      doc.text(ratLines, margin + 2, y);
      y += ratLines.length * 3.8 + 5;
    });

    doc.save('guia-prevencion-personalizada-assurecareware.pdf');
  };

  return (
    <section id="guia-prevencion" className="py-16 border-b border-slate-200">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-slate-500 mb-3">
            <span className="text-[#14A88B] font-semibold">03. Guía Personalizada y Plano de Auditoría</span>
            <span aria-hidden="true">·</span>
            <span>Protocolo Clínico-Doméstico</span>
            <span aria-hidden="true">·</span>
            <span>Basado en Demografía del Hogar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial text-[#0A1D37] tracking-tight" style={{ textWrap: 'balance' }}>
            Configurador de seguridad doméstica según los residentes de tu hogar
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 no-print">
          <button
            type="button"
            onClick={() => setCompletedSteps({})}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar</span>
          </button>
          <button
            type="button"
            onClick={handleDownloadReport}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#0A1D37] bg-white border border-slate-300 rounded-lg hover:border-[#0088CE] hover:text-[#0088CE] transition-colors whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar (.txt)</span>
          </button>
          <button
            type="button"
            onClick={handleExportGuidePdf}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0088CE] rounded-lg hover:bg-[#0A1D37] transition-colors whitespace-nowrap"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Exportar Guía PDF (jsPDF)</span>
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0A1D37] bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Household Configurator (4 cols) + Right Tailored Plan (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10">
        {/* Left Column: Demographic Questionnaire */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-semibold text-[#0A1D37]">
                1. Demografía del Hogar
              </h3>
              <span className="text-xs text-[#0088CE] font-medium">Selección múltiple</span>
            </div>

            {/* Quick Presets */}
            <div className="mt-4 pb-4 border-b border-slate-100">
              <span className="text-xs text-slate-500 block mb-2">
                Perfiles rápidos de hogar:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => applyArchetype('multigen')}
                  className="px-2.5 py-1.5 text-xs font-medium text-left bg-slate-100 hover:bg-[#0088CE] hover:text-white text-[#0A1D37] rounded transition-colors truncate"
                >
                  Multigeneracional
                </button>
                <button
                  type="button"
                  onClick={() => applyArchetype('seniors')}
                  className="px-2.5 py-1.5 text-xs font-medium text-left bg-slate-100 hover:bg-[#0088CE] hover:text-white text-[#0A1D37] rounded transition-colors truncate"
                >
                  Mayores (65+ / 75+)
                </button>
                <button
                  type="button"
                  onClick={() => applyArchetype('young_family')}
                  className="px-2.5 py-1.5 text-xs font-medium text-left bg-slate-100 hover:bg-[#0088CE] hover:text-white text-[#0A1D37] rounded transition-colors truncate"
                >
                  Hogar con niños
                </button>
                <button
                  type="button"
                  onClick={() => applyArchetype('adults_only')}
                  className="px-2.5 py-1.5 text-xs font-medium text-left bg-slate-100 hover:bg-[#0088CE] hover:text-white text-[#0A1D37] rounded transition-colors truncate"
                >
                  Solo adultos (15–74)
                </button>
              </div>
            </div>

            {/* Resident Age Checkboxes */}
            <div className="space-y-2.5 mt-4">
              <label className="flex items-start gap-3 p-2.5 rounded border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={profile.children_under_5}
                  onChange={() => toggleProfileField('children_under_5')}
                  className="mt-0.5 h-4 w-4 accent-[#0088CE] rounded"
                />
                <div className="text-xs">
                  <span className="font-semibold text-[#0A1D37] block">
                    Bebés y niños pequeños (&lt; 5 años)
                  </span>
                  <span className="text-slate-500">
                    Alto riesgo en baño, cocina, escaldaduras e ingesta accidental (Sengoelge 2010)
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-2.5 rounded border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={profile.children_5_14}
                  onChange={() => toggleProfileField('children_5_14')}
                  className="mt-0.5 h-4 w-4 accent-[#0088CE] rounded"
                />
                <div className="text-xs">
                  <span className="font-semibold text-[#0A1D37] block">
                    Niños y adolescentes (5 a 14 años)
                  </span>
                  <span className="text-slate-500">
                    Alta frecuencia de caídas, cortes y fracturas (14.4%) sin supervisión (Alves 2024)
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-2.5 rounded border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={profile.adults_55_74}
                  onChange={() => toggleProfileField('adults_55_74')}
                  className="mt-0.5 h-4 w-4 accent-[#0088CE] rounded"
                />
                <div className="text-xs">
                  <span className="font-semibold text-[#0A1D37] block">
                    Adultos de 55 a 74 años
                  </span>
                  <span className="text-slate-500">
                    Inicio del aumento marcado en secuelas de discapacidad tras caídas (Guillén 2023)
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-2.5 rounded border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={profile.seniors_75_plus}
                  onChange={() => toggleProfileField('seniors_75_plus')}
                  className="mt-0.5 h-4 w-4 accent-[#0088CE] rounded"
                />
                <div className="text-xs">
                  <span className="font-semibold text-[#0A1D37] block">
                    Personas mayores (75–84 y 85+ años)
                  </span>
                  <span className="text-slate-500">
                    Máxima probabilidad de ingreso hospitalario y discapacidad severa (Alves 2025)
                  </span>
                </div>
              </label>
            </div>

            {/* Specific Modifiers */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#14A88B] block">
                2. Factores Clínicos y del Entorno
              </span>

              <label className="flex items-start gap-3 p-2.5 rounded border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={profile.fragility}
                  onChange={() => toggleProfileField('fragility')}
                  className="mt-0.5 h-4 w-4 accent-[#14A88B] rounded"
                />
                <div className="text-xs">
                  <span className="font-semibold text-[#0A1D37] block">
                    Limitación funcional, polifarmacia o ánimo depresivo
                  </span>
                  <span className="text-slate-500">
                    Factor clave en mayores españolas (López-Soto 2019)
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-2.5 rounded border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={profile.stairs_rugs}
                  onChange={() => toggleProfileField('stairs_rugs')}
                  className="mt-0.5 h-4 w-4 accent-[#14A88B] rounded"
                />
                <div className="text-xs">
                  <span className="font-semibold text-[#0A1D37] block">
                    Presencia de escaleras, alfombras o bañera
                  </span>
                  <span className="text-slate-500">
                    Potencia el 56.2% de mecanismos por caída (Alves 2025, Costa 2012)
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Calculated Epidemiological Risk Summary Box */}
          <div className="bg-[#0A1D37] text-slate-100 p-6 border-t-4 border-t-[#0088CE]">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
              <span className="uppercase tracking-wider font-semibold text-[#7ED321]">
                Diagnóstico Epidemiológico del Hogar
              </span>
              <span className="font-mono-tabular">Perfil Activo</span>
            </div>

            <div className="grid grid-cols-2 gap-4 my-4">
              <div>
                <span className="text-xs text-slate-400 block">Vulnerabilidad Ingreso</span>
                <span className="text-2xl font-mono-tabular font-semibold text-white">
                  {riskAssessment.admissionScore}
                  <span className="text-xs text-slate-400 font-normal">/100</span>
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Riesgo Discapacidad</span>
                <span className="text-2xl font-mono-tabular font-semibold text-[#7ED321]">
                  {riskAssessment.disabilityScore}
                  <span className="text-xs text-slate-400 font-normal">/100</span>
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-800 text-xs text-slate-300">
              <span className="text-slate-400 block uppercase tracking-wider text-[11px]">
                Riesgos prioritarios detectados:
              </span>
              {riskAssessment.primaryAlerts.map((alert, i) => (
                <p key={i} className="leading-relaxed">
                  • {alert}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Tailored Actionable Recommendations */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div>
            {/* Filter Controls Bar */}
            <div className="bg-white border border-slate-200 p-4 sm:p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: 'Todas las áreas' },
                  { id: 'caidas-mayores', label: 'Caídas en Mayores' },
                  { id: 'cocina-bano-ninos', label: 'Cocina y Baño Infantil' },
                  { id: 'objetos-cortantes', label: 'Objetos Cortantes' },
                  { id: 'intoxicaciones', label: 'Tóxicos y Fármacos' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                      selectedCategory === cat.id
                        ? 'bg-[#0088CE] text-white'
                        : 'bg-slate-100 text-slate-600 hover:text-[#0A1D37]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Audit Completion Counter */}
              <div className="flex items-center gap-3 text-xs font-mono-tabular text-slate-600 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                <span>
                  Verificación: <strong className="text-[#14A88B]">{completedCount}</strong> / {totalActionItems} medidas
                </span>
              </div>
            </div>

            {/* Recommendations List */}
            {tailoredRecommendations.length === 0 ? (
              <div className="bg-white border border-slate-200 p-12 text-center">
                <p className="text-base font-medium text-[#0A1D37]">
                  No hay recomendaciones específicas para el filtro seleccionado.
                </p>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Prueba a mostrar todas las categorías o activar más grupos de edad en el configurador.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedRoom('all');
                  }}
                  className="px-4 py-2 text-xs font-medium text-white bg-[#0088CE] rounded-lg hover:bg-[#0A1D37] transition-colors"
                >
                  Mostrar todas las recomendaciones del hogar
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {tailoredRecommendations.map((rec, index) => (
                  <article
                    key={rec.id}
                    className="bg-white border border-slate-200 p-6 sm:p-8 transition-colors"
                  >
                    {/* Top Metadata Line (Zero-Pill Discipline) */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pb-3 border-b border-slate-100">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono-tabular font-semibold text-[#0A1D37]">
                          0{index + 1}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-[#0088CE]">{rec.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>Estancia: {rec.room}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>
                          Prioridad: <strong className="text-[#14A88B]">{rec.priority}</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <button
                          type="button"
                          onClick={() => onSelectCitation(rec.citationId)}
                          className="font-mono-tabular underline hover:text-[#0088CE]"
                        >
                          {rec.citationLabel}
                        </button>
                      </div>
                    </div>

                    <h3 className="text-xl font-editorial text-[#0A1D37] mt-4">
                      {rec.title}
                    </h3>

                    {/* Actionable Steps with Interactive Checkboxes */}
                    <div className="mt-4 space-y-2.5">
                      {rec.actionSteps.map((step, stepIdx) => {
                        const stepKey = `${rec.id}-${stepIdx}`;
                        const isDone = !!completedSteps[stepKey];
                        return (
                          <label
                            key={stepKey}
                            className={`flex items-start gap-3 p-3 rounded border cursor-pointer transition-colors ${
                              isDone
                                ? 'bg-slate-50 border-slate-200 text-slate-400 line-through'
                                : 'bg-[#F8FAFC] border-slate-200/80 hover:border-[#0088CE]/50 text-[#0A1D37]'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isDone}
                              onChange={() => toggleStepCompletion(stepKey)}
                              className="mt-0.5 h-4 w-4 accent-[#14A88B] rounded shrink-0"
                            />
                            <span className="text-sm leading-relaxed">{step}</span>
                          </label>
                        );
                      })}
                    </div>

                    {/* Scientific Justification Footer */}
                    <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
                      <p className="italic">
                        <strong className="not-italic font-semibold text-[#0A1D37]">
                          Evidencia clínica:{' '}
                        </strong>
                        {rec.scientificRationale}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* INTERACTIVE ARCHITECTURAL FLOORPLAN AUDIT */}
      <InteractiveFloorplan onSelectCitation={onSelectCitation} />

      {/* CLINICAL FRAGILITY & POLYPHARMACY EVALUATOR (LÓPEZ-SOTO 2019 & ALVES 2025) */}
      <ClinicalFragilityAndMeds onSelectCitation={onSelectCitation} />
    </section>
  );
};
