import { model, Schema } from "mongoose";
import { IUser, UserInterfaceModel } from "./user.interface";

const userSchema=new Schema<IUser>({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    role:{type:String,enum:["user","admin"],default:"user"}
},{timestamps:true})

//static method for checking if user exist by custom id
userSchema.statics.isUserExistByCustomId = async function (id: string) {
  return this.findOne({ id }).select('+password');
}

const UserModel = model<IUser, UserInterfaceModel>('user', userSchema);
export default UserModel;