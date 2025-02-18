import { model, Schema } from "mongoose";
import { IUser, UserInterfaceModel } from "./user.interface";
import bcrypt from 'bcryptjs';
const userSchema=new Schema<IUser>({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    phone:{type:String},
    role:{type:String,enum:["user","admin"],default:"user"}
},{timestamps:true})

//static method for checking if user exist by custom id
userSchema.statics.isUserExistByCustomId = async function (id: string) {
  return this.findOne({ id }).select('+password');
}

//check is password match
userSchema.statics.isPasswordMatch = async function (password: string, storedHashedPassword: string) {
  return bcrypt.compare(password, storedHashedPassword);
}


const UserModel = model<IUser, UserInterfaceModel>('user', userSchema);
export default UserModel;