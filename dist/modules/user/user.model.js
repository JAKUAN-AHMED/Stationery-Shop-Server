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
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const user_constant_1 = require("./user.constant");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../../config"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: {
            values: user_constant_1.Role,
            message: '{VALUE} is not supported',
        },
        default: 'user',
    },
    phone: { type: String, default: 'N/A' },
    address: { type: String, default: 'N/A' },
    city: { type: String, default: 'N/A' },
    country: { type: String, default: 'N/A' },
    postalCode: { type: String, default: 'N/A' },
    status: {
        type: String,
        enum: {
            values: user_constant_1.Status,
            message: '{VALUE} is not supported',
        },
        required: true,
        default: 'active',
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
});
// Password hashed
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcryptjs_1.default.hash(user.password, Number(config_1.default.bcrypt_salt));
        next();
    });
});
// post '' after save middleware in db
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
userSchema.statics.isUserExistsByCustomEmail = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.UserModel.findOne({ email }).select('+password');
    });
};
userSchema.statics.isPasswordMatch = function (password, hashed) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(password, hashed);
    });
};
//check if user is deleted
userSchema.statics.isDeletedUser = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        const isDeleted = yield this.findOne({ email, isDeleted: true });
        return isDeleted;
    });
};
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
