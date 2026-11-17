import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Map as MapLibreMap,
  Marker,
  Popup,
  type GeoJSONSourceSpecification,
} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  Compass,
  RotateCw,
  Pause,
  Eye,
  Plus,
  Minus,
  Layers,
  Globe,
} from 'lucide-react';

interface LocationSectionProps {
  onOpenCtaModal?: () => void;
}

const VENUE = {
  name: 'Faculdade IBG',
  subtitle: 'IBG Business School',
  street: 'Avenida Lions Internacional, 818',
  neighborhood: 'Vila Aurora',
  cityState: 'Rondonópolis - MT',
  cep: '78740-162',
  fullAddress:
    'Avenida Lions Internacional, 818 · Vila Aurora, Rondonópolis - MT, CEP 78740-162',
  lat: -16.479125,
  lng: -54.616717,
  googleDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Faculdade+IBG,+Avenida+Lions+Internacional,+818,+Rondonopolis,+MT',
  wazeUrl: 'https://waze.com/ul?ll=-16.479125,-54.616717&navigate=yes',
  googleEmbedSatellite:
    'https://maps.google.com/maps?q=Faculdade+IBG,+Avenida+Lions+Internacional,+818,+Rondonopolis,+MT&t=k&z=17&ie=UTF8&iwloc=&output=embed',
  googleEmbedRoad:
    'https://maps.google.com/maps?q=Faculdade+IBG,+Avenida+Lions+Internacional,+818,+Rondonopolis,+MT&t=m&z=17&ie=UTF8&iwloc=&output=embed',
};

const OPEN_FREE_MAP_LIBERTY_STYLE = 'https://tiles.openfreemap.org/styles/liberty';

type MapEngineMode = '3d' | 'google';
type GoogleLayerType = 'satellite' | 'roadmap';
type CameraPreset = 'campus' | 'avenue' | 'city';

function hasWebGLSupport(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')
    );
  } catch {
    return false;
  }
}

function buildCampusFootprintGeoJSON(): GeoJSONSourceSpecification['data'] {
  const { lng, lat } = VENUE;
  const dx = 0.00024;
  const dy = 0.00018;

  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { name: VENUE.name, height: 18, base: 0 },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [lng - dx, lat - dy],
              [lng + dx, lat - dy],
              [lng + dx, lat + dy],
              [lng - dx, lat + dy],
              [lng - dx, lat - dy],
            ],
          ],
        },
      },
    ],
  };
}

