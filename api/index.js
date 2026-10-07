import { handleHealthCheck } from './health.js';
import { handleBusArrival } from './bus-arrival.js';
import { Router } from 'express';

const apiRouter = Router();

// Health check and monitoring endpoint
apiRouter.get('/health', handleHealthCheck);

// LTA DataMall Bus Arrival endpoint (supporting both casing conventions)
apiRouter.get('/bus-arrival', handleBusArrival);
apiRouter.get('/BusArrival', handleBusArrival);

export { handleHealthCheck, handleBusArrival };
export default apiRouter;
