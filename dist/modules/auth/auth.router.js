"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const ValidateRequest_1 = __importDefault(require("../../middlewares/ValidateRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)();
//login
router.post('/login', (0, ValidateRequest_1.default)(auth_validation_1.AuthValidations.loginValidationSchema), auth_controller_1.AuthController.loginUser);
//logout
router.post('/logout', auth_controller_1.AuthController.logout);
//change pass
router.post('/change-pass', (0, auth_1.default)('user'), (0, ValidateRequest_1.default)(auth_validation_1.AuthValidations.ChangePassValidationSchema), auth_controller_1.AuthController.changePassword);
router.post('/refresh-token', (0, ValidateRequest_1.default)(auth_validation_1.AuthValidations.refreshTokenValidationSchema), auth_controller_1.AuthController.refreshToken);
exports.AuthRoutes = router;
