"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderUpdateValidation = exports.orderValidation = void 0;
const zod_1 = require("zod");
exports.orderValidation = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'Invalid Email Address' }),
    product: zod_1.z.string().min(1, 'product id required').max(50),
    quantity: zod_1.z.number().int().positive('Quantity must be a positive number'),
    totalPrice: zod_1.z
        .number()
        .positive({ message: 'Total price must be a positive Number' }),
});
exports.OrderUpdateValidation = exports.orderValidation.partial();
