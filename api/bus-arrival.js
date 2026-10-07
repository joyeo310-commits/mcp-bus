/**
 * LTA DataMall v3 Bus Arrival Proxy Endpoint
 * GET /api/bus-arrival?BusStopCode=04121&ServiceNo=7
 * GET /api/BusArrival?BusStopCode=04121
 */

// Simple in-memory cache to prevent exceeding LTA DataMall rate limits
// LTA BusArrival updates every 20 seconds
const cache = new Map();
const CACHE_TTL_MS = 15000; // 15 seconds

export async function handleBusArrival(req, res) {
  const busStopCode = req.query.BusStopCode || req.query.busStopCode || req.query.stopCode;
  const serviceNo = req.query.ServiceNo || req.query.serviceNo;

  if (!busStopCode) {
    return res.status(400).json({
      error: 'Missing required parameter: BusStopCode',
      usage: 'GET /api/bus-arrival?BusStopCode=04121&ServiceNo=7',
      example: '/api/bus-arrival?BusStopCode=04121'
    });
  }

  const cacheKey = `${busStopCode}_${serviceNo || 'all'}`;
  const now = Date.now();

  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey);
    if (now - cached.timestamp < CACHE_TTL_MS) {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('X-Cache', 'HIT');
      return res.status(200).json({
        ...cached.data,
        cached: true,
        cacheAgeMs: now - cached.timestamp
      });
    }
  }

  const apiKey = process.env.LTA_ACCOUNT_KEY || process.env.ACCOUNT_KEY;

  let targetUrl = `https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=${encodeURIComponent(
    busStopCode
  )}`;
  if (serviceNo) {
    targetUrl += `&ServiceNo=${encodeURIComponent(serviceNo)}`;
  }

  // If LTA AccountKey is configured, query the real LTA DataMall API
  if (apiKey) {
    try {
      const response = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          AccountKey: apiKey,
          accept: 'application/json'
        },
        signal: AbortSignal.timeout(8000)
      });

      if (response.ok) {
        const ltaData = await response.json();

        const payload = {
          ...ltaData,
          isLiveLta: true,
          dataSource: 'lta_datamall_v3',
          fetchedAt: new Date().toISOString()
        };

        cache.set(cacheKey, { timestamp: now, data: payload });

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('X-Cache', 'MISS');
        return res.status(200).json(payload);
      } else {
        console.warn(
          `[LTA BusArrival] Upstream returned status ${response.status}: ${response.statusText}`
        );
      }
    } catch (err) {
      console.error('[LTA BusArrival] Upstream request error:', err.message);
    }
  }

  // Graceful fallback for local prototyping when LTA_ACCOUNT_KEY is not yet added
  // Returns conformant LTA DataMall v3 BusArrival format
  const fallbackPayload = generateFallbackLtaPayload(busStopCode, serviceNo);
  
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Cache', 'FALLBACK');
  return res.status(200).json(fallbackPayload);
}

function generateFallbackLtaPayload(busStopCode, filterServiceNo) {
  const currentTime = new Date();
  
  const sampleServices = ['7', '12', '147', '166', '174', '190', '502', '851'];
  const servicesToInclude = filterServiceNo 
    ? [filterServiceNo] 
    : sampleServices.slice(0, 6);

  const operators = {
    '7': 'SBST',
    '12': 'GAS',
    '147': 'SBST',
    '166': 'SBST',
    '174': 'SBST',
    '190': 'SMRT',
    '502': 'SBST',
    '851': 'TTS'
  };

  const loads = ['SEA', 'SEA', 'SDA', 'LSD', 'SEA'];
  const types = ['DD', 'DD', 'SD', 'DD', 'BD'];

  const services = servicesToInclude.map((svc, idx) => {
    const min1 = Math.max(0, (idx * 2) % 6);
    const min2 = min1 + 6 + (idx % 4);
    const min3 = min2 + 8 + (idx % 5);

    const eta1 = new Date(currentTime.getTime() + min1 * 60000).toISOString();
    const eta2 = new Date(currentTime.getTime() + min2 * 60000).toISOString();
    const eta3 = new Date(currentTime.getTime() + min3 * 60000).toISOString();

    return {
      ServiceNo: svc,
      Operator: operators[svc] || 'SBST',
      NextBus: {
        OriginCode: '84009',
        DestinationCode: '17009',
        EstimatedArrival: eta1,
        Latitude: (1.294 + idx * 0.002).toFixed(6),
        Longitude: (103.852 + idx * 0.002).toFixed(6),
        VisitNumber: '1',
        Load: loads[idx % loads.length],
        Feature: 'WAB',
        Type: types[idx % types.length]
      },
      NextBus2: {
        OriginCode: '84009',
        DestinationCode: '17009',
        EstimatedArrival: eta2,
        Latitude: (1.298 + idx * 0.002).toFixed(6),
        Longitude: (103.858 + idx * 0.002).toFixed(6),
        VisitNumber: '1',
        Load: loads[(idx + 1) % loads.length],
        Feature: 'WAB',
        Type: types[(idx + 1) % types.length]
      },
      NextBus3: {
        OriginCode: '84009',
        DestinationCode: '17009',
        EstimatedArrival: eta3,
        Latitude: (1.302 + idx * 0.002).toFixed(6),
        Longitude: (103.864 + idx * 0.002).toFixed(6),
        VisitNumber: '1',
        Load: loads[(idx + 2) % loads.length],
        Feature: 'WAB',
        Type: types[(idx + 2) % types.length]
      }
    };
  });

  return {
    'odata.metadata': 'https://datamall2.mytransport.sg/ltaodataservice/$metadata#BusArrivalv3',
    BusStopCode: busStopCode,
    Services: services,
    isLiveLta: false,
    dataSource: 'simulated_lta_v3',
    notice: 'Add LTA_ACCOUNT_KEY in .env to connect directly to live LTA DataMall servers.'
  };
}

export default handleBusArrival;
