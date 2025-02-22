"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
//create order
router.post('/verify', (0, auth_1.default)('admin', 'user'), order_controller_1.OrderControllers.verifyPayment);
router.post('/create-order', (0, auth_1.default)('admin', 'user'), order_controller_1.OrderControllers.createOrder);
//all order
router.get('/', (0, auth_1.default)('admin', 'user'), order_controller_1.OrderControllers.getAllOrder);
//single
router.get('/:orderId', (0, auth_1.default)('user', 'admin'), order_controller_1.OrderControllers.singleOrder);
//update
router.patch('/:orderId', (0, auth_1.default)('admin'), order_controller_1.OrderControllers.updateOrder);
//delete order
router.delete('/:orderId', (0, auth_1.default)('admin', 'user'), order_controller_1.OrderControllers.deleteOrder);
exports.OrderRoutes = router;
