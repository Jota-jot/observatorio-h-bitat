import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export interface RoomHazardHotspot {
  id: string;
  x: number;
  y: number;
  label: string;
  mechanism: string;
  vulnerableGroup: string;
  epidemiologicalFact: string;
  citationId: string;
  citationLabel: string;
  mitigationAction: string;
}

export interface RoomData {
  id: string;
  name: string;
  shareOfHomeAccidents: number;
  primaryMechanism: string;
  riskLevelSenior: 'Crítico' | 'Alto' | 'Moderado';
  riskLevelChild: 'Crítico' | 'Alto' | 'Moderado';
  svgBounds: { x: number; y: number; width: number; height: number };
  summary: string;
  hotspots: RoomHazardHotspot[];
}

export const HOME_ROOMS_DATA: RoomData[] = [
  {
    id: 'cocina',
    name: 'Cocina y Oficio',
    shareOfHomeAccidents: 28.4,
    primaryMechanism: 'Objetos cortantes, escaldaduras e intoxicaciones',
    riskLevelSenior: 'Alto',
    riskLevelChild: 'Crítico',
    svgBounds: { x: 20, y: 20, width: 250, height: 190 },
    summary:
      'Epicentro de cortes con utensilios afilados (2ª causa global en España, Costa 2012), quemaduras térmicas en menores de 5 años (Sengoelge 2010) e ingesta accidental de productos químicos o errores de medicación (Alves 2025).',
    hotspots: [
      {
        id: 'hs-cuchillos',
        x: 95,
        y: 80,
        label: 'Zona de Corte y Encimera',
        mechanism: 'Heridas incisivas por objetos cortantes',
        vulnerableGroup: 'Toda la familia · Pico en adultos y escolares',
        epidemiologicalFact:
          'En Castilla y León (Costa 2012), los objetos cortantes junto con las caídas al mismo nivel son las dos causas más comunes de accidentes en el hogar.',
        citationId: 'costa-2012',
        citationLabel: 'Costa 2012',
        mitigationAction:
          'Instalar bloqueos en cajones de cuchillos, usar tablas con base de silicona antideslizante y colocar cubiertos con la punta hacia abajo.'
      },
      {
        id: 'hs-fuegos',
        x: 195,
        y: 75,
        label: 'Placa de Cocción y Horno',
        mechanism: 'Escaldaduras y quemaduras por líquidos calientes',
        vulnerableGroup: 'Menores de 5 años y mayores con deterioro funcional',
        epidemiologicalFact:
          'En 16 países europeos, las lesiones graves en casa son la 1ª causa de muerte por lesión en menores de 5 años (Sengoelge 2010).',
        citationId: 'sengoelge-2010',
        citationLabel: 'Sengoelge 2010',
        mitigationAction:
          'Usar fuegos traseros, girar mangos de sartenes hacia adentro e instalar bloqueo térmico en puerta de horno.'
      },
      {
        id: 'hs-quimicos',
        x: 145,
        y: 160,
        label: 'Armario Bajo Fregadero / Botiquín',
        mechanism: 'Intoxicaciones químicas y farmacológicas',
        vulnerableGroup: 'Menores de 5 años y mayores de 75 años',
        epidemiologicalFact:
          'La probabilidad de ingreso hospitalario aumenta drásticamente en las intoxicaciones y en personas de 75 años o más (Alves 2025).',
        citationId: 'alves-2025',
        citationLabel: 'Alves 2025',
        mitigationAction:
          'Trasladar detergentes en cápsulas y lejías a armarios elevados con cierre mecánico y organizar fármacos en pastilleros supervisados.'
      }
    ]
  },
  {
    id: 'bano',
    name: 'Baño y Aseo',
    shareOfHomeAccidents: 24.6,
    primaryMechanism: 'Caídas por deslizamiento y escaldaduras',
    riskLevelSenior: 'Crítico',
    riskLevelChild: 'Crítico',
    svgBounds: { x: 280, y: 20, width: 210, height: 190 },
    summary:
      'Estancia de mayor severidad biomecánica por metro cuadrado: combina superficies húmedas resbaladizas con transferencias posturales sin apoyo, disparando fracturas de cadera en mayores de 75 años (Guillén 2023).',
    hotspots: [
      {
        id: 'hs-ducha',
        x: 350,
        y: 85,
        label: 'Bañera / Plato de Ducha',
        mechanism: 'Caída por hidroplaneo y pérdida de equilibrio',
        vulnerableGroup: 'Mayores de 65 y 75+ años (predominio mujeres)',
        epidemiologicalFact:
          'El 56.2% de las lesiones en el hogar europeo son caídas (Alves 2025) y la discapacidad permanente se dispara en los grupos de 75–84 y 85+ años (Guillén 2023).',
        citationId: 'guillen-2023',
        citationLabel: 'Guillén 2023 · Alves 2025',
        mitigationAction:
          'Sustituir bañera por plato antideslizante a ras de suelo, instalar barras de apoyo murales y asiento abatible de ducha.'
      },
      {
        id: 'hs-inodoro',
        x: 430,
        y: 150,
        label: 'Transferencia en Inodoro y Lavabo',
        mechanism: 'Caída por hipotensión ortostática y agua >48 °C',
        vulnerableGroup: 'Mayores con fragilidad (López-Soto 2019) y niños <5 años',
        epidemiologicalFact:
          'En mayores españoles, los accidentes se asocian con edad, depresión y limitación funcional previa (López-Soto 2019).',
        citationId: 'lopez-soto-2019',
        citationLabel: 'López-Soto 2019',
        mitigationAction:
          'Colocar asidero abatible junto al inodoro y limitar la temperatura del calentador por debajo de 48 °C.'
      }
    ]
  },
  {
    id: 'escaleras',
    name: 'Escaleras y Pasillos',
    shareOfHomeAccidents: 19.2,
    primaryMechanism: 'Caídas a distinto y mismo nivel',
    riskLevelSenior: 'Crítico',
    riskLevelChild: 'Alto',
    svgBounds: { x: 500, y: 20, width: 240, height: 390 },
    summary:
      'Zona de tránsito donde confluyen desniveles arquitectónicos, falta de iluminación nocturna y alfombras decorativas no fijadas.',
    hotspots: [
      {
        id: 'hs-peldaños',
        x: 620,
        y: 130,
        label: 'Tramo de Escaleras Interiores',
        mechanism: 'Caída a distinto nivel con traumatismo o fractura',
        vulnerableGroup: 'Niños (14.4% fracturas en España) y mayores 75+',
        epidemiologicalFact:
          'En series pediátricas españolas el 14.4% de los accidentes provocan fracturas y cerca del 40% ocurren sin presencia de un adulto (Rivas García 2018).',
        citationId: 'rivas-garcia-2018',
        citationLabel: 'Rivas García 2018',
        mitigationAction:
          'Instalar barandillas infantiles homologadas en ambos extremos, pasamanos bilateral y bandas antideslizantes contrastadas en cada peldaño.'
      },
      {
        id: 'hs-pasillo',
        x: 580,
        y: 300,
        label: 'Pasillo de Tránsito Nocturno',
        mechanism: 'Tropiezo al mismo nivel en penumbra',
        vulnerableGroup: 'Personas mayores de 55, 75 y 85+ años',
        epidemiologicalFact:
          'La discapacidad de larga duración por accidentes domésticos crece de forma marcada a partir de los 55 años (Guillén 2023).',
        citationId: 'guillen-2023',
        citationLabel: 'Guillén 2023',
        mitigationAction:
          'Instalar balizas LED con sensor de movimiento a ras de zócalo y retirar cualquier cable o alfombra de pasillo.'
      }
    ]
  },
  {
    id: 'salon',
    name: 'Salón y Comedor',
    shareOfHomeAccidents: 16.5,
    primaryMechanism: 'Tropiezos con alfombras, golpes y vuelco de muebles',
    riskLevelSenior: 'Alto',
    riskLevelChild: 'Alto',
    svgBounds: { x: 20, y: 220, width: 270, height: 190 },
    summary:
      'Concentra la mayor parte de los 3.6 millones de episodios pediátricos de juego doméstico en Europa (Alves 2024) y caídas al mismo nivel por alfombras y mobiliario bajo.',
    hotspots: [
      {
        id: 'hs-alfombra',
        x: 135,
        y: 310,
        label: 'Alfombra Central y Mesas Bajas',
        mechanism: 'Caída al mismo nivel y traumatismo contra esquinas',
        vulnerableGroup: 'Niños 0–14 años (varones > niñas, Peiró-Pérez 2006) y mayores',
        epidemiologicalFact:
          'En Europa (EU-IDB) se registraron 3.6 millones de episodios en 0–19 años liderados por caídas, aunque el 92.9% no requirió ingreso (Alves 2024).',
        citationId: 'alves-2024',
        citationLabel: 'Alves 2024 · Peiró-Pérez 2006',
        mitigationAction:
          'Retirar o adherir perimetralmente las alfombras, proteger esquinas vivas y anclar estanterías y televisores a la pared.'
      },
      {
        id: 'hs-ventana',
        x: 60,
        y: 260,
        label: 'Ventanas y Balcón',
        mechanism: 'Precipitación accidental por escalada en mobiliario',
        vulnerableGroup: 'Menores de 5 y 14 años en lapsos sin supervisión',
        epidemiologicalFact:
          'Cerca del 40% de las lesiones pediátricas no intencionales en España no fueron presenciadas por un adulto (Rivas García 2018).',
        citationId: 'rivas-garcia-2018',
        citationLabel: 'Rivas García 2018',
        mitigationAction:
          'Instalar limitadores de apertura (<10 cm) en ventanas y separar sillas o sofás de las barandillas.'
      }
    ]
  },
  {
    id: 'dormitorio',
    name: 'Dormitorios',
    shareOfHomeAccidents: 11.3,
    primaryMechanism: 'Caídas al levantarse de la cama y asfixia infantil',
    riskLevelSenior: 'Alto',
    riskLevelChild: 'Moderado',
    svgBounds: { x: 300, y: 220, width: 190, height: 190 },
    summary:
      'Punto crítico durante la noche: levantarse de forma brusca bajo efectos de hipnóticos o antidepresivos multiplica las caídas en mayores (López-Soto 2019).',
    hotspots: [
      {
        id: 'hs-cama',
        x: 395,
        y: 315,
        label: 'Borde de Cama y Mesilla',
        mechanism: 'Caída al incorporarse en oscuridad o desde cuna/litera',
        vulnerableGroup: 'Mujeres mayores con fragilidad/depresión y lactantes',
        epidemiologicalFact:
          'En mayores españoles los accidentes afectan sobre todo a mujeres y se asocian con edad, depresión y limitación funcional (López-Soto 2019).',
        citationId: 'lopez-soto-2019',
        citationLabel: 'López-Soto 2019',
        mitigationAction:
          'Ajustar altura de cama (45–50 cm), incorporar luz táctil en mesilla y usar calzado cerrado antes de ponerse en pie.'
      }
    ]
  }
];

