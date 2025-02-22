"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.post('/create-user', user_controller_1.UserController.registerUser);
router.get('/me', (0, auth_1.default)('user', 'admin'), user_controller_1.UserController.getMe);
router.patch('/update-profile', (0, auth_1.default)('user', 'admin'), user_controller_1.UserController.updateProfile);
router.get('/all-users', (0, auth_1.default)('user', 'admin'), user_controller_1.UserController.alluser);
exports.UserRoutes = router;
