import React, { useState, useEffect } from 'react';
import { checkApiHealth, ApiHealthStatus } from '../services/ltaApi';
import { Activity, CheckCircle2, AlertTriangle, RefreshCw, X, Server, Database, Globe } from 'lucide-react';

interface ApiHealthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiHealthModal: React.FC<ApiHealthModalProps> = ({ isOpen, onClose }) => {
  const [health, setHealth] = useState<ApiHealthStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [testStopCode, setTestStopCode] = useState<string>('04121');
  const [testResult, setTestResult] = useState<any>(null);
  const [testingEndpoint, setTestingEndpoint] = useState<boolean>(false);

  const fetchHealth = async () => {
    setLoading(true);
    const data = await checkApiHealth();
    setHealth(data);
    setLoading(false);
  };

  const runTestEndpoint = async () => {
    setTestingEndpoint(true);
    setTestResult(null);
    try {
      const res = await fetch(`/api/bus-arrival?BusStopCode=${encodeURIComponent(testStopCode)}`);
      const json = await res.json();
      setTestResult({
        status: res.status,
        ok: res.ok,
        data: json
      });
    } catch (err: any) {
      setTestResult({
        ok: false,
        error: err.message
      });
    } finally {
      setTestingEndpoint(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchHealth();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl border border-[#CBD5E1] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#4F0058] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#6B1D73] flex items-center justify-center text-emerald-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-space font-bold text-lg text-white">
                API Health & Gateway Monitor
              </h3>
              <p className="text-xs text-white/80">
                Live monitoring for /api/health and /api/bus-arrival
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs text-[#181C20]">
          {/* Status Row */}
          <div className="flex items-center justify-between bg-[#F7F9FF] p-3.5 rounded-xl border border-[#E2E8F0]">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
              <div>
                <div className="font-space font-bold text-sm text-[#181C20] flex items-center gap-2">
                  <span>Endpoint Status:</span>
                  <span className="text-[#00875A] bg-[#E6F4EA] px-2 py-0.5 rounded text-xs font-bold uppercase">
                    {health?.status || 'Active'}
                  </span>
                </div>
                <span className="text-[#81737F] text-[11px]">
                  Server Uptime: {health?.uptimeSeconds || 0} seconds • Latency: {health?.responseTimeMs || 0}ms
                </span>
              </div>
            </div>

            <button
              onClick={fetchHealth}
              disabled={loading}
              className="px-3 py-1.5 rounded-lg border border-[#CBD5E1] bg-white hover:bg-[#F1F4F9] text-[#4F434E] font-space font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#6B1D73] ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          {/* LTA DataMall Gateway Info */}
          <div className="p-4 rounded-xl border border-[#CBD5E1] bg-white space-y-3">
            <h4 className="font-space font-bold text-sm text-[#181C20] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#6B1D73]" />
              <span>LTA DataMall v3 Integration</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-[#F7F9FF] border border-[#E2E8F0]">
                <span className="text-[10px] uppercase font-bold text-[#81737F] block">Upstream Endpoint</span>
                <span className="font-mono text-[11px] text-[#181C20] break-all block mt-0.5">
                  https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-[#F7F9FF] border border-[#E2E8F0]">
                <span className="text-[10px] uppercase font-bold text-[#81737F] block">AccountKey Status</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {health?.ltaDataMall.accountKeyConfigured ? (
                    <span className="text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Key Configured in .env
                    </span>
                  ) : (
                    <span className="text-amber-800 bg-amber-100 font-bold px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                      Optional (Using Simulated Stream)
                    </span>
                  )}
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#4F434E] leading-relaxed">
              When <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[#6B1D73]">LTA_ACCOUNT_KEY</code> is set in <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">.env</code>, requests query live Singapore Land Transport Authority servers. Without a key, requests use the simulated real-time stream.
            </p>
          </div>

          {/* Interactive Endpoint Tester */}
          <div className="p-4 rounded-xl border border-[#CBD5E1] bg-white space-y-3">
            <h4 className="font-space font-bold text-sm text-[#181C20] flex items-center gap-2">
              <Server className="w-4 h-4 text-[#6B1D73]" />
              <span>Live Endpoint Query Tester</span>
            </h4>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={testStopCode}
                  onChange={(e) => setTestStopCode(e.target.value)}
                  placeholder="Enter BusStopCode (e.g. 04121)..."
                  className="w-full px-3 py-2 rounded-lg bg-[#F1F4F9] border border-[#CBD5E1] font-mono text-xs focus:outline-hidden focus:border-[#6B1D73]"
                />
              </div>

              <button
                onClick={runTestEndpoint}
                disabled={testingEndpoint || !testStopCode}
                className="px-4 py-2 rounded-lg bg-[#6B1D73] hover:bg-[#56155D] text-white font-space font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                {testingEndpoint ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
                <span>Execute GET</span>
              </button>
            </div>

            {testResult && (
              <div className="mt-2 p-3 bg-slate-900 text-slate-100 rounded-lg font-mono text-[11px] max-h-48 overflow-y-auto">
                <div className="text-emerald-400 mb-1 font-bold">
                  HTTP {testResult.status} {testResult.ok ? 'OK' : 'Error'}
                </div>
                <pre className="whitespace-pre-wrap">{JSON.stringify(testResult.data, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#F7F9FF] border-t border-[#E2E8F0] p-4 flex justify-between items-center text-[11px] text-[#81737F]">
          <span>Endpoints mounted: /api/health • /api/bus-arrival</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#6B1D73] text-white font-space font-bold text-xs hover:bg-[#56155D] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
