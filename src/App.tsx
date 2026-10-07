/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BusStopSearchBar } from './components/BusStopSearchBar';
import { BusStopArrivalsView } from './components/BusStopArrivalsView';
import { BusServicesView } from './components/BusServicesView';
import { LiveTransitRadarMap } from './components/LiveTransitRadarMap';
import { InterchangeDirectoryView } from './components/InterchangeDirectoryView';
import { TransitAlertsView } from './components/TransitAlertsView';
import { SavedCommutesView } from './components/SavedCommutesView';
import { LtaLegendModal } from './components/LtaLegendModal';
import { ApiHealthModal } from './components/ApiHealthModal';
import { BUS_STOPS, BUS_SERVICES, TRANSIT_ALERTS, getLiveArrivalsForStop } from './data/transitData';
import { fetchBusArrivals } from './services/ltaApi';
import { BusStop, BusArrivalService } from './types/transit';

export default function App() {
  // Navigation & Display state
  const [activeTab, setActiveTab] = useState<'arrivals' | 'routes' | 'map' | 'berths' | 'alerts' | 'saved'>('arrivals');
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [isLegendOpen, setIsLegendOpen] = useState<boolean>(false);
  const [isHealthOpen, setIsHealthOpen] = useState<boolean>(false);
  const [searchMode, setSearchMode] = useState<'stop' | 'service' | 'location'>('stop');

  // Active transit state
  const [currentStopCode, setCurrentStopCode] = useState<string>('03223'); // Peninsula Plaza default
  const [selectedServiceNo, setSelectedServiceNo] = useState<string>('147');
  const [arrivals, setArrivals] = useState<BusArrivalService[]>([]);
  const [isLiveLta, setIsLiveLta] = useState<boolean>(false);

  // Live Auto-Refresh system
  const [refreshSeconds, setRefreshSeconds] = useState<number>(15);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [dataTick, setDataTick] = useState<number>(0);

  // Bookmarks persistence
  const [bookmarkedStops, setBookmarkedStops] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sbs_bookmarked_stops');
      return saved ? JSON.parse(saved) : ['03223', '09048', '28009'];
    } catch {
      return ['03223', '09048', '28009'];
    }
  });

  const [bookmarkedServices, setBookmarkedServices] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sbs_bookmarked_services');
      return saved ? JSON.parse(saved) : ['147', '502', '190'];
    } catch {
      return ['147', '502', '190'];
    }
  });

  // Sync font size attribute on root html element
  useEffect(() => {
    document.documentElement.dataset.fontSize = fontSize;
  }, [fontSize]);

  // Sync bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sbs_bookmarked_stops', JSON.stringify(bookmarkedStops));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [bookmarkedStops]);

  useEffect(() => {
    try {
      localStorage.setItem('sbs_bookmarked_services', JSON.stringify(bookmarkedServices));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [bookmarkedServices]);

  // Load and refresh arrivals data from /api/bus-arrival
  useEffect(() => {
    let isCancelled = false;
    fetchBusArrivals(currentStopCode, undefined, dataTick).then((res) => {
      if (!isCancelled) {
        setArrivals(res.arrivals);
        setIsLiveLta(res.isLiveLta);
      }
    });
    return () => {
      isCancelled = true;
    };
  }, [currentStopCode, dataTick]);

  // Countdown auto-refresh ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshSeconds((prev) => {
        if (prev <= 1) {
          setDataTick((t) => t + 1);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setDataTick((t) => t + 1);
      setRefreshSeconds(15);
      setIsRefreshing(false);
    }, 450);
  };

  const handleSelectStop = (stopCode: string) => {
    setCurrentStopCode(stopCode);
    setActiveTab('arrivals');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (serviceNo: string) => {
    setSelectedServiceNo(serviceNo);
    setActiveTab('routes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmarkStop = (stopCode: string) => {
    setBookmarkedStops((prev) =>
      prev.includes(stopCode) ? prev.filter((s) => s !== stopCode) : [...prev, stopCode]
    );
  };

  const handleToggleBookmarkService = (serviceNo: string) => {
    setBookmarkedServices((prev) =>
      prev.includes(serviceNo) ? prev.filter((s) => s !== serviceNo) : [...prev, serviceNo]
    );
  };

  const currentStopObj = BUS_STOPS.find((s) => s.code === currentStopCode) || BUS_STOPS[0];

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-[#181C20] flex flex-col">
      {/* Top Authoritative Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        fontSize={fontSize}
        setFontSize={setFontSize}
        onOpenLegend={() => setIsLegendOpen(true)}
        onOpenHealthModal={() => setIsHealthOpen(true)}
        isLiveLta={isLiveLta}
        alertCount={TRANSIT_ALERTS.length}
        refreshSeconds={refreshSeconds}
        onManualRefresh={handleManualRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-6">
        {/* Search & Quick Filter Component (Always easily accessible or in arrivals) */}
        {activeTab === 'arrivals' && (
          <BusStopSearchBar
            searchMode={searchMode}
            setSearchMode={setSearchMode}
            onSelectStop={handleSelectStop}
            onSelectService={handleSelectService}
            currentStopCode={currentStopCode}
          />
        )}

        {/* Dynamic Tab Screens */}
        {activeTab === 'arrivals' && (
          <BusStopArrivalsView
            currentStop={currentStopObj}
            arrivals={arrivals}
            onSelectService={handleSelectService}
            onSelectStop={handleSelectStop}
            bookmarkedServices={bookmarkedServices}
            onToggleBookmarkService={handleToggleBookmarkService}
            bookmarkedStops={bookmarkedStops}
            onToggleBookmarkStop={handleToggleBookmarkStop}
            activeAlerts={TRANSIT_ALERTS}
          />
        )}

        {activeTab === 'routes' && (
          <BusServicesView
            selectedServiceNo={selectedServiceNo}
            onSelectService={handleSelectService}
            onJumpToStop={handleSelectStop}
          />
        )}

        {activeTab === 'map' && (
          <LiveTransitRadarMap
            onSelectStop={handleSelectStop}
            onSelectService={handleSelectService}
          />
        )}

        {activeTab === 'berths' && (
          <InterchangeDirectoryView
            onSelectService={handleSelectService}
            onSelectStop={handleSelectStop}
          />
        )}

        {activeTab === 'alerts' && (
          <TransitAlertsView
            alerts={TRANSIT_ALERTS}
            onSelectService={handleSelectService}
            onSelectStop={handleSelectStop}
          />
        )}

        {activeTab === 'saved' && (
          <SavedCommutesView
            bookmarkedStops={bookmarkedStops}
            onToggleBookmarkStop={handleToggleBookmarkStop}
            bookmarkedServices={bookmarkedServices}
            onToggleBookmarkService={handleToggleBookmarkService}
            onSelectStop={handleSelectStop}
            onSelectService={handleSelectService}
          />
        )}
      </main>

      {/* Official Civic Transit Footer */}
      <footer className="mt-auto border-t border-[#CBD5E1] bg-[#FFFFFF] py-6 text-xs text-[#4F434E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-center md:text-left">
            <div className="w-8 h-8 rounded-lg bg-[#6B1D73] text-white flex items-center justify-center font-bold text-xs">
              SBS
            </div>
            <div>
              <p className="font-space font-bold text-sm text-[#181C20]">
                SBS Transit & Land Transport Authority (LTA)
              </p>
              <p className="text-[11px] text-[#81737F]">
                Data conforms to LTA DataMall v2.0 Real-Time Bus Arrival & Fleet Standards.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-semibold text-[#81737F] flex-wrap justify-center">
            <button onClick={() => setIsHealthOpen(true)} className="hover:text-[#6B1D73] text-emerald-700 font-bold">
              API Health Monitor
            </button>
            <span>•</span>
            <button onClick={() => setIsLegendOpen(true)} className="hover:text-[#6B1D73]">
              LTA Capacity Rules
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('berths')} className="hover:text-[#6B1D73]">
              Interchange Berths
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('alerts')} className="hover:text-[#6B1D73]">
              Service Advisories
            </button>
            <span>•</span>
            <span>SimplyGo Ready</span>
          </div>
        </div>
      </footer>

      {/* LTA Standards Guide Modal */}
      <LtaLegendModal isOpen={isLegendOpen} onClose={() => setIsLegendOpen(false)} />

      {/* API Health & Gateway Monitor Modal */}
      <ApiHealthModal isOpen={isHealthOpen} onClose={() => setIsHealthOpen(false)} />
    </div>
  );
}
