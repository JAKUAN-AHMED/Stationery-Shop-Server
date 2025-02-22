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
exports.productServices = void 0;
const Querybuilder_1 = __importDefault(require("../../builder/Querybuilder"));
const sendImageToCloudinary_1 = require("../../utility/sendImageToCloudinary");
const product_constant_1 = require("./product.constant");
const product_model_1 = require("./product.model");
const createProductIntoDb = (file, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        const imageName = `$${payload.name}`;
        const path = file === null || file === void 0 ? void 0 : file.path;
        //send image to cloudinary
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        payload.productImg = secure_url;
    }
    return yield product_model_1.ProductModel.create(payload);
});
//all product
const getAllProductFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const products = new Querybuilder_1.default(product_model_1.ProductModel.find(), query)
        .search(product_constant_1.stationeryProductSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield products.modelQuery;
    const meta = yield products.countTotal();
    return { result, meta };
});
//single product
const singleProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.ProductModel.findById(productId);
});
//update product
const updateProduct = (productId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.ProductModel.findByIdAndUpdate(productId, { $set: payload }, { new: true, runValidators: true });
});
//product delete
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.ProductModel.findByIdAndDelete(productId);
});
exports.productServices = {
    createProductIntoDb,
    getAllProductFromDB,
    singleProduct,
    updateProduct,
    deleteProduct,
};
