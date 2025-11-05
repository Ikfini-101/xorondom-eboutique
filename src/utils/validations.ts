import { z } from 'zod';

export const CreateOrderSchema = z.object({
  items: z.array(z.object({
    sku: z.string(),
    qty: z.number().int().positive()
  })),
  customer_id: z.string().optional()
});
export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;

export const UpdateStatusSchema = z.object({
  status: z.enum(['cree','payee'])
});
export type UpdateStatusInput = z.infer<typeof UpdateStatusSchema>;

export const PaymentIntentSchema = z.object({
  order_id: z.string(),
  method: z.enum(['mobile_money','card'])
});
export type PaymentIntentInput = z.infer<typeof PaymentIntentSchema>;

export const WebhookSchema = z.object({
  event: z.object({
    type: z.enum(['payment.succeeded','payment.failed','payment.intent.created']),
    payment_id: z.string().optional(),
    order_id: z.string().optional()
  })
});
export type WebhookInput = z.infer<typeof WebhookSchema>;

export const NotifyEmailSchema = z.object({ order_id: z.string() });
export const NotifySmsSchema = z.object({ order_id: z.string() });
