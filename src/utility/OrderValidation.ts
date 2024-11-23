import { z } from 'zod';

export const orderValidation = z.object({
  email: z.string().email({ message: 'Invalid Email Address' }),
  product: z.string().min(1, 'product id required').max(50),
  quantity: z.number().int().positive('Quantity must be a positive number'),
  totalPrice: z
    .number()
    .positive({ message: 'Total price must be a positive Number' }),
});

export const OrderUpdateValidation = orderValidation.partial();
