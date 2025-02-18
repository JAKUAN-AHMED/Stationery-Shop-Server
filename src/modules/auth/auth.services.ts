import  httpStatus  from 'http-status';
import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../user/user.interface"
import UserModel from "../user/user.model"
import AppError from '../../errors/AppError';
import bcrypt from 'bcryptjs';
import config from '../../config';


const updateProfile=async(userId:string,payload:Partial<IUser>)=>{
    return await UserModel.findByIdAndUpdate(userId,{$set:payload},{new:true,runValidators:true});
}

//change pass
const changePasswordIntoDB = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await UserModel.isUserExistByCustomId(userData.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
 

  //checking if the password is correct

  if (!(await UserModel.isPasswordMatch(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt),
  );

  await UserModel.findOneAndUpdate(
    {
      id: userData.id,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
  return null;
};


export const AuthServices = {
  updateProfile,
  changePasswordIntoDB,
};