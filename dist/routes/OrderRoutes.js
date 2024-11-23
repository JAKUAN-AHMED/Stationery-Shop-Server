"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidateRequest_1 = require("./../middlewares/ValidateRequest");
const express_1 = __importDefault(require("express"));
const OrderController_1 = require("../Controllers/OrderController");
const OrderValidation_1 = require("../utility/OrderValidation");
const router = express_1.default.Router();
router.post('/', (0, ValidateRequest_1.ValidateRequest)(OrderValidation_1.orderValidation), OrderController_1.orderController.createOrder);
router.get('/', OrderController_1.orderController.getAllOrder);
router.get('/revenue', OrderController_1.orderController.calculateRevenue);
router.put('/:OrderId', (0, ValidateRequest_1.ValidateRequest)(OrderValidation_1.OrderUpdateValidation), OrderController_1.orderController.UpdateOrder);
router.delete('/:OrderId', OrderController_1.orderController.deleteOrder);
router.get('/:OrderId', OrderController_1.orderController.getOrderById);
exports.default = router;
