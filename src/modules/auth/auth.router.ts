import { Router } from 'express';
import validateRequest from '../../middlewares/ValidateRequest';

import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';
import { AuthValidations } from './auth.validation';

const router = Router();

//login
router.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  AuthController.loginUser,
);

//logout
router.post('/logout', AuthController.logout);

//change pass
router.post(
  '/change-pass',
  auth('user'),
  validateRequest(AuthValidations.ChangePassValidationSchema),
  AuthController.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthController.refreshToken,
);

export const AuthRoutes = router;
