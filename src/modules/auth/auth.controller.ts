import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import catchAsync from "../../utility/catchAsync";
import config from '../../config';
import UserModel from '../user/user.model';
import sendResponse from '../../utility/sendResponse';
import AppError from '../../errors/AppError';
import { AuthServices } from './auth.services';
import httpStatus from "http-status";
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

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await UserModel.findOne({ email }).select('+password');

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError(401, 'Invalid credentials'); // Throw error if invalid
  }

  // Generate token
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    config.access_token_secret as string,
    { expiresIn: config.access_token_expires as any },
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600000,
  });

  sendResponse(res, {
    statusCode: token ? 200 : 500,
    success: true,
    message: token ? "login successful" : "you are not an authorized user",
    data: token ? { token } : [],
  });
});

const logout = catchAsync(async (req, res) => {
  
  if (req.cookies.token && req.headers.authorization) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Logout successful',
      data: [],
    });
  } else {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'No token found. User is not logged in.',
      data: [],
    });
  }
});


const updateProfile=catchAsync(async(req,res)=>{
  const {name,email,phone}=req.body;
  const profile = await AuthServices.updateProfile(req.params.userId, {
    name,
    email,
    phone,
  });
   const isHas = profile? true : false;
   sendResponse(res, {
     statusCode: isHas ? 200 : 404,
     success: isHas ? true : false,
     message: isHas
       ? 'profile updated successfully'
       : 'there is no user available',
     data: isHas ? profile : [],
   });
})

//everything for forget

//Change password
const changePassword=catchAsync(async (req,res)=>{
    const {...passwordData}=req.body;

    const result=await AuthServices.changePasswordIntoDB(req.user,passwordData);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        message:"Password changed successfully",
        success:true,
        data:result
    })
});



export const AuthController = {
  register,
  login,
  logout,
  updateProfile,
  changePassword,
};