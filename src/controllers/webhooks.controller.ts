import { Router } from 'express';
import { WebhookSchema } from '../utils/validations';
import { db } from '../domain/store';
import { verifyHmac } from '../utils/hmac';

const router = Router();

// POST /webhooks/payments
router.post('/webhooks/payments', (req, res) => {
  // Démo: on signe le JSON du body. En prod: utiliser le body brut.
  const signature = String(req.headers['x-signature'] || '');
  const secret = process.env.WEBHOOK_SECRET || 'dev-secret';
  const payload = JSON.stringify(req.body || {});
  const ok = verifyHmac(payload, signature, secret);
  if (!ok) return res.status(401).json({ error: 'Signature invalide' });

  const parsed = WebhookSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Payload invalide', details: parsed.error.flatten() });

  const { type, payment_id, order_id } = parsed.data.event;

  if (type === 'payment.succeeded' && payment_id && order_id) {
    const pay = db.payments.get(payment_id);
    const ord = db.orders.get(order_id);
    if (pay) pay.status = 'succeeded';
    if (ord) ord.status = 'payee';
  }

  if (type === 'payment.failed' && payment_id) {
    const pay = db.payments.get(payment_id);
    if (pay) pay.status = 'failed';
  }

  return res.json({ received: true });
});

export default router;
