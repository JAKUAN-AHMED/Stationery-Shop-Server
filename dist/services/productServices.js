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
exports.ProductService = void 0;
const ProductModel_1 = __importDefault(require("../Models/ProductModel"));
const createProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = new ProductModel_1.default(productData);
    return yield newProduct.save();
});
//get all products
const getAllProductsFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = searchTerm
        ? {
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { brand: { $regex: searchTerm, $options: 'i' } },
                { category: { $regex: searchTerm, $options: 'i' } },
            ],
        }
        : {};
    return yield ProductModel_1.default.find(filter);
});
//get a product by ID
const getProductByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ProductModel_1.default.findById(id);
});
//update a product by Id
const updateProductFromDB = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ProductModel_1.default.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
});
//delete a product by Id
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ProductModel_1.default.findByIdAndDelete(id);
});
exports.ProductService = {
    createProductIntoDB,
    getAllProductsFromDB,
    getProductByIdFromDB,
    updateProductFromDB,
    deleteProductFromDB,
};
