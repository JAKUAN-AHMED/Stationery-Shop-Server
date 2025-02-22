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
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("../user/user.model");
const auth_utils_1 = require("./auth.utils");
//login user
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //   check if user exist
    const user = yield user_model_1.UserModel.isUserExistsByCustomEmail(payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    //check user is blocked
    if (user.status === 'blocked') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'User is blocked');
    }
    // check if password match
    const storedHashedPassword = user.password;
    if (!(yield user_model_1.UserModel.isPasswordMatch(payload.password, storedHashedPassword))) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid password');
    }
    // access granted:send accestoken,refreshtoken
    const JwtPayload = {
        email: user.email,
        role: user.role, // provide a default role if undefined
    };
    //create toke and send to the client
    const accesToken = (0, auth_utils_1.createToken)(JwtPayload, config_1.default.access_token_secret, config_1.default.access_token_expires);
    //refresh token
    const refreshToken = (0, auth_utils_1.createToken)(JwtPayload, config_1.default.access_token_secret, config_1.default.refresh_token_expires);
    return {
        accesToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the given token is valid
    const decoded = (0, auth_utils_1.verifyToken)(token, config_1.default.access_token_secret);
    const { email } = decoded;
    // checking if the user is exist
    const user = yield user_model_1.UserModel.isUserExistsByCustomEmail(email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is deleted !');
    }
    // checking if the user is blocked
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === 'blocked') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is blocked ! !');
    }
    const JwtPayload = {
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(JwtPayload, config_1.default.access_token_secret, config_1.default.refresh_token_expires);
    return {
        accessToken,
    };
});
//change pass
const changePasswordIntoDB = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const user = yield user_model_1.UserModel.isUserExistsByCustomEmail(userData.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found !');
    }
    //checking if the password is correct
    if (!(yield user_model_1.UserModel.isPasswordMatch(payload.oldPassword, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password do not matched');
    //hash new password
    const newHashedPassword = yield bcryptjs_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt));
    yield user_model_1.UserModel.findOneAndUpdate({
        id: userData.id,
        role: userData.role,
    }, {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
    });
    return null;
});
exports.AuthServices = {
    refreshToken,
    changePasswordIntoDB,
    loginUser,
};
