import { Router } from 'express';
import { NotifyEmailSchema, NotifySmsSchema } from '../utils/validations';
import { db } from '../domain/store';

const router = Router();

// POST /notify/email
router.post('/notify/email', (req, res) => {
  const parse = NotifyEmailSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: 'Entrée invalide', details: parse.error.flatten() });

  const order = db.orders.get(parse.data.order_id);
  if (!order) return res.status(404).json({ error: 'Commande introuvable' });

  // Démo: on simule l’enqueue
  return res.status(202).json({ queued: true, channel: 'email', order_id: order.id });
});

// POST /notify/sms
router.post('/notify/sms', (req, res) => {
  const parse = NotifySmsSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: 'Entrée invalide', details: parse.error.flatten() });

  const order = db.orders.get(parse.data.order_id);
  if (!order) return res.status(404).json({ error: 'Commande introuvable' });

  // Démo: on simule l’enqueue
  return res.status(202).json({ queued: true, channel: 'sms', order_id: order.id });
});

export default router;
