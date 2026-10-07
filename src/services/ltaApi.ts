import { BusArrivalService, BusLoad, BusDeckType } from '../types/transit';
import { BUS_SERVICES, getLiveArrivalsForStop } from '../data/transitData';

export interface LtaNextBusRaw {
  OriginCode?: string;
  DestinationCode?: string;
  EstimatedArrival?: string;
  Latitude?: string;
  Longitude?: string;
  VisitNumber?: string;
  Load?: string;
  Feature?: string;
  Type?: string;
}

export interface LtaServiceRaw {
  ServiceNo: string;
  Operator: string;
  NextBus?: LtaNextBusRaw;
  NextBus2?: LtaNextBusRaw;
  NextBus3?: LtaNextBusRaw;
}

export interface LtaArrivalResponse {
  BusStopCode: string;
  Services: LtaServiceRaw[];
  isLiveLta?: boolean;
  dataSource?: string;
  cached?: boolean;
}

export interface ApiHealthStatus {
  status: string;
  service: string;
  uptimeSeconds: number;
  timestamp: string;
  sgtTimestamp: string;
  ltaDataMall: {
    accountKeyConfigured: boolean;
    endpoint: string;
    status: string;
    upstreamPing?: {
      statusCode?: number;
      ok?: boolean;
      latencyMs?: number;
    };
  };
  memory: {
    rssMb: string;
    heapUsedMb: string;
  };
  responseTimeMs: number;
}

// Convert LTA Operator code to full brand
function mapOperator(op: string): 'SBS Transit' | 'SMRT' | 'Tower Transit' | 'Go-Ahead' {
  switch (op?.toUpperCase()) {
    case 'SBST':
      return 'SBS Transit';
    case 'SMRT':
      return 'SMRT';
    case 'TTS':
      return 'Tower Transit';
    case 'GAS':
      return 'Go-Ahead';
    default:
      return 'SBS Transit';
  }
}

// Convert ISO string to minutes from now
function calculateMinutes(isoDate?: string): number {
  if (!isoDate) return 0;
  const target = new Date(isoDate).getTime();
  const now = Date.now();
  const diffMinutes = Math.round((target - now) / 60000);
  return Math.max(0, isNaN(diffMinutes) ? 0 : diffMinutes);
}

// Fetch real-time arrivals from /api/bus-arrival
export async function fetchBusArrivals(
  busStopCode: string,
  serviceNo?: string,
  tickOffset: number = 0
): Promise<{ arrivals: BusArrivalService[]; isLiveLta: boolean; dataSource: string }> {
  try {
    let url = `/api/bus-arrival?BusStopCode=${encodeURIComponent(busStopCode)}`;
    if (serviceNo) {
      url += `&ServiceNo=${encodeURIComponent(serviceNo)}`;
    }

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`API returned HTTP ${res.status}`);
    }

    const data: LtaArrivalResponse = await res.json();

    if (!data.Services || data.Services.length === 0) {
      // Fallback if stop has no active services returned
      return {
        arrivals: getLiveArrivalsForStop(busStopCode, tickOffset),
        isLiveLta: Boolean(data.isLiveLta),
        dataSource: data.dataSource || 'fallback'
      };
    }

    const mapped: BusArrivalService[] = data.Services.map((svc) => {
      const detail = BUS_SERVICES[svc.ServiceNo];
      const category = detail ? detail.category : 'Trunk';
      const destinationName =
        detail?.directions[0]?.stops[detail.directions[0].stops.length - 1]?.stopName ||
        'Terminus';

      const min1 = calculateMinutes(svc.NextBus?.EstimatedArrival);
      const min2 = calculateMinutes(svc.NextBus2?.EstimatedArrival);
      const min3 = calculateMinutes(svc.NextBus3?.EstimatedArrival);

      return {
        serviceNo: svc.ServiceNo,
        operator: mapOperator(svc.Operator),
        category,
        originCode: svc.NextBus?.OriginCode || busStopCode,
        destinationCode: svc.NextBus?.DestinationCode || '00000',
        destinationName,
        nextBus: {
          estimatedMinutes: min1,
          load: (svc.NextBus?.Load as BusLoad) || 'SEA',
          deck: (svc.NextBus?.Type as BusDeckType) || 'DD',
          wab: svc.NextBus?.Feature === 'WAB',
          plateNumber: `SG${Math.floor(1000 + Math.random() * 8999)}A`,
          vehicleModel: svc.NextBus?.Type === 'DD' ? 'Volvo B9TL Wright Double Deck' : 'Mercedes-Benz Citaro',
          distanceMetres: min1 === 0 ? 60 : min1 * 400
        },
        nextBus2: svc.NextBus2?.EstimatedArrival
          ? {
              estimatedMinutes: min2,
              load: (svc.NextBus2?.Load as BusLoad) || 'SEA',
              deck: (svc.NextBus2?.Type as BusDeckType) || 'SD',
              wab: svc.NextBus2?.Feature === 'WAB',
              plateNumber: `SBS${Math.floor(3000 + Math.random() * 6999)}K`,
              vehicleModel: svc.NextBus2?.Type === 'DD' ? 'MAN A95 ND323F' : 'Scania K230UB',
              distanceMetres: min2 * 450
            }
          : undefined,
        nextBus3: svc.NextBus3?.EstimatedArrival
          ? {
              estimatedMinutes: min3,
              load: (svc.NextBus3?.Load as BusLoad) || 'SEA',
              deck: (svc.NextBus3?.Type as BusDeckType) || 'DD',
              wab: svc.NextBus3?.Feature === 'WAB',
              plateNumber: `SG${Math.floor(5000 + Math.random() * 4999)}T`,
              vehicleModel: svc.NextBus3?.Type === 'DD' ? 'Volvo B9TL Wright' : 'Mercedes-Benz Citaro',
              distanceMetres: min3 * 480
            }
          : undefined
      };
    });

    return {
      arrivals: mapped,
      isLiveLta: Boolean(data.isLiveLta),
      dataSource: data.dataSource || 'lta_datamall_v3'
    };
  } catch (err) {
    console.warn('[Transit API] Falling back to local data simulator:', err);
    return {
      arrivals: getLiveArrivalsForStop(busStopCode, tickOffset),
      isLiveLta: false,
      dataSource: 'local_fallback'
    };
  }
}

// Check /api/health
export async function checkApiHealth(): Promise<ApiHealthStatus | null> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('Failed to check health endpoint:', err);
    return null;
  }
}
