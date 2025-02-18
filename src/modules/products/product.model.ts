import { model, Schema } from "mongoose";
import { Iproduct } from "./product.inteface";

const productSchema=new Schema<Iproduct>({
    name:{type:String},
    brand:{type:String},
    price:{type:Number},
    model:{type:String},
    stock:{type:Number},
    inStock:{type:Boolean,default:true}
},{
    timestamps:true
})

const productModel=model<Iproduct>('product',productSchema);
export default productModel;