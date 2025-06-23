import express from 'express';
import clientRouter from '../src/routes/clients.routes';

export function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use('/clients', clientRouter);
  return app;
}
