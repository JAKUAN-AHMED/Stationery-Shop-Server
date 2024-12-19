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
        res.status(201).json({
            message: 'Order created successfully',
            status: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to Create Order',
            status: false,
            error: error.message,
        });
    }
});
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield OrderServices_1.OrderServices.getAllOrderFromDb();
        if (!orders || orders.length == 0) {
            res.status(404).json({
                message: 'Orders Not Found',
                status: false,
                data: orders,
            });
        }
        else {
            res.status(200).json({
                message: 'Orders retrived successfully',
                status: true,
                data: orders,
            });
        }
    }
    catch (error) {
        res.status(404).json({
            message: 'Orders Not Found',
            status: false,
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
                message: 'Order Not Found',
                status: false,
            });
            return;
        }
        res.status(200).json({
            message: 'Order retrived successfully',
            status: true,
            data: order,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to Fetch order',
            status: false,
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
            message: 'Order  updated successfully',
            status: true,
            data: order,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to update Order',
            status: false,
            details: error,
        });
    }
});
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { OrderId } = req.params;
        const order = yield OrderServices_1.OrderServices.deleteOrderFromDB(OrderId);
        if (!order) {
            res.status(404).json({
                message: 'Order Not Found',
                status: false,
                data: {},
            });
        }
        res.status(200).json({
            message: 'Order successfully deleted',
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
const calculateRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalRevenue = yield OrderServices_1.OrderServices.calculateRevenueFromDB();
        res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            data: { totalRevenue },
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to calculate revenue',
            status: false,
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
