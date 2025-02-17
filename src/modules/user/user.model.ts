import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema=new Schema<IUser>({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    role:{type:String,enum:["user","admin"],default:"user"}
},{timestamps:true})

const UserModel=model<IUser>("user",userSchema);
export default UserModel;