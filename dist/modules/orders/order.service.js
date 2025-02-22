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
exports.OrderServices = void 0;
const Querybuilder_1 = __importDefault(require("../../builder/Querybuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = require("../products/product.model");
const order_constant_1 = require("./order.constant");
const order_model_1 = __importDefault(require("./order.model"));
const order_utils_1 = require("./order.utils");
const http_status_1 = __importDefault(require("http-status"));
//create
const createOrder = (user, payload, client_ip) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = payload === null || payload === void 0 ? void 0 : payload.products) === null || _a === void 0 ? void 0 : _a.length))
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Order is not specified');
    const products = payload === null || payload === void 0 ? void 0 : payload.products;
    let totalPrice = 0;
    const productDetails = yield Promise.all(products.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield product_model_1.ProductModel.findById(item.product);
        if (product) {
            const subtotal = product ? (product.price || 0) * item.quantity : 0;
            totalPrice += subtotal;
            const stockQuantity = product.stockQuantity - item.quantity;
            product.stockQuantity = stockQuantity;
            product.save();
            return item;
        }
    })));
    let order = yield order_model_1.default.create({
        user,
        products: productDetails,
        totalPrice,
    });
    // payment integration
    const shurjopayPayload = {
        amount: totalPrice,
        order_id: order._id,
        currency: 'BDT',
        customer_name: user.name,
        customer_address: user.address,
        customer_email: user.email,
        customer_phone: user.phone,
        customer_city: user.city,
        client_ip,
        customer_post_code: user.postalCode,
    };
    const payment = yield order_utils_1.orderUtils.makePaymentAsync(shurjopayPayload);
    console.log('payment', payment);
    if (payment === null || payment === void 0 ? void 0 : payment.transactionStatus) {
        order = yield order.updateOne({
            transaction: {
                id: payment.sp_order_id,
                transactionStatus: payment.transactionStatus,
            },
        });
    }
    return payment === null || payment === void 0 ? void 0 : payment.checkout_url;
});
//all order
const getAllOrder = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = new Querybuilder_1.default(order_model_1.default.find(), query)
        .search(order_constant_1.OrderSearchableFields)
        .filter()
        .paginate()
        .sort()
        .fields();
    const order = yield orders.modelQuery;
    const meta = yield orders.countTotal();
    return { meta, order };
});
//single
const SingleOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.default.findById(orderId);
});
//update
const updateOrder = (orderId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.default.findByIdAndUpdate(orderId, { $set: payload }, { new: true, runValidators: true });
});
//delete
const deleteOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.default.findByIdAndDelete(orderId);
});
//verify payment
const verifyPayment = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedPayment = yield order_utils_1.orderUtils.verifyPaymentAsync(order_id);
    if (verifiedPayment.length) {
        yield order_model_1.default.findOneAndUpdate({
            'transaction.id': order_id,
        }, {
            'transaction.bank_status': verifiedPayment[0].bank_status,
            'transaction.sp_code': verifiedPayment[0].sp_code,
            'transaction.sp_message': verifiedPayment[0].sp_message,
            'transaction.transactionStatus': verifiedPayment[0].transaction_status,
            'transaction.method': verifiedPayment[0].method,
            'transaction.date_time': verifiedPayment[0].date_time,
            status: verifiedPayment[0].bank_status == 'Success'
                ? 'Paid'
                : verifiedPayment[0].bank_status == 'Failed'
                    ? 'Pending'
                    : verifiedPayment[0].bank_status == 'Cancel'
                        ? 'Cancelled'
                        : '',
        });
    }
    return verifiedPayment;
});
exports.OrderServices = {
    createOrder,
    getAllOrder,
    SingleOrder,
    deleteOrder,
    updateOrder,
    verifyPayment,
};
