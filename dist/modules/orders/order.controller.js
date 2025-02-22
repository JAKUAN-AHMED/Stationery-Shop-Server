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
exports.OrderControllers = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utility/sendResponse"));
const order_model_1 = __importDefault(require("./order.model"));
const order_service_1 = require("./order.service");
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const order = yield order_service_1.OrderServices.createOrder(user, req.body, req.ip);
    console.log(order, 'order');
    const isHas = order ? true : false;
    (0, sendResponse_1.default)(res, {
        statusCode: isHas ? 200 : 404,
        success: isHas ? true : false,
        message: isHas ? 'order created successfully' : ' order confirmed',
        data: isHas ? order : [],
    });
}));
const getAllOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_service_1.OrderServices.getAllOrder(req.query);
    const isHas = orders.order.length > 0 ? true : false;
    (0, sendResponse_1.default)(res, {
        statusCode: isHas ? 200 : 404,
        success: isHas ? true : false,
        message: isHas
            ? 'All Orders retrieved successfully'
            : 'there is no order available',
        data: isHas ? orders : [],
    });
}));
//single product
const singleOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //getting order
    const Order = yield order_model_1.default.findById(req.params.orderId);
    if (!Order) {
        throw new AppError_1.default(404, 'Order not found!');
    }
    //order creator match or not
    // if (Order.user != req.user.id) {
    //   throw new AppError(504, 'You are not Authorized!');
    // }
    const order = yield order_service_1.OrderServices.SingleOrder(req.params.orderId);
    const isHas = order ? true : false;
    (0, sendResponse_1.default)(res, {
        statusCode: isHas ? 200 : 404,
        success: isHas ? true : false,
        message: isHas ? 'order retrieved successfully' : ' order not available',
        data: isHas ? order : [],
    });
}));
//update
const updateOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_service_1.OrderServices.updateOrder(req.params.orderId, req.body);
    const isHas = order ? true : false;
    (0, sendResponse_1.default)(res, {
        statusCode: isHas ? 200 : 404,
        success: isHas ? true : false,
        message: isHas ? 'order updated successfully' : ' order not available',
        data: isHas ? order : [],
    });
}));
//delete
const deleteOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedOrder = yield order_service_1.OrderServices.deleteOrder(req.params.productId);
    const isHas = deletedOrder ? true : false;
    (0, sendResponse_1.default)(res, {
        statusCode: isHas ? 200 : 404,
        success: isHas ? true : false,
        message: isHas ? 'order deleted successfully' : ' order not found',
    });
}));
//verify payment
const verifyPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_service_1.OrderServices.verifyPayment(req.query.order_id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Order retrieve successfully!',
        statusCode: 200,
        data: order,
    });
}));
exports.OrderControllers = {
    createOrder,
    getAllOrder,
    singleOrder,
    updateOrder,
    deleteOrder,
    verifyPayment,
};
