import { Router } from 'express';
import { OrderControllers } from './order.controller';
import auth from '../../middlewares/auth';

const router = Router();
//create order
router.get('/verify', auth('admin', 'user'), OrderControllers.verifyPayment);
router.route('/')
.post(auth('admin','user'),OrderControllers.createOrder)
.get(auth('admin','user'),OrderControllers.getAllOrder)



export const OrderRoutes=router;