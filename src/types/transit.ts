export type BusLoad = 'SEA' | 'SDA' | 'LSD'; // LTA standard: Seats Available, Standing Available, Limited Standing
export type BusDeckType = 'SD' | 'DD' | 'BD'; // Single Deck, Double Deck, Bendy
export type ServiceCategory = 'Standard' | 'Express' | 'Feeder' | 'City Direct' | 'Night Rider';

export interface NextBusInfo {
  estimatedMinutes: number; // 0 for 'Arr', 1, 2, ...
  load: BusLoad;
  deck: BusDeckType;
  wab: boolean; // Wheelchair accessible bus
  plateNumber: string;
  vehicleModel: string;
  distanceMetres: number;
  latitude?: number;
  longitude?: number;
}

export interface BusArrivalService {
  serviceNo: string;
  operator: 'SBS Transit' | 'SMRT' | 'Tower Transit' | 'Go-Ahead';
  category: ServiceCategory;
  originCode: string;
  destinationCode: string;
  destinationName: string;
  nextBus: NextBusInfo;
  nextBus2?: NextBusInfo;
  nextBus3?: NextBusInfo;
}

export interface BusStop {
  code: string; // 5-digit code, e.g. "03223"
  name: string; // e.g. "Peninsula Plaza"
  road: string; // e.g. "North Bridge Rd"
  mrtTransfer?: string[]; // e.g. ["EW13", "NS25"] City Hall
  services: string[]; // Services calling here
  coordinates: { x: number; y: number }; // normalized for map 0-100%
  zone: string; // "Central", "East", "West", "North", "North-East"
}

export interface RouteStop {
  sequence: number;
  stopCode: string;
  stopName: string;
  roadName: string;
  distanceKm: number;
  hasBusNow?: boolean;
  busPlate?: string;
  busDeck?: BusDeckType;
  busLoad?: BusLoad;
  mrtTransfer?: string[];
}

export interface BusServiceDetail {
  serviceNo: string;
  operator: 'SBS Transit' | 'SMRT' | 'Tower Transit' | 'Go-Ahead';
  category: ServiceCategory;
  origin: string;
  destination: string;
  directions: {
    directionNumber: 1 | 2;
    directionLabel: string;
    firstBusWeekday: string;
    lastBusWeekday: string;
    firstBusWeekend: string;
    lastBusWeekend: string;
    peakFrequency: string;
    offPeakFrequency: string;
    stops: RouteStop[];
  }[];
}

export interface TransitAlert {
  id: string;
  title: string;
  category: 'Diversion' | 'Disruption' | 'Berth Update' | 'Festive Extension';
  severity: 'high' | 'medium' | 'info';
  timestamp: string;
  validPeriod: string;
  affectedServices: string[];
  summary: string;
  details: string;
  affectedStops?: string[];
}

export interface InterchangeBerth {
  interchangeName: string;
  interchangeCode: string;
  zone: string;
  berths: {
    berthNumber: string;
    services: string[];
    wheelchairBoardingPoint: string;
    amenitiesNearby: string;
  }[];
}

export interface CommuteBookmark {
  id: string;
  stopCode: string;
  stopName: string;
  roadName: string;
  serviceNo?: string;
  customLabel?: string;
  createdAt: number;
}
