"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ValidateRequest_1 = require("../middlewares/ValidateRequest");
const ProductValidation_1 = require("../utility/ProductValidation");
const ProductController_1 = require("../Controllers/ProductController");
const router = express_1.default.Router();
router.get('/:productId', ProductController_1.ProductController.getProductById);
router.put('/:productId', (0, ValidateRequest_1.ValidateRequest)(ProductValidation_1.productUpdateValidation), ProductController_1.ProductController.updateProduct);
router.delete('/:productId', ProductController_1.ProductController.deleteProduct);
router.get('/', ProductController_1.ProductController.getAllProducts);
router.post('/', (0, ValidateRequest_1.ValidateRequest)(ProductValidation_1.productValidation), ProductController_1.ProductController.createProduct);
exports.default = router;
