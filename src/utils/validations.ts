import { z } from 'zod';

export const CreateOrderSchema = z.object({
  items: z.array(z.object({
    sku: z.string(),
    qty: z.number().int().positive()
  })),
  customer_id: z.string().optional()
});

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