interface InteractiveFloorplanProps {
  onSelectCitation: (citationId: string) => void;
}

export const InteractiveFloorplan: React.FC<InteractiveFloorplanProps> = ({
  onSelectCitation
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>('cocina');
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>('hs-cuchillos');
  const [verifiedHotspots, setVerifiedHotspots] = useState<Record<string, boolean>>({});
  const [heatmapLens, setHeatmapLens] = useState<'all' | 'seniors' | 'children'>('all');

  const currentRoom =
    HOME_ROOMS_DATA.find((r) => r.id === selectedRoomId) || HOME_ROOMS_DATA[0];

  const currentHotspot =
    currentRoom.hotspots.find((h) => h.id === selectedHotspotId) ||
    currentRoom.hotspots[0];

  const handleRoomSelect = (room: RoomData) => {
    setSelectedRoomId(room.id);
    if (room.hotspots.length > 0) {
      setSelectedHotspotId(room.hotspots[0].id);
    }
  };

  const toggleVerifyHotspot = (id: string) => {
    setVerifiedHotspots((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalHotspotsCount = HOME_ROOMS_DATA.reduce(
    (acc, r) => acc + r.hotspots.length,
    0
  );
  const verifiedHotspotsCount = Object.values(verifiedHotspots).filter(Boolean).length;

  return (
    <div className="mt-12 bg-white border border-slate-200 p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#0088CE] font-semibold">
            <span>Cartografía Intradomiciliaria AssureCareWare</span>
            <span aria-hidden="true">·</span>
            <span>57.1% de los accidentes ocurren en casa (Costa 2012)</span>
          </div>
          <h3 className="text-2xl font-editorial text-[#0A1D37] mt-1">
            Plano de Riesgo por Estancias y Puntos Críticos de Intervención
          </h3>
        </div>

        {/* Lens Selector */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setHeatmapLens('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                heatmapLens === 'all'
                  ? 'bg-[#0A1D37] text-white'
                  : 'text-slate-600 hover:text-[#0A1D37]'
              }`}
            >
              Riesgo Global
            </button>
            <button
              type="button"
              onClick={() => setHeatmapLens('seniors')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                heatmapLens === 'seniors'
                  ? 'bg-[#0088CE] text-white'
                  : 'text-slate-600 hover:text-[#0A1D37]'
              }`}
            >
              Lente Mayores (65+ / 75+)
            </button>
            <button
              type="button"
              onClick={() => setHeatmapLens('children')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                heatmapLens === 'children'
                  ? 'bg-[#14A88B] text-white'
                  : 'text-slate-600 hover:text-[#0A1D37]'
              }`}
            >
              Lente Infancia (0–14)
            </button>
          </div>
        </div>
      </div>

      {/* Main Blueprint + Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-start">
        {/* Left 7 Cols: Interactive Architectural SVG Blueprint */}
        <div className="lg:col-span-7">
          <div className="bg-[#F8FAFC] border border-slate-200 p-4">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-3 px-1">
              <span>Haz clic en una estancia o en los nodos numerados para auditar el riesgo</span>
              <span className="font-mono-tabular text-[#14A88B] font-semibold">
                Puntos asegurados: {verifiedHotspotsCount}/{totalHotspotsCount}
              </span>
            </div>

            <svg
              viewBox="0 0 760 430"
              className="w-full h-auto border border-slate-300 bg-white select-none"
              role="img"
              aria-label="Plano arquitectónico interactivo del hogar con puntos de riesgo de accidentes domésticos"
            >
              <defs>
                <pattern
                  id="arch-grid"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="#F1F5F9"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="760" height="430" fill="url(#arch-grid)" />

              {/* Rooms */}
              {HOME_ROOMS_DATA.map((room) => {
                const isSelected = room.id === selectedRoomId;
                const activeRisk =
                  heatmapLens === 'seniors'
                    ? room.riskLevelSenior
                    : heatmapLens === 'children'
                    ? room.riskLevelChild
                    : room.shareOfHomeAccidents > 20
                    ? 'Crítico'
                    : 'Alto';

                const fillColor = isSelected
                  ? activeRisk === 'Crítico'
                    ? 'rgba(0, 136, 206, 0.12)'
                    : 'rgba(20, 168, 139, 0.12)'
                  : activeRisk === 'Crítico'
                  ? 'rgba(0, 136, 206, 0.04)'
                  : 'rgba(10, 29, 55, 0.02)';

                const strokeColor = isSelected ? '#0088CE' : '#94A3B8';

                return (
                  <g
                    key={room.id}
                    onClick={() => handleRoomSelect(room)}
                    className="cursor-pointer transition-opacity"
                  >
                    <rect
                      x={room.svgBounds.x}
                      y={room.svgBounds.y}
                      width={room.svgBounds.width}
                      height={room.svgBounds.height}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                    />

                    {room.id === 'escaleras' && (
                      <g stroke="#CBD5E1" strokeWidth="1.5">
                        {[0, 1, 2, 3, 4, 5, 6, 7].map((step) => (
                          <line
                            key={step}
                            x1={560}
                            y1={75 + step * 16}
                            x2={680}
                            y2={75 + step * 16}
                          />
                        ))}
                        <rect
                          x={560}
                          y={65}
                          width={120}
                          height={135}
                          fill="none"
                          stroke="#94A3B8"
                          strokeWidth="1"
                        />
                      </g>
                    )}

                    <text
                      x={room.svgBounds.x + 14}
                      y={room.svgBounds.y + 26}
                      className="text-[13px] font-semibold fill-[#0A1D37]"
                    >
                      {room.name}
                    </text>
                    <text
                      x={room.svgBounds.x + 14}
                      y={room.svgBounds.y + 44}
                      className="text-[11px] fill-slate-500 font-mono-tabular"
                    >
                      {room.shareOfHomeAccidents}% carga · Riesgo {activeRisk}
                    </text>
                  </g>
                );
              })}

              {/* Interactive Hazard Hotspots */}
              {HOME_ROOMS_DATA.flatMap((room) =>
                room.hotspots.map((hs, idx) => {
                  const isActive = hs.id === selectedHotspotId;
                  const isVerified = !!verifiedHotspots[hs.id];
                  return (
                    <g
                      key={hs.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRoomId(room.id);
                        setSelectedHotspotId(hs.id);
                      }}
                      className="cursor-pointer"
                    >
                      {isActive && (
                        <circle
                          cx={hs.x}
                          cy={hs.y}
                          r={18}
                          fill="none"
                          stroke={isVerified ? '#14A88B' : '#0088CE'}
                          strokeWidth="1.5"
                          strokeDasharray="3 2"
                        />
                      )}
                      <circle
                        cx={hs.x}
                        cy={hs.y}
                        r={12}
                        fill={
                          isVerified
                            ? '#14A88B'
                            : isActive
                            ? '#0088CE'
                            : '#0A1D37'
                        }
                        stroke="#FFFFFF"
                        strokeWidth="2"
                      />
                      <text
                        x={hs.x}
                        y={hs.y + 4}
                        textAnchor="middle"
                        className="text-[10px] font-mono-tabular font-semibold fill-white"
                      >
                        {isVerified ? '✓' : idx + 1}
                      </text>
                    </g>
                  );
                })
              )}
            </svg>

            {/* Quick Room Selector Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 mt-3">
              {HOME_ROOMS_DATA.map((room) => (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => handleRoomSelect(room)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                    selectedRoomId === room.id
                      ? 'bg-[#0088CE] text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {room.name} ({room.shareOfHomeAccidents}%)
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Selected Room & Hotspot Inspector */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#F8FAFC] border border-slate-200 p-6">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-200">
              <span className="uppercase tracking-wider font-semibold text-[#0A1D37]">
                Estancia: {currentRoom.name}
              </span>
              <span className="font-mono-tabular text-[#0088CE] font-semibold">
                {currentRoom.shareOfHomeAccidents}% de accidentes en casa
              </span>
            </div>

            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              {currentRoom.summary}
            </p>

            {/* Hotspot Tabs within current room */}
            <div className="mt-5">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-2">
                Puntos críticos en {currentRoom.name}:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentRoom.hotspots.map((hs, i) => {
                  const isSelected = hs.id === currentHotspot.id;
                  const isDone = !!verifiedHotspots[hs.id];
                  return (
                    <button
                      key={hs.id}
                      type="button"
                      onClick={() => setSelectedHotspotId(hs.id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors whitespace-nowrap ${
                        isSelected
                          ? 'bg-[#0A1D37] text-white border-[#0A1D37]'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-[#0088CE]'
                      }`}
                    >
                      {isDone ? '✓ ' : `${i + 1}. `}
                      {hs.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Hotspot Detail Card */}
            {currentHotspot && (
              <div className="mt-5 bg-white border border-slate-200 p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#0088CE] font-semibold block">
                      Foco de Lesión Seleccionado
                    </span>
                    <h4 className="text-lg font-editorial text-[#0A1D37]">
                      {currentHotspot.label}
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectCitation(currentHotspot.citationId)}
                    className="text-xs font-mono-tabular text-slate-600 underline hover:text-[#0088CE] whitespace-nowrap"
                  >
                    {currentHotspot.citationLabel}
                  </button>
                </div>

                <div className="text-xs space-y-1.5 pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400">Mecanismo: </span>
                    <span className="font-medium text-[#0A1D37]">
                      {currentHotspot.mechanism}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Grupo vulnerable: </span>
                    <span className="font-medium text-[#0A1D37]">
                      {currentHotspot.vulnerableGroup}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 bg-slate-50 p-3 border-l-2 border-[#0088CE] leading-relaxed">
                  {currentHotspot.epidemiologicalFact}
                </p>

                <div className="pt-2">
                  <span className="text-xs font-semibold text-[#0A1D37] block mb-1">
                    Intervención recomendada:
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {currentHotspot.mitigationAction}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => toggleVerifyHotspot(currentHotspot.id)}
                    className={`w-full py-2 px-4 rounded text-xs font-semibold transition-colors flex items-center justify-center gap-2 ${
                      verifiedHotspots[currentHotspot.id]
                        ? 'bg-[#14A88B] text-white hover:bg-[#0A1D37]'
                        : 'bg-[#0A1D37] text-white hover:bg-[#0088CE]'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {verifiedHotspots[currentHotspot.id]
                        ? 'Punto verificado y asegurado en mi hogar'
                        : 'Marcar este punto como asegurado en casa'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
