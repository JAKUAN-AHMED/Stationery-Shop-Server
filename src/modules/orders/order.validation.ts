import { z } from 'zod';

export const OrderValidationSchema = z.object({
  products: z.array(
    z.object({
      product: z.string().min(24, 'Invalid product ID'), // MongoDB ObjectId
      quantity: z.number().min(1, 'Quantity must be at least 1'),
    }),
  ),
});

export const updateOrderValidation=OrderValidationSchema.partial();
