import { Router } from "express";
import validateRequest from "../../middlewares/ValidateRequest";
import { OrderControllers } from "./order.controller";
import auth from "../../middlewares/auth";
import { OrderValidationSchema, updateOrderValidation } from "./order.validation";

const router=Router();
//create order
router.post('/create-order',auth('admin','user'),validateRequest(OrderValidationSchema),OrderControllers.createOrder)

//all order
router.get('/',auth('admin'),OrderControllers.getAllOrder);
//single
router.get('/:orderId', auth('user',"admin"), OrderControllers.singleOrder);

//update
router.patch('/:orderId', auth('admin'),validateRequest(updateOrderValidation), OrderControllers.updateOrder);
//delete order
router.delete('/:orderId',auth('admin'),OrderControllers.deleteOrder);
export const OrderRoutes=router;