import { IOrder } from "./order.interface";
import OrderModel from "./order.model";

//create
const createOrder=async(payload:Partial<IOrder>)=>{
    return await OrderModel.create(payload);
}


//all order
const getAllOrder=async()=>{
    return await OrderModel.find();
}

//single
const SingleOrder=async(orderId:string)=>{
    return await OrderModel.findById(orderId);
}

//update
const updateOrder=async(orderId:string,payload:Partial<IOrder>)=>{
    return await OrderModel.findByIdAndUpdate(orderId,{$set:payload},{new:true,runValidators:true});
}

//delete
const deleteOrder = async (orderId: string) => {
  return await OrderModel.findByIdAndDelete(orderId);
};

export const OrderServices = { createOrder, getAllOrder,SingleOrder,deleteOrder,updateOrder };