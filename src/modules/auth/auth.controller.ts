import catchAsync from '../../utility/catchAsync';
import config from '../../config';

import sendResponse from '../../utility/sendResponse';

import { AuthServices } from './auth.services';
import httpStatus from 'http-status';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accesToken, refreshToken } = result;

  //set cookie
  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: accesToken ? 200 : 500,
    success: true,
    message: accesToken ? 'login successful' : 'you are not an authorized user',
    data: accesToken ? { token: accesToken } : [],
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

//Change password
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await AuthServices.changePasswordIntoDB(
    req.user,
    passwordData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Password changed successfully',
    success: true,
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  logout,
  refreshToken,
  changePassword,
};
