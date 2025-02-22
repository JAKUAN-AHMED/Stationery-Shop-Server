"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidations = void 0;
const zod_1 = require("zod");
const product_constant_1 = require("./product.constant");
//validation
const createProductValidation = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Product name required!' }).min(5, {
        message: 'Product name must be at least 5 characters long',
    }),
    author: zod_1.z
        .string({ required_error: 'Author name required!' })
        .min(3, {
        message: 'Author name must be at least 3 characters long',
    })
        .optional(),
    description: zod_1.z.string({ required_error: 'Description must be required' }),
    category: zod_1.z.enum(product_constant_1.productTypes, {
        required_error: 'Product category is required',
    }),
    price: zod_1.z.number({ required_error: 'Product price is required' }).min(0, {
        message: 'Product price must be greater than 0',
    }),
    stockQuantity: zod_1.z
        .number({ required_error: 'Product quantity is required' })
        .min(0, { message: 'Product quantity must be greater than 0' }),
    brand: zod_1.z.string().optional(),
    color: zod_1.z.string().optional(),
    size: zod_1.z.string().optional(),
    material: zod_1.z.string().optional(),
    sku: zod_1.z.string({ required_error: 'Product SKU is required' }),
    rating: zod_1.z.number({ required_error: 'Rating is required' }),
    isFeatured: zod_1.z.boolean().default(false),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    productImg: zod_1.z.string().optional(),
    discount: zod_1.z
        .object({
        percentage: zod_1.z.string(),
        validUntil: zod_1.z
            .string()
            .refine((date) => new Date(date) > new Date(), {
            message: 'Valid until date must be in the future',
        })
            .optional(),
    })
        .optional(),
    status: zod_1.z.enum(product_constant_1.productStatus).default('available'),
});
const updateProductValidation = createProductValidation.partial();
exports.ProductValidations = {
    createProductValidation,
    updateProductValidation,
};
