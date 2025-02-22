import { Router } from 'express';
import validateRequest from '../../middlewares/ValidateRequest';
import { OrderControllers } from './order.controller';
import auth from '../../middlewares/auth';

const router = Router();
//create order
router.post('/verify', auth('admin', 'user'), OrderControllers.verifyPayment);
router.post(
  '/create-order',
  auth('admin', 'user'),
  OrderControllers.createOrder,
);

//all order
router.get('/', auth('admin', 'user'), OrderControllers.getAllOrder);
//single
router.get('/:orderId', auth('user', 'admin'), OrderControllers.singleOrder);

//update
router.patch('/:orderId', auth('admin'), OrderControllers.updateOrder);
//delete order
router.delete('/:orderId', auth('admin', 'user'), OrderControllers.deleteOrder);
export const OrderRoutes = router;
