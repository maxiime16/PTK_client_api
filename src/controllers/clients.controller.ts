import { Request, Response } from "express";
import {
  findAllClients,
  findClientById,
  createNewClient,
  updateExistingClient,
  removeClient,
} from "../services/clients.service";

export async function getAllClients(req: Request, res: Response) {
  try {
    const clients = await findAllClients();
    return res.json(clients);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getClientById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const client = await findClientById(id);
    if (!client) {
      return res.status(404).json({ message: "Client introuvable" });
    }
    return res.json(client);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export async function createClient(req: Request, res: Response) {
  try {
    const newClient = await createNewClient(req.body);
    return res.status(201).json(newClient);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}

export async function updateClient(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updated = await updateExistingClient(id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Client introuvable" });
    }
    return res.json(updated);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}

export async function deleteClient(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await removeClient(id);
    if (!deleted) {
      return res.status(404).json({ message: "Client introuvable" });
    }
    return res.json({ message: "Client supprimé avec succès" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
