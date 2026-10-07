import React from 'react';
import { BusStop } from '../types/transit';
import { BUS_STOPS, BUS_SERVICES, getLiveArrivalsForStop } from '../data/transitData';
import { Bookmark, Star, ArrowRight, Trash2, MapPin, Bus } from 'lucide-react';

interface SavedCommutesViewProps {
  bookmarkedStops: string[];
  onToggleBookmarkStop: (stopCode: string) => void;
  bookmarkedServices: string[];
  onToggleBookmarkService: (serviceNo: string) => void;
  onSelectStop: (stopCode: string) => void;
  onSelectService: (serviceNo: string) => void;
}

export const SavedCommutesView: React.FC<SavedCommutesViewProps> = ({
  bookmarkedStops,
  onToggleBookmarkStop,
  bookmarkedServices,
  onToggleBookmarkService,
  onSelectStop,
  onSelectService
}) => {
  const stops = BUS_STOPS.filter((s) => bookmarkedStops.includes(s.code));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#CBD5E1] shadow-xs">
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-[#6B1D73]" />
          <h2 className="font-space font-bold text-xl text-[#181C20]">
            Saved Commutes & Favourites
          </h2>
        </div>
        <p className="text-xs text-[#4F434E] mt-1">
          Quickly monitor arrival timings for your regular home, workplace, and transfer connections.
        </p>
      </div>

      {/* Pinned Bus Stops */}
      <div className="space-y-3">
        <h3 className="font-space font-bold text-sm uppercase tracking-wider text-[#181C20] flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#6B1D73]" />
          <span>Pinned Bus Stops ({stops.length})</span>
        </h3>

        {stops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {stops.map((stop) => {
              const liveArrivals = getLiveArrivalsForStop(stop.code);

              return (
                <div
                  key={stop.code}
                  className="p-4 rounded-xl border border-[#CBD5E1] bg-white hover:border-[#6B1D73] shadow-xs transition-all space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-space font-bold text-xs bg-[#4F0058] text-white px-2 py-0.5 rounded">
                          {stop.code}
                        </span>
                        <h4 className="font-space font-bold text-base text-[#181C20]">
                          {stop.name}
                        </h4>
                      </div>
                      <p className="text-xs text-[#4F434E] mt-0.5">{stop.road}</p>
                    </div>

                    <button
                      onClick={() => onToggleBookmarkStop(stop.code)}
                      className="text-slate-400 hover:text-red-500 p-1"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Arrival preview strip */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                    {liveArrivals.slice(0, 3).map((arr) => (
                      <div
                        key={arr.serviceNo}
                        className="p-2 rounded-lg bg-[#F7F9FF] border border-[#E2E8F0] text-center"
                      >
                        <span className="font-space font-bold text-xs text-[#6B1D73] block">
                          Svc {arr.serviceNo}
                        </span>
                        <span className="font-space font-extrabold text-sm text-[#00875A] mt-0.5 block">
                          {arr.nextBus.estimatedMinutes === 0 ? 'Arr' : `${arr.nextBus.estimatedMinutes}m`}
                        </span>
                        <span className="text-[9px] text-[#81737F]">
                          {arr.nextBus.deck}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectStop(stop.code)}
                    className="w-full py-2 px-3 rounded-lg bg-[#6B1D73] hover:bg-[#56155D] text-white font-space font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>View All Arrivals</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 bg-white rounded-xl border border-[#CBD5E1] text-center text-xs text-[#81737F] space-y-1">
            <p className="font-semibold text-[#181C20]">No bus stops saved yet.</p>
            <p>Click "Pin Stop" on any arrival screen to add your daily boarding points here.</p>
          </div>
        )}
      </div>

      {/* Pinned Services */}
      <div className="space-y-3">
        <h3 className="font-space font-bold text-sm uppercase tracking-wider text-[#181C20] flex items-center gap-2">
          <Bus className="w-4 h-4 text-[#6B1D73]" />
          <span>Pinned Bus Services ({bookmarkedServices.length})</span>
        </h3>

        {bookmarkedServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {bookmarkedServices.map((svcNo) => {
              const svcDetail = BUS_SERVICES[svcNo];
              if (!svcDetail) return null;

              return (
                <div
                  key={svcNo}
                  className="p-3.5 rounded-xl border border-[#CBD5E1] bg-white hover:border-[#6B1D73] shadow-xs transition-all space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-lg bg-[#6B1D73] text-white font-space font-bold text-lg flex items-center justify-center shadow-2xs">
                        {svcNo}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B1D73]">
                          {svcDetail.category}
                        </span>
                        <h4 className="font-space font-bold text-xs text-[#181C20] line-clamp-1">
                          {svcDetail.origin}
                        </h4>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleBookmarkService(svcNo)}
                      className="text-amber-400 hover:text-slate-400 p-1"
                      title="Unpin service"
                    >
                      <Star className="w-4 h-4 fill-amber-400" />
                    </button>
                  </div>

                  <p className="text-[11px] text-[#4F434E] truncate">
                    Towards {svcDetail.destination}
                  </p>

                  <button
                    onClick={() => onSelectService(svcNo)}
                    className="w-full py-1.5 rounded-md bg-[#F1F4F9] hover:bg-[#6B1D73] hover:text-white text-[#4F434E] font-space font-bold text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <span>View Route & Schedule</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 bg-white rounded-xl border border-[#CBD5E1] text-center text-xs text-[#81737F] space-y-1">
            <p className="font-semibold text-[#181C20]">No bus services pinned yet.</p>
            <p>Expand any arrival row and tap "Pin This Service" to track it here.</p>
          </div>
        )}
      </div>
    </div>
  );
};
