import { applyMiddleware } from './middlewares.js';
import { initRoutes } from './routes.js';

export function initApp(app) {
  applyMiddleware(app);

  initRoutes(app);

  return { app };
}
