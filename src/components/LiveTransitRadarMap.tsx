import React, { useState, useEffect } from 'react';
import { BusStop, BusArrivalService } from '../types/transit';
import { BUS_STOPS, getLiveArrivalsForStop } from '../data/transitData';
import { Bus, MapPin, Compass, Eye, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface LiveTransitRadarMapProps {
  onSelectStop: (stopCode: string) => void;
  onSelectService: (serviceNo: string) => void;
}

export const LiveTransitRadarMap: React.FC<LiveTransitRadarMapProps> = ({
  onSelectStop,
  onSelectService
}) => {
  const [activeStop, setActiveStop] = useState<BusStop>(BUS_STOPS[0]);
  const [stopArrivals, setStopArrivals] = useState<BusArrivalService[]>([]);
  const [regionFilter, setRegionFilter] = useState<'All' | 'Central' | 'West' | 'East'>('All');
  const [busAnimationStep, setBusAnimationStep] = useState<number>(0);

  // Animate simulated buses moving along corridors
  useEffect(() => {
    const timer = setInterval(() => {
      setBusAnimationStep((prev) => (prev + 1) % 100);
    }, 500);
    return () => clearInterval(timer);
  }, []);

  // Update arrivals when activeStop changes
  useEffect(() => {
    setStopArrivals(getLiveArrivalsForStop(activeStop.code, Math.floor(busAnimationStep / 5)));
  }, [activeStop, busAnimationStep]);

  // Moving buses definition along transit lines
  const movingBuses = [
    {
      id: 'bus-147-1',
      service: '147',
      plate: 'SBS3421K',
      deck: 'DD',
      // Interpolate from Hougang (67, 34) through Central (52, 56) to Jurong (26, 48)
      x: 67 - (busAnimationStep / 100) * 41,
      y: 34 + Math.sin((busAnimationStep / 100) * Math.PI) * 22,
      heading: 'Towards Jurong East'
    },
    {
      id: 'bus-190-1',
      service: '190',
      plate: 'SMB5890A',
      deck: 'BD',
      // Interpolate from West to Central
      x: 35 + ((busAnimationStep * 1.2) % 100) * 0.18,
      y: 30 + ((busAnimationStep * 1.2) % 100) * 0.3,
      heading: 'Towards Kampong Bahru'
    },
    {
      id: 'bus-502-1',
      service: '502',
      plate: 'SBS3982A',
      deck: 'DD',
      // Express via AYE
      x: 20 + ((busAnimationStep * 1.5) % 100) * 0.35,
      y: 52 - Math.cos(((busAnimationStep * 1.5) % 100) * 0.05) * 3,
      heading: 'Express towards Marina Centre'
    },
    {
      id: 'bus-65-1',
      service: '65',
      plate: 'SG5641T',
      deck: 'DD',
      // East to Central
      x: 78 - ((busAnimationStep * 0.9) % 100) * 0.3,
      y: 46 + ((busAnimationStep * 0.9) % 100) * 0.08,
      heading: 'Towards HarbourFront'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Top Map Controller */}
      <div className="bg-white p-4 rounded-xl border border-[#CBD5E1] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <h2 className="font-space font-bold text-lg text-[#181C20]">
              Singapore Civic Transit Radar
            </h2>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F1F4F9] text-[#6B1D73] px-2 py-0.5 rounded border border-[#6B1D73]/20">
              Live Fleet Telemetry
            </span>
          </div>
          <p className="text-xs text-[#4F434E] mt-0.5">
            Click any bus stop node or moving bus beacon to inspect live LTA arrival triad.
          </p>
        </div>

        {/* Region Quick Filters */}
        <div className="flex items-center gap-1.5 bg-[#F1F4F9] p-1 rounded-lg border border-[#CBD5E1]">
          {(['All', 'Central', 'West', 'East'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRegionFilter(r)}
              className={`px-3 py-1 rounded-md text-xs font-space font-bold transition-all ${
                regionFilter === r
                  ? 'bg-[#6B1D73] text-white shadow-2xs'
                  : 'text-[#4F434E] hover:text-[#181C20]'
              }`}
            >
              {r} Region
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive SVG Map Canvas */}
      <div className="relative w-full aspect-16/10 sm:aspect-21/10 bg-[#E8EEF5] rounded-xl border-2 border-[#CBD5E1] overflow-hidden shadow-inner select-none">
        {/* Singapore Island Outline & Geography */}
        <svg
          viewBox="0 0 100 80"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Waterway / Johor Strait & Singapore Strait backdrop */}
          <rect width="100" height="80" fill="#DCE6F1" />

          {/* Realistic Singapore Mainland Geometry */}
          <path
            d="M 12 45 
               C 10 38, 16 32, 22 28
               C 30 24, 40 22, 50 20
               C 62 18, 75 22, 85 30
               C 92 36, 95 44, 92 48
               C 88 52, 80 56, 75 58
               C 68 60, 58 64, 52 64
               C 42 63, 35 60, 28 58
               C 18 56, 12 50, 12 45 Z"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="0.8"
          />

          {/* Sentosa Island */}
          <path
            d="M 45 66 C 48 65, 52 66, 51 68 C 47 69, 44 68, 45 66 Z"
            fill="#F1F4F9"
            stroke="#CBD5E1"
            strokeWidth="0.5"
          />

          {/* Major Transit Expressways (PIE, AYE, CTE, ECP) schematic guides */}
          <path
            d="M 18 49 Q 50 48 85 45"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1.2"
            strokeDasharray="2 1"
          />
          <path
            d="M 22 48 Q 50 60 78 52"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1.2"
            strokeDasharray="2 1"
          />
          <path
            d="M 52 22 L 50 63"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1.2"
            strokeDasharray="2 1"
          />

          {/* Region Label Watermarks */}
          <text x="25" y="38" fontSize="2.5" fill="#94A3B8" fontWeight="600" fontFamily="Space Grotesk">
            WEST (JURONG)
          </text>
          <text x="50" y="44" fontSize="2.5" fill="#94A3B8" fontWeight="600" fontFamily="Space Grotesk">
            CENTRAL (ORCHARD / CBD)
          </text>
          <text x="75" y="38" fontSize="2.5" fill="#94A3B8" fontWeight="600" fontFamily="Space Grotesk">
            EAST (TAMPINES)
          </text>

          {/* Transit Route 147 Corridors */}
          <polyline
            points="67,34 54,53 52,56 50,58 49,62 33,50 26,48"
            fill="none"
            stroke="#6B1D73"
            strokeWidth="0.7"
            strokeOpacity="0.4"
          />

          {/* Transit Route 190 Corridors */}
          <polyline
            points="38,32 47,50 50,52 52,56 50,58 49,62"
            fill="none"
            stroke="#B6171E"
            strokeWidth="0.7"
            strokeOpacity="0.4"
          />

          {/* Transit Route 502 Express Corridors */}
          <polyline
            points="18,49 26,48 45,51 47,50 52,56"
            fill="none"
            stroke="#EB601B"
            strokeWidth="0.7"
            strokeOpacity="0.4"
          />

          {/* Bus Stops Plotted */}
          {BUS_STOPS.map((stop) => {
            const isMatchRegion =
              regionFilter === 'All' || stop.zone.toLowerCase().includes(regionFilter.toLowerCase());
            if (!isMatchRegion) return null;

            const isSelected = activeStop.code === stop.code;

            return (
              <g
                key={stop.code}
                className="cursor-pointer transition-transform hover:scale-125"
                onClick={() => setActiveStop(stop)}
              >
                {/* Ping wave if selected */}
                {isSelected && (
                  <circle
                    cx={stop.coordinates.x}
                    cy={stop.coordinates.y}
                    r="4"
                    fill="#6B1D73"
                    fillOpacity="0.2"
                    className="animate-ping"
                  />
                )}

                <circle
                  cx={stop.coordinates.x}
                  cy={stop.coordinates.y}
                  r={isSelected ? '2.2' : '1.5'}
                  fill={isSelected ? '#6B1D73' : '#4F0058'}
                  stroke="#FFFFFF"
                  strokeWidth="0.6"
                />

                {/* Stop Code tooltip text */}
                <text
                  x={stop.coordinates.x}
                  y={stop.coordinates.y - 2.5}
                  fontSize="1.8"
                  textAnchor="middle"
                  fill="#181C20"
                  fontWeight="700"
                  fontFamily="Space Grotesk"
                  className="pointer-events-none drop-shadow-xs"
                >
                  {stop.code}
                </text>
              </g>
            );
          })}

          {/* Moving Live Buses */}
          {movingBuses.map((bus) => (
            <g
              key={bus.id}
              className="cursor-pointer"
              onClick={() => onSelectService(bus.service)}
            >
              {/* Bus capsule */}
              <circle
                cx={bus.x}
                cy={bus.y}
                r="2.2"
                fill="#00875A"
                stroke="#FFFFFF"
                strokeWidth="0.6"
                className="shadow-xs"
              />
              <text
                x={bus.x}
                y={bus.y + 0.7}
                fontSize="1.4"
                textAnchor="middle"
                fill="#FFFFFF"
                fontWeight="800"
                fontFamily="Space Grotesk"
              >
                {bus.service}
              </text>
            </g>
          ))}
        </svg>

        {/* Floating Live Arrival HUD on Map */}
        <div className="absolute left-3 bottom-3 right-3 sm:right-auto sm:max-w-md bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#CBD5E1] shadow-lg">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="font-space font-bold text-xs bg-[#4F0058] text-white px-2 py-0.5 rounded">
                {activeStop.code}
              </span>
              <span className="font-space font-bold text-sm text-[#181C20] truncate">
                {activeStop.name}
              </span>
            </div>
            <button
              onClick={() => onSelectStop(activeStop.code)}
              className="px-2 py-1 bg-[#6B1D73] hover:bg-[#56155D] text-white text-[11px] font-space font-bold rounded flex items-center gap-1 transition-colors"
            >
              <span>Full Board</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <p className="text-[11px] text-[#4F434E] mt-0.5">{activeStop.road}</p>

          {/* Next 3 incoming services quick glance */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 grid grid-cols-3 gap-2">
            {stopArrivals.slice(0, 3).map((arr) => (
              <div
                key={arr.serviceNo}
                onClick={() => onSelectService(arr.serviceNo)}
                className="p-1.5 rounded bg-[#F7F9FF] border border-[#E2E8F0] text-center cursor-pointer hover:border-[#6B1D73]"
              >
                <div className="font-space font-bold text-xs text-[#6B1D73]">
                  Svc {arr.serviceNo}
                </div>
                <div className="font-space font-extrabold text-sm text-[#00875A] mt-0.5">
                  {arr.nextBus.estimatedMinutes === 0 ? 'Arr' : `${arr.nextBus.estimatedMinutes}m`}
                </div>
                <div className="text-[9px] text-[#81737F] font-semibold">
                  {arr.nextBus.deck} • WAB
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Legend Overlay */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-2 rounded-lg border border-[#CBD5E1] text-[10px] space-y-1 hidden sm:block">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4F0058]"></span>
            <span className="font-medium text-[#181C20]">Bus Stop Node</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00875A]"></span>
            <span className="font-medium text-[#181C20]">Live Moving Bus</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 bg-[#6B1D73]"></span>
            <span className="font-medium text-[#181C20]">Transit Corridors</span>
          </div>
        </div>
      </div>
    </div>
  );
};
