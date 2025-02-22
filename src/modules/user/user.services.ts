import { TRole, TUser } from './user.interface';
import { UserModel } from './user.model';

const registerUser = async (payload: TUser) => {
  return await UserModel.create(payload);
};

//me
const getMe = async (email: string, role: TRole) => {
  let result = null;
  if (role === 'user') {
    result = await UserModel.findOne({ email });
  }
  if (role === 'admin') {
    result = await UserModel.findOne({ email });
  }
  return result;
};

//update profile
const profileUpdate = async (email: string, payload: Partial<TUser>) => {
  return await UserModel.findOneAndUpdate(
    { email },
    { $set: payload },
    { new: true, runValidators: true },
  );
};

//all user
const alluser = async () => {
  return await UserModel.find();
};

export const UserServices = {
  registerUser,
  getMe,
  profileUpdate,
  alluser,
};
