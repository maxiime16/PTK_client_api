import request from 'supertest';
import { createTestApp } from '../setup';
import * as clientService from '../../src/services/clients.service';

jest.mock('../../src/services/clients.service.ts');

const app = createTestApp();

describe('GET /clients', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return all clients', async () => {
    const mockClients = [{ id: '1', name: 'Client 1' }];
    (clientService.findAllClients as jest.Mock).mockResolvedValue(mockClients);

    const res = await request(app).get('/clients');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockClients);
  });

  it('should handle errors', async () => {
    (clientService.findAllClients as jest.Mock).mockRejectedValue(new Error('Erreur'));

    const res = await request(app).get('/clients');
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Erreur' });
  });
});
