import client from 'prom-client';

// Crée un registre global
export const register = new client.Registry();

// Ajoute des métriques par défaut (CPU, RAM, etc.)
client.collectDefaultMetrics({ register });

// Exemple : compteur HTTP par méthode
export const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Nombre total de requêtes HTTP',
  labelNames: ['method', 'route', 'status'],
});

export const httpRequestDurationSeconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Durée des requêtes HTTP en secondes',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.05, 0.1, 0.3, 0.5, 1, 1.5, 2, 5], // à adapter selon ton trafic
});

register.registerMetric(httpRequestDurationSeconds);
register.registerMetric(httpRequestCounter);
