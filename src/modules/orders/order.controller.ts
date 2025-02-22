import AppError from '../../errors/AppError';
import catchAsync from '../../utility/catchAsync';
import sendResponse from '../../utility/sendResponse';


import OrderModel from './order.model';
import { OrderServices } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const user = req.user;
  const order = await OrderServices.createOrder(user, req.body, req.ip!);
  console.log(order, 'order');
  const isHas = order ? true : false;
  sendResponse(res, {
    statusCode: isHas ? 200 : 404,
    success: isHas ? true : false,
    message: isHas ? 'order created successfully' : ' order confirmed',
    data: isHas ? order : [],
  });
});

const getAllOrder = catchAsync(async (req, res) => {
  const orders = await OrderServices.getAllOrder(req.query);
  const isHas = orders.order.length > 0 ? true : false;
  sendResponse(res, {
    statusCode: isHas ? 200 : 404,
    success: isHas ? true : false,
    message: isHas
      ? 'All Orders retrieved successfully'
      : 'there is no order available',
    data: isHas ? orders : [],
  });
});

//single product
const singleOrder = catchAsync(async (req, res) => {
  //getting order
  const Order = await OrderModel.findById(req.params.orderId);
  if (!Order) {
    throw new AppError(404, 'Order not found!');
  }

  //order creator match or not

  // if (Order.user != req.user.id) {
  //   throw new AppError(504, 'You are not Authorized!');
  // }
  const order = await OrderServices.SingleOrder(req.params.orderId);
  const isHas = order ? true : false;
  sendResponse(res, {
    statusCode: isHas ? 200 : 404,
    success: isHas ? true : false,
    message: isHas ? 'order retrieved successfully' : ' order not available',
    data: isHas ? order : [],
  });
});

//update
const updateOrder = catchAsync(async (req, res) => {
  const order = await OrderServices.updateOrder(req.params.orderId, req.body);
  const isHas = order ? true : false;
  sendResponse(res, {
    statusCode: isHas ? 200 : 404,
    success: isHas ? true : false,
    message: isHas ? 'order updated successfully' : ' order not available',
    data: isHas ? order : [],
  });
});

//delete
const deleteOrder = catchAsync(async (req, res) => {
  const deletedOrder = await OrderServices.deleteOrder(req.params.productId);
  const isHas = deletedOrder ? true : false;
  sendResponse(res, {
    statusCode: isHas ? 200 : 404,
    success: isHas ? true : false,
    message: isHas ? 'order deleted successfully' : ' order not found',
  });
});

//verify payment
const verifyPayment = catchAsync(async (req, res) => {
  const order = await OrderServices.verifyPayment(req.query.order_id as string);
  
  sendResponse(res, {
    success: true,
    message: 'Order retrieve successfully!',
    statusCode: 200,
    data: order,
  });
});

export const OrderControllers = {
  createOrder,
  getAllOrder,
  singleOrder,
  updateOrder,
  deleteOrder,
  verifyPayment,
};
