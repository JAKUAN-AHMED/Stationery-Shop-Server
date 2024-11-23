import { ValidateRequest } from './../middlewares/ValidateRequest';
import express from 'express';
import { orderController } from '../Controllers/OrderController';
import {
  OrderUpdateValidation,
  orderValidation,
} from '../utility/OrderValidation';
const router = express.Router();
router.post('/', ValidateRequest(orderValidation), orderController.createOrder);
router.get('/', orderController.getAllOrder);
router.get('/revenue', orderController.calculateRevenue);
router.put(
  '/:OrderId',
  ValidateRequest(OrderUpdateValidation),
  orderController.UpdateOrder,
);
router.delete('/:OrderId', orderController.deleteOrder);
router.get('/:OrderId', orderController.getOrderById);
export default router;
