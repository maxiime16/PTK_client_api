import { Request, Response } from 'express';
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from '../../src/controllers/clients.controller.js';
import * as clientService from '../../src/services/clients.service.js';

jest.mock('../../src/services/clients.service.js');

// 🛠️ Utilitaire pour créer une fausse response
const mockResponse = (): Response => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  } as unknown as Response;
  return res;
};

// 🛠️ Utilitaire pour mocker une request partielle
const mockRequest = (data: Partial<Request>): Request => {
  return data as Request;
};

describe('Clients Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllClients', () => {
    it('should return all clients', async () => {
      const mockClients = [{ id: '1', name: 'Alice' }];
      (clientService.findAllClients as jest.Mock).mockResolvedValue(mockClients);

      const req = mockRequest({});
      const res = mockResponse();

      await getAllClients(req, res);

      expect(res.json).toHaveBeenCalledWith(mockClients);
    });

    it('should handle errors', async () => {
      (clientService.findAllClients as jest.Mock).mockRejectedValue(new Error('DB error'));

      const req = mockRequest({});
      const res = mockResponse();

      await getAllClients(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
    });
  });

  describe('getClientById', () => {
    it('should return client if found', async () => {
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();
      const mockClient = { id: '1', name: 'Alice' };
      (clientService.findClientById as jest.Mock).mockResolvedValue(mockClient);

      await getClientById(req, res);

      expect(res.json).toHaveBeenCalledWith(mockClient);
    });

    it('should return 404 if client not found', async () => {
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();
      (clientService.findClientById as jest.Mock).mockResolvedValue(null);

      await getClientById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Client introuvable' });
    });

    it('should handle errors', async () => {
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();
      (clientService.findClientById as jest.Mock).mockRejectedValue(new Error('DB error'));

      await getClientById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
    });
  });

  describe('createClient', () => {
    it('should create and return client', async () => {
      const req = mockRequest({ body: { name: 'New Client' } });
      const res = mockResponse();
      const newClient = { id: '2', name: 'New Client' };
      (clientService.createNewClient as jest.Mock).mockResolvedValue(newClient);

      await createClient(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newClient);
    });

    it('should handle errors', async () => {
      const req = mockRequest({ body: { name: '' } });
      const res = mockResponse();
      (clientService.createNewClient as jest.Mock).mockRejectedValue(new Error('Invalid data'));

      await createClient(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid data' });
    });
  });

  describe('updateClient', () => {
    it('should update and return client', async () => {
      const req = mockRequest({ params: { id: '1' }, body: { name: 'Updated' } });
      const res = mockResponse();
      const updatedClient = { id: '1', name: 'Updated' };
      (clientService.updateExistingClient as jest.Mock).mockResolvedValue(updatedClient);

      await updateClient(req, res);

      expect(res.json).toHaveBeenCalledWith(updatedClient);
    });

    it('should return 404 if not found', async () => {
      const req = mockRequest({ params: { id: '1' }, body: { name: 'Updated' } });
      const res = mockResponse();
      (clientService.updateExistingClient as jest.Mock).mockResolvedValue(null);

      await updateClient(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Client introuvable' });
    });

    it('should handle errors', async () => {
      const req = mockRequest({ params: { id: '1' }, body: { name: '' } });
      const res = mockResponse();
      (clientService.updateExistingClient as jest.Mock).mockRejectedValue(new Error('Validation error'));

      await updateClient(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Validation error' });
    });
  });

  describe('deleteClient', () => {
    it('should delete client', async () => {
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();
      (clientService.removeClient as jest.Mock).mockResolvedValue(true);

      await deleteClient(req, res);

      expect(res.json).toHaveBeenCalledWith({ message: 'Client supprimé avec succès' });
    });

    it('should return 404 if not found', async () => {
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();
      (clientService.removeClient as jest.Mock).mockResolvedValue(false);

      await deleteClient(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Client introuvable' });
    });

    it('should handle errors', async () => {
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();
      (clientService.removeClient as jest.Mock).mockRejectedValue(new Error('Server error'));

      await deleteClient(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error' });
    });
  });
});
