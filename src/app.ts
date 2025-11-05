import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

// Health
app.get('/health', (_req, res) => res.json({ ok: true, service: 'xorondom-eboutique' }));

// TODO: brancher les contrôleurs générés depuis OpenAPI
// Exemple minimal:
app.post('/checkout/validate', (req, res) => {
  const { items } = req.body || {};
  if (!Array.isArray(items)) return res.status(400).json({ error: 'items manquants' });
  return res.status(201).json({ order_id: 'demo-001', status: 'cree' });
});

export default app;
