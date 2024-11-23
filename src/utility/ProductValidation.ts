import { z } from 'zod';

export const productValidation = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is Too long'),
  brand: z.string().min(1, 'Brand is required').max(50, 'Brand is too long'),
  price: z.number().positive('Price must be greater than Zero'),
  category: z.enum(
    ['Writing', 'Office Supplies', 'Art Supplies', 'Educational', 'Technology'],
    {
      errorMap: () => ({
        message:
          'category must be one of the following Writing,Office Supplies,Art Supplies,Educational,Technology',
      }),
    },
  ),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(300, 'Description is too long'),
  quantity: z.number().int().positive('Quantity must be a positive number'),
  inStock: z.boolean(),
});
export const productUpdateValidation=productValidation.partial();