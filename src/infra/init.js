import { applyMiddleware } from './middlewares.js';
import { initRoutes } from './routes.js';

export function initApp(app) {
  const PORT = process.env.PORT || 3000;

  applyMiddleware(app);

  initRoutes(app);

  return { app, PORT };
}
