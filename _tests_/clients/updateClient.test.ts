import request from 'supertest';
import { createTestApp } from '../setup';
import * as clientService from '../../src/services/clients.service';

jest.mock('../../src/services/clients.service.ts');

const app = createTestApp();

describe('PUT /clients/:id', () => {
  afterEach(() => jest.clearAllMocks());

  it('should update a client', async () => {
    const updated = { id: '1', name: 'Updated Client' };
    (clientService.updateExistingClient as jest.Mock).mockResolvedValue(updated);

    const res = await request(app).put('/clients/1').send({ name: 'Updated Client' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(updated);
  });

  it('should return 404 if not found', async () => {
    (clientService.updateExistingClient as jest.Mock).mockResolvedValue(null);

    const res = await request(app).put('/clients/999').send({ name: 'Inexistant' });
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Client introuvable' });
  });

  it('should handle error', async () => {
    (clientService.updateExistingClient as jest.Mock).mockRejectedValue(new Error('Erreur'));

    const res = await request(app).put('/clients/1').send({ name: 'Erreur' });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Erreur' });
  });
});
