import React, { useState, useEffect } from 'react';
import { Bus, MapPin, AlertTriangle, Bookmark, HelpCircle, RefreshCw } from 'lucide-react';

interface HeaderProps {
  activeTab: 'arrivals' | 'routes' | 'map' | 'berths' | 'alerts' | 'saved';
  setActiveTab: (tab: 'arrivals' | 'routes' | 'map' | 'berths' | 'alerts' | 'saved') => void;
  fontSize: 'sm' | 'md' | 'lg';
  setFontSize: (size: 'sm' | 'md' | 'lg') => void;
  onOpenLegend: () => void;
  alertCount: number;
  refreshSeconds: number;
  onManualRefresh: () => void;
  isRefreshing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  fontSize,
  setFontSize,
  onOpenLegend,
  alertCount,
  refreshSeconds,
  onManualRefresh,
  isRefreshing
}) => {
  const [sgtTime, setSgtTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Singapore is UTC+8
      const formatted = now.toLocaleTimeString('en-SG', {
        timeZone: 'Asia/Singapore',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setSgtTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#E2E8F0] shadow-xs">
      {/* Top authoritative civic banner */}
      <div className="bg-[#4F0058] text-[#FFFFFF] px-4 py-1.5 flex flex-wrap items-center justify-between text-xs font-medium">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 bg-[#6B1D73] px-2 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase text-[#FEA9FF]">
            <span>LTA • SBS TRANSIT</span>
          </div>
          <span className="hidden sm:inline text-white/80">Public Transport Operations Authority</span>
          <span className="hidden md:inline-flex items-center gap-1.5 text-emerald-300 font-semibold text-[11px] bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            NETWORK NORMAL • 99.8% ON-TIME
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 font-space tracking-tight text-white/90">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{sgtTime || '12:00:00 PM'} SGT</span>
          </div>

          {/* Accessibility Font Resizer triad: A-, A, A+ */}
          <div className="flex items-center bg-white/10 rounded-sm p-0.5 border border-white/20" title="Adjust Display Text Size">
            <button
              onClick={() => setFontSize('sm')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors ${
                fontSize === 'sm' ? 'bg-[#FFFFFF] text-[#4F0058]' : 'text-white/80 hover:text-white'
              }`}
              aria-label="Small font size"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('md')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors ${
                fontSize === 'md' ? 'bg-[#FFFFFF] text-[#4F0058]' : 'text-white/80 hover:text-white'
              }`}
              aria-label="Default font size"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors ${
                fontSize === 'lg' ? 'bg-[#FFFFFF] text-[#4F0058]' : 'text-white/80 hover:text-white'
              }`}
              aria-label="Large font size"
            >
              A+
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Action Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('arrivals')}>
          {/* Authentic SBS Purple & Red transit mark */}
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6B1D73] to-[#4F0058] flex items-center justify-center shadow-xs border border-[#4F0058]/20 text-white shrink-0">
            <Bus className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-space font-bold text-lg sm:text-xl tracking-tight text-[#181C20] leading-none">
                SBS Transit
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F1F4F9] text-[#6B1D73] px-1.5 py-0.5 rounded border border-[#6B1D73]/20">
                Civic Portal
              </span>
            </div>
            <p className="text-[11px] text-[#4F434E] font-medium leading-tight mt-0.5 hidden xs:block">
              Singapore Real-Time Bus Arrival & Transit Directory
            </p>
          </div>
        </div>

        {/* Global Live Stream Control & LTA Standards */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onManualRefresh}
            disabled={isRefreshing}
            className="flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-md border border-[#E2E8F0] bg-[#FFFFFF] hover:bg-[#F1F4F9] text-[#4F434E] transition-colors"
            title="Force refresh live bus data"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#6B1D73] ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline font-space">
              {isRefreshing ? 'Updating...' : `Refresh (${refreshSeconds}s)`}
            </span>
          </button>

          <button
            onClick={onOpenLegend}
            className="flex items-center space-x-1 text-xs font-semibold px-2.5 py-1.5 rounded-md bg-[#F1F4F9] hover:bg-[#E5E8EE] text-[#6B1D73] transition-colors border border-[#6B1D73]/15"
            title="LTA Capacity & Vehicle Type Guide"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#6B1D73]" />
            <span className="hidden md:inline">LTA Legend</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs - Tactile Civic Ergonomics */}
      <nav className="border-t border-[#E2E8F0] bg-[#FFFFFF] overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex space-x-1 sm:space-x-2">
          <button
            onClick={() => setActiveTab('arrivals')}
            className={`flex items-center space-x-2 py-2.5 px-3 border-b-2 font-space text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-colors ${
              activeTab === 'arrivals'
                ? 'border-[#6B1D73] text-[#6B1D73] bg-[#6B1D73]/5'
                : 'border-transparent text-[#4F434E] hover:text-[#181C20] hover:bg-[#F1F4F9]'
            }`}
          >
            <Bus className="w-4 h-4" />
            <span>Bus Stop Arrivals</span>
          </button>

          <button
            onClick={() => setActiveTab('routes')}
            className={`flex items-center space-x-2 py-2.5 px-3 border-b-2 font-space text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-colors ${
              activeTab === 'routes'
                ? 'border-[#6B1D73] text-[#6B1D73] bg-[#6B1D73]/5'
                : 'border-transparent text-[#4F434E] hover:text-[#181C20] hover:bg-[#F1F4F9]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Bus Services & Routes</span>
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center space-x-2 py-2.5 px-3 border-b-2 font-space text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-colors ${
              activeTab === 'map'
                ? 'border-[#6B1D73] text-[#6B1D73] bg-[#6B1D73]/5'
                : 'border-transparent text-[#4F434E] hover:text-[#181C20] hover:bg-[#F1F4F9]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block"></span>
            <span>Live Radar Map</span>
          </button>

          <button
            onClick={() => setActiveTab('berths')}
            className={`flex items-center space-x-2 py-2.5 px-3 border-b-2 font-space text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-colors ${
              activeTab === 'berths'
                ? 'border-[#6B1D73] text-[#6B1D73] bg-[#6B1D73]/5'
                : 'border-transparent text-[#4F434E] hover:text-[#181C20] hover:bg-[#F1F4F9]'
            }`}
          >
            <span>Interchange Berths</span>
          </button>

          <button
            onClick={() => setActiveTab('alerts')}
            className={`flex items-center space-x-2 py-2.5 px-3 border-b-2 font-space text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-colors ${
              activeTab === 'alerts'
                ? 'border-[#D32F2F] text-[#D32F2F] bg-[#D32F2F]/5'
                : 'border-transparent text-[#4F434E] hover:text-[#181C20] hover:bg-[#F1F4F9]'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-[#D32F2F]" />
            <span>Transit Alerts</span>
            {alertCount > 0 && (
              <span className="bg-[#D32F2F] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {alertCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center space-x-2 py-2.5 px-3 border-b-2 font-space text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-colors ${
              activeTab === 'saved'
                ? 'border-[#6B1D73] text-[#6B1D73] bg-[#6B1D73]/5'
                : 'border-transparent text-[#4F434E] hover:text-[#181C20] hover:bg-[#F1F4F9]'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved Commutes</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
