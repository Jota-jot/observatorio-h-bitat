# Observatorio Domus — Hábitat Asistencial · AssureCareWare

Plataforma interactiva de inteligencia epidemiológica sobre accidentes domésticos en **Europa y España** (2006–2025), configurador personalizado de protocolos de prevención en el hogar, exportador de informes clínicos en **PDF A4 (`jsPDF`)**, calculadora de retorno de inversión (**ROI**) para municipios y glosario interactivo para usuarios no especializados.

---

## 1. Cómo ejecutar el proyecto en local

### Requisitos previos
- **Node.js** `>= 18.x` (recomendado `20.x` o superior)
- **npm** (incluido con Node.js)

### Pasos de instalación y arranque

```bash
# 1. Instalar todas las dependencias del proyecto
npm install

# 2. Iniciar el servidor de desarrollo en http://localhost:3000
npm run dev
```

### Otros comandos disponibles

```bash
# Verificar tipos de TypeScript sin emitir archivos
npm run lint

# Generar la versión optimizada de producción en la carpeta dist/
npm run build

# Previsualizar en local la versión compilada de producción
npm run preview
```

---

## 2. Arquitectura y Lista de Componentes

| Componente / Archivo | Ruta | Qué hace |
| :--- | :--- | :--- |
| **`App.tsx`** | `/src/App.tsx` | Contenedor principal de la aplicación. Gestiona la barra de navegación superior con el interruptor de **Modo Alta Visibilidad (`A+`)**, la portada editorial con los 4 indicadores macro de Europa y España, la lectura comparada con enlaces directos al glosario y a las citas científicas, la coordinación de estado entre componentes y el pie de página con aviso metodológico. |
| **`BrandLogo.tsx`** | `/src/components/BrandLogo.tsx` | Logotipo vectorial SVG nativo de **HÁBITAT ASISTENCIAL · AssureCareWare** con degradado corporativo (`#0088CE` → `#14A88B` → `#7ED321`) sobre azul marino (`#0A1D37`), sin dependencia de imágenes externas. |
| **`QuickRiskTriage.tsx`** | `/src/components/QuickRiskTriage.tsx` | **Triaje Clínico Rápido (30 segundos)**: evalúa 4 disparadores epidemiológicos del hogar (edad extrema, historial de caídas, polifarmacia/fragilidad y barreras arquitectónicas) y compara el riesgo entre una vivienda estándar y un *Hábitat Asistencial Adaptado*. |
| **`EpidemiologyDashboard.tsx`** | `/src/components/EpidemiologyDashboard.tsx` | **Infografía y Dashboard Epidemiológico Interactivo**: visualiza la curva bimodal por grupos de edad (`0–4` a `85+`), la matriz de mecanismos de lesión (caídas `56.2%`, cortes, quemaduras, intoxicaciones, asfixia) y la **Comparativa Regional Interactiva por País de la UE** (`UE-27`, `España`, `Portugal`, `Italia`, `Francia`, `Alemania`, `Países Bajos`, `Suecia`). |
| **`PopulationSimulator.tsx`** | `/src/components/PopulationSimulator.tsx` | **Simulador Epidemiológico Poblacional**: proyecta dinámicamente el volumen anual de accidentes domésticos, urgencias pediátricas sin ingreso, fracturas infantiles no presenciadas y hospitalizaciones en mayores de 75 años para cualquier tamaño de población (`1,000` a `1,000,000` hab.). |
| **`PdfExportPanel.tsx`** | `/src/components/PdfExportPanel.tsx` | **Generador de Informe PDF Optimizado para Impresión (`jsPDF`)**: permite seleccionar qué módulos del Dashboard, comparativa europea y protocolos preventivos exportar en un documento PDF multipágina en formato **A4 vertical** con cabecera corporativa vectorial, tablas y casillas de verificación (`[ ]`). |
| **`PreventionGuide.tsx`** | `/src/components/PreventionGuide.tsx` | **Guía Personalizada de Prevención en el Hogar**: configura la demografía del domicilio, calcula el índice de vulnerabilidad familiar, filtra protocolos preventivos por estancia y categoría, permite marcar tareas completadas e incluye exportación directa en PDF y TXT. |
| **`InteractiveFloorplan.tsx`** | `/src/components/InteractiveFloorplan.tsx` | **Plano Arquitectónico Interactivo del Hogar**: mapa vectorial SVG de una vivienda con puntos críticos de riesgo (*hotspots*) por estancia (Baño, Cocina, Salón, Dormitorios y Escaleras) y su solución preventiva asociada. |
| **`ClinicalFragilityAndMeds.tsx`** | `/src/components/ClinicalFragilityAndMeds.tsx` | **Cribado de Polifarmacia, Fragilidad Funcional y Supervisión Pediátrica**: evalúa grupos farmacológicos de riesgo de caída/intoxicación (*Alves 2025*, *López-Soto 2019*) y escenarios de ausencia de supervisión adulta en niños (*Rivas García 2018*). |
| **`RoiAndSolutionsSuite.tsx`** | `/src/components/RoiAndSolutionsSuite.tsx` | **Catálogo de Soluciones AssureCareWare y Calculadora de ROI Sanitario/Municipal**: traduce los hallazgos científicos en equipamiento preventivo por estancia y calcula el ahorro neto anual en hospitalizaciones evitadas para ayuntamientos o servicios sociosanitarios. |
| **`KeyFiguresAndCitations.tsx`** | `/src/components/KeyFiguresAndCitations.tsx` | **Tabla Interactiva Figura 1, Síntesis «Qué Significa» y Visor de Citas**: tabla filtrable con las 9 cifras clave de Europa y España, síntesis en 4 pilares e inspector modal con la ficha metodológica completa de los 10 autores citados. |
| **`InteractiveGlossary.tsx`** | `/src/components/InteractiveGlossary.tsx` | **Glosario Epidemiológico Interactivo**: explica términos complejos (*EU-IDB*, *Redes Centinela*, *Incidencia*, *Prevalencia de Discapacidad*, *HLA*, *Admisión Hospitalaria*, etc.) con selector de nivel de lectura (*Lenguaje Sencillo para Familias* vs. *Definición Técnica*) y «Lupa de Concepto». |
| **`WebIntegrationGuideModal.tsx`** | `/src/components/WebIntegrationGuideModal.tsx` | **Asistente de Integración Web (`habitatasistencial.es`)**: guía paso a paso para publicar la aplicación mediante subdominio DNS (`CNAME` en Hostinger hacia Vercel/Netlify), `iframe` responsivo o exportación estática. |
| **`epidemiologyData.ts`** | `/src/data/epidemiologyData.ts` | Fuente centralizada de datos tipados en TypeScript: las 10 citas científicas (`CITATIONS`), estadísticas por edad (`AGE_GROUP_STATS`), mecanismos (`MECHANISM_STATS`), tabla Figura 1 (`KEY_FIGURES_TABLE`), comparativa por países de la UE (`EU_COUNTRY_COMPARISONS`), recomendaciones preventivas (`PREVENTION_RECOMMENDATIONS`) y términos del glosario (`GLOSSARY_TERMS`). |

