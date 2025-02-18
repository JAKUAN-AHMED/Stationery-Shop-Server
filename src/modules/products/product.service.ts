import QueryBuilder from "../../builder/QueryBuilder";
import { ProductSearchableFields } from "./product.constant";
import { Iproduct } from "./product.inteface";
import productModel from "./product.model";

const createProductIntoDb=async(payload:Iproduct)=>{
    return await productModel.create(payload);
}


//all product get -  not established 
const getAllProductFromDB=async(query:Record<string,unknown>)=>{
    const products=new QueryBuilder(productModel.find(),query)
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

    return await products.modelQuery;
}

//single product

const singleProduct=async(productId:string)=>{
    return await productModel.findById(productId);
}

//update product
const updateProduct=async(productId:string,payload:Partial<Iproduct>)=>{
    return await productModel.findByIdAndUpdate(productId,{$set:payload},{new:true,runValidators:true});
}


//product delete
const deleteProduct = async (productId: string) => {
  return await productModel.findByIdAndDelete(productId);
};

export const productServices = {
  createProductIntoDb,
  getAllProductFromDB,
  singleProduct,
  updateProduct,
  deleteProduct,
};