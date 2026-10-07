import React, { useState } from 'react';
import { BusStop, BusArrivalService, TransitAlert } from '../types/transit';
import { BusArrivalRow } from './BusArrivalRow';
import { BUS_STOPS } from '../data/transitData';
import { Bookmark, Star, AlertCircle, Sparkles, Filter, ChevronRight, Train } from 'lucide-react';

interface BusStopArrivalsViewProps {
  currentStop: BusStop;
  arrivals: BusArrivalService[];
  onSelectService: (serviceNo: string) => void;
  onSelectStop: (stopCode: string) => void;
  bookmarkedServices: string[];
  onToggleBookmarkService: (serviceNo: string) => void;
  bookmarkedStops: string[];
  onToggleBookmarkStop: (stopCode: string) => void;
  activeAlerts: TransitAlert[];
}

export const BusStopArrivalsView: React.FC<BusStopArrivalsViewProps> = ({
  currentStop,
  arrivals,
  onSelectService,
  onSelectStop,
  bookmarkedServices,
  onToggleBookmarkService,
  bookmarkedStops,
  onToggleBookmarkStop,
  activeAlerts
}) => {
  const [filterType, setFilterType] = useState<'all' | 'seats' | 'double' | 'express' | 'pinned'>('all');

  const isStopBookmarked = bookmarkedStops.includes(currentStop.code);

  // Check if any alerts affect this stop
  const relevantAlerts = activeAlerts.filter(
    (a) => a.affectedStops?.includes(currentStop.code) || a.affectedServices.some((s) => currentStop.services.includes(s))
  );

  // MRT badge color map
  const getMrtBadgeColor = (code: string) => {
    if (code.startsWith('EW')) return 'bg-[#009640] text-white'; // East-West Green
    if (code.startsWith('NS')) return 'bg-[#D42E12] text-white'; // North-South Red
    if (code.startsWith('NE')) return 'bg-[#9016B2] text-white'; // North-East Purple
    if (code.startsWith('CC')) return 'bg-[#FA9E0D] text-white'; // Circle Orange
    if (code.startsWith('DT')) return 'bg-[#0054A6] text-white'; // Downtown Blue
    if (code.startsWith('TE')) return 'bg-[#9D5B25] text-white'; // Thomson-East Coast Brown
    return 'bg-[#64748B] text-white';
  };

  // Filter arrivals based on commuter filter
  const filteredArrivals = arrivals.filter((arr) => {
    if (filterType === 'seats') {
      return arr.nextBus.load === 'SEA';
    }
    if (filterType === 'double') {
      return arr.nextBus.deck === 'DD' || arr.nextBus2?.deck === 'DD';
    }
    if (filterType === 'express') {
      return arr.category === 'Express';
    }
    if (filterType === 'pinned') {
      return bookmarkedServices.includes(arr.serviceNo);
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Current Bus Stop Civic Banner */}
      <div className="bg-[#FFFFFF] border border-[#CBD5E1] rounded-xl p-4 sm:p-5 shadow-xs transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              {/* 5-digit Bus Stop Code in high-contrast badge */}
              <span className="font-space font-bold text-sm tracking-wider px-2.5 py-1 rounded bg-[#4F0058] text-white shadow-2xs">
                {currentStop.code}
              </span>

              <span className="text-xs font-semibold uppercase tracking-wider text-[#6B1D73] bg-[#F1F4F9] px-2 py-0.5 rounded border border-[#6B1D73]/20">
                {currentStop.zone} Zone
              </span>

              {/* MRT Connections */}
              {currentStop.mrtTransfer && currentStop.mrtTransfer.length > 0 && (
                <div className="flex items-center gap-1">
                  <Train className="w-3.5 h-3.5 text-[#4F434E]" />
                  {currentStop.mrtTransfer.map((mrt) => (
                    <span
                      key={mrt}
                      className={`text-[10px] font-space font-bold px-1.5 py-0.5 rounded shadow-2xs ${getMrtBadgeColor(
                        mrt
                      )}`}
                    >
                      {mrt}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h1 className="font-space font-bold text-2xl sm:text-3xl tracking-tight text-[#181C20] leading-tight">
                {currentStop.name}
              </h1>
              <p className="text-sm text-[#4F434E] font-medium mt-0.5">
                Along <span className="font-semibold text-[#181C20]">{currentStop.road}</span>
              </p>
            </div>
          </div>

          {/* Stop Actions: Bookmark Stop & Quick Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmarkStop(currentStop.code)}
              className={`flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-lg border transition-all ${
                isStopBookmarked
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-white border-[#CBD5E1] text-[#4F434E] hover:border-[#6B1D73]'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isStopBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>{isStopBookmarked ? 'Stop Pinned' : 'Pin Stop'}</span>
            </button>

            {/* Quick Switch Dropdown */}
            <select
              value={currentStop.code}
              onChange={(e) => onSelectStop(e.target.value)}
              className="text-xs font-semibold font-space bg-[#F1F4F9] border border-[#CBD5E1] text-[#181C20] py-2 px-3 rounded-lg focus:outline-hidden focus:border-[#6B1D73]"
            >
              {BUS_STOPS.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.code} - {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Civic Alert Warning if stop is under diversion */}
        {relevantAlerts.length > 0 && (
          <div className="mt-4 p-3 bg-red-50/80 border border-[#D32F2F]/40 rounded-lg flex items-start gap-2.5 text-xs text-[#93000A]">
            <AlertCircle className="w-4 h-4 text-[#D32F2F] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold font-space uppercase tracking-wider text-[#D32F2F] block">
                Transit Advisory in effect:
              </span>
              <p className="font-medium text-[#4F434E] mt-0.5">{relevantAlerts[0].summary}</p>
            </div>
          </div>
        )}
      </div>

      {/* Filter and Capacity Legend Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FFFFFF] p-2.5 rounded-lg border border-[#E2E8F0] shadow-2xs">
        {/* Quick Filter chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          <span className="text-[11px] font-semibold text-[#81737F] mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Filter:
          </span>
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-full text-xs font-space font-semibold transition-all ${
              filterType === 'all'
                ? 'bg-[#6B1D73] text-white shadow-2xs'
                : 'bg-[#F1F4F9] text-[#4F434E] hover:bg-[#E5E8EE]'
            }`}
          >
            All Services ({arrivals.length})
          </button>
          <button
            onClick={() => setFilterType('seats')}
            className={`px-3 py-1 rounded-full text-xs font-space font-semibold transition-all ${
              filterType === 'seats'
                ? 'bg-[#00875A] text-white shadow-2xs'
                : 'bg-[#F1F4F9] text-[#00875A] hover:bg-emerald-50'
            }`}
          >
            Seats Available
          </button>
          <button
            onClick={() => setFilterType('double')}
            className={`px-3 py-1 rounded-full text-xs font-space font-semibold transition-all ${
              filterType === 'double'
                ? 'bg-[#3B82F6] text-white shadow-2xs'
                : 'bg-[#F1F4F9] text-[#1D4ED8] hover:bg-blue-50'
            }`}
          >
            Double Deck
          </button>
          <button
            onClick={() => setFilterType('express')}
            className={`px-3 py-1 rounded-full text-xs font-space font-semibold transition-all ${
              filterType === 'express'
                ? 'bg-[#B6171E] text-white shadow-2xs'
                : 'bg-[#F1F4F9] text-[#B6171E] hover:bg-red-50'
            }`}
          >
            Express Routes
          </button>
          <button
            onClick={() => setFilterType('pinned')}
            className={`px-3 py-1 rounded-full text-xs font-space font-semibold transition-all ${
              filterType === 'pinned'
                ? 'bg-amber-500 text-white shadow-2xs'
                : 'bg-[#F1F4F9] text-amber-700 hover:bg-amber-50'
            }`}
          >
            Pinned ({bookmarkedServices.length})
          </button>
        </div>

        {/* LTA Color Indicators Reference Bar */}
        <div className="flex items-center gap-3 text-[11px] font-space font-medium text-[#4F434E] shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00875A]"></span>
            <span>Seats Avail</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]"></span>
            <span>Standing</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]"></span>
            <span>Crowded</span>
          </div>
        </div>
      </div>

      {/* Arrival Cards Listing */}
      <div className="space-y-2.5">
        {filteredArrivals.length > 0 ? (
          filteredArrivals.map((arrival) => (
            <BusArrivalRow
              key={arrival.serviceNo}
              arrival={arrival}
              onSelectService={onSelectService}
              isBookmarked={bookmarkedServices.includes(arrival.serviceNo)}
              onToggleBookmark={onToggleBookmarkService}
            />
          ))
        ) : (
          <div className="p-8 text-center bg-white rounded-xl border border-[#CBD5E1] space-y-2">
            <p className="font-space font-bold text-sm text-[#181C20]">
              No bus services match the active filter.
            </p>
            <p className="text-xs text-[#81737F]">
              Try selecting "All Services" or check another bus stop.
            </p>
            <button
              onClick={() => setFilterType('all')}
              className="mt-2 text-xs font-space font-bold text-[#6B1D73] underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
