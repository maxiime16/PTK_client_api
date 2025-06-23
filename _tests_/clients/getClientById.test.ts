import request from 'supertest';
import { createTestApp } from '../setup';
import * as clientService from '../../src/services/clients.service';

jest.mock('../../src/services/clients.service.ts');

const app = createTestApp();

describe('GET /clients/:id', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return client by ID', async () => {
    const client = { id: '1', name: 'Client 1' };
    (clientService.findClientById as jest.Mock).mockResolvedValue(client);

    const res = await request(app).get('/clients/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(client);
  });

  it('should return 404 if not found', async () => {
    (clientService.findClientById as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get('/clients/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Client introuvable' });
  });

  it('should handle errors', async () => {
    (clientService.findClientById as jest.Mock).mockRejectedValue(new Error('Erreur'));

    const res = await request(app).get('/clients/1');
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Erreur' });
  });
});
