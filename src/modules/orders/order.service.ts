import QueryBuilder from "../../builder/QueryBuilder";
import { OrderSearchableFields } from "./order.constant";
import { IOrder } from "./order.interface";
import OrderModel from "./order.model";

//create
const createOrder=async(payload:Partial<IOrder>)=>{
    return await OrderModel.create(payload);
}


//all order
const getAllOrder=async(query:Record<string,unknown>)=>{
    const orders=new QueryBuilder(OrderModel.find(),query)
    .search(OrderSearchableFields)
    .filter()
    .paginate()
    .sort()
    .fields()

    return await orders.modelQuery;
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