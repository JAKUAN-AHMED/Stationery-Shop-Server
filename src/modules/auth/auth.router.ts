import { Router } from "express";
import validateRequest from "../../middlewares/ValidateRequest";
import { createUserValidation, updateUserValidation } from "../user/user.validation";
import { AuthController } from "./auth.controller";
import auth from "../../middlewares/auth";
import { ChangePassValidationSchema } from "./auth.validation";

const router=Router();

//register
router.post('/register',validateRequest(createUserValidation),AuthController.register)

//login
router.post('/login',AuthController.login)

//logout
router.post('/logout',AuthController.logout)

//profile update
router.patch('/update-profile',auth('user','admin'),validateRequest(updateUserValidation),AuthController.updateProfile);

//change pass
router.post('/change-pass',auth('user'),validateRequest(ChangePassValidationSchema),AuthController.changePassword);

export const AuthRoutes=router;