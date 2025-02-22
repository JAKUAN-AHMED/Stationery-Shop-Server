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
exports.UserController = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utility/sendResponse"));
const user_services_1 = require("./user.services");
//register
const registerUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_services_1.UserServices.registerUser(req.body);
    const isTrue = result ? true : false;
    (0, sendResponse_1.default)(res, {
        statusCode: isTrue ? 200 : 500,
        success: isTrue,
        message: isTrue
            ? 'Congratulation to the new World!'
            : 'Registration failed!',
        data: isTrue ? result : [],
    });
}));
//get me
const getMe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, role } = req.user;
    const user = yield user_services_1.UserServices.getMe(email, role);
    const isTrue = user ? true : false;
    (0, sendResponse_1.default)(res, {
        statusCode: isTrue ? 200 : 504,
        success: isTrue,
        message: isTrue ? 'User retrieved Successfully!' : 'You are forbidded',
        data: isTrue ? user : [],
    });
}));
//find all user
const alluser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_services_1.UserServices.alluser();
    const isTrue = users ? true : false;
    (0, sendResponse_1.default)(res, {
        statusCode: isTrue ? 200 : 504,
        success: isTrue,
        message: isTrue ? 'Users retrieved Successfully!' : 'You are forbidded',
        data: isTrue ? users : [],
    });
}));
//update profiel
const updateProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { role } = req.body;
    if (role === 'admin' && req.user.role != 'admin') {
        throw new AppError_1.default(504, 'Only Admin can Change role!');
    }
    const user = yield user_services_1.UserServices.profileUpdate(req.user.email, req.body);
    const isTrue = user ? true : false;
    (0, sendResponse_1.default)(res, {
        statusCode: isTrue ? 200 : 504,
        success: isTrue,
        message: isTrue
            ? 'Users profile Updated Successfully!'
            : 'You are forbidded',
        data: isTrue ? user : [],
    });
}));
exports.UserController = {
    registerUser,
    getMe,
    alluser,
    updateProfile,
};
