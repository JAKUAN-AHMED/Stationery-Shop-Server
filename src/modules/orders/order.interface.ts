import { Types } from "mongoose";

export interface IOrderProdcut{
    product:Types.ObjectId,
    quantity:number,
}

export interface IOrder{
    user:Types.ObjectId,
    products:IOrderProdcut[],
    totalPrice:number,
    status?:"pending"|"confirmed"|"shipped"|"cancelled"|"delivered",
    paymentStatus?:"pending" | "paid" | "failed",
}