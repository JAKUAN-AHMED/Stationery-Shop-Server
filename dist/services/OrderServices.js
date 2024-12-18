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
const ProductModel_1 = __importDefault(require("../Models/ProductModel"));
const OrderModel_1 = __importDefault(require("../Models/OrderModel"));
const createOrderIntoDb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, product, quantity, totalPrice } = req.body;
        const findProduct = yield ProductModel_1.default.findById(product);
        if (!findProduct) {
            res.status(404).json({ message: 'Product Not Found', success: false });
        }
        if (findProduct.quantity < quantity) {
            res.status(400).json({ message: 'Stock Out', success: false });
        }
        findProduct.quantity -= quantity;
        if (findProduct.quantity === 0) {
            findProduct.inStock = false;
        }
        yield findProduct.save();
        const order = yield new OrderModel_1.default({
            email,
            product,
            quantity,
            totalPrice,
        });
        yield order.save();
        res.status(201).json({
            message: 'Successfully Created Order',
            success: true,
            data: order,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to create Order',
            success: false,
            error: error.message,
        });
    }
});
//get all order
const getAllOrderFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield OrderModel_1.default.find();
});
//get order by Id
const getOrderByIdFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield OrderModel_1.default.findById(_id);
});
//updat order
const UpdateOrderByIdFromDB = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield OrderModel_1.default.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
});
//delete order
const deleteOrderFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield OrderModel_1.default.findByIdAndDelete(id);
});
const calculateRevenueFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield OrderModel_1.default.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: { $multiply: ['$quantity', '$totalPrice'] } },
                },
            },
        ]);
        return result.length > 0 ? result[0].totalRevenue : 0;
    }
    catch (error) {
        throw error;
    }
});
exports.OrderServices = {
    createOrderIntoDb,
    getAllOrderFromDb,
    getOrderByIdFromDB,
    UpdateOrderByIdFromDB,
    deleteOrderFromDB,
    calculateRevenueFromDB,
};
