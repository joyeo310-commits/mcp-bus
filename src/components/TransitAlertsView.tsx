import React, { useState } from 'react';
import { TransitAlert } from '../types/transit';
import { AlertTriangle, AlertCircle, Clock, Calendar, CheckCircle2 } from 'lucide-react';

interface TransitAlertsViewProps {
  alerts: TransitAlert[];
  onSelectService: (serviceNo: string) => void;
  onSelectStop: (stopCode: string) => void;
}

export const TransitAlertsView: React.FC<TransitAlertsViewProps> = ({
  alerts,
  onSelectService,
  onSelectStop
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Diversion', 'Disruption', 'Berth Update', 'Festive Extension'];

  const filteredAlerts = alerts.filter(
    (a) => filterCategory === 'All' || a.category === filterCategory
  );

  return (
    <div className="space-y-4">
      {/* Alert Header */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#CBD5E1] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-red-100 text-[#D32F2F]">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <h2 className="font-space font-bold text-xl text-[#181C20]">
                Transit Alerts & Service Advisories
              </h2>
            </div>
            <p className="text-xs text-[#4F434E] mt-1">
              Live updates on route diversions, road works, bus stop closures, and festive extensions.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded-lg text-xs font-semibold self-start sm:self-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>99.8% Scheduled Services Active</span>
          </div>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-space text-xs font-bold whitespace-nowrap transition-all ${
                filterCategory === cat
                  ? 'bg-[#4F0058] text-white shadow-xs'
                  : 'bg-[#F1F4F9] text-[#4F434E] hover:bg-[#E2E8F0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Cards with strict design spec styling: Outlined banner using vibrant red (#D32F2F) or caution orange (#EB601B) borders with 5% background tint */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => {
          const isHigh = alert.severity === 'high';
          const isMedium = alert.severity === 'medium';

          const borderColor = isHigh
            ? 'border-[#D32F2F]'
            : isMedium
            ? 'border-[#EB601B]'
            : 'border-[#3B82F6]';

          const bgTint = isHigh
            ? 'bg-[#D32F2F]/5'
            : isMedium
            ? 'bg-[#EB601B]/5'
            : 'bg-[#3B82F6]/5';

          const tagColor = isHigh
            ? 'bg-[#D32F2F] text-white'
            : isMedium
            ? 'bg-[#EB601B] text-white'
            : 'bg-[#0284C7] text-white';

          return (
            <div
              key={alert.id}
              className={`p-4 sm:p-5 rounded-xl border-2 ${borderColor} ${bgTint} shadow-xs space-y-3 transition-all`}
            >
              {/* Alert Title & Tags */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-space font-bold uppercase tracking-wider ${tagColor}`}>
                      {alert.category}
                    </span>
                    <span className="text-[11px] font-mono text-[#81737F] font-semibold">
                      {alert.id}
                    </span>
                    <span className="text-[11px] text-[#4F434E] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#81737F]" />
                      <span>{alert.timestamp}</span>
                    </span>
                  </div>

                  <h3 className="font-space font-bold text-lg text-[#181C20] leading-snug">
                    {alert.title}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#4F434E] bg-white px-2.5 py-1 rounded-md border border-[#E2E8F0] self-start shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-[#6B1D73]" />
                  <span className="font-medium">{alert.validPeriod}</span>
                </div>
              </div>

              {/* Details and Affected summary */}
              <p className="text-sm text-[#181C20] font-medium leading-relaxed">
                {alert.summary}
              </p>

              <div className="p-3 rounded-lg bg-white/80 border border-[#CBD5E1]/60 text-xs text-[#4F434E] leading-relaxed">
                {alert.details}
              </div>

              {/* Affected Services pills (Interactive!) */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <span className="text-xs font-bold text-[#81737F] font-space uppercase">
                  Affected Services:
                </span>
                {alert.affectedServices.map((svc) => (
                  <button
                    key={svc}
                    onClick={() => onSelectService(svc)}
                    className="px-2.5 py-1 rounded bg-white hover:bg-[#6B1D73] hover:text-white border border-[#CBD5E1] text-xs font-space font-bold text-[#181C20] transition-colors shadow-2xs"
                    title={`Check service ${svc} route`}
                  >
                    {svc}
                  </button>
                ))}

                {alert.affectedStops && (
                  <div className="flex items-center gap-1 ml-auto text-xs text-[#81737F]">
                    <span>Skipping Stops:</span>
                    {alert.affectedStops.map((stopCode) => (
                      <button
                        key={stopCode}
                        onClick={() => onSelectStop(stopCode)}
                        className="font-mono text-xs font-bold underline hover:text-[#6B1D73]"
                      >
                        {stopCode}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
