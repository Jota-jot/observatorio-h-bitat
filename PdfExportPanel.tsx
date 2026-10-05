import React, { useState, useMemo, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import {
  AGE_GROUP_STATS,
  MECHANISM_STATS,
  EU_COUNTRY_COMPARISONS,
  KEY_FIGURES_TABLE,
  PREVENTION_RECOMMENDATIONS,
  CITATIONS,
  AgeGroupStat,
  MechanismStat,
  EUCountryStat
} from '../data/epidemiologyData';
import { FileDown, CheckSquare, Sliders, FileCheck2 } from 'lucide-react';

export interface PdfExportPanelProps {
  selectedAgeGroup?: AgeGroupStat;
  selectedMechanism?: MechanismStat;
  selectedCountry?: EUCountryStat;
  benchmarkCountry?: EUCountryStat;
  externalPresetGroup?: string | null;
  onSelectCitation?: (citationId: string) => void;
}

export const PdfExportPanel: React.FC<PdfExportPanelProps> = ({
  selectedAgeGroup = AGE_GROUP_STATS[5],
  selectedMechanism = MECHANISM_STATS[0],
  selectedCountry = EU_COUNTRY_COMPARISONS[1],
  benchmarkCountry = EU_COUNTRY_COMPARISONS[0],
  externalPresetGroup = null
}) => {
  // Sections to include in the generated PDF
  const [includeSelectedEpidemiology, setIncludeSelectedEpidemiology] = useState<boolean>(true);
  const [includeCountryComparison, setIncludeCountryComparison] = useState<boolean>(true);
  const [includeKeyFiguresTable, setIncludeKeyFiguresTable] = useState<boolean>(true);
  const [includePreventionGuide, setIncludePreventionGuide] = useState<boolean>(true);
  const [includeCitationsAnnex, setIncludeCitationsAnnex] = useState<boolean>(true);

  // Demographic filters for the personalized prevention guide in the PDF
  const [pdfDemographics, setPdfDemographics] = useState({
    children_under_5: true,
    children_5_14: false,
    adults_55_74: true,
    seniors_75_plus: true,
    fragility: true,
    stairs_rugs: true
  });

  const [reportTitle, setReportTitle] = useState<string>(
    'Informe Epidemiológico y Guía de Prevención en el Hogar'
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [lastGeneratedTimestamp, setLastGeneratedTimestamp] = useState<string | null>(null);

  useEffect(() => {
    if (!externalPresetGroup) return;
    if (externalPresetGroup === 'children_under_5') {
      setPdfDemographics({
        children_under_5: true,
        children_5_14: false,
        adults_55_74: false,
        seniors_75_plus: false,
        fragility: false,
        stairs_rugs: true
      });
    } else if (externalPresetGroup === 'children_5_14') {
      setPdfDemographics({
        children_under_5: false,
        children_5_14: true,
        adults_55_74: false,
        seniors_75_plus: false,
        fragility: false,
        stairs_rugs: true
      });
    } else if (externalPresetGroup === 'adults_55_74') {
      setPdfDemographics({
        children_under_5: false,
        children_5_14: false,
        adults_55_74: true,
        seniors_75_plus: false,
        fragility: false,
        stairs_rugs: true
      });
    } else if (externalPresetGroup === 'seniors_75_plus') {
      setPdfDemographics({
        children_under_5: false,
        children_5_14: false,
        adults_55_74: false,
        seniors_75_plus: true,
        fragility: true,
        stairs_rugs: true
      });
    }
  }, [externalPresetGroup]);

  const toggleDemo = (key: keyof typeof pdfDemographics) => {
    setPdfDemographics((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredPreventionForPdf = useMemo(() => {
    return PREVENTION_RECOMMENDATIONS.filter((rec) => {
      return (
        rec.targetGroups.includes('all') ||
        (pdfDemographics.children_under_5 && rec.targetGroups.includes('children_under_5')) ||
        (pdfDemographics.children_5_14 && rec.targetGroups.includes('children_5_14')) ||
        (pdfDemographics.adults_55_74 && rec.targetGroups.includes('adults_55_74')) ||
        (pdfDemographics.seniors_75_plus && rec.targetGroups.includes('seniors_75_plus')) ||
        (pdfDemographics.fragility && rec.targetGroups.includes('fragility')) ||
        (pdfDemographics.stairs_rugs && rec.targetGroups.includes('stairs_rugs'))
      );
    });
  }, [pdfDemographics]);

  const generatePrintOptimizedPdf = () => {
    setIsGenerating(true);

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
      const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
      const margin = 15;
      const contentWidth = pageWidth - margin * 2;
      let y = 18;

      const drawBrandHeader = (isFirstPage: boolean) => {
        // Top Brand Accent Bars (AssureCareWare palette: #0088CE, #14A88B, #7ED321)
        doc.setFillColor(0, 136, 206);
        doc.rect(0, 0, pageWidth * 0.45, 3, 'F');
        doc.setFillColor(20, 168, 139);
        doc.rect(pageWidth * 0.45, 0, pageWidth * 0.35, 3, 'F');
        doc.setFillColor(126, 211, 33);
        doc.rect(pageWidth * 0.8, 0, pageWidth * 0.2, 3, 'F');

        if (isFirstPage) {
          // Vector 'A' Emblem approximation for PDF Header
          doc.setDrawColor(0, 136, 206);
          doc.setLineWidth(1.4);
          doc.line(margin, 17, margin + 4.5, 8);
          doc.line(margin + 4.5, 8, margin + 9, 17);
          doc.setDrawColor(20, 168, 139);
          doc.line(margin + 2, 15.5, margin + 10.5, 11.5);

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(7.5);
          doc.setTextColor(10, 29, 55);
          doc.text('HÁBITAT ASISTENCIAL', margin + 13, 10.5);

          doc.setFontSize(14);
          doc.setTextColor(10, 29, 55);
          doc.text('AssureCareWare', margin + 13, 16.2);

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(100, 116, 139);
          const dateStr = new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          doc.text(`Documento clínico-preventivo · ${dateStr}`, pageWidth - margin, 12, {
            align: 'right'
          });
          doc.text('habitatasistencial.es · Europa y España', pageWidth - margin, 16.2, {
            align: 'right'
          });

          doc.setDrawColor(226, 232, 240);
          doc.setLineWidth(0.3);
          doc.line(margin, 20, pageWidth - margin, 20);
          y = 27;
        } else {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8);
          doc.setTextColor(10, 29, 55);
          doc.text('HÁBITAT ASISTENCIAL · AssureCareWare', margin, 10);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(100, 116, 139);
          doc.text(reportTitle, pageWidth - margin, 10, { align: 'right' });
          doc.setDrawColor(226, 232, 240);
          doc.setLineWidth(0.2);
          doc.line(margin, 13, pageWidth - margin, 13);
          y = 19;
        }
      };

      const checkPageBreak = (neededHeight: number) => {
        if (y + neededHeight > pageHeight - 18) {
          doc.addPage();
          drawBrandHeader(false);
        }
      };

      const drawSectionHeading = (indexNum: string, title: string, subtitle?: string) => {
        checkPageBreak(18);
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(0, 136, 206);
        doc.setLineWidth(0.8);
        doc.rect(margin, y, contentWidth, subtitle ? 12 : 9, 'F');
        doc.line(margin, y, margin, y + (subtitle ? 12 : 9));

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10.5);
        doc.setTextColor(10, 29, 55);
        doc.text(`${indexNum}. ${title.toUpperCase()}`, margin + 3.5, y + 5.8);

        if (subtitle) {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(71, 85, 105);
          doc.text(subtitle, margin + 3.5, y + 10.2);
          y += 16;
        } else {
          y += 13;
        }
      };

      // Initialize First Page
      drawBrandHeader(true);

      // Document Main Title Block
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(10, 29, 55);
      const titleLines = doc.splitTextToSize(reportTitle, contentWidth);
      doc.text(titleLines, margin, y);
      y += titleLines.length * 6.5 + 2;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      const introText =
        'Síntesis ejecutiva basada en evidencia epidemiológica europea y española (Alves 2025, Alves 2024, Costa 2012, Keall 2011, Sengoelge 2010, Rivas García 2018, López-Soto 2019, Guillén 2023): el 56.2% de las lesiones domésticas en Europa son caídas, la incidencia en España alcanza 2,651 casos/100,000 hab. (57.1% en el hogar) y la gravedad de ingreso y discapacidad se dispara a partir de los 75 años.';
      const introLines = doc.splitTextToSize(introText, contentWidth);
      doc.text(introLines, margin, y);
      y += introLines.length * 4.5 + 5;

      // 1. SELECTED EPIDEMIOLOGICAL DATA FROM DASHBOARD
      if (includeSelectedEpidemiology) {
        drawSectionHeading(
          '01',
          'Datos Epidemiológicos Seleccionados en el Dashboard',
          `Foco activo: ${selectedAgeGroup.label} · Mecanismo: ${selectedMechanism.name}`
        );

        // Age Group Box
        checkPageBreak(36);
        doc.setDrawColor(203, 213, 225);
        doc.setLineWidth(0.25);
        doc.rect(margin, y, contentWidth, 33);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(0, 136, 206);
        doc.text(`Tramo Etario Analizado: ${selectedAgeGroup.label}`, margin + 3, y + 5.5);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(10, 29, 55);
        doc.text(
          `Índice Frecuencia Urgencias: ${selectedAgeGroup.incidenceIndex}/100   |   Riesgo Ingreso: ${selectedAgeGroup.admissionRisk}/100   |   Impacto Discapacidad: ${selectedAgeGroup.disabilityBurden}/100`,
          margin + 3,
          y + 11
        );

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(51, 65, 85);
        doc.text(
          `• Mecanismo dominante: ${selectedAgeGroup.dominantMechanism} (${selectedAgeGroup.secondaryMechanism})`,
          margin + 3,
          y + 16
        );

        const euAgeLines = doc.splitTextToSize(
          `• Europa: ${selectedAgeGroup.europeNote}`,
          contentWidth - 6
        );
        doc.text(euAgeLines, margin + 3, y + 20.5);

        const esAgeLines = doc.splitTextToSize(
          `• España: ${selectedAgeGroup.spainNote}`,
          contentWidth - 6
        );
        doc.text(esAgeLines, margin + 3, y + 20.5 + euAgeLines.length * 3.8);

        y += 37;

        // Mechanism Box
        checkPageBreak(26);
        doc.setDrawColor(203, 213, 225);
        doc.rect(margin, y, contentWidth, 23);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(20, 168, 139);
        doc.text(
          `Mecanismo Seleccionado: ${selectedMechanism.name} — ${selectedMechanism.europeShare.toFixed(1)}% en UE (Severidad ingreso: ${selectedMechanism.admissionSeverity})`,
          margin + 3,
          y + 5.5
        );

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(51, 65, 85);
        const mechLines = doc.splitTextToSize(
          `${selectedMechanism.description} ${selectedMechanism.spainContext}`,
          contentWidth - 6
        );
        doc.text(mechLines, margin + 3, y + 10.5);
        y += 27;
      }

      // 2. REGIONAL EU COUNTRY COMPARISON
      if (includeCountryComparison) {
        drawSectionHeading(
          '02',
          `Comparativa Regional UE: ${selectedCountry.name} vs. ${benchmarkCountry.name}`,
          `Red de vigilancia: ${selectedCountry.surveillanceNetwork}`
        );

        checkPageBreak(34);
        doc.setDrawColor(203, 213, 225);
        doc.rect(margin, y, contentWidth, 30);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(10, 29, 55);
        doc.text(
          `Indicadores Comparados (${selectedCountry.isoCode} frente a ${benchmarkCountry.isoCode}):`,
          margin + 3,
          y + 5.5
        );

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.text(
          `• Proporción por Caídas: ${selectedCountry.fallsSharePct.toFixed(1)}% (${selectedCountry.isoCode}) vs ${benchmarkCountry.fallsSharePct.toFixed(1)}% (${benchmarkCountry.isoCode})   |   Incidencia Anual: ${selectedCountry.incidencePer100k}/100k vs ${benchmarkCountry.incidencePer100k}/100k`,
          margin + 3,
          y + 10.5
        );
        doc.text(
          `• Alta Pediátrica sin Ingreso (0–19a): ${selectedCountry.pediatricNonAdmissionPct.toFixed(1)}% vs ${benchmarkCountry.pediatricNonAdmissionPct.toFixed(1)}%   |   Ocurren en el Hogar: ${selectedCountry.homeLocationSharePct.toFixed(1)}%`,
          margin + 3,
          y + 15
        );

        const countryNotes = doc.splitTextToSize(
          `• Hallazgo nacional: ${selectedCountry.countrySpecificFinding}`,
          contentWidth - 6
        );
        doc.text(countryNotes, margin + 3, y + 19.8);
        y += 35;
      }

      // 3. PERSONALIZED PREVENTION PROTOCOL (PRINTABLE CHECKLIST)
      if (includePreventionGuide) {
        drawSectionHeading(
          '03',
          'Guía de Prevención Personalizada y Lista de Verificación para el Hogar',
          `${filteredPreventionForPdf.length} protocolos seleccionados según la demografía del hogar (Casillas [ ] para auditoría impresa)`
        );

        filteredPreventionForPdf.forEach((rec, idx) => {
          const estimatedBlockHeight = 18 + rec.actionSteps.length * 7;
          checkPageBreak(estimatedBlockHeight);

          doc.setDrawColor(203, 213, 225);
          doc.setLineWidth(0.25);

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9.5);
          doc.setTextColor(10, 29, 55);
          doc.text(
            `0${idx + 1}. ${rec.title} [${rec.room} · Prioridad ${rec.priority}]`,
            margin,
            y + 4
          );
          y += 8;

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8.2);
          doc.setTextColor(30, 41, 59);

          rec.actionSteps.forEach((step) => {
            const stepLines = doc.splitTextToSize(`[  ]  ${step}`, contentWidth - 4);
            checkPageBreak(stepLines.length * 4 + 2);
            doc.text(stepLines, margin + 2, y);
            y += stepLines.length * 4 + 1.2;
          });

          doc.setFont('helvetica', 'italic');
          doc.setFontSize(7.5);
          doc.setTextColor(100, 116, 139);
          const ratLines = doc.splitTextToSize(
            `Evidencia (${rec.citationLabel}): ${rec.scientificRationale}`,
            contentWidth - 4
          );
          checkPageBreak(ratLines.length * 3.6 + 4);
          doc.text(ratLines, margin + 2, y + 1);
          y += ratLines.length * 3.6 + 5;
        });
      }

      // 4. KEY FIGURES TABLE (FIGURE 1)
      if (includeKeyFiguresTable) {
        drawSectionHeading(
          '04',
          'Tabla Consolidada de Cifras Clave (Figura 1 — Europa y España)',
          'Resumen cuantitativo de las fuentes científicas primarias'
        );

        KEY_FIGURES_TABLE.forEach((row) => {
          checkPageBreak(10);
          doc.setDrawColor(226, 232, 240);
          doc.line(margin, y, pageWidth - margin, y);

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8);
          doc.setTextColor(row.scope === 'Europa' ? 0 : 20, row.scope === 'Europa' ? 136 : 168, row.scope === 'Europa' ? 206 : 139);
          doc.text(row.scope.toUpperCase(), margin, y + 4.5);

          doc.setTextColor(10, 29, 55);
          doc.text(row.finding, margin + 22, y + 4.5);

          doc.setFont('helvetica', 'normal');
          doc.setTextColor(71, 85, 105);
          doc.text(`${row.metricValue} (${row.citationLabel})`, pageWidth - margin, y + 4.5, {
            align: 'right'
          });
          y += 7;
        });
        y += 4;
      }

      // 5. SCIENTIFIC CITATIONS ANNEX
      if (includeCitationsAnnex) {
        drawSectionHeading(
          '05',
          'Anexo Bibliográfico de Evidencia Científica',
          'Referencias metodológicas utilizadas en la evaluación'
        );

        Object.values(CITATIONS).forEach((cit) => {
          checkPageBreak(13);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8);
          doc.setTextColor(10, 29, 55);
          doc.text(
            `• ${cit.author} (${cit.year}) [${cit.scope}] — ${cit.headlineMetric}`,
            margin,
            y + 3.5
          );
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7.5);
          doc.setTextColor(71, 85, 105);
          const citLines = doc.splitTextToSize(cit.summary, contentWidth - 4);
          doc.text(citLines, margin + 3, y + 7.5);
          y += 7.5 + citLines.length * 3.4 + 2;
        });
      }

      // Add Page Numbers to All Pages
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.2);
        doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(100, 116, 139);
        doc.text(
          'Aviso: Los índices 0–100 y los valores por país son estimaciones ilustrativas basadas en las fuentes citadas, no datos oficiales.',
          margin,
          pageHeight - 9.2
        );
        doc.text(
          'Hábitat Asistencial · AssureCareWare (habitatasistencial.es) — Informe Epidemiológico y Preventivo',
          margin,
          pageHeight - 5.5
        );
        doc.text(`Página ${i} de ${totalPages}`, pageWidth - margin, pageHeight - 5.5, {
          align: 'right'
        });
      }

      doc.save('informe-epidemiologico-prevencion-assurecareware.pdf');
      setLastGeneratedTimestamp(new Date().toLocaleTimeString('es-ES'));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mt-8 bg-white border border-slate-200 border-t-4 border-t-[#0088CE] p-6 sm:p-8 no-print">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#0088CE] font-semibold">
            <FileDown className="w-4 h-4" />
            <span>Generador de Informe PDF Optimizado para Impresión (jsPDF)</span>
            <span aria-hidden="true">·</span>
            <span>Formato Clínico A4</span>
          </div>
          <h3 className="text-2xl font-editorial text-[#0A1D37] mt-1">
            Exportar Datos Epidemiológicos Seleccionados y Guía Personalizada en PDF
          </h3>
        </div>

        <button
          type="button"
          onClick={generatePrintOptimizedPdf}
          disabled={isGenerating}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#0088CE] rounded-lg hover:bg-[#0A1D37] transition-colors whitespace-nowrap disabled:opacity-50"
        >
          <FileDown className="w-4 h-4" />
          <span>
            {isGenerating
              ? 'Generando PDF A4...'
              : 'Descargar Informe PDF para Impresión (.pdf)'}
          </span>
        </button>
      </div>

      {/* Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Left 4 Cols: Report Title & Sections to Include */}
        <div className="lg:col-span-4 space-y-4">
          <div>
            <label
              htmlFor="pdf-report-title"
              className="text-xs font-semibold uppercase tracking-wider text-[#0A1D37] block mb-1.5"
            >
              1. Título del Documento PDF
            </label>
            <input
              id="pdf-report-title"
              type="text"
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-slate-300 rounded-lg text-[#0A1D37] focus:outline-none focus:border-[#0088CE]"
            />
          </div>

          <div className="pt-2 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0088CE] block">
              2. Módulos del Dashboard a Incluir
            </span>

            <label className="flex items-center gap-2.5 p-2.5 rounded border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={includeSelectedEpidemiology}
                onChange={() => setIncludeSelectedEpidemiology(!includeSelectedEpidemiology)}
                className="h-4 w-4 accent-[#0088CE] rounded"
              />
              <span className="text-[#0A1D37] font-medium">
                Tramo etario ({selectedAgeGroup.shortLabel}) y mecanismo ({selectedMechanism.name})
              </span>
            </label>

            <label className="flex items-center gap-2.5 p-2.5 rounded border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={includeCountryComparison}
                onChange={() => setIncludeCountryComparison(!includeCountryComparison)}
                className="h-4 w-4 accent-[#0088CE] rounded"
              />
              <span className="text-[#0A1D37] font-medium">
                Comparativa UE: {selectedCountry.isoCode} vs. {benchmarkCountry.isoCode}
              </span>
            </label>

            <label className="flex items-center gap-2.5 p-2.5 rounded border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={includePreventionGuide}
                onChange={() => setIncludePreventionGuide(!includePreventionGuide)}
                className="h-4 w-4 accent-[#0088CE] rounded"
              />
              <span className="text-[#0A1D37] font-medium">
                Guía de Prevención Personalizada ({filteredPreventionForPdf.length} protocolos)
              </span>
            </label>

            <label className="flex items-center gap-2.5 p-2.5 rounded border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={includeKeyFiguresTable}
                onChange={() => setIncludeKeyFiguresTable(!includeKeyFiguresTable)}
                className="h-4 w-4 accent-[#0088CE] rounded"
              />
              <span className="text-[#0A1D37] font-medium">
                Tabla Figura 1 (9 Cifras Clave Europa y España)
              </span>
            </label>

            <label className="flex items-center gap-2.5 p-2.5 rounded border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={includeCitationsAnnex}
                onChange={() => setIncludeCitationsAnnex(!includeCitationsAnnex)}
                className="h-4 w-4 accent-[#0088CE] rounded"
              />
              <span className="text-[#0A1D37] font-medium">
                Anexo Bibliográfico (10 referencias científicas)
              </span>
            </label>
          </div>
        </div>

        {/* Center 4 Cols: Household Profile for Prevention Checklist in PDF */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#14A88B] block">
            3. Perfil del Hogar para la Guía en el PDF
          </span>
          <p className="text-xs text-slate-500">
            Ajusta los perfiles residentes para filtrar automáticamente las listas de verificación impresas:
          </p>

          {[
            {
              key: 'children_under_5' as const,
              label: 'Menores de 5 años (Cocina, baño y tóxicos — Sengoelge 2010)'
            },
            {
              key: 'children_5_14' as const,
              label: 'Escolares 5 a 14 años (Caídas y fracturas 14.4% — Rivas García 2018)'
            },
            {
              key: 'adults_55_74' as const,
              label: 'Adultos 55 a 74 años (Inflexión discapacidad — Guillén 2023)'
            },
            {
              key: 'seniors_75_plus' as const,
              label: 'Mayores 75+ años (Pico ingreso y caídas 56.2% — Alves 2025)'
            },
            {
              key: 'fragility' as const,
              label: 'Fragilidad funcional, polifarmacia o depresión (López-Soto 2019)'
            },
            {
              key: 'stairs_rugs' as const,
              label: 'Vivienda con escaleras, alfombras o bañera (Costa 2012)'
            }
          ].map((item) => (
            <label
              key={item.key}
              className="flex items-center gap-2.5 p-2.5 rounded border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs"
            >
              <input
                type="checkbox"
                checked={pdfDemographics[item.key]}
                onChange={() => toggleDemo(item.key)}
                className="h-4 w-4 accent-[#14A88B] rounded shrink-0"
              />
              <span className="text-slate-700">{item.label}</span>
            </label>
          ))}
        </div>

        {/* Right 4 Cols: Live Print-Optimized A4 Sheet Preview */}
        <div className="lg:col-span-4 bg-[#F8FAFC] border border-slate-200 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-200">
              <span className="uppercase tracking-wider font-semibold text-[#0A1D37]">
                Previsualización de Maquetación A4
              </span>
              <span className="font-mono-tabular text-[#14A88B] font-semibold">
                Vectorial · 300 DPI
              </span>
            </div>

            {/* Mini A4 Page Mockup */}
            <div className="mt-4 bg-white border border-slate-300 p-4 shadow-xs space-y-2.5 text-[11px]">
              <div className="h-1 w-full bg-acw-gradient" />
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-[#0A1D37]">
                  HÁBITAT ASISTENCIAL · AssureCareWare
                </span>
                <span className="font-mono-tabular text-slate-400">A4 PDF</span>
              </div>

              <div className="font-semibold text-[#0A1D37] truncate">
                {reportTitle}
              </div>

              {includeSelectedEpidemiology && (
                <div className="p-2 bg-slate-50 border-l-2 border-[#0088CE] text-slate-600">
                  <strong>01. Dashboard:</strong> {selectedAgeGroup.shortLabel} (Ingreso:{' '}
                  {selectedAgeGroup.admissionRisk}/100) · {selectedMechanism.name} (
                  {selectedMechanism.europeShare}%)
                </div>
              )}

              {includeCountryComparison && (
                <div className="p-2 bg-slate-50 border-l-2 border-[#14A88B] text-slate-600">
                  <strong>02. Comparativa UE:</strong> {selectedCountry.name} (
                  {selectedCountry.fallsSharePct}% caídas) vs {benchmarkCountry.isoCode}
                </div>
              )}

              {includePreventionGuide && (
                <div className="p-2 bg-slate-50 border-l-2 border-[#7ED321] text-slate-600">
                  <strong>03. Protocolo Imprimible:</strong> {filteredPreventionForPdf.length}{' '}
                  bloques con casillas <code className="font-mono-tabular">[ ]</code> por estancia
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>
              {lastGeneratedTimestamp
                ? `Última exportación: ${lastGeneratedTimestamp}`
                : 'Listo para exportar con jsPDF'}
            </span>
            <span className="font-mono-tabular text-[#0088CE] font-semibold">
              Multi-página
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
