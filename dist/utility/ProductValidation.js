"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productUpdateValidation = exports.productValidation = void 0;
const zod_1 = require("zod");
exports.productValidation = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required').max(100, 'Name is Too long'),
    brand: zod_1.z.string().min(1, 'Brand is required').max(50, 'Brand is too long'),
    price: zod_1.z.number().positive('Price must be greater than Zero'),
    category: zod_1.z.enum(['Writing', 'Office Supplies', 'Art Supplies', 'Educational', 'Technology'], {
        errorMap: () => ({
            message: 'category must be one of the following Writing,Office Supplies,Art Supplies,Educational,Technology',
        }),
    }),
    description: zod_1.z
        .string()
        .min(1, 'Description is required')
        .max(300, 'Description is too long'),
    quantity: zod_1.z.number().int().positive('Quantity must be a positive number'),
    inStock: zod_1.z.boolean(),
});
exports.productUpdateValidation = exports.productValidation.partial();
