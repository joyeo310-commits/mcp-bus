import React, { useState } from 'react';
import { Search, Navigation } from 'lucide-react';
import { BUS_STOPS, BUS_SERVICES } from '../data/transitData';

interface BusStopSearchBarProps {
  searchMode: 'stop' | 'service';
  setSearchMode: (mode: 'stop' | 'service') => void;
  onSelectStop: (stopCode: string) => void;
  onSelectService: (serviceNo: string) => void;
  currentStopCode: string;
}

export const BusStopSearchBar: React.FC<BusStopSearchBarProps> = ({
  searchMode,
  setSearchMode,
  onSelectStop,
  onSelectService,
  currentStopCode
}) => {
  const [query, setQuery] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Quick popular stops recommended across Singapore
  const quickStops = [
    { code: '03223', name: 'Peninsula Plaza', area: 'City Hall' },
    { code: '04168', name: 'Clarke Quay Stn', area: 'Central' },
    { code: '09048', name: 'Orchard Stn / Lucky Plz', area: 'Orchard' },
    { code: '01012', name: 'Grand Pacific', area: 'Bugis' },
    { code: '14119', name: 'Chinatown Stn', area: 'Chinatown' },
    { code: '28009', name: 'Jurong East Temp Int', area: 'West' },
    { code: '64009', name: 'Tampines Int', area: 'East' },
    { code: '84009', name: 'Bedok Int', area: 'East' }
  ];

  // Quick popular services
  const quickServices = ['147', '190', '502', '65', '12', '7', '174', '166', '851', '291'];

  // Filter recommendations based on input query
  const filteredStops = query.trim()
    ? BUS_STOPS.filter(
        (s) =>
          s.code.includes(query.trim()) ||
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.road.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredServices = query.trim()
    ? Object.keys(BUS_SERVICES).filter((svc) => svc.includes(query.trim()))
    : [];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = query.trim();
    if (!clean) return;

    if (searchMode === 'stop') {
      const match = BUS_STOPS.find(
        (s) =>
          s.code.toLowerCase() === clean.toLowerCase() ||
          s.name.toLowerCase().includes(clean.toLowerCase())
      );
      if (match) {
        onSelectStop(match.code);
        setQuery('');
      } else if (clean.length === 5 && /^\d+$/.test(clean)) {
        onSelectStop(clean);
        setQuery('');
      }
    } else {
      if (BUS_SERVICES[clean]) {
        onSelectService(clean);
        setQuery('');
      }
    }
  };

  const handleNearMeSimulate = () => {
    // Pick Orchard or Peninsula
    const randomStop = currentStopCode === '03223' ? '09048' : '03223';
    onSelectStop(randomStop);
  };

  return (
    <div className="w-full space-y-3">
      {/* Tabbed Switcher: Pill segments with primary purple active state */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="inline-flex p-1 bg-[#EBEEF3] rounded-full border border-[#E2E8F0] shadow-2xs">
          <button
            type="button"
            onClick={() => setSearchMode('stop')}
            className={`px-4 py-1.5 rounded-full font-space text-xs font-bold transition-all ${
              searchMode === 'stop'
                ? 'bg-[#6B1D73] text-white shadow-xs'
                : 'text-[#4F434E] hover:text-[#181C20]'
            }`}
          >
            Search by Bus Stop No.
          </button>
          <button
            type="button"
            onClick={() => setSearchMode('service')}
            className={`px-4 py-1.5 rounded-full font-space text-xs font-bold transition-all ${
              searchMode === 'service'
                ? 'bg-[#6B1D73] text-white shadow-xs'
                : 'text-[#4F434E] hover:text-[#181C20]'
            }`}
          >
            Search by Service No.
          </button>
        </div>

        <button
          type="button"
          onClick={handleNearMeSimulate}
          className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#CBD5E1] hover:border-[#6B1D73] text-[#4F434E] hover:text-[#6B1D73] transition-colors shadow-2xs"
          title="Simulate locating nearest bus stop via GPS"
        >
          <Navigation className="w-3.5 h-3.5 text-[#6B1D73]" />
          <span>Find Stops Near Me</span>
        </button>
      </div>

      {/* Input Container: Clean white fill, 48px height, 1px neutral border expanding to 2px purple focus ring with CTA */}
      <div className="relative">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <div className="absolute left-3.5 text-[#81737F]">
            <Search className="w-5 h-5" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 250)}
            placeholder={
              searchMode === 'stop'
                ? 'Enter 5-digit bus stop no. or road (e.g. 03223, Orchard, Victoria St)...'
                : 'Enter bus service number (e.g. 147, 190, 502, 65)...'
            }
            className="w-full h-12 pl-11 pr-28 rounded-lg bg-[#FFFFFF] border border-[#CBD5E1] text-[#181C20] placeholder-[#81737F] font-medium text-sm focus:outline-hidden focus:border-[#6B1D73] focus:ring-2 focus:ring-[#6B1D73]/30 transition-all shadow-xs"
          />

          <div className="absolute right-1.5">
            <button
              type="submit"
              className="h-9 px-4 rounded-md bg-[#6B1D73] hover:bg-[#56155D] text-white font-space font-bold text-xs tracking-wider uppercase transition-colors shadow-2xs flex items-center gap-1"
            >
              Get Timings
            </button>
          </div>
        </form>

        {/* Dynamic Auto-suggest Dropdown */}
        {isFocused && query.trim().length > 0 && (
          <div className="absolute left-0 right-0 top-14 bg-white border border-[#CBD5E1] rounded-lg shadow-xl z-50 overflow-hidden max-h-64 overflow-y-auto">
            {searchMode === 'stop' ? (
              filteredStops.length > 0 ? (
                filteredStops.map((stop) => (
                  <button
                    key={stop.code}
                    type="button"
                    onMouseDown={() => {
                      onSelectStop(stop.code);
                      setQuery('');
                    }}
                    className="w-full px-4 py-2.5 text-left flex items-center justify-between hover:bg-[#F1F4F9] border-b border-slate-100 last:border-0"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-space font-bold text-[#6B1D73] text-sm">
                          {stop.code}
                        </span>
                        <span className="font-semibold text-xs text-[#181C20]">{stop.name}</span>
                      </div>
                      <span className="text-[11px] text-[#81737F]">{stop.road}</span>
                    </div>
                    <span className="text-[10px] bg-[#E0E3E8] px-1.5 py-0.5 rounded text-[#4F434E]">
                      {stop.zone}
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-4 text-xs text-[#81737F] text-center">
                  No matching stops found. Try searching by road name or 5-digit code.
                </div>
              )
            ) : (
              filteredServices.length > 0 ? (
                filteredServices.map((svc) => (
                  <button
                    key={svc}
                    type="button"
                    onMouseDown={() => {
                      onSelectService(svc);
                      setQuery('');
                    }}
                    className="w-full px-4 py-2.5 text-left flex items-center justify-between hover:bg-[#F1F4F9] border-b border-slate-100 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-space font-bold text-base text-[#6B1D73] w-12 text-center bg-[#F1F4F9] py-1 rounded">
                        {svc}
                      </span>
                      <span className="text-xs text-[#181C20] font-medium">
                        {BUS_SERVICES[svc]?.origin} ↔ {BUS_SERVICES[svc]?.destination}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-[#6B1D73]">
                      {BUS_SERVICES[svc]?.category}
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-4 text-xs text-[#81737F] text-center">
                  No matching service found.
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Quick Pills Recommendations */}
      <div className="flex items-center gap-1.5 flex-wrap text-xs">
        <span className="text-[#81737F] font-medium text-[11px] mr-1">Popular:</span>
        {searchMode === 'stop'
          ? quickStops.map((stop) => (
              <button
                key={stop.code}
                type="button"
                onClick={() => onSelectStop(stop.code)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  currentStopCode === stop.code
                    ? 'bg-[#6B1D73] text-white font-bold'
                    : 'bg-[#FFFFFF] border border-[#E2E8F0] text-[#4F434E] hover:border-[#6B1D73] hover:text-[#6B1D73]'
                }`}
              >
                <span className="font-space font-bold mr-1">{stop.code}</span>
                <span>{stop.name}</span>
              </button>
            ))
          : quickServices.map((svc) => (
              <button
                key={svc}
                type="button"
                onClick={() => onSelectService(svc)}
                className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#FFFFFF] border border-[#E2E8F0] text-[#4F434E] hover:border-[#6B1D73] hover:text-[#6B1D73] font-space font-bold"
              >
                {svc}
              </button>
            ))}
      </div>
    </div>
  );
};
