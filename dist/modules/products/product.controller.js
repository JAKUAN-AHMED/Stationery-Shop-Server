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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utility/sendResponse"));
const product_service_1 = require("./product.service");
const createProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_service_1.productServices.createProductIntoDb(req.file, req.body);
    try {
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: 'product created successfully',
            data: product,
        });
    }
    catch (err) {
        (0, sendResponse_1.default)(res, {
            statusCode: 400,
            success: false,
            message: err.message,
            data: [],
        });
    }
}));
const getAllProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_service_1.productServices.getAllProductFromDB(req.query);
    const isHas = products.result.length > 0 ? true : false;
    (0, sendResponse_1.default)(res, {
        statusCode: isHas ? 200 : 404,
        success: isHas ? true : false,
        message: isHas
            ? 'All products retrieved successfully'
            : 'there is no product available',
        data: isHas ? products : [],
    });
}));
//single product
const singleProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_service_1.productServices.singleProduct(req.params.productId);
    const isHas = product ? true : false;
    (0, sendResponse_1.default)(res, {
        statusCode: isHas ? 200 : 404,
        success: isHas ? true : false,
        message: isHas
            ? 'product retrieved successfully'
            : ' product not available',
        data: isHas ? product : [],
    });
}));
//update
const updateProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_service_1.productServices.updateProduct(req.params.productId, req.body);
    const isHas = product ? true : false;
    (0, sendResponse_1.default)(res, {
        statusCode: isHas ? 200 : 404,
        success: isHas ? true : false,
        message: isHas ? 'product updated successfully' : ' product not available',
        data: isHas ? product : [],
    });
}));
//delete
const deleteProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedProduct = yield product_service_1.productServices.deleteProduct(req.params.productId);
    const isHas = deletedProduct ? true : false;
    (0, sendResponse_1.default)(res, {
        statusCode: isHas ? 200 : 404,
        success: isHas ? true : false,
        message: isHas ? 'product deleted successfully' : ' product not found',
    });
}));
exports.ProductControllers = {
    createProduct,
    getAllProduct,
    singleProduct,
    updateProduct,
    deleteProduct,
};
