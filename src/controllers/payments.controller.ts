import { Router } from 'express';
import { PaymentIntentSchema } from '../utils/validations';
import { db, newId, Payment } from '../domain/store';

const router = Router();

// POST /payments
router.post('/payments', (req, res) => {
  const parse = PaymentIntentSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: 'Entrée invalide', details: parse.error.flatten() });

  const order = db.orders.get(parse.data.order_id);
  if (!order) return res.status(404).json({ error: 'Commande introuvable' });

  const id = newId('pay');
  const payment: Payment = { id, order_id: order.id, method: parse.data.method, status: 'pending' };
  db.payments.set(id, payment);

  const needs_3ds = parse.data.method === 'card';
  return res.status(201).json({
    payment_intent_id: id,
    gateway_ref: 'demo-ref',
    needs_3ds
  });
});

export default router;
