import AppError from '../../errors/AppError';
import catchAsync from '../../utility/catchAsync';
import sendResponse from '../../utility/sendResponse';
import { UserServices } from './user.services';
import httpStatus from 'http-status';

//register
const registerUser = catchAsync(async (req, res) => {
  const result = await UserServices.registerUser(req.body);
  const isTrue: boolean = result ? true : false;

  sendResponse(res, {
    statusCode: isTrue ? 200 : 500,
    success: isTrue,
    message: isTrue
      ? 'Congratulation to the new World!'
      : 'Registration failed!',
    data: isTrue ? result : [],
  });
});

//get me
const getMe = catchAsync(async (req, res) => {
  const { email, role } = req.user;
  const user = await UserServices.getMe(email, role!);
  const isTrue: boolean = user ? true : false;

  sendResponse(res, {
    statusCode: isTrue ? 200 : 504,
    success: isTrue,
    message: isTrue ? 'User retrieved Successfully!' : 'You are forbidded',
    data: isTrue ? user : [],
  });
});

//find all user
const alluser = catchAsync(async (req, res) => {
  const users = await UserServices.alluser();
  const isTrue: boolean = users ? true : false;

  sendResponse(res, {
    statusCode: isTrue ? 200 : 504,
    success: isTrue,
    message: isTrue ? 'Users retrieved Successfully!' : 'You are forbidded',
    data: isTrue ? users : [],
  });
});

//update profiel
const updateProfile = catchAsync(async (req, res) => {
  const { role } = req.body;
  if (role === 'admin' && req.user.role != 'admin') {
    throw new AppError(504, 'Only Admin can Change role!');
  }
  const user = await UserServices.profileUpdate(req.user.email, req.body);
  const isTrue: boolean = user ? true : false;

  sendResponse(res, {
    statusCode: isTrue ? 200 : 504,
    success: isTrue,
    message: isTrue
      ? 'Users profile Updated Successfully!'
      : 'You are forbidded',
    data: isTrue ? user : [],
  });
});

export const UserController = {
  registerUser,
  getMe,
  alluser,
  updateProfile,
};
