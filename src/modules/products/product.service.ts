import { Iproduct } from "./product.inteface";
import productModel from "./product.model";

const createProductIntoDb=async(payload:Iproduct)=>{
    return await productModel.create(payload);
}


export const productServices={
    createProductIntoDb
}