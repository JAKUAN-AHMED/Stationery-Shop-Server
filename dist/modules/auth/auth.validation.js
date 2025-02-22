"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidations = void 0;
const zod_1 = require("zod");
//user login
const loginValidationSchema = zod_1.z.object({
    email: zod_1.z.string({ required_error: 'email is required' }).email(),
    password: zod_1.z.string({ required_error: 'password is required' }),
});
// change password
const ChangePassValidationSchema = zod_1.z.object({
    oldPassword: zod_1.z.string({ required_error: 'Old password is required' }),
    newPassword: zod_1.z.string({ required_error: 'password is required' }),
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh token is required!',
        }),
    }),
});
exports.AuthValidations = {
    refreshTokenValidationSchema,
    loginValidationSchema,
    ChangePassValidationSchema,
};
