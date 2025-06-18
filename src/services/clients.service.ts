import { Client } from '../models/Client.js';

export async function findAllClients() {
  return Client.find();
}

export async function findClientById(id: string) {
  return Client.findById(id);
}

export async function createNewClient(data: any) {
  return Client.create(data);
}

export async function updateExistingClient(id: string, data: any) {
  return Client.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export async function removeClient(id: string) {
  return Client.findByIdAndDelete(id);
}
