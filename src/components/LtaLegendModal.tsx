import React from 'react';
import { X, Accessibility, Users, Bus, AlertCircle } from 'lucide-react';

interface LtaLegendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LtaLegendModal: React.FC<LtaLegendModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-white rounded-2xl border border-[#CBD5E1] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#4F0058] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#6B1D73] flex items-center justify-center font-bold text-sm">
              LTA
            </div>
            <div>
              <h3 className="font-space font-bold text-lg text-white">
                LTA Official Transit Standards
              </h3>
              <p className="text-xs text-white/80">
                Land Transport Authority Commuter Guide & Symbols
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs text-[#181C20]">
          {/* Passenger Load Capacity Tiers */}
          <div>
            <h4 className="font-space font-bold text-sm text-[#181C20] uppercase tracking-wider flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-[#6B1D73]" />
              <span>Real-Time Passenger Load Standards</span>
            </h4>

            <div className="space-y-2.5">
              {/* Seats Available */}
              <div className="p-3 rounded-lg border border-[#00875A]/30 bg-[#E6F4EA] flex items-start gap-3">
                <span className="w-4 h-4 rounded-full bg-[#00875A] shrink-0 mt-0.5"></span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-space font-bold text-sm text-[#00875A]">
                      Seats Available (SEA)
                    </span>
                    <span className="text-[10px] bg-white text-[#00875A] font-bold px-1.5 py-0.2 rounded border border-[#00875A]/20">
                      Normal
                    </span>
                  </div>
                  <p className="text-[#4F434E] mt-0.5 leading-relaxed">
                    Open seating is readily available on lower and upper decks. Commuters can board comfortably without congestion.
                  </p>
                </div>
              </div>

              {/* Standing Available */}
              <div className="p-3 rounded-lg border border-[#D97706]/30 bg-[#FEF3C7] flex items-start gap-3">
                <span className="w-4 h-4 rounded-full bg-[#D97706] shrink-0 mt-0.5"></span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-space font-bold text-sm text-[#D97706]">
                      Standing Available (SDA)
                    </span>
                    <span className="text-[10px] bg-white text-[#D97706] font-bold px-1.5 py-0.2 rounded border border-[#D97706]/20">
                      Moderate
                    </span>
                  </div>
                  <p className="text-[#4F434E] mt-0.5 leading-relaxed">
                    Seating capacity is near limit; standing space is available along the central aisle and lower deck concourse.
                  </p>
                </div>
              </div>

              {/* Limited Standing */}
              <div className="p-3 rounded-lg border border-[#DC2626]/30 bg-[#FEE2E2] flex items-start gap-3">
                <span className="w-4 h-4 rounded-full bg-[#DC2626] shrink-0 mt-0.5"></span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-space font-bold text-sm text-[#DC2626]">
                      Limited Standing / Crowded (LSD)
                    </span>
                    <span className="text-[10px] bg-white text-[#DC2626] font-bold px-1.5 py-0.2 rounded border border-[#DC2626]/20">
                      High Load
                    </span>
                  </div>
                  <p className="text-[#4F434E] mt-0.5 leading-relaxed">
                    Vehicle is operating near maximum licensed gross capacity. Consider boarding subsequent buses if travelling with strollers or heavy luggage.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Types & Accessibility */}
          <div>
            <h4 className="font-space font-bold text-sm text-[#181C20] uppercase tracking-wider flex items-center gap-2 mb-3">
              <Bus className="w-4 h-4 text-[#6B1D73]" />
              <span>Vehicle Fleet & Deck Types</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-lg border border-[#CBD5E1] bg-[#F7F9FF]">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#3B82F6] text-white font-space font-bold text-xs">
                    DD
                  </span>
                  <span className="font-space font-bold text-xs text-[#181C20]">Double Deck</span>
                </div>
                <p className="text-[11px] text-[#4F434E] mt-1.5">
                  High-capacity 12m double-decker holding up to 130 commuters with upstairs seating monitors.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-[#CBD5E1] bg-[#F7F9FF]">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#E2E8F0] text-[#4F434E] font-space font-bold text-xs">
                    SD
                  </span>
                  <span className="font-space font-bold text-xs text-[#181C20]">Single Deck</span>
                </div>
                <p className="text-[11px] text-[#4F434E] mt-1.5">
                  Standard single-deck rigid bus holding up to 85 commuters with low-floor step-free access.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-[#CBD5E1] bg-[#F7F9FF]">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-[#0284C7]/15 text-[#0284C7]">
                    <Accessibility className="w-3.5 h-3.5" />
                  </span>
                  <span className="font-space font-bold text-xs text-[#181C20]">WAB Certified</span>
                </div>
                <p className="text-[11px] text-[#4F434E] mt-1.5">
                  Wheelchair Accessible Bus equipped with ramp and dedicated bays for mobility devices.
                </p>
              </div>
            </div>
          </div>

          {/* Commuter Courtesy & Contact */}
          <div className="p-3.5 rounded-lg bg-[#F1F4F9] border border-[#E2E8F0] flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#6B1D73] shrink-0 mt-0.5" />
            <div className="text-[11px] text-[#4F434E] leading-relaxed">
              <span className="font-bold text-[#181C20] block">Civic Transit Advisory:</span>
              Please move to the rear of the bus or upper deck to allow smooth boarding at busy stops. Tap your SimplyGo contactless card or fare token upon boarding and alighting.
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#F7F9FF] border-t border-[#E2E8F0] p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#6B1D73] hover:bg-[#56155D] text-white font-space font-bold text-xs transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
