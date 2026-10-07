/**
 * Health check and monitoring endpoint for Singapore Civic Transit APIs.
 * GET /api/health
 */

export async function handleHealthCheck(req, res) {
  const startTime = Date.now();
  const hasLtaKey = Boolean(process.env.LTA_ACCOUNT_KEY || process.env.ACCOUNT_KEY);
  const checkLta = req.query.checkLta === 'true' || req.query.ping === 'true';

  let ltaStatus = {
    accountKeyConfigured: hasLtaKey,
    endpoint: 'https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival',
    status: hasLtaKey ? 'configured' : 'missing_key (using simulated fallback stream)'
  };

  // Optional live upstream ping if requested
  if (checkLta && hasLtaKey) {
    try {
      const apiKey = process.env.LTA_ACCOUNT_KEY || process.env.ACCOUNT_KEY;
      const upstreamRes = await fetch(
        'https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=04121',
        {
          headers: {
            AccountKey: apiKey,
            accept: 'application/json'
          },
          signal: AbortSignal.timeout(5000)
        }
      );

      ltaStatus.upstreamPing = {
        statusCode: upstreamRes.status,
        statusText: upstreamRes.statusText,
        ok: upstreamRes.ok,
        latencyMs: Date.now() - startTime
      };
    } catch (err) {
      ltaStatus.upstreamPing = {
        ok: false,
        error: err.message
      };
    }
  }

  const memoryUsage = process.memoryUsage();

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  return res.status(200).json({
    status: 'healthy',
    service: 'Singapore Civic Transit Modern API Gateway',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    sgtTimestamp: new Date().toLocaleString('en-SG', { timeZone: 'Asia/Singapore' }),
    ltaDataMall: ltaStatus,
    memory: {
      rssMb: (memoryUsage.rss / 1024 / 1024).toFixed(2),
      heapUsedMb: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2)
    },
    responseTimeMs: Date.now() - startTime
  });
}

export default handleHealthCheck;
