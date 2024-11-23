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
exports.orderController = void 0;
const OrderServices_1 = require("../services/OrderServices");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield OrderServices_1.OrderServices.createOrderIntoDb(req, res);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to Create Order',
            success: false,
            error: error.message,
        });
    }
});
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield OrderServices_1.OrderServices.getAllOrderFromDb();
        res.status(200).json({
            success: true,
            message: 'Successfully got all orders',
            orders,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'Orders Not Found',
            datails: error,
        });
    }
});
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { OrderId } = req.params;
        const order = yield OrderServices_1.OrderServices.getOrderByIdFromDB(OrderId);
        if (!order) {
            res.status(404).json({
                error: 'Order Not Found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Successfully got Order bY Id',
            order,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to Fetch order',
            details: error,
        });
    }
});
const UpdateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { OrderId } = req.params;
        const order = yield OrderServices_1.OrderServices.UpdateOrderByIdFromDB(OrderId, req.body);
        if (!order) {
            res.status(404).json({
                error: 'order Not Found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'order successfully updated',
            order,
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
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { OrderId } = req.params;
        const order = yield OrderServices_1.OrderServices.deleteOrderFromDB(OrderId);
        res.status(200).json({
            message: 'order successfully deleted',
            status: true,
            order: {},
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
const calculateRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalRevenue = yield OrderServices_1.OrderServices.calculateRevenueFromDB();
        res.status(200).json({
            message: 'Revenu calculated Successfully',
            status: true,
            totalRevenue: { totalRevenue },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to calculate revenue',
            details: error.message,
        });
    }
});
exports.orderController = {
    createOrder,
    getAllOrder,
    getOrderById,
    UpdateOrder,
    deleteOrder,
    calculateRevenue,
};
