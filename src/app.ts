import express from 'express';
import bodyParser from 'body-parser';

import checkoutController from './controllers/checkout.controller';
import ordersController from './controllers/orders.controller';
import paymentsController from './controllers/payments.controller';
import webhooksController from './controllers/webhooks.controller';
import notifyController from './controllers/notify.controller';

const app = express();
app.use(bodyParser.json());

// Health
app.get('/health', (_req, res) => res.json({ ok: true, service: 'xorondom-eboutique' }));

// API routes
app.use('/', checkoutController);
app.use('/', ordersController);
app.use('/', paymentsController);
app.use('/', webhooksController);
app.use('/', notifyController);

export default app;
