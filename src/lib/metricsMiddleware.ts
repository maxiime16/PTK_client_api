import { httpRequestCounter, httpRequestDurationSeconds } from '../config/metrics.js';
import { Request, Response, NextFunction } from 'express';

export function metricsMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = process.hrtime(); // démarrer chrono

  res.once('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const durationInSeconds = seconds + nanoseconds / 1e9;
    const route = req.route?.path || req.path;

    httpRequestCounter.inc({
      method: req.method,
      route,
      status: res.statusCode.toString(),
    });

    httpRequestDurationSeconds.observe(
      {
        method: req.method,
        route,
        status: res.statusCode.toString(),
      },
      durationInSeconds,
    );
  });

  next();
}
