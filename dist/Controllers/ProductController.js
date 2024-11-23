"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const productServices_1 = require("../services/productServices");
//create product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productServices_1.ProductService.createProductIntoDB(req.body);
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product,
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'Failed to create product',
            details: error,
        });
    }
});
//get all product
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        const products = yield productServices_1.ProductService.getAllProductsFromDB(searchTerm);
        res.status(200).json({
            success: true,
            message: 'Successfully got all Products',
            products,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'Product Not Found',
            datails: error,
        });
    }
});
//get a product by Id
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const product = yield productServices_1.ProductService.getProductByIdFromDB(productId);
        if (!product) {
            res.status(404).json({
                error: 'Product Not Found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Successfully got Product bY Id',
            product,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to Fetch Product',
            details: error,
        });
    }
});
//update a product by Id
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updateData = req.body;
        const product = yield productServices_1.ProductService.updateProductFromDB(productId, updateData);
        if (!product) {
            res.status(404).json({
                error: 'Product Not Found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'product successfully updated',
            product,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update Product',
            details: error,
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const product = yield productServices_1.ProductService.deleteProductFromDB(productId);
        if (!product) {
            res.status(404).json({
                error: 'Product Not Found',
            });
            return;
        }
        res.status(200).json({
            message: 'product successfully deleted',
            status: true,
            product: {},
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete Product',
            details: error,
        });
    }
});
exports.ProductController = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
