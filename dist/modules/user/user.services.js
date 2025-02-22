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
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.UserModel.create(payload);
});
//me
const getMe = (email, role) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    if (role === 'user') {
        result = yield user_model_1.UserModel.findOne({ email });
    }
    if (role === 'admin') {
        result = yield user_model_1.UserModel.findOne({ email });
    }
    return result;
});
//update profile
const profileUpdate = (email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.UserModel.findOneAndUpdate({ email }, { $set: payload }, { new: true, runValidators: true });
});
//all user
const alluser = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.UserModel.find();
});
exports.UserServices = {
    registerUser,
    getMe,
    profileUpdate,
    alluser,
};
