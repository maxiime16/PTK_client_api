import request from 'supertest';
import { createTestApp } from '../setup';
import * as clientService from '../../src/services/clients.service';

jest.mock('../../src/services/clients.service.ts');

const app = createTestApp();

describe('DELETE /clients/:id', () => {
  afterEach(() => jest.clearAllMocks());

  it('should delete a client', async () => {
    (clientService.removeClient as jest.Mock).mockResolvedValue(true);

    const res = await request(app).delete('/clients/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Client supprimé avec succès' });
  });

  it('should return 404 if client not found', async () => {
    (clientService.removeClient as jest.Mock).mockResolvedValue(null);

    const res = await request(app).delete('/clients/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Client introuvable' });
  });

  it('should handle errors', async () => {
    (clientService.removeClient as jest.Mock).mockRejectedValue(new Error('Erreur serveur'));

    const res = await request(app).delete('/clients/1');
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Erreur serveur' });
  });
});
