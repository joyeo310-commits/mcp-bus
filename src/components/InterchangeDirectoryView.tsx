import React, { useState } from 'react';
import { INTERCHANGE_BERTHS } from '../data/transitData';
import { InterchangeBerth } from '../types/transit';
import { Accessibility, MapPin, Building, ChevronRight, Info } from 'lucide-react';

interface InterchangeDirectoryViewProps {
  onSelectService: (serviceNo: string) => void;
  onSelectStop: (stopCode: string) => void;
}

export const InterchangeDirectoryView: React.FC<InterchangeDirectoryViewProps> = ({
  onSelectService,
  onSelectStop
}) => {
  const [selectedInterchange, setSelectedInterchange] = useState<InterchangeBerth>(INTERCHANGE_BERTHS[0]);

  return (
    <div className="space-y-4">
      {/* Interchange Selector Header */}
      <div className="bg-white p-4 rounded-xl border border-[#CBD5E1] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h2 className="font-space font-bold text-lg text-[#181C20] flex items-center gap-2">
              <Building className="w-5 h-5 text-[#6B1D73]" />
              <span>Bus Interchange Berth Directory</span>
            </h2>
            <p className="text-xs text-[#4F434E] mt-0.5">
              Locate designated boarding bays, wheelchair-accessible ramps, and terminal facilities.
            </p>
          </div>

          <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-[#F1F4F9] text-[#6B1D73] border border-[#6B1D73]/20 self-start sm:self-auto">
            Official LTA Berth Allocation
          </span>
        </div>

        {/* Interchange Switcher Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {INTERCHANGE_BERTHS.map((intc) => {
            const isSelected = selectedInterchange.interchangeCode === intc.interchangeCode;
            return (
              <button
                key={intc.interchangeCode}
                onClick={() => setSelectedInterchange(intc)}
                className={`px-3.5 py-2 rounded-lg font-space text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#6B1D73] text-white shadow-xs'
                    : 'bg-[#F1F4F9] text-[#181C20] hover:bg-[#E2E8F0]'
                }`}
              >
                <span>{intc.interchangeName}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${isSelected ? 'bg-[#4F0058]' : 'bg-white'}`}>
                  {intc.interchangeCode}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Interchange Details */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#CBD5E1] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-space font-bold text-sm bg-[#4F0058] text-white px-2 py-0.5 rounded">
                {selectedInterchange.interchangeCode}
              </span>
              <h3 className="font-space font-bold text-xl text-[#181C20]">
                {selectedInterchange.interchangeName}
              </h3>
            </div>
            <span className="text-xs text-[#4F434E] font-medium mt-0.5 block">
              Regional Hub • {selectedInterchange.zone}
            </span>
          </div>

          <button
            onClick={() => onSelectStop(selectedInterchange.interchangeCode)}
            className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-[#6B1D73] hover:bg-[#56155D] text-white font-space font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>View Live Arrivals Board</span>
          </button>
        </div>

        {/* Berths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {selectedInterchange.berths.map((berth) => (
            <div
              key={berth.berthNumber}
              className="p-3.5 rounded-lg border border-[#E2E8F0] bg-[#F7F9FF] hover:border-[#6B1D73] transition-all space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-space font-bold text-base text-[#6B1D73] bg-white px-2.5 py-0.5 rounded border border-[#6B1D73]/30 shadow-2xs">
                    {berth.berthNumber}
                  </span>
                  <span className="text-xs font-semibold text-[#4F434E]">Boarding Bay</span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-[#0284C7] bg-[#E0F2FE] px-2 py-0.5 rounded font-medium">
                  <Accessibility className="w-3 h-3" />
                  <span>{berth.wheelchairBoardingPoint}</span>
                </div>
              </div>

              {/* Services calling at this berth */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#81737F] block mb-1">
                  Departing Services:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {berth.services.map((svc) => (
                    <button
                      key={svc}
                      onClick={() => onSelectService(svc)}
                      className="px-2.5 py-1 rounded bg-white hover:bg-[#6B1D73] hover:text-white border border-[#CBD5E1] font-space font-bold text-xs text-[#181C20] transition-colors shadow-2xs"
                      title={`View route details for ${svc}`}
                    >
                      {svc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities info */}
              <div className="pt-2 border-t border-slate-200/80 flex items-center gap-1.5 text-[11px] text-[#4F434E]">
                <Info className="w-3.5 h-3.5 text-[#81737F] shrink-0" />
                <span className="truncate">{berth.amenitiesNearby}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