export const LocationSection: React.FC<LocationSectionProps> = () => {
  const [webglSupported] = useState<boolean>(() => hasWebGLSupport());
  const [mapMode, setMapMode] = useState<MapEngineMode>(() =>
    hasWebGLSupport() ? '3d' : 'google'
  );
  const [googleLayer, setGoogleLayer] = useState<GoogleLayerType>('satellite');
  const [activePreset, setActivePreset] = useState<CameraPreset>('campus');
  const [isOrbiting, setIsOrbiting] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map3dError, setMap3dError] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<MapLibreMap | null>(null);
  const orbitRafRef = useRef<number | null>(null);

  const stopOrbit = useCallback(() => {
    if (orbitRafRef.current !== null) {
      cancelAnimationFrame(orbitRafRef.current);
      orbitRafRef.current = null;
    }
    setIsOrbiting(false);
  }, []);

  useEffect(() => {
    if (mapMode !== '3d' || !webglSupported || !mapContainerRef.current) {
      return;
    }

    let isDisposed = false;
    setMapLoaded(false);
    setMap3dError(false);

    const map = new MapLibreMap({
      container: mapContainerRef.current,
      style: OPEN_FREE_MAP_LIBERTY_STYLE,
      center: [VENUE.lng, VENUE.lat],
      zoom: 17.2,
      pitch: 62,
      bearing: 28,
      maxPitch: 85,
      cooperativeGestures: true,
    });

    mapInstanceRef.current = map;

    const handleUserInteraction = () => {
      if (orbitRafRef.current !== null) {
        cancelAnimationFrame(orbitRafRef.current);
        orbitRafRef.current = null;
        setIsOrbiting(false);
      }
    };

    map.on('dragstart', handleUserInteraction);
    map.on('wheel', handleUserInteraction);
    map.on('touchstart', handleUserInteraction);

    map.on('style.load', () => {
      if (isDisposed) return;

      // Extruded 3D highlight footprint for Faculdade IBG campus
      if (!map.getSource('ibg-campus-footprint')) {
        map.addSource('ibg-campus-footprint', {
          type: 'geojson',
          data: buildCampusFootprintGeoJSON(),
        });

        map.addLayer({
          id: 'ibg-campus-3d-volume',
          type: 'fill-extrusion',
          source: 'ibg-campus-footprint',
          paint: {
            'fill-extrusion-color': '#059669',
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'base'],
            'fill-extrusion-opacity': 0.52,
          },
        });
      }

      // Custom interactive campus marker
      const pinEl = document.createElement('button');
      pinEl.type = 'button';
      pinEl.setAttribute('aria-label', 'Faculdade IBG - Local do Treinamento');
      pinEl.className =
        'group flex flex-col items-center cursor-pointer focus:outline-none';
      pinEl.innerHTML = `
        <span style="background:#022c22;color:#ecfdf5;border:2px solid #34d399;border-radius:10px;padding:4px 10px;font-size:11px;font-weight:800;letter-spacing:0.03em;white-space:nowrap;box-shadow:0 10px 24px rgba(2,44,34,0.45);">
          Faculdade IBG · Turma 34
        </span>
        <span style="width:16px;height:16px;margin-top:4px;border-radius:9999px;background:#059669;border:3px solid #ffffff;box-shadow:0 4px 12px rgba(0,0,0,0.45);display:block;"></span>
      `;

      const popupContent = `
        <div style="font-family:system-ui,-apple-system,sans-serif;padding:4px 2px;max-width:230px;color:#0f172a;">
          <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:#047857;">
            Turma 34 · 04 e 05 de Dezembro
          </div>
          <div style="font-size:14px;font-weight:800;margin-top:2px;color:#0f172a;">
            ${VENUE.name}
          </div>
          <div style="font-size:12px;color:#475569;margin-top:4px;line-height:1.35;">
            ${VENUE.street} · ${VENUE.neighborhood}<br/>
            ${VENUE.cityState} · CEP ${VENUE.cep}
          </div>
        </div>
      `;

      const popup = new Popup({
        offset: 28,
        closeButton: true,
        closeOnClick: false,
      }).setHTML(popupContent);

      const marker = new Marker({ element: pinEl, anchor: 'bottom' })
        .setLngLat([VENUE.lng, VENUE.lat])
        .setPopup(popup)
        .addTo(map);

      marker.togglePopup();
      setMapLoaded(true);
    });

    map.on('error', () => {
      if (isDisposed) return;
      // Fallback transparently to zero-cost Google Maps iframe if open vector tiles fail
      setMap3dError(true);
      setMapMode('google');
    });

    return () => {
      isDisposed = true;
      stopOrbit();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [mapMode, webglSupported, stopOrbit]);

  const applyCameraPreset = (preset: CameraPreset) => {
    stopOrbit();
    setActivePreset(preset);
    const map = mapInstanceRef.current;
    if (!map) return;

    if (preset === 'campus') {
      map.flyTo({
        center: [VENUE.lng, VENUE.lat],
        zoom: 17.3,
        pitch: 64,
        bearing: 30,
        duration: 1200,
      });
    } else if (preset === 'avenue') {
      map.flyTo({
        center: [VENUE.lng, VENUE.lat],
        zoom: 15.6,
        pitch: 50,
        bearing: -24,
        duration: 1200,
      });
    } else {
      map.flyTo({
        center: [VENUE.lng, VENUE.lat],
        zoom: 13.7,
        pitch: 15,
        bearing: 0,
        duration: 1200,
      });
    }
  };

  const toggleOrbit360 = () => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (isOrbiting) {
      stopOrbit();
      return;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      map.easeTo({
        center: [VENUE.lng, VENUE.lat],
        bearing: map.getBearing() + 45,
        pitch: 64,
        duration: 600,
      });
      return;
    }

    setIsOrbiting(true);
    setActivePreset('campus');
    map.easeTo({
      center: [VENUE.lng, VENUE.lat],
      zoom: 17.1,
      pitch: 64,
      duration: 600,
    });

    let lastTime = performance.now();
    const rotate = (now: number) => {
      const currentMap = mapInstanceRef.current;
      if (!currentMap) return;
      const dt = Math.min(50, now - lastTime);
      lastTime = now;
      currentMap.setBearing((currentMap.getBearing() + dt * 0.015) % 360);
      orbitRafRef.current = requestAnimationFrame(rotate);
    };

    orbitRafRef.current = requestAnimationFrame(rotate);
  };

  const handleZoom = (delta: 'in' | 'out') => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (delta === 'in') {
      map.zoomIn({ duration: 300 });
    } else {
      map.zoomOut({ duration: 300 });
    }
  };

  return (
    <section
      id="local"
      className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50 to-emerald-50/40 text-slate-900 relative overflow-hidden border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-12">
          <h2 className="text-2xl min-[380px]:text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase text-balance">
            LOCAL DO TREINAMENTO
          </h2>
        </div>

        {/* Interactive Zero-Cost Map */}
        <div className="max-w-5xl mx-auto">
          {/* Zero-Cost Dual-Engine Interactive Map */}
          <div className="flex flex-col rounded-3xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-900/10 bg-slate-950">
            {/* Segmented Mode Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800">
                {webglSupported && !map3dError && (
                  <button
                    type="button"
                    onClick={() => setMapMode('3d')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap shrink-0 cursor-pointer ${
                      mapMode === '3d'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Mapa 3D Interativo</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    stopOrbit();
                    setMapMode('google');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap shrink-0 cursor-pointer ${
                    mapMode === 'google'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </button>
              </div>

              {mapMode === '3d' ? (
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => applyCameraPreset('campus')}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap shrink-0 cursor-pointer ${
                      activePreset === 'campus' && !isOrbiting
                        ? 'bg-slate-800 text-emerald-300 border border-emerald-500/40'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800 border border-transparent'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Campus 3D</span>
                  </button>

                  <button
                    type="button"
                    onClick={toggleOrbit360}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap shrink-0 cursor-pointer ${
                      isOrbiting
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-400/50'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800 border border-transparent'
                    }`}
                  >
                    {isOrbiting ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Pausar Órbita</span>
                      </>
                    ) : (
                      <>
                        <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                        <span>Orbitar 360°</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => applyCameraPreset('avenue')}
                    className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap shrink-0 cursor-pointer ${
                      activePreset === 'avenue'
                        ? 'bg-slate-800 text-emerald-300 border border-emerald-500/40'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800 border border-transparent'
                    }`}
                  >
                    <span>Av. Lions</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyCameraPreset('city')}
                    className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap shrink-0 cursor-pointer ${
                      activePreset === 'city'
                        ? 'bg-slate-800 text-emerald-300 border border-emerald-500/40'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800 border border-transparent'
                    }`}
                  >
                    <span>Vista Aérea</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      setGoogleLayer((prev) =>
                        prev === 'satellite' ? 'roadmap' : 'satellite'
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold transition whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    <span>
                      {googleLayer === 'satellite' ? 'Ver Mapa de Ruas' : 'Ver Satélite'}
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Map Viewport */}
            <div className="relative flex-1 min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] bg-slate-950">
              {mapMode === '3d' ? (
                <>
                  <div
                    ref={mapContainerRef}
                    className="w-full h-full min-h-[420px] sm:min-h-[480px] lg:min-h-[520px]"
                  />

                  {!mapLoaded && (
                    <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center p-6 text-center z-10">
                      <Compass className="w-8 h-8 text-emerald-400 animate-spin mb-3" />
                      <p className="text-sm font-bold text-slate-200">
                        Carregando mapa 3D de Rondonópolis - MT...
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Av. Lions Internacional, 818 · Faculdade IBG
                      </p>
                    </div>
                  )}

                  {/* Floating Zoom Controls */}
                  <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleZoom('in')}
                      aria-label="Aumentar zoom"
                      className="w-9 h-9 rounded-xl bg-slate-950/90 hover:bg-emerald-700 text-white border border-white/15 flex items-center justify-center shadow-lg transition cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleZoom('out')}
                      aria-label="Diminuir zoom"
                      className="w-9 h-9 rounded-xl bg-slate-950/90 hover:bg-emerald-700 text-white border border-white/15 flex items-center justify-center shadow-lg transition cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Subtle Gesture Hint */}
                  <div className="hidden sm:flex absolute bottom-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-sm border border-white/10 text-[11px] font-medium text-slate-300 pointer-events-none">
                    Arraste para mover · Botão direito ou dois dedos para inclinar em 3D
                  </div>
                </>
              ) : (
                <iframe
                  title="Mapa Faculdade IBG Rondonópolis MT"
                  src={
                    googleLayer === 'satellite'
                      ? VENUE.googleEmbedSatellite
                      : VENUE.googleEmbedRoad
                  }
                  className="w-full h-full min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
