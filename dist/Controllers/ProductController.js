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
            message: 'Product created successfully',
            status: true,
            data: product,
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
        if (!products || products.length == 0) {
            res.status(404).json({
                message: 'Products not found',
                status: false,
                data: products,
            });
        }
        ;
        res.status(200).json({
            message: 'Products retrieved successfully',
            status: true,
            data: products,
        });
    }
    catch (error) {
        res.status(404).json({
            message: 'Product Not Found',
            status: false,
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
            message: 'Product retrieved successfully',
            status: true,
            data: product,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to Fetch Product',
            status: false,
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
            message: 'Product updated successfully',
            status: true,
            data: product,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to update Product',
            status: false,
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
            message: 'Product deleted successfully',
            status: true,
            data: {},
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to delete Product',
            status: false,
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
