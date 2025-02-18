import AppError from "../../errors/AppError";
import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/sendResponse";
import productModel from "../products/product.model";
import { productServices } from "../products/product.service";
import { IOrder } from "./order.interface";
import OrderModel from "./order.model";
import { OrderServices } from "./order.service";

const createOrder=catchAsync(async(req,res)=>{
  const payload: Partial<IOrder> = {};
  payload.user = req.user.id;
  payload.products = req.body.products;
  let totalPrice = 0;
    const products =req.body.products
  
  for (const item of products) {

    const product = await productModel.findById(item.product);
    if (!product || product.stock < item.quantity) {
      throw new AppError(
        400,
        `Product ${product?.name || 'Unknown'} is out of stock`,
      );
    }
    totalPrice += product.price * item.quantity;
  }
  payload.totalPrice=totalPrice;
  console.log(payload.totalPrice);

  const result=await OrderServices.createOrder(payload);
   const isHas = result ? true : false;
   sendResponse(res, {
     statusCode: isHas ? 200 : 404,
     success: isHas ? true : false,
     message: isHas ? 'order created successfully' : ' order confirmed',
     data:isHas ? result :[]
   });
})


const getAllOrder = catchAsync(async (req, res) => {
  const orders = await OrderServices.getAllOrder(req.query);
  const isHas = orders.length > 0 ? true : false;
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
    const Order=await OrderModel.findById(req.params.orderId);
    if(!Order){
        throw new AppError(404, 'Order not found!');
    }

    //order creator match or not
    
    if(Order.user!=req.user.id)
    {
        throw new AppError(504,"You are not Authorized!")
    }
  const order = await OrderServices.SingleOrder(req.params.orderId);
  const isHas = order ? true : false;
  sendResponse(res, {
    statusCode: isHas ? 200 : 404,
    success: isHas ? true : false,
    message: isHas
      ? 'order retrieved successfully'
      : ' order not available',
    data: isHas ? order : [],
  });
});

//update
const updateOrder = catchAsync(async (req, res) => {
  const order = await OrderServices.updateOrder(
    req.params.orderId,
    req.body,
  );
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
  const deletedOrder = await OrderServices.deleteOrder(
    req.params.productId,
  );
  const isHas = deletedOrder ? true : false;
  sendResponse(res, {
    statusCode: isHas ? 200 : 404,
    success: isHas ? true : false,
    message: isHas ? 'order deleted successfully' : ' order not found',
  });
});

export const OrderControllers={createOrder,getAllOrder,singleOrder,updateOrder,deleteOrder};