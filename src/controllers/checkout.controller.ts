import { Router } from 'express';
import { CreateOrderSchema } from '../utils/validations';
import { db, newId, Order } from '../domain/store';

const router = Router();

// POST /checkout/validate
router.post('/checkout/validate', (req, res) => {
  const parse = CreateOrderSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: 'Entrée invalide', details: parse.error.flatten() });

  const id = newId('ord');
  const order: Order = { id, items: parse.data.items, customer_id: parse.data.customer_id, status: 'cree' };
  db.orders.set(id, order);

  return res.status(201).json({ order_id: id, status: order.status });
});

export default router;
