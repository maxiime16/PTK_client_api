import {
  findAllClients,
  findClientById,
  createNewClient,
  updateExistingClient,
  removeClient,
} from '../../src/services/clients.service.js';

import { Client } from '../../src/models/Client.js'

jest.mock('../../src/models/Client.js');

describe('Client Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call findAllClients', async () => {
    const mockClients = [{ id: '1', name: 'Alice' }];
    (Client.find as jest.Mock).mockResolvedValue(mockClients);

    const result = await findAllClients();

    expect(Client.find).toHaveBeenCalled();
    expect(result).toEqual(mockClients);
  });

  it('should call findClientById', async () => {
    const mockClient = { id: '1', name: 'Bob' };
    (Client.findById as jest.Mock).mockResolvedValue(mockClient);

    const result = await findClientById('1');

    expect(Client.findById).toHaveBeenCalledWith('1');
    expect(result).toEqual(mockClient);
  });

  it('should call createNewClient', async () => {
    const newClient = { name: 'New Client' };
    const mockCreated = { id: '2', ...newClient };
    (Client.create as jest.Mock).mockResolvedValue(mockCreated);

    const result = await createNewClient(newClient);

    expect(Client.create).toHaveBeenCalledWith(newClient);
    expect(result).toEqual(mockCreated);
  });

  it('should call updateExistingClient', async () => {
    const updateData = { name: 'Updated Client' };
    const mockUpdated = { id: '1', ...updateData };
    (Client.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdated);

    const result = await updateExistingClient('1', updateData);

    expect(Client.findByIdAndUpdate).toHaveBeenCalledWith('1', updateData, {
      new: true,
      runValidators: true,
    });
    expect(result).toEqual(mockUpdated);
  });

  it('should call removeClient', async () => {
    const mockDeleted = { id: '1', name: 'Deleted Client' };
    (Client.findByIdAndDelete as jest.Mock).mockResolvedValue(mockDeleted);

    const result = await removeClient('1');

    expect(Client.findByIdAndDelete).toHaveBeenCalledWith('1');
    expect(result).toEqual(mockDeleted);
  });
});