---

## 3. Dependencias del Proyecto (`package.json`)

### Dependencias principales
- **`react`** (`^19.0.1`) y **`react-dom`** (`^19.0.1`): Renderizado de componentes e interfaz reactiva.
- **`jspdf`** (`^4.2.1`): Generación en cliente de informes PDF vectoriales optimizados para impresión A4 sin necesidad de servidor externo.
- **`lucide-react`** (`^0.546.0`): Iconografía clínica, técnica y de interfaz.
- **`tailwindcss`** (`^4.3.3`) y **`@tailwindcss/vite`** (`^4.3.3`): Sistema de estilos y modo de accesibilidad de alta visibilidad (`WCAG AAA`).

### Dependencias de desarrollo y compilación
- **`vite`** (`^8.3.0`) y **`@vitejs/plugin-react`** (`^6.1.1`): Empaquetador y servidor de desarrollo ultrarrápido.
- **`typescript`** (`^7.0.2`): Tipado estático de extremo a extremo.

---

## 4. Imágenes, Activos y Variables de Entorno

- **Imágenes 100% locales**:
  - La fotografía documental de portada se encuentra dentro del proyecto en `/src/assets/images/hero_domestic_architecture_1791058702758.jpg` (y cuenta además con un respaldo visual automático en caso de que se desactive la carga de imágenes).
  - El logotipo corporativo (`BrandLogo.tsx`) y el plano arquitectónico (`InteractiveFloorplan.tsx`) están construidos en **SVG vectorial puro** dentro del código fuente. No existe ninguna dependencia de imágenes enlazadas a URLs externas.
- **Sin claves de API ni variables de entorno obligatorias**:
  - La aplicación es **100% autónoma en el navegador (Client-Side SPA)**.
  - **No requiere ninguna clave de API (`API Key`) ni archivo `.env`** para funcionar en local ni al desplegarse en Vercel, Netlify o Hostinger.

---

## 5. Aviso Metodológico

> *«Los índices 0–100 y los valores por país son estimaciones ilustrativas basadas en las fuentes citadas, no datos oficiales.»*
