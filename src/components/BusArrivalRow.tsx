import React, { useState } from 'react';
import { BusArrivalService, NextBusInfo } from '../types/transit';
import { Accessibility, Star, ChevronDown, ChevronUp, MapPin, Gauge } from 'lucide-react';

interface BusArrivalRowProps {
  arrival: BusArrivalService;
  onSelectService?: (serviceNo: string) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (serviceNo: string) => void;
}

export const BusArrivalRow: React.FC<BusArrivalRowProps> = ({
  arrival,
  onSelectService,
  isBookmarked = false,
  onToggleBookmark
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Helper for timing text
  const formatTiming = (minutes: number) => {
    if (minutes === 0) return 'Arr';
    if (minutes === 1) return '1 min';
    return `${minutes} min`;
  };

  // Helper for LTA Load styling matching exact spec
  const getLoadBadgeStyle = (load: NextBusInfo['load']) => {
    switch (load) {
      case 'SEA': // Seats Available
        return {
          textColor: 'text-[#00875A]',
          bgTint: 'bg-[#E6F4EA]',
          border: 'border-[#00875A]/25',
          label: 'Seats Available',
          dotBg: 'bg-[#00875A]'
        };
      case 'SDA': // Standing Available
        return {
          textColor: 'text-[#D97706]',
          bgTint: 'bg-[#FEF3C7]',
          border: 'border-[#D97706]/25',
          label: 'Standing Available',
          dotBg: 'bg-[#D97706]'
        };
      case 'LSD': // Limited Standing / Crowded
      default:
        return {
          textColor: 'text-[#DC2626]',
          bgTint: 'bg-[#FEE2E2]',
          border: 'border-[#DC2626]/25',
          label: 'Limited Standing',
          dotBg: 'bg-[#DC2626]'
        };
    }
  };

  // Service Badge badge style based on category
  const getCategoryBadge = () => {
    if (arrival.category === 'Express') {
      return {
        badgeBg: 'bg-[#B6171E] text-white border-[#930010]',
        tag: 'EXPRESS',
        tagBg: 'bg-[#FFDAD6] text-[#930010] border-[#930010]/30'
      };
    }
    if (arrival.category === 'Feeder') {
      return {
        badgeBg: 'bg-[#00875A] text-white border-[#006644]',
        tag: 'FEEDER',
        tagBg: 'bg-[#E6F4EA] text-[#006644] border-[#00875A]/30'
      };
    }
    // Default Standard
    return {
      badgeBg: 'bg-[#6B1D73] text-white border-[#4F0058]',
      tag: '',
      tagBg: 'bg-[#F1F4F9] text-[#6B1D73] border-[#6B1D73]/20'
    };
  };

  const badgeStyle = getCategoryBadge();

  // Sub-component for individual timing slot in the triad
  const renderTimingSlot = (busInfo?: NextBusInfo, label?: string) => {
    if (!busInfo) {
      return (
        <div className="flex flex-col items-center justify-center min-w-[70px] sm:min-w-[84px] py-1">
          <span className="text-[11px] font-space text-[#81737F] font-semibold uppercase">{label}</span>
          <div className="mt-1 px-3 py-1 rounded-full bg-[#F1F4F9] border border-[#E2E8F0] text-xs font-space text-[#81737F] font-medium">
            --
          </div>
          <span className="text-[10px] text-[#81737F] mt-1 font-mono">No data</span>
        </div>
      );
    }

    const loadStyle = getLoadBadgeStyle(busInfo.load);

    return (
      <div className="flex flex-col items-center justify-center min-w-[70px] sm:min-w-[84px] py-0.5">
        <span className="text-[10px] font-space text-[#4F434E] font-semibold tracking-wide uppercase">
          {label}
        </span>

        {/* Dynamic color-coded pill */}
        <div
          className={`mt-1 px-2.5 sm:px-3 py-1 rounded-full border ${loadStyle.border} ${loadStyle.bgTint} ${loadStyle.textColor} font-space font-bold text-xs sm:text-sm tracking-tight flex items-center gap-1 shadow-2xs transition-all`}
          title={`${formatTiming(busInfo.estimatedMinutes)} • ${loadStyle.label}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${loadStyle.dotBg} shrink-0`}></span>
          <span>{formatTiming(busInfo.estimatedMinutes)}</span>
        </div>

        {/* Vehicle Type & WAB Badges positioned directly beneath each timing pill */}
        <div className="flex items-center gap-1 mt-1 text-[10px] font-semibold font-space">
          {busInfo.deck === 'DD' ? (
            <span
              className="px-1.5 py-0.2 rounded bg-[#3B82F6] text-white font-bold tracking-wider text-[9px] shadow-2xs flex items-center gap-0.5"
              title="Double Deck Bus"
            >
              <span>DD</span>
            </span>
          ) : busInfo.deck === 'BD' ? (
            <span
              className="px-1.5 py-0.2 rounded bg-[#7C3AED] text-white font-bold tracking-wider text-[9px] shadow-2xs"
              title="Bendy Articulated Bus"
            >
              BD
            </span>
          ) : (
            <span
              className="px-1.5 py-0.2 rounded bg-[#E2E8F0] text-[#4F434E] font-bold text-[9px]"
              title="Single Deck Bus"
            >
              SD
            </span>
          )}

          {busInfo.wab && (
            <span
              className="p-0.5 rounded bg-[#0284C7]/10 text-[#0284C7] flex items-center justify-center"
              title="Wheelchair Accessible Bus (WAB)"
            >
              <Accessibility className="w-2.5 h-2.5 stroke-[2.5]" />
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`rounded-lg transition-all duration-200 border ${
        isExpanded
          ? 'bg-[#FFFFFF] border-[#6B1D73] shadow-[0px_4px_12px_rgba(107,29,115,0.08)]'
          : 'bg-[#FFFFFF] border-[#E2E8F0] hover:border-[#CBD5E1] shadow-2xs'
      }`}
    >
      {/* Top summary row: Click anywhere to expand/collapse */}
      <div
        className="p-3 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Left: Service Identity & Destination */}
        <div className="flex items-start sm:items-center space-x-3.5 min-w-0">
          {/* Service Badge: Space Grotesk Bold, 20px-28px, encapsulated in high-contrast container */}
          <div
            className={`w-14 sm:w-16 h-12 sm:h-14 rounded-lg border-2 ${badgeStyle.badgeBg} flex flex-col items-center justify-center shrink-0 shadow-xs`}
          >
            <span className="font-space font-bold text-xl sm:text-2xl leading-none tracking-tight">
              {arrival.serviceNo}
            </span>
            {badgeStyle.tag ? (
              <span className="text-[8px] font-bold tracking-wider opacity-85 uppercase mt-0.5">
                {badgeStyle.tag}
              </span>
            ) : null}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-[#81737F]">Towards</span>
              <span className="text-sm sm:text-base font-space font-bold text-[#181C20] truncate">
                {arrival.destinationName}
              </span>
              <span className="text-[10px] font-medium text-[#4F434E] bg-[#F1F4F9] px-1.5 py-0.2 rounded border border-[#E2E8F0]">
                {arrival.operator}
              </span>
            </div>

            <div className="flex items-center gap-3 mt-1 text-xs text-[#4F434E]">
              <span className="flex items-center gap-1 font-space">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Next in {formatTiming(arrival.nextBus.estimatedMinutes)}</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] text-[#81737F] hidden sm:inline">
                {arrival.nextBus.deck === 'DD' ? 'Double Deck' : 'Single Deck'} • {arrival.nextBus.load === 'SEA' ? 'Seats Available' : arrival.nextBus.load === 'SDA' ? 'Standing Only' : 'Crowded'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Three-Stage Arrival Timing Triad */}
        <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-[#F1F4F9]">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {renderTimingSlot(arrival.nextBus, 'Next')}
            <span className="text-slate-300 font-light text-sm hidden xs:inline">|</span>
            {renderTimingSlot(arrival.nextBus2, 'Subsequent')}
            <span className="text-slate-300 font-light text-sm hidden xs:inline">|</span>
            {renderTimingSlot(arrival.nextBus3, '3rd Bus')}
          </div>

          <div className="pl-1 sm:pl-2 flex items-center text-[#81737F]">
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-[#6B1D73]" />
            ) : (
              <ChevronDown className="w-4 h-4 hover:text-[#6B1D73]" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Vehicle Telemetry & Commuter Actions */}
      {isExpanded && (
        <div className="px-4 py-3 bg-[#F7F9FF] border-t border-[#E2E8F0] rounded-b-lg text-xs space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Bus 1 Telemetry */}
            <div className="p-2.5 rounded-md bg-[#FFFFFF] border border-[#E2E8F0] space-y-1.5">
              <div className="flex items-center justify-between text-[#81737F]">
                <span className="font-space font-bold text-[11px] text-[#181C20]">Next Bus Telemetry</span>
                <span className="font-mono text-[10px] text-[#4F434E] font-semibold">{arrival.nextBus.plateNumber}</span>
              </div>
              <p className="text-[11px] text-[#4F434E] truncate font-medium">
                {arrival.nextBus.vehicleModel}
              </p>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                <span className="text-[#81737F]">Distance:</span>
                <span className="font-space font-semibold text-[#181C20]">
                  {arrival.nextBus.distanceMetres > 0 ? `${arrival.nextBus.distanceMetres}m away` : 'At stop'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#81737F]">Deck & Access:</span>
                <span className="font-space font-semibold text-[#181C20]">
                  {arrival.nextBus.deck === 'DD' ? 'Double Deck' : 'Single Deck'} (WAB)
                </span>
              </div>
            </div>

            {/* Bus 2 Telemetry */}
            {arrival.nextBus2 && (
              <div className="p-2.5 rounded-md bg-[#FFFFFF] border border-[#E2E8F0] space-y-1.5">
                <div className="flex items-center justify-between text-[#81737F]">
                  <span className="font-space font-bold text-[11px] text-[#181C20]">Subsequent Bus</span>
                  <span className="font-mono text-[10px] text-[#4F434E] font-semibold">{arrival.nextBus2.plateNumber}</span>
                </div>
                <p className="text-[11px] text-[#4F434E] truncate font-medium">
                  {arrival.nextBus2.vehicleModel}
                </p>
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                  <span className="text-[#81737F]">Estimated ETA:</span>
                  <span className="font-space font-semibold text-[#181C20]">
                    {arrival.nextBus2.estimatedMinutes} mins ({arrival.nextBus2.distanceMetres}m)
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#81737F]">Occupancy:</span>
                  <span className="font-space font-semibold text-[#181C20]">
                    {arrival.nextBus2.load === 'SEA' ? 'Seats Available' : arrival.nextBus2.load === 'SDA' ? 'Standing Space' : 'Crowded'}
                  </span>
                </div>
              </div>
            )}

            {/* Quick Actions Panel */}
            <div className="p-2.5 rounded-md bg-[#FFFFFF] border border-[#E2E8F0] flex flex-col justify-between space-y-2">
              <span className="font-space font-bold text-[11px] text-[#181C20]">Commuter Tools</span>
              <div className="flex flex-col gap-1.5">
                {onSelectService && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectService(arrival.serviceNo);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded bg-[#6B1D73] hover:bg-[#56155D] text-white text-[11px] font-bold font-space transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>View Route Stops</span>
                  </button>
                )}

                {onToggleBookmark && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(arrival.serviceNo);
                    }}
                    className={`w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded border text-[11px] font-bold font-space transition-colors ${
                      isBookmarked
                        ? 'border-amber-400 bg-amber-50 text-amber-700'
                        : 'border-[#CBD5E1] bg-white text-[#4F434E] hover:bg-[#F1F4F9]'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
                    <span>{isBookmarked ? 'Pinned to Commute' : 'Pin This Service'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
