import { Router } from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post('/create-user', UserController.registerUser);
router.get('/me', auth('user', 'admin'), UserController.getMe);
router.patch(
  '/update-profile',
  auth('user', 'admin'),
  UserController.updateProfile,
);

router.get('/all-users', auth('user', 'admin'), UserController.alluser);

export const UserRoutes = router;
