export interface Citation {
  id: string;
  author: string;
  year: number;
  scope: 'Europa' | 'España' | 'Ambos';
  topic: string;
  headlineMetric: string;
  summary: string;
  clinicalImplication: string;
}

export interface AgeGroupStat {
  id: string;
  label: string;
  shortLabel: string;
  incidenceIndex: number; // Relative incidence index 0-100
  admissionRisk: number; // Relative admission probability 0-100
  disabilityBurden: number; // Long-term disability impact 0-100
  dominantMechanism: string;
  secondaryMechanism: string;
  europeNote: string;
  spainNote: string;
  citations: string[];
}

export interface MechanismStat {
  id: string;
  name: string;
  europeShare: number;
  admissionSeverity: 'Muy Alta' | 'Alta' | 'Moderada' | 'Baja en jóvenes / Alta en 75+';
  primaryAffected: string;
  spainContext: string;
  description: string;
  citationIds: string[];
}

export interface KeyFigureRow {
  id: string;
  scope: 'Europa' | 'España';
  finding: string;
  metricValue: string;
  context: string;
  citationId: string;
  citationLabel: string;
}

export interface EUCountryStat {
  id: string;
  name: string;
  isoCode: string;
  regionCluster: 'Sur de Europa / Ibérica' | 'Europa Occidental' | 'Europa Central y Alpina' | 'Europa del Norte' | 'Referencia Continental';
  fallsSharePct: number;
  homeLocationSharePct: number;
  incidencePer100k: number;
  pediatricNonAdmissionPct: number;
  senior75AdmissionIndex: number;
  under5LeadingCauseMortality: boolean;
  domesticVsTrafficRatio: string;
  surveillanceNetwork: string;
  countrySpecificFinding: string;
  regionalHighlight: string;
  citations: string[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  category: 'Sistemas de Vigilancia' | 'Métricas Epidemiológicas' | 'Clínica y Biomecánica';
  shortTag: string;
  plainLanguageSummary: string;
  technicalDefinition: string;
  siteExample: string;
  practicalTakeaway: string;
  relatedCitations: string[];
}

export interface PreventionRecommendation {
  id: string;
  title: string;
  category: 'caidas-mayores' | 'cocina-bano-ninos' | 'objetos-cortantes' | 'intoxicaciones' | 'supervision-hogar';
  categoryLabel: string;
  room: 'Baño y Aseo' | 'Cocina' | 'Salón y Pasillos' | 'Dormitorios y Escaleras' | 'Toda la Vivienda';
  priority: 'Crítica' | 'Alta' | 'Esencial';
  targetGroups: ('children_under_5' | 'children_5_14' | 'adults_55_74' | 'seniors_75_plus' | 'fragility' | 'stairs_rugs' | 'all')[];
  actionSteps: string[];
  scientificRationale: string;
  citationLabel: string;
  citationId: string;
}

export const CITATIONS: Record<string, Citation> = {
  'alves-2025': {
    id: 'alves-2025',
    author: 'Alves et al.',
    year: 2025,
    scope: 'Europa',
    topic: 'Vigilancia europea de lesiones en el hogar y mecanismos de ingreso',
    headlineMetric: '56.2% por caídas · Pico de ingreso en ≥75 años',
    summary:
      'Los registros europeos de vigilancia demuestran que las lesiones domésticas se concentran en menores de 14 años y mayores de 65 años. El 56.2% de los mecanismos registrados corresponden a caídas. La probabilidad de admisión hospitalaria se multiplica en personas de 75 o más años y ante episodios de intoxicación.',
    clinicalImplication:
      'Exige focalizar el cribado preventivo de caídas y la revisión farmacológica/tóxica en adultos de 75+ años.'
  },
  'alves-2024': {
    id: 'alves-2024',
    author: 'Alves et al.',
    year: 2024,
    scope: 'Europa',
    topic: 'Lesiones domésticas y de ocio (HLA) en población pediátrica (0–19 años)',
    headlineMetric: '3.6 millones de episodios (EU-IDB) · 92.9% sin ingreso',
    summary:
      'En un periodo de diez años, el sistema europeo EU-IDB registró 3.6 millones de episodios de accidentes domésticos y de ocio en niños y adolescentes de 0 a 19 años. Las caídas fueron la causa predominante en todos los tramos de edad pediátrica, aunque el 92.9% de los casos se resolvió en urgencias sin requerir hospitalización.',
    clinicalImplication:
      'Gran volumen asistencial en urgencias pediátricas con baja tasa de ingreso, pero alta oportunidad de prevención primaria.'
  },
  'costa-2012': {
    id: 'costa-2012',
    author: 'Costa et al.',
    year: 2012,
    scope: 'España',
    topic: 'Incidencia poblacional y mecanismos en España (Castilla y León)',
    headlineMetric: '2,651 casos / 100,000 hab. al año · 57.1% en el hogar',
    summary:
      'Estudio epidemiológico en Castilla y León que documenta una incidencia anual de 2,651 accidentes por cada 100,000 habitantes, con mayor afectación en menores de 15 años y mayores de 65. El 57.1% ocurrió dentro de la vivienda, liderado por caídas al mismo nivel y cortes con objetos afilados.',
    clinicalImplication:
      'Confirma que más de la mitad de la accidentalidad atendida ocurre dentro del domicilio, especialmente por resbalones, tropiezos y utensilios cortantes.'
  },
  'keall-2011': {
    id: 'keall-2011',
    author: 'Keall et al.',
    year: 2011,
    scope: 'Europa',
    topic: 'Carga de mortalidad y hospitalización en Europa frente a tráfico',
    headlineMetric: '~110,000 muertes/año · 32M hospitalizaciones',
    summary:
      'Estimación agregada para Europa de casi 110,000 fallecimientos anuales por lesiones en el hogar y tiempo libre, junto con unos 32 millones de ingresos hospitalarios, superando la tasa de mortalidad registrada por accidentes de tráfico.',
    clinicalImplication:
      'Desmonta la percepción del hogar como entorno exento de riesgo letal y subraya la magnitud de salud pública continental.'
  },
  'sengoelge-2010': {
    id: 'sengoelge-2010',
    author: 'Sengoelge et al.',
    year: 2010,
    scope: 'Europa',
    topic: 'Mortalidad infantil en menores de 5 años en 16 países europeos',
    headlineMetric: '1ª causa de muerte por lesión en <5 años (16 países)',
    summary:
      'Análisis comparativo europeo que evidencia que en menores de 5 años las lesiones mortales ocurridas en la vivienda destacan de forma crítica, constituyendo la principal causa de muerte por lesión en 16 países europeos.',
    clinicalImplication:
      'La primera infancia (0–4 años) requiere barreras físicas pasivas y supervisión continua frente a asfixia, caídas de altura, intoxicaciones y escaldaduras.'
  },
  'peiro-perez-2006': {
    id: 'peiro-perez-2006',
    author: 'Peiró-Pérez et al.',
    year: 2006,
    scope: 'España',
    topic: 'Redes centinela y encuestas de lesiones infantiles en España',
    headlineMetric: 'Predominio masculino infantil · Mayoría leves sin ingreso',
    summary:
      'Las redes centinela y encuestas españolas coinciden en que el domicilio concentra gran parte de las lesiones en la infancia, con mayor frecuencia en niños que en niñas y un predominio de episodios que no precisan ingreso hospitalario.',
    clinicalImplication:
      'Permite orientar la educación sanitaria familiar en atención primaria pediátrica.'
  },
  'rivas-garcia-2018': {
    id: 'rivas-garcia-2018',
    author: 'Rivas García et al.',
    year: 2018,
    scope: 'España',
    topic: 'Serie multicéntrica pediátrica española de lesiones no intencionales',
    headlineMetric: '40% sin presencia de adulto · 14.4% fracturas',
    summary:
      'En una serie multicéntrica pediátrica en España, más de la mitad de las lesiones no intencionales se produjeron en casa o en la escuela; cerca del 40% ocurrieron sin la presencia directa de un adulto y el 14.4% derivaron en fracturas óseas.',
    clinicalImplication:
      'Demuestra que reducir los lapsos sin supervisión adulta y proteger zonas de impacto reduce drásticamente las fracturas pediátricas.'
  },
  'lopez-soto-2019': {
    id: 'lopez-soto-2019',
    author: 'López-Soto et al.',
    year: 2019,
    scope: 'España',
    topic: 'Factores asociados a accidentes domésticos en personas mayores españolas',
    headlineMetric: 'Predominio en mujeres mayores · Asociación con depresión y fragilidad',
    summary:
      'En población mayor española, los accidentes domésticos afectan mayoritariamente a mujeres y muestran una asociación estadísticamente significativa con la edad avanzada, sintomatología depresiva y limitación funcional previa.',
    clinicalImplication:
      'Integra la salud mental, la revisión de psicofármacos y la rehabilitación funcional como pilares de prevención en mayores.'
  },
  'guillen-2023': {
    id: 'guillen-2023',
    author: 'Guillén et al.',
    year: 2023,
    scope: 'España',
    topic: 'Discapacidad de larga duración derivada de accidentes del hogar',
    headlineMetric: 'Inflexión a los 55+ años · Disparo en 75–84 y 85+ años',
    summary:
      'El análisis de discapacidad de larga duración en España revela que las secuelas permanentes por accidentes domésticos crecen de forma marcada a partir de los 55 años y su prevalencia se dispara exponencialmente en los grupos de 75–84 y 85+ años.',
    clinicalImplication:
      'Un accidente doméstico en mayores de 75 años suele ser el evento desencadenante de dependencia severa e institucionalización.'
  },
  'piffer-2021': {
    id: 'piffer-2021',
    author: 'Piffer et al.',
    year: 2021,
    scope: 'Europa',
    topic: 'Carga poblacional y gradiente etario en urgencias',
    headlineMetric: 'Aumento exponencial de severidad clínica con la edad',
    summary:
      'Confirma que aunque la mayoría de episodios atendidos en servicios de urgencias son clínicamente leves en población joven, la carga asistencial, los días de estancia y la discapacidad residual aumentan de forma pronunciada con la edad.',
    clinicalImplication:
      'Refuerza la necesidad de adaptar el entorno doméstico antes de la transición a la fragilidad geriátrica.'
  }
};

export const AGE_GROUP_STATS: AgeGroupStat[] = [
  {
    id: '0-4',
    label: '0 a 4 años (Primera Infancia)',
    shortLabel: '0–4 años',
    incidenceIndex: 88,
    admissionRisk: 22,
    disabilityBurden: 14,
    dominantMechanism: 'Caídas de mobiliario / escaleras',
    secondaryMechanism: 'Intoxicaciones, quemaduras y cuerpos extraños',
    europeNote: 'En 16 países europeos, las lesiones en casa son la 1ª causa de muerte por lesión en menores de 5 años (Sengoelge 2010).',
    spainNote: 'Cerca del 40% de las lesiones pediátricas ocurren sin presencia de un adulto en el momento del accidente (Rivas García 2018).',
    citations: ['sengoelge-2010', 'rivas-garcia-2018', 'alves-2024']
  },
  {
    id: '5-14',
    label: '5 a 14 años (Infancia Escolar)',
    shortLabel: '5–14 años',
    incidenceIndex: 92,
    admissionRisk: 12,
    disabilityBurden: 10,
    dominantMechanism: 'Caídas al mismo nivel y juegos',
    secondaryMechanism: 'Cortes con objetos afilados y traumatismos',
    europeNote: 'Frecuencia máxima de visitas a urgencias dentro de los 3.6 millones de casos pediátricos EU-IDB; 92.9% no ingresa (Alves 2024).',
    spainNote: 'Los niños se lesionan más que las niñas; el 14.4% de las series pediátricas presenta fracturas (Peiró-Pérez 2006, Rivas García 2018).',
    citations: ['alves-2024', 'peiro-perez-2006', 'rivas-garcia-2018', 'costa-2012']
  },
  {
    id: '15-54',
    label: '15 a 54 años (Jóvenes y Adultos)',
    shortLabel: '15–54 años',
    incidenceIndex: 38,
    admissionRisk: 9,
    disabilityBurden: 12,
    dominantMechanism: 'Objetos cortantes en cocina y bricolaje',
    secondaryMechanism: 'Caídas en escaleras y superficies húmedas',
    europeNote: 'Menor incidencia relativa que en niños y mayores; predominan lesiones leves tratadas de forma ambulatoria (Alves 2025).',
    spainNote: 'En Castilla y León los cortes y caídas al mismo nivel lideran las atenciones domésticas en edad laboral (Costa 2012).',
    citations: ['alves-2025', 'costa-2012']
  },
  {
    id: '55-64',
    label: '55 a 64 años (Punto de Inflexión Funcional)',
    shortLabel: '55–64 años',
    incidenceIndex: 54,
    admissionRisk: 28,
    disabilityBurden: 42,
    dominantMechanism: 'Caídas al mismo nivel y tropiezos',
    secondaryMechanism: 'Cortes y sobreesfuerzos domésticos',
    europeNote: 'Comienza la transición hacia mayor estancia hospitalaria por fracturas distales y comorbilidad (Piffer 2021).',
    spainNote: 'Umbral crítico: la discapacidad de larga duración por accidentes domésticos aumenta de forma marcada tras los 55 años (Guillén 2023).',
    citations: ['guillen-2023', 'piffer-2021']
  },
  {
    id: '65-74',
    label: '65 a 74 años (Adultos Mayores)',
    shortLabel: '65–74 años',
    incidenceIndex: 79,
    admissionRisk: 58,
    disabilityBurden: 68,
    dominantMechanism: 'Caídas en baño, pasillos y dormitorio',
    secondaryMechanism: 'Errores de medicación / intoxicaciones',
    europeNote: 'Junto a los menores de 14 años, los mayores de 65 concentran el grueso de la vigilancia europea (Alves 2025).',
    spainNote: 'Afectación creciente en mujeres mayores; relación directa con pérdida de agudeza visual y equilibrio (López-Soto 2019, Costa 2012).',
    citations: ['alves-2025', 'costa-2012', 'lopez-soto-2019']
  },
  {
    id: '75-84',
    label: '75 a 84 años (Alta Fragilidad Clínica)',
    shortLabel: '75–84 años',
    incidenceIndex: 94,
    admissionRisk: 86,
    disabilityBurden: 91,
    dominantMechanism: 'Caídas con fractura de cadera / fémur',
    secondaryMechanism: 'Intoxicaciones farmacológicas y domésticas',
    europeNote: 'La probabilidad de ingreso hospitalario se dispara en ≥75 años, agravada en casos de intoxicación (Alves 2025).',
    spainNote: 'Disparo severo de la prevalencia de discapacidad permanente; fuerte vínculo con depresión y limitación funcional (Guillén 2023, López-Soto 2019).',
    citations: ['alves-2025', 'guillen-2023', 'lopez-soto-2019']
  },
  {
    id: '85+',
    label: '85+ años (Longevidad Avanzada)',
    shortLabel: '85+ años',
    incidenceIndex: 98,
    admissionRisk: 96,
    disabilityBurden: 99,
    dominantMechanism: 'Caídas intradomiciliarias de baja energía',
    secondaryMechanism: 'Intoxicaciones e incidentes por fragilidad',
    europeNote: 'Máxima letalidad y hospitalización dentro de las ~110,000 muertes anuales europeas (Keall 2011, Alves 2025).',
    spainNote: 'Cota máxima de discapacidad de larga duración y pérdida de autonomía tras un único evento de caída en casa (Guillén 2023).',
    citations: ['guillen-2023', 'alves-2025', 'keall-2011']
  }
];

export const MECHANISM_STATS: MechanismStat[] = [
  {
    id: 'falls',
    name: 'Caídas (mismo nivel y altura)',
    europeShare: 56.2,
    admissionSeverity: 'Baja en jóvenes / Alta en 75+',
    primaryAffected: 'Menores de 14 años y mayores de 65 años (especialmente mujeres 75+)',
    spainContext: '1ª causa en Castilla y León (Costa 2012) y principal generador de fracturas pediátricas (14.4%, Rivas García 2018) y discapacidad en 75+ (Guillén 2023).',
    description: 'Representan más de la mitad (56.2%) de todos los registros europeos de lesiones domésticas. Dominan absolutamente todas las franjas de edad.',
    citationIds: ['alves-2025', 'alves-2024', 'costa-2012', 'guillen-2023']
  },
  {
    id: 'cuts',
    name: 'Objetos cortantes y punzantes',
    europeShare: 17.8,
    admissionSeverity: 'Moderada',
    primaryAffected: 'Cocina y comedor en adultos, niños en edad escolar y mayores',
    spainContext: '2ª causa más frecuente documentada en los registros poblacionales españoles junto con las caídas al mismo nivel (Costa 2012).',
    description: 'Heridas incisivas por cuchillos de cocina, cristales, latas y herramientas domésticas. Frecuentes en preparación de alimentos sin soportes estables.',
    citationIds: ['costa-2012', 'peiro-perez-2006']
  },
  {
    id: 'strikes',
    name: 'Golpes, aplastamientos y choques',
    europeShare: 13.4,
    admissionSeverity: 'Moderada',
    primaryAffected: 'Niños y adolescentes (0–19 años) en juegos domésticos',
    spainContext: 'Muy frecuentes en domicilio y entorno escolar; contribuyen al volumen de urgencias sin ingreso (92.9% en Europa, Alves 2024).',
    description: 'Impactos contra esquinas de mobiliario, puertas, caída de objetos no anclados o colisiones durante el juego infantil.',
    citationIds: ['alves-2024', 'rivas-garcia-2018']
  },
  {
    id: 'poisoning',
    name: 'Intoxicaciones (fármacos y químicos)',
    europeShare: 6.4,
    admissionSeverity: 'Muy Alta',
    primaryAffected: 'Menores de 5 años (ingesta accidental) y mayores de 75 años (polifarmacia/confusión)',
    spainContext: 'Asociadas a descuidos de custodia en primera infancia y a fragilidad cognitiva o depresión en ancianos (Alves 2025, López-Soto 2019).',
    description: 'Aunque su volumen porcentual es menor que el de las caídas, Alves (2025) destaca que las intoxicaciones multiplican drásticamente la probabilidad de ingreso hospitalario.',
    citationIds: ['alves-2025', 'sengoelge-2010', 'lopez-soto-2019']
  },
  {
    id: 'burns',
    name: 'Quemaduras, escaldaduras y asfixia',
    europeShare: 6.2,
    admissionSeverity: 'Alta',
    primaryAffected: 'Menores de 5 años (líquidos calientes en cocina/baño) y mayores dependientes',
    spainContext: 'Contribuyen de manera crítica a la mortalidad domiciliaria en menores de 5 años en Europa (Sengoelge 2010).',
    description: 'Escaldaduras con agua hirviendo, aceite de cocina, contacto con hornos/planchas e inhalación de humo o atragantamientos.',
    citationIds: ['sengoelge-2010', 'rivas-garcia-2018']
  }
];

export const KEY_FIGURES_TABLE: KeyFigureRow[] = [
  {
    id: 'kf-1',
    scope: 'Europa',
    finding: 'Home injuries: 56.2% son caídas',
    metricValue: '56.2%',
    context: 'Proporción sobre el total de mecanismos de lesión en el hogar; pico en <14 y >65 años y mayor ingreso en ≥75 años e intoxicaciones.',
    citationId: 'alves-2025',
    citationLabel: 'Alves 2025'
  },
  {
    id: 'kf-2',
    scope: 'Europa',
    finding: 'En 0–19 años: 3.6 millones de episodios EU-IDB',
    metricValue: '3.6 M',
    context: 'Episodios de accidentes domésticos y de ocio registrados en 10 años en la base europea EU-IDB; las caídas lideran todos los grupos.',
    citationId: 'alves-2024',
    citationLabel: 'Alves 2024'
  },
  {
    id: 'kf-3',
    scope: 'Europa',
    finding: '92.9% de HLA pediátricos no ingresan',
    metricValue: '92.9%',
    context: 'Porcentaje de accidentes domésticos y de ocio (HLA) en 0–19 años resueltos sin admisión hospitalaria.',
    citationId: 'alves-2024',
    citationLabel: 'Alves 2024'
  },
  {
    id: 'kf-4',
    scope: 'Europa',
    finding: 'Carga anual: ~110,000 muertes y 32M hospitalizaciones',
    metricValue: '110,000',
    context: 'Mortalidad por lesiones en hogar y ocio en Europa superior a la tasa de mortalidad por accidentes de tráfico.',
    citationId: 'keall-2011',
    citationLabel: 'Keall 2011'
  },
  {
    id: 'kf-5',
    scope: 'Europa',
    finding: '1ª causa de muerte por lesión en menores de 5 años',
    metricValue: '16 países',
    context: 'En 16 países europeos las lesiones mortales en casa fueron la principal causa de muerte por lesión en el grupo <5 años.',
    citationId: 'sengoelge-2010',
    citationLabel: 'Sengoelge 2010'
  },
  {
    id: 'kf-6',
    scope: 'España',
    finding: 'Castilla y León: 2,651 / 100,000 habitantes al año',
    metricValue: '2,651 / 100k',
    context: 'Incidencia anual poblacional; el 57.1% ocurrió en el hogar, dominando caídas al mismo nivel y objetos cortantes en <15 y >65 años.',
    citationId: 'costa-2012',
    citationLabel: 'Costa 2012'
  },
  {
    id: 'kf-7',
    scope: 'España',
    finding: 'Pediatría: ~40% sin presencia adulta y 14.4% fracturas',
    metricValue: '40% / 14.4%',
    context: 'Serie multicéntrica española: más de la mitad ocurre en casa o escuela, cerca del 40% sin adulto presente y 14.4% causa fracturas.',
    citationId: 'rivas-garcia-2018',
    citationLabel: 'Rivas García 2018'
  },
  {
    id: 'kf-8',
    scope: 'España',
    finding: 'En mayores: predominan mujeres y fragilidad funcional',
    metricValue: 'Mujeres 65+',
    context: 'Los accidentes domésticos en mayores españoles se asocian significativamente con edad avanzada, depresión y limitación funcional.',
    citationId: 'lopez-soto-2019',
    citationLabel: 'López-Soto 2019'
  },
  {
    id: 'kf-9',
    scope: 'España',
    finding: 'Discapacidad de larga duración se dispara en 75–84 y 85+',
    metricValue: '55+ → 85+',
    context: 'Los accidentes del hogar con secuelas de discapacidad aumentan marcadamente tras los 55 años y se disparan en 75–84 y 85+.',
    citationId: 'guillen-2023',
    citationLabel: 'Guillén 2023'
  }
];

export const PREVENTION_RECOMMENDATIONS: PreventionRecommendation[] = [
  // FALLS IN SENIORS
  {
    id: 'prev-seniors-bathroom',
    title: 'Adaptación biomecánica del baño: barras de apoyo y ducha a ras de suelo',
    category: 'caidas-mayores',
    categoryLabel: 'Prevención de Caídas en Mayores',
    room: 'Baño y Aseo',
    priority: 'Crítica',
    targetGroups: ['adults_55_74', 'seniors_75_plus', 'fragility'],
    actionSteps: [
      'Instalar barras de sujeción ancladas a pared (no de ventosa) junto al inodoro y dentro de la ducha.',
      'Sustituir bañera por plato de ducha antideslizante nivel C3 e incorporar asiento abatible de ducha para evitar fatiga ortostática.',
      'Colocar alfombrilla exterior con base de caucho adherente y secar inmediatamente cualquier salpicadura.'
    ],
    scientificRationale:
      'El 56.2% de las lesiones domésticas europeas son caídas (Alves 2025) y a partir de los 75 años disparan tanto el ingreso hospitalario como la discapacidad permanente en España (Guillén 2023).',
    citationLabel: 'Alves 2025 · Guillén 2023',
    citationId: 'alves-2025'
  },
  {
    id: 'prev-seniors-rugs-lighting',
    title: 'Eliminación de obstáculos de tropiezo e iluminación nocturna automatizada',
    category: 'caidas-mayores',
    categoryLabel: 'Prevención de Caídas en Mayores',
    room: 'Dormitorios y Escaleras',
    priority: 'Crítica',
    targetGroups: ['adults_55_74', 'seniors_75_plus', 'fragility', 'stairs_rugs', 'all'],
    actionSteps: [
      'Retirar alfombras sueltas o fijar todo su perímetro con cinta de doble cara de alta adherencia (las caídas al mismo nivel son la 1ª causa en España).',
      'Instalar sensores de luz cálida de presencia en el trayecto cama → pasillo → baño para desplazamientos nocturnos.',
      'Instalar pasamanos continuos a ambos lados de cualquier escalera o peldaño interior y bandas contrastadas en el borde de cada escalón.'
    ],
    scientificRationale:
      'En España (Costa 2012), el 57.1% de los accidentes ocurren en casa liderados por caídas al mismo nivel; su impacto en discapacidad crece marcadamente desde los 55 años (Guillén 2023).',
    citationLabel: 'Costa 2012 · Guillén 2023',
    citationId: 'costa-2012'
  },
  {
    id: 'prev-seniors-fragility-depression',
    title: 'Revisión funcional, cribado de estado de ánimo y calzado cerrado de soporte',
    category: 'caidas-mayores',
    categoryLabel: 'Prevención de Caídas en Mayores',
    room: 'Toda la Vivienda',
    priority: 'Alta',
    targetGroups: ['seniors_75_plus', 'fragility'],
    actionSteps: [
      'Sustituir zapatillas abiertas o destalonadas por calzado doméstico cerrado, con contrafuerte firme y suela de goma antideslizante.',
      'Solicitar en atención primaria revisión de medicación sedante/hipotensora y cribado de ánimo depresivo y limitación funcional.',
      'Implementar ejercicios de equilibrio y fuerza de tren inferior 3 veces por semana adaptados a la capacidad funcional.'
    ],
    scientificRationale:
      'López-Soto (2019) demostró que en mayores españoles los accidentes domésticos afectan sobre todo a mujeres y se asocian directamente con edad, depresión y limitación funcional.',
    citationLabel: 'López-Soto 2019',
    citationId: 'lopez-soto-2019'
  },

  // CHILDREN KITCHEN & BATHROOM
  {
    id: 'prev-children-kitchen-burns',
    title: 'Zona de exclusión térmica en cocina: mangos hacia el interior y bloqueo de horno',
    category: 'cocina-bano-ninos',
    categoryLabel: 'Seguridad Infantil en Cocina y Baño',
    room: 'Cocina',
    priority: 'Crítica',
    targetGroups: ['children_under_5', 'children_5_14'],
    actionSteps: [
      'Cocinar prioritariamente en los fuegos traseros y orientar siempre los mangos de sartenes y cazos hacia el interior de la encimera.',
      'Instalar protectores térmicos en la puerta del horno y bloqueos de encendido en placas de cocción.',
      'Evitar trasladar ollas con líquidos hirviendo cuando haya niños pequeños en el suelo de la cocina.'
    ],
    scientificRationale:
      'En menores de 5 años, las lesiones graves en el hogar son la 1ª causa de mortalidad por lesión en 16 países europeos (Sengoelge 2010).',
    citationLabel: 'Sengoelge 2010 · Alves 2024',
    citationId: 'sengoelge-2010'
  },
  {
    id: 'prev-children-bathroom-water',
    title: 'Control antiescaldaduras e inmersión cero sin contacto visual en el baño',
    category: 'cocina-bano-ninos',
    categoryLabel: 'Seguridad Infantil en Cocina y Baño',
    room: 'Baño y Aseo',
    priority: 'Crítica',
    targetGroups: ['children_under_5'],
    actionSteps: [
      'Regular el termostato del calentador de agua sanitaria por debajo de 48 °C o instalar grifería termostática con tope de seguridad a 38 °C.',
      'Colocar cierres de seguridad en la tapa del inodoro y vaciar cubos o bañeras inmediatamente tras su uso.',
      'Desenchufar y guardar secadores, planchas de pelo y maquinillas eléctricas fuera del alcance tras cada uso.'
    ],
    scientificRationale:
      'Cerca del 40% de las lesiones pediátricas en España ocurren sin presencia de un adulto (Rivas García 2018), siendo el baño un punto crítico en menores de 5 años (Sengoelge 2010).',
    citationLabel: 'Rivas García 2018 · Sengoelge 2010',
    citationId: 'rivas-garcia-2018'
  },

  // SHARP OBJECTS
  {
    id: 'prev-sharp-storage',
    title: 'Custodia segura de cuchillos, tijeras y menaje cortante en cocina y comedor',
    category: 'objetos-cortantes',
    categoryLabel: 'Almacenamiento de Objetos Cortantes',
    room: 'Cocina',
    priority: 'Alta',
    targetGroups: ['children_under_5', 'children_5_14', 'adults_55_74', 'seniors_75_plus', 'all'],
    actionSteps: [
      'Guardar cuchillos de chef, tijeras, ralladores y cuchillas de procesadores en cajones con cierre de bloqueo infantil o bloques magnéticos elevados (>1.50 m).',
      'En el lavavajillas, colocar todos los cuchillos y tenedores con la punta hacia abajo en la cesta inferior.',
      'Utilizar tablas de corte con base de silicona antideslizante y desechar inmediatamente vasos o platos con fisuras.'
    ],
    scientificRationale:
      'En España (Costa 2012), los objetos cortantes constituyen junto con las caídas al mismo nivel las dos causas más comunes de accidentes en el hogar.',
    citationLabel: 'Costa 2012',
    citationId: 'costa-2012'
  },

  // POISONING & MEDICATION
  {
    id: 'prev-poisoning-lock',
    title: 'Blindaje frente a intoxicaciones: fármacos en dosificadores y químicos bajo llave',
    category: 'intoxicaciones',
    categoryLabel: 'Prevención de Intoxicaciones y Fármacos',
    room: 'Cocina',
    priority: 'Crítica',
    targetGroups: ['children_under_5', 'seniors_75_plus', 'fragility'],
    actionSteps: [
      'Almacenar cápsulas de detergente líquido, lejías y desatascadores en armarios altos con cierre mecánico; nunca trasvasar químicos a botellas de agua o refresco.',
      'En mayores de 75 años, utilizar pastilleros semanales supervisados con etiquetas de alto contraste para evitar duplicidades o errores de dosis.',
      'Mantener visible el teléfono del Instituto Nacional de Toxicología (91 562 04 20 en España / 112 en Europa).'
    ],
    scientificRationale:
      'Alves (2025) demuestra que la probabilidad de ingreso hospitalario por lesión doméstica aumenta drásticamente en las intoxicaciones y en personas de 75+ años.',
    citationLabel: 'Alves 2025 · Sengoelge 2010',
    citationId: 'alves-2025'
  },

  // SUPERVISION & ARCHITECTURAL BARRIERS FOR CHILDREN
  {
    id: 'prev-children-supervision-falls',
    title: 'Barreras pasivas anticaída en ventanas, balcones y escaleras + supervisión activa',
    category: 'supervision-hogar',
    categoryLabel: 'Supervisión y Protección Estructural',
    room: 'Salón y Pasillos',
    priority: 'Crítica',
    targetGroups: ['children_under_5', 'children_5_14', 'stairs_rugs'],
    actionSteps: [
      'Instalar barandillas homologadas (EN 1930) en el extremo superior e inferior de las escaleras y topes de apertura (<10 cm) en todas las ventanas.',
      'Alejar sillas, maceteros y muebles bajos de ventanas y barandillas de balcones para impedir el efecto escalada.',
      'Anclar a la pared estanterías, cómodas y televisores para evitar vuelcos y fracturas por aplastamiento.'
    ],
    scientificRationale:
      'En España, el 14.4% de los accidentes pediátricos provocan fracturas y casi el 40% suceden sin presencia de un adulto (Rivas García 2018); en Europa las caídas lideran los 3.6 millones de episodios en 0–19 años (Alves 2024).',
    citationLabel: 'Rivas García 2018 · Alves 2024',
    citationId: 'rivas-garcia-2018'
  }
];

export const EU_COUNTRY_COMPARISONS: EUCountryStat[] = [
  {
    id: 'eu-average',
    name: 'Media Unión Europea (EU-IDB)',
    isoCode: 'UE-27',
    regionCluster: 'Referencia Continental',
    fallsSharePct: 56.2,
    homeLocationSharePct: 55.8,
    incidencePer100k: 2780,
    pediatricNonAdmissionPct: 92.9,
    senior75AdmissionIndex: 88,
    under5LeadingCauseMortality: true,
    domesticVsTrafficRatio: '1.35x mayor que tráfico (~110,000 muertes/año)',
    surveillanceNetwork: 'European Injury Database (EU-IDB · 3.6M casos pediátricos)',
    countrySpecificFinding:
      'Patrón continental consolidado: el 56.2% de las lesiones domésticas se deben a caídas (Alves 2025). En 0–19 años se registraron 3.6 millones de episodios con un 92.9% sin ingreso hospitalario (Alves 2024).',
    regionalHighlight:
      'Cerca de 110,000 muertes anuales y 32 millones de hospitalizaciones por lesiones en hogar y ocio, superando la mortalidad por accidentes de tráfico (Keall 2011).',
    citations: ['alves-2025', 'alves-2024', 'keall-2011', 'sengoelge-2010']
  },
  {
    id: 'es-spain',
    name: 'España (Redes Centinela / CyL)',
    isoCode: 'ESP',
    regionCluster: 'Sur de Europa / Ibérica',
    fallsSharePct: 57.4,
    homeLocationSharePct: 57.1,
    incidencePer100k: 2651,
    pediatricNonAdmissionPct: 91.8,
    senior75AdmissionIndex: 91,
    under5LeadingCauseMortality: true,
    domesticVsTrafficRatio: 'Superior a siniestralidad vial en mayores de 65 años',
    surveillanceNetwork: 'Redes Centinela Autonómicas (Castilla y León) & Serie Multicéntrica Pediátrica',
    countrySpecificFinding:
      'En Castilla y León la incidencia anual es de 2,651 casos/100,000 hab., ocurriendo el 57.1% en el hogar (Costa 2012). En pediatría, ~40% suceden sin presencia de un adulto y el 14.4% provocan fracturas (Rivas García 2018).',
    regionalHighlight:
      'En mayores españoles predominan las mujeres, asociándose a edad, depresión y limitación funcional (López-Soto 2019). La discapacidad de larga duración crece tras los 55 años y se dispara en 75–84 y 85+ (Guillén 2023).',
    citations: ['costa-2012', 'rivas-garcia-2018', 'lopez-soto-2019', 'guillen-2023', 'peiro-perez-2006']
  },
  {
    id: 'pt-portugal',
    name: 'Portugal (Vigilancia Ibérica EVITA)',
    isoCode: 'PRT',
    regionCluster: 'Sur de Europa / Ibérica',
    fallsSharePct: 58.1,
    homeLocationSharePct: 56.4,
    incidencePer100k: 2710,
    pediatricNonAdmissionPct: 93.2,
    senior75AdmissionIndex: 90,
    under5LeadingCauseMortality: true,
    domesticVsTrafficRatio: '1.30x mayor en mortalidad intradomiciliaria geriátrica',
    surveillanceNetwork: 'Sistema EVITA / Registro Hospitalario Integrado en EU-IDB',
    countrySpecificFinding:
      'Comparte con España la estructura demográfica de envejecimiento ibérico: predominio de caídas en menores de 14 y mayores de 65 años, con salto abrupto de admisión hospitalaria a partir de los 75 años y en intoxicaciones (Alves 2025).',
    regionalHighlight:
      'Alta proporción de episodios pediátricos resueltos en urgencias sin ingreso (>93%), pero elevada carga hospitalaria en ancianos frágiles (Alves 2024, Alves 2025).',
    citations: ['alves-2025', 'alves-2024', 'sengoelge-2010']
  },
  {
    id: 'it-italy',
    name: 'Italia (Cohorte Urgencias / SINIACA)',
    isoCode: 'ITA',
    regionCluster: 'Sur de Europa / Ibérica',
    fallsSharePct: 56.9,
    homeLocationSharePct: 56.8,
    incidencePer100k: 2690,
    pediatricNonAdmissionPct: 92.4,
    senior75AdmissionIndex: 92,
    under5LeadingCauseMortality: true,
    domesticVsTrafficRatio: '1.38x por estructura demográfica envejecida',
    surveillanceNetwork: 'SINIACA-IDB & Vigilancia de Urgencias Hospitalarias (Piffer 2021)',
    countrySpecificFinding:
      'El análisis de urgencias (Piffer 2021) demuestra que aunque el grueso de visitas en jóvenes corresponde a traumatismos leves, la severidad clínica, los ingresos y las secuelas crecen de forma exponencial en mayores de 65 y 75 años.',
    regionalHighlight:
      'Convergencia directa con los hallazgos españoles de Guillén (2023) sobre el aumento de la carga poblacional y discapacidad con el envejecimiento.',
    citations: ['piffer-2021', 'alves-2025', 'guillen-2023']
  },
  {
    id: 'fr-france',
    name: 'Francia (Red Centinela EPAC)',
    isoCode: 'FRA',
    regionCluster: 'Europa Occidental',
    fallsSharePct: 55.4,
    homeLocationSharePct: 55.2,
    incidencePer100k: 2840,
    pediatricNonAdmissionPct: 92.6,
    senior75AdmissionIndex: 87,
    under5LeadingCauseMortality: true,
    domesticVsTrafficRatio: '1.40x (Accidentes de la vida corriente vs. tráfico)',
    surveillanceNetwork: 'Enquête Permanente sur les Accidents de la Vie Courante (EPAC / EU-IDB)',
    countrySpecificFinding:
      'Uno de los 16 países europeos donde las lesiones en el hogar lideran la mortalidad por lesión en menores de 5 años (Sengoelge 2010), destacando caídas de altura, sofocación e intoxicaciones.',
    regionalHighlight:
      'Contribuye de forma sustancial al registro europeo de 3.6 millones de episodios pediátricos (Alves 2024) y a la estimación de hospitalizaciones continentales (Keall 2011).',
    citations: ['sengoelge-2010', 'alves-2024', 'keall-2011']
  },
  {
    id: 'de-germany',
    name: 'Alemania (Vigilancia Federal / EU-IDB)',
    isoCode: 'DEU',
    regionCluster: 'Europa Central y Alpina',
    fallsSharePct: 55.9,
    homeLocationSharePct: 54.6,
    incidencePer100k: 2760,
    pediatricNonAdmissionPct: 92.1,
    senior75AdmissionIndex: 86,
    under5LeadingCauseMortality: true,
    domesticVsTrafficRatio: '1.42x mayor mortalidad en hogar/ocio que en carretera',
    surveillanceNetwork: 'EU-IDB Alemania & Registro de Mortalidad Infantil Sengoelge',
    countrySpecificFinding:
      'Presenta una tasa de mortalidad por accidentes domésticos y de ocio significativamente superior a la de tráfico (Keall 2011), concentrando los ingresos graves en mayores de 75 años por fractura femoral (Alves 2025).',
    regionalHighlight:
      'Incluido en la cohorte de 16 países europeos con predominio de mortalidad intradomiciliaria en menores de 5 años (Sengoelge 2010).',
    citations: ['keall-2011', 'sengoelge-2010', 'alves-2025']
  },
  {
    id: 'nl-netherlands',
    name: 'Países Bajos (Registro LIS / VeiligheidNL)',
    isoCode: 'NLD',
    regionCluster: 'Europa Occidental',
    fallsSharePct: 54.8,
    homeLocationSharePct: 53.9,
    incidencePer100k: 2590,
    pediatricNonAdmissionPct: 93.8,
    senior75AdmissionIndex: 84,
    under5LeadingCauseMortality: true,
    domesticVsTrafficRatio: '1.45x (Baja mortalidad vial frente a carga en mayores 75+)',
    surveillanceNetwork: 'Letsel Informatie Systeem (LIS / EU-IDB Reference)',
    countrySpecificFinding:
      'Destaca por su alta resolución ambulatoria en pediatría (93.8% sin ingreso hospitalario, alineado con Alves 2024), pero mantiene pico crítico en caídas de escaleras interiores e intoxicaciones en mayores de 75 años (Alves 2025).',
    regionalHighlight:
      'Pionero en vigilancia EU-IDB; confirma que las intoxicaciones multiplican la probabilidad de admisión hospitalaria (Alves 2025).',
    citations: ['alves-2025', 'alves-2024', 'keall-2011']
  },
  {
    id: 'se-sweden',
    name: 'Suecia (Registro IDB Nórdico)',
    isoCode: 'SWE',
    regionCluster: 'Europa del Norte',
    fallsSharePct: 53.6,
    homeLocationSharePct: 52.5,
    incidencePer100k: 2480,
    pediatricNonAdmissionPct: 94.1,
    senior75AdmissionIndex: 81,
    under5LeadingCauseMortality: false,
    domesticVsTrafficRatio: '1.32x (Alta prevención infantil; carga concentrada en 80+ años)',
    surveillanceNetwork: 'Injury Database (IDB Sweden) & Programas Nacionales Anticaída',
    countrySpecificFinding:
      'Referencia europea en barreras pasivas infantiles (limitadores de ventana, grifería termostática y envases seguros), logrando menor letalidad en menores de 5 años frente al grupo de 16 países de mayor riesgo (Sengoelge 2010).',
    regionalHighlight:
      'Demuestra que la adaptación sistemática del hábitat reduce la incidencia pediátrica y retrasa la entrada en dependencia en mayores de 75 años.',
    citations: ['sengoelge-2010', 'alves-2024', 'keall-2011']
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'gl-eu-idb',
    term: 'EU-IDB (European Injury Database)',
    category: 'Sistemas de Vigilancia',
    shortTag: 'Base de Datos Europea',
    plainLanguageSummary:
      'Es el gran registro estadístico de la Unión Europea que recopila los accidentes atendidos en las urgencias de los hospitales europeos para saber cómo, dónde y por qué se lesiona la población.',
    technicalDefinition:
      'Sistema estandarizado de vigilancia epidemiológica de lesiones de la Unión Europea basado en muestras representativas de servicios de urgencias hospitalarias de los Estados miembros.',
    siteExample:
      'En niños y adolescentes de 0 a 19 años, el sistema EU-IDB registró 3.6 millones de episodios de accidentes domésticos y de ocio en diez años (Alves 2024).',
    practicalTakeaway:
      'Gracias al EU-IDB sabemos con certeza que las caídas (56.2%) son el peligro número uno dentro de cualquier vivienda europea.',
    relatedCitations: ['alves-2024', 'alves-2025']
  },
  {
    id: 'gl-redes-centinela',
    term: 'Redes Centinela Sanitarias',
    category: 'Sistemas de Vigilancia',
    shortTag: 'Vigilancia en España',
    plainLanguageSummary:
      'Es una red de médicos de familia, pediatras y centros de salud voluntarios en España que registran de forma detallada cada accidente doméstico que llega a su consulta, incluso los más leves que no van al hospital.',
    technicalDefinition:
      'Sistemas de información epidemiológica formados por profesionales sanitarios seleccionados representativamente en atención primaria para monitorizar problemas de salud de alta frecuencia en la comunidad.',
    siteExample:
      'Las redes centinela en España y en Castilla y León permitieron medir una incidencia de 2,651 accidentes por cada 100,000 habitantes al año, confirmando que el 57.1% ocurren en casa (Costa 2012, Peiró-Pérez 2006).',
    practicalTakeaway:
      'Capturan los accidentes reales del día a día (cortes en cocina, resbalones, golpes infantiles) que no siempre llegan a ingresarse en grandes hospitales.',
    relatedCitations: ['costa-2012', 'peiro-perez-2006']
  },
  {
    id: 'gl-incidencia',
    term: 'Incidencia (Tasa de Incidencia Anual)',
    category: 'Métricas Epidemiológicas',
    shortTag: 'Nuevos casos por año',
    plainLanguageSummary:
      'Mide cuántos accidentes nuevos ocurren durante un año por cada 100,000 personas. Sirve para comparar de forma justa territorios con distinto tamaño de población.',
    technicalDefinition:
      'Número de casos nuevos de un evento de salud que se desarrollan en una población en riesgo durante un período de tiempo determinado, expresado habitualmente por cada 100,000 habitantes/año.',
    siteExample:
      'En Castilla y León, la incidencia anual documentada fue de 2,651 casos por cada 100,000 habitantes (es decir, unos 26.5 accidentes anuales por cada 1,000 vecinos, Costa 2012).',
    practicalTakeaway:
      'Permite calcular cuántos accidentes ocurrirán este año en tu municipio si no se aplican medidas preventivas.',
    relatedCitations: ['costa-2012', 'keall-2011']
  },
  {
    id: 'gl-prevalencia-discapacidad',
    term: 'Prevalencia de Discapacidad de Larga Duración',
    category: 'Métricas Epidemiológicas',
    shortTag: 'Secuelas permanentes',
    plainLanguageSummary:
      'A diferencia de la incidencia (que cuenta accidentes nuevos), la prevalencia de discapacidad mide cuántas personas viven hoy con secuelas permanentes o dependencia a raíz de haber sufrido un accidente en casa.',
    technicalDefinition:
      'Proporción de individuos de una población que presentan limitación funcional prolongada o dependencia atribuible a lesiones domésticas previas en un momento dado.',
    siteExample:
      'En España, la prevalencia de discapacidad de larga duración por accidentes del hogar aumenta marcadamente después de los 55 años y se dispara en los grupos de 75–84 y 85+ años (Guillén 2023).',
    practicalTakeaway:
      'Explica por qué una caída en una persona de 78 años no es un simple golpe, sino a menudo el inicio de la pérdida de autonomía.',
    relatedCitations: ['guillen-2023', 'lopez-soto-2019']
  },
  {
    id: 'gl-hla',
    term: 'HLA (Home and Leisure Accidents)',
    category: 'Sistemas de Vigilancia',
    shortTag: 'Hogar y Ocio',
    plainLanguageSummary:
      'Siglas en inglés de «Accidentes Domésticos y de Ocio». Agrupa todas las lesiones no intencionales que ocurren en la vivienda, jardín y tiempo libre (excluyendo accidentes laborales y de tráfico).',
    technicalDefinition:
      'Categoría nosológica europea que engloba los traumatismos, intoxicaciones y quemaduras no intencionales producidos en el ámbito residencial, escolar, deportivo no profesional y recreativo.',
    siteExample:
      'El 92.9% de los episodios HLA pediátricos (0–19 años) en Europa son dados de alta directamente desde urgencias sin necesidad de ingreso hospitalario (Alves 2024).',
    practicalTakeaway:
      'En Europa los accidentes HLA causan casi 110,000 muertes al año, superando la mortalidad por accidentes de tráfico (Keall 2011).',
    relatedCitations: ['alves-2024', 'keall-2011']
  },
  {
    id: 'gl-admision-hospitalaria',
    term: 'Probabilidad de Admisión / Ingreso Hospitalario',
    category: 'Métricas Epidemiológicas',
    shortTag: 'Gravedad clínica',
    plainLanguageSummary:
      'Es la proporción de personas que, tras acudir a urgencias por un accidente en casa, no pueden volver en el día a su domicilio y deben quedar ingresadas en una cama de hospital por la gravedad de la lesión.',
    technicalDefinition:
      'Riesgo condicional de hospitalización en planta o unidad de cuidados críticos tras la atención inicial en el servicio de urgencias por una lesión intradomiciliaria.',
    siteExample:
      'Mientras que en menores de 19 años solo ingresa el 7.1% (92.9% sin admisión, Alves 2024), la probabilidad de ingreso se multiplica en personas de 75 años o más y en intoxicaciones (Alves 2025).',
    practicalTakeaway:
      'Es el indicador más fiel de la gravedad médica real: los niños van mucho a urgencias por casos leves, pero los mayores de 75 años ingresan con mucha frecuencia.',
    relatedCitations: ['alves-2025', 'alves-2024', 'piffer-2021']
  },
  {
    id: 'gl-caida-mismo-nivel',
    term: 'Caída al Mismo Nivel vs. Distinto Nivel',
    category: 'Clínica y Biomecánica',
    shortTag: 'Mecanismo Biomecánico',
    plainLanguageSummary:
      '«Caída al mismo nivel» significa tropezar o resbalar caminando sobre el suelo plano (con una alfombra, suelo mojado del baño o cable). «A distinto nivel» significa caer desde una altura (escaleras, cama, silla o ventana).',
    technicalDefinition:
      'Clasificación cinemática del mecanismo de lesión según exista o no diferencia de cota gravitatoria entre la superficie de sustentación inicial y el plano de impacto.',
    siteExample:
      'En España (Costa 2012), las caídas al mismo nivel junto con los objetos cortantes son las dos causas más comunes de accidentes en el hogar; en toda Europa las caídas suman el 56.2% (Alves 2025).',
    practicalTakeaway:
      'Fijar o retirar alfombras y colocar suelo antideslizante en la ducha ataca directamente la causa número uno de accidentes en España.',
    relatedCitations: ['costa-2012', 'alves-2025']
  },
  {
    id: 'gl-serie-multicentrica',
    term: 'Serie Multicéntrica Pediátrica',
    category: 'Sistemas de Vigilancia',
    shortTag: 'Estudio en varios hospitales',
    plainLanguageSummary:
      'Es un estudio médico realizado simultáneamente en varios hospitales de distintas ciudades para que las conclusiones sean sólidas y representen a todo el país, no solo a un barrio o centro.',
    technicalDefinition:
      'Diseño de investigación clínica observacional que recolecta casos bajo un protocolo unificado en múltiples centros hospitalarios de referencia.',
    siteExample:
      'En la serie multicéntrica pediátrica española de Rivas García (2018), se demostró que cerca del 40% de las lesiones infantiles ocurrieron sin un adulto presente y el 14.4% causaron fracturas.',
    practicalTakeaway:
      'Aporta pruebas clínicas directas de que instalar barreras pasivas (en ventanas, escaleras y cocina) protege a los niños en ese 40% de momentos en que el adulto no está mirando.',
    relatedCitations: ['rivas-garcia-2018']
  },
  {
    id: 'gl-fragilidad-funcional',
    term: 'Fragilidad Funcional y Polifarmacia',
    category: 'Clínica y Biomecánica',
    shortTag: 'Vulnerabilidad en mayores',
    plainLanguageSummary:
      'La fragilidad funcional es la pérdida progresiva de fuerza muscular, equilibrio y reflejos al envejecer. La polifarmacia es tomar 5 o más medicamentos al día, lo que puede causar mareos, somnolencia o confusión de dosis.',
    technicalDefinition:
      'Síndrome geriátrico caracterizado por disminución de la reserva fisiológica y resistencia a estresores, frecuentemente potenciado por el consumo concomitante de múltiples fármacos psicótropos o cardiovasculares.',
    siteExample:
      'En mayores españoles, los accidentes domésticos afectan sobre todo a mujeres y se asocian con edad, depresión y limitación funcional (López-Soto 2019), mientras que las intoxicaciones disparan el ingreso en 75+ (Alves 2025).',
    practicalTakeaway:
      'Revisar la medicación con el médico, cuidar el ánimo y adaptar el baño son tan importantes como quitar obstáculos del suelo.',
    relatedCitations: ['lopez-soto-2019', 'alves-2025', 'guillen-2023']
  }
];

