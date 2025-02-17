import { Router } from "express";
import validateRequest from "../../middlewares/ValidateRequest";
import { createUserValidation } from "../user/user.validation";
import { AuthController } from "./auth.controller";

const router=Router();

//register
router.post('/register',validateRequest(createUserValidation),AuthController.register)

//login
router.post('/login',AuthController.login)


export const AuthRoutes=router;