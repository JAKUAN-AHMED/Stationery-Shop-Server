import { Iproduct } from "./product.inteface";
import productModel from "./product.model";

const createProductIntoDb=async(payload:Iproduct)=>{
    return await productModel.create(payload);
}


//all product get -  not established 
const getAllProductFromDB=async()=>{
    return await productModel.find();
}

//single product

const singleProduct=async(productId:string)=>{
    return await productModel.findById(productId);
}

export const productServices = {
  createProductIntoDb,
  getAllProductFromDB,
  singleProduct
};