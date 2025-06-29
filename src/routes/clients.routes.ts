import { Router } from 'express';
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from '../controllers/clients.controller.js';
import { authenticateToken } from '../lib/auth.js';
import { validateClient } from '../lib/validateClient.js';

const router = Router();

router.get('/', getAllClients);
router.get('/:id', authenticateToken, getClientById);
router.post('/', authenticateToken, validateClient, createClient);
router.put('/:id', authenticateToken, validateClient, updateClient);
router.delete('/:id', authenticateToken, deleteClient);

export default router;
