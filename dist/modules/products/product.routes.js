"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const product_controller_1 = require("./product.controller");
const ValidateRequest_1 = __importDefault(require("../../middlewares/ValidateRequest"));
const product_validation_1 = require("./product.validation");
const sendImageToCloudinary_1 = require("../../utility/sendImageToCloudinary");
const router = (0, express_1.Router)();
//create product
router.post('/create-product', (0, auth_1.default)('admin'), sendImageToCloudinary_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, ValidateRequest_1.default)(product_validation_1.ProductValidations.createProductValidation), product_controller_1.ProductControllers.createProduct);
//get all products
router.get('/', product_controller_1.ProductControllers.getAllProduct);
//product by Id
router.get('/:productId', product_controller_1.ProductControllers.singleProduct);
//product update by Id
router.patch('/:productId', (0, auth_1.default)('admin'), (0, ValidateRequest_1.default)(product_validation_1.ProductValidations.updateProductValidation), product_controller_1.ProductControllers.updateProduct);
//product by Id
router.delete('/:productId', (0, auth_1.default)('admin'), product_controller_1.ProductControllers.deleteProduct);
exports.ProductRoutes = router;
