import { Router } from 'express';
import { CreateOrderSchema, UpdateStatusSchema } from '../utils/validations';
import { db, newId, Order } from '../domain/store';

const router = Router();

// POST /orders
router.post('/orders', (req, res) => {
  const parse = CreateOrderSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: 'Entrée invalide', details: parse.error.flatten() });

  const id = newId('ord');
  const order: Order = { id, items: parse.data.items, customer_id: parse.data.customer_id, status: 'cree' };
  db.orders.set(id, order);
  return res.status(201).json(order);
});

// GET /orders/:id
router.get('/orders/:id', (req, res) => {
  const order = db.orders.get(req.params.id);
  if (!order) return res.status(404).json({ error: 'Commande introuvable' });
  return res.json(order);
});

// POST /orders/:id/status
router.post('/orders/:id/status', (req, res) => {
  const order = db.orders.get(req.params.id);
  if (!order) return res.status(404).json({ error: 'Commande introuvable' });

  const parse = UpdateStatusSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: 'Entrée invalide', details: parse.error.flatten() });

  order.status = parse.data.status;
  db.orders.set(order.id, order);
  return res.json({ order_id: order.id, status: order.status });
});

export default router;
