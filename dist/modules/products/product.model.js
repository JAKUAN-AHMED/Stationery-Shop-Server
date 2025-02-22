"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const product_constant_1 = require("./product.constant");
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, trim: true, unique: true },
    author: { type: String, trim: true },
    description: { type: String, required: true, trim: true },
    category: {
        type: String,
        required: true,
        enum: {
            values: Object.values(product_constant_1.productTypes),
            message: 'Needed a product category!',
        },
    },
    price: { type: Number, required: true, min: 0 },
    stockQuantity: { type: Number, required: true, min: 0 },
    brand: { type: String, trim: true },
    color: { type: String, trim: true },
    size: { type: String, trim: true },
    material: { type: String, trim: true },
    sku: { type: String, required: true, unique: true, trim: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    isFeatured: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
    productImg: { type: String, default: '' },
    discount: {
        percentage: { type: String },
        validUntil: { type: Date },
    },
    status: {
        type: String,
        required: true,
        default: 'available',
        enum: {
            values: Object.values(product_constant_1.productStatus),
            message: 'Needed a product status!',
        },
    },
}, {
    timestamps: true,
});
exports.ProductModel = (0, mongoose_1.model)('Product', ProductSchema);
