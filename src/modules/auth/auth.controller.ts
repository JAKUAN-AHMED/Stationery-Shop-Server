import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import catchAsync from "../../utility/catchAsync";
import config from '../../config';
import UserModel from '../user/user.model';
import sendResponse from '../../utility/sendResponse';
import AppError from '../../errors/AppError';

const register=catchAsync(async(req,res):Promise<any>=>{
    
   const {name,email,password,role}=req.body;
   const hashPassword=await bcrypt.hash(password,config.bcrypt_salt);
   const user=await UserModel.create({name,email,password:hashPassword,role});
     sendResponse(res,{
        statusCode:user? 200 : 400,
        success:user ? true :false ,
        message:user ? "user registerd successfully" : "user registration failed",
        data:user? user : []
     })
})

const login = catchAsync(async (req, res)=> {
  const { email, password } = req.body;

  // Check if user exists
  const user = await UserModel.findOne({ email }).select('+password');

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError(401, 'Invalid credentials'); // Throw error if invalid
  }

  // Generate token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    config.access_token_secret as string,
    { expiresIn: config.access_token_expires as any},
  );
  sendResponse(res,{
    statusCode:token ? 200 : 500,
    success:true,
    message:token? "login successfull" : "you are not authorized user",
    data:token ? {token} : []
  })
  
});


export const AuthController={
    register,
    login
}