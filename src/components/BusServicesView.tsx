import React, { useState } from 'react';
import { BusServiceDetail, RouteStop } from '../types/transit';
import { BUS_SERVICES } from '../data/transitData';
import { ArrowLeftRight, Clock, MapPin, Bus, Train, CheckCircle2, ChevronRight } from 'lucide-react';

interface BusServicesViewProps {
  selectedServiceNo: string;
  onSelectService: (serviceNo: string) => void;
  onJumpToStop: (stopCode: string) => void;
}

export const BusServicesView: React.FC<BusServicesViewProps> = ({
  selectedServiceNo,
  onSelectService,
  onJumpToStop
}) => {
  const [activeDirection, setActiveDirection] = useState<1 | 2>(1);

  const service = BUS_SERVICES[selectedServiceNo] || BUS_SERVICES['147'];
  const directionData = service.directions.find((d) => d.directionNumber === activeDirection) || service.directions[0];

  // MRT badge color map
  const getMrtBadgeColor = (code: string) => {
    if (code.startsWith('EW')) return 'bg-[#009640] text-white';
    if (code.startsWith('NS')) return 'bg-[#D42E12] text-white';
    if (code.startsWith('NE')) return 'bg-[#9016B2] text-white';
    if (code.startsWith('CC')) return 'bg-[#FA9E0D] text-white';
    if (code.startsWith('DT')) return 'bg-[#0054A6] text-white';
    if (code.startsWith('TE')) return 'bg-[#9D5B25] text-white';
    return 'bg-[#64748B] text-white';
  };

  return (
    <div className="space-y-4">
      {/* Service Selector Chips Header */}
      <div className="bg-white p-3 rounded-xl border border-[#CBD5E1] shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-space font-bold text-xs uppercase tracking-wider text-[#6B1D73]">
            Select Transit Service:
          </span>
          <span className="text-[11px] text-[#81737F]">10 High-Frequency Routes</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {Object.keys(BUS_SERVICES).map((svcNo) => {
            const isSelected = svcNo === service.serviceNo;
            const cat = BUS_SERVICES[svcNo].category;
            return (
              <button
                key={svcNo}
                onClick={() => {
                  onSelectService(svcNo);
                  setActiveDirection(1);
                }}
                className={`px-3 py-1.5 rounded-lg font-space font-bold text-sm tracking-tight transition-all shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? cat === 'Express'
                      ? 'bg-[#B6171E] text-white shadow-xs'
                      : 'bg-[#6B1D73] text-white shadow-xs'
                    : 'bg-[#F1F4F9] text-[#181C20] hover:bg-[#E2E8F0]'
                }`}
              >
                <span>{svcNo}</span>
                {cat === 'Express' && (
                  <span className="text-[9px] px-1 py-0.2 rounded bg-red-900/60 text-white uppercase">EXP</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Service Card */}
      <div className="bg-white border border-[#CBD5E1] rounded-xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div
              className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center font-space font-bold text-2xl text-white shadow-xs ${
                service.category === 'Express' ? 'bg-[#B6171E]' : 'bg-[#6B1D73]'
              }`}
            >
              <span>{service.serviceNo}</span>
              {service.category !== 'Standard' && (
                <span className="text-[9px] uppercase tracking-wider opacity-80 mt-0.5 font-medium">
                  {service.category}
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#81737F] uppercase tracking-wider">
                  Operator: {service.operator}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Daily Service
                </span>
              </div>
              <h1 className="font-space font-bold text-xl sm:text-2xl text-[#181C20] mt-0.5">
                {service.origin} ↔ {service.destination}
              </h1>
            </div>
          </div>

          {/* Direction Switcher Toggle */}
          {service.directions.length > 1 && (
            <div className="flex bg-[#F1F4F9] p-1 rounded-lg border border-[#CBD5E1]">
              {service.directions.map((d) => (
                <button
                  key={d.directionNumber}
                  onClick={() => setActiveDirection(d.directionNumber)}
                  className={`px-3 py-1.5 rounded-md font-space text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeDirection === d.directionNumber
                      ? 'bg-[#6B1D73] text-white shadow-2xs'
                      : 'text-[#4F434E] hover:text-[#181C20]'
                  }`}
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  <span>Dir {d.directionNumber}: {d.directionLabel.replace('Towards ', '')}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Operating Schedule & Frequency Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 text-xs border-b border-slate-100">
          <div className="p-2.5 rounded-lg bg-[#F7F9FF] border border-[#E2E8F0]">
            <span className="text-[10px] uppercase font-bold text-[#81737F] block">First Bus</span>
            <div className="mt-1 font-space font-bold text-sm text-[#181C20]">
              {directionData.firstBusWeekday} hrs
            </div>
            <span className="text-[10px] text-[#4F434E]">Weekends: {directionData.firstBusWeekend}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#F7F9FF] border border-[#E2E8F0]">
            <span className="text-[10px] uppercase font-bold text-[#81737F] block">Last Bus</span>
            <div className="mt-1 font-space font-bold text-sm text-[#181C20]">
              {directionData.lastBusWeekday} hrs
            </div>
            <span className="text-[10px] text-[#4F434E]">Weekends: {directionData.lastBusWeekend}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#F7F9FF] border border-[#E2E8F0]">
            <span className="text-[10px] uppercase font-bold text-[#81737F] block">Peak Headway</span>
            <div className="mt-1 font-space font-bold text-sm text-[#00875A]">
              {directionData.peakFrequency}
            </div>
            <span className="text-[10px] text-[#4F434E]">High-frequency dispatch</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#F7F9FF] border border-[#E2E8F0]">
            <span className="text-[10px] uppercase font-bold text-[#81737F] block">Off-Peak Headway</span>
            <div className="mt-1 font-space font-bold text-sm text-[#4F434E]">
              {directionData.offPeakFrequency}
            </div>
            <span className="text-[10px] text-[#4F434E]">Standard intervals</span>
          </div>
        </div>

        {/* Live Route Stops Sequence Ladder */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-space font-bold text-sm uppercase tracking-wider text-[#181C20] flex items-center gap-2">
              <Bus className="w-4 h-4 text-[#6B1D73]" />
              <span>Route Sequence & Live Bus Tracking ({directionData.stops.length} Stops)</span>
            </h3>
            <span className="text-[11px] text-[#81737F]">Click any stop to jump to live arrival board</span>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-4">
            {/* The vertical transit spine track */}
            <div className="absolute left-[19px] sm:left-[27px] top-3 bottom-3 w-1 bg-gradient-to-b from-[#6B1D73] via-[#B6171E] to-[#6B1D73] rounded-full"></div>

            {directionData.stops.map((stop, index) => {
              const isTerminus = index === 0 || index === directionData.stops.length - 1;

              return (
                <div key={stop.stopCode} className="relative group">
                  {/* Node icon along line */}
                  <div
                    className={`absolute -left-[23px] sm:-left-[27px] top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-xs flex items-center justify-center transition-all ${
                      isTerminus
                        ? 'bg-[#6B1D73] ring-4 ring-[#6B1D73]/20'
                        : stop.hasBusNow
                        ? 'bg-emerald-500 ring-4 ring-emerald-500/30 animate-pulse'
                        : 'bg-[#81737F] group-hover:bg-[#6B1D73]'
                    }`}
                  ></div>

                  {/* Stop Information card */}
                  <div
                    onClick={() => onJumpToStop(stop.stopCode)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                      stop.hasBusNow
                        ? 'bg-emerald-50/70 border-emerald-300 shadow-xs'
                        : 'bg-white border-[#E2E8F0] hover:border-[#6B1D73] hover:shadow-xs'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-space font-bold text-xs bg-[#4F0058] text-white px-2 py-0.5 rounded">
                          {stop.stopCode}
                        </span>
                        <span className="font-space font-bold text-sm text-[#181C20] group-hover:text-[#6B1D73] transition-colors">
                          {stop.stopName}
                        </span>

                        {/* MRT interchange badges */}
                        {stop.mrtTransfer && stop.mrtTransfer.map((mrt) => (
                          <span
                            key={mrt}
                            className={`text-[9px] font-space font-bold px-1.5 py-0.2 rounded shadow-2xs ${getMrtBadgeColor(
                              mrt
                            )}`}
                          >
                            {mrt}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#4F434E]">
                        <span>Along {stop.roadName}</span>
                        <span className="text-slate-300">•</span>
                        <span className="font-space font-medium text-[11px] text-[#81737F]">
                          {stop.distanceKm.toFixed(1)} km from origin
                        </span>
                      </div>
                    </div>

                    {/* Live bus marker status if bus is at or approaching this stop */}
                    {stop.hasBusNow ? (
                      <div className="flex items-center gap-2 bg-emerald-600 text-white px-2.5 py-1.5 rounded-md font-space text-xs font-bold shadow-2xs self-start sm:self-center">
                        <Bus className="w-3.5 h-3.5 animate-bounce" />
                        <div>
                          <div className="text-[10px] leading-none uppercase tracking-wide opacity-90">Bus Approaching</div>
                          <div className="text-xs">{stop.busPlate} • {stop.busDeck === 'DD' ? 'Double Deck' : 'Single Deck'}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center text-[#81737F] group-hover:text-[#6B1D73] text-xs font-semibold self-end sm:self-center">
                        <span>Get Timings</span>
                        <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
