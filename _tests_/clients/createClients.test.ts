import request from 'supertest';
import { createTestApp } from '../setup';
import * as clientService from '../../src/services/clients.service';

jest.mock('../../src/services/clients.service.ts');

const app = createTestApp();

describe('POST /clients', () => {
  afterEach(() => jest.clearAllMocks());

  it('should create a new client', async () => {
    const input = { name: 'New Client' };
    const output = { id: '123', ...input };
    (clientService.createNewClient as jest.Mock).mockResolvedValue(output);

    const res = await request(app).post('/clients').send(input);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(output);
  });

  it('should return 400 on error', async () => {
    (clientService.createNewClient as jest.Mock).mockRejectedValue(new Error('Invalid data'));

    const res = await request(app).post('/clients').send({});
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid data' });
  });
});
