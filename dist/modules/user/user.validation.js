"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
exports.userValidationSchema = zod_1.z.object({
    password: zod_1.z
        .string({
        invalid_type_error: 'Password must be text',
    })
        .min(6, { message: 'Password must be at least 6 characters long.' })
        .max(20, { message: 'Password can not be more than 16 characters' })
        .optional(),
});
