import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface IUser {
  name: string;
  email: string;
  phone:string,
  password: string;
  role?: 'user' | 'admin';
}

export interface UserInterfaceModel extends Model<IUser> {
  isUserExistByCustomId: (id: string) => Promise<IUser>;
  isPasswordMatch: (
    password: string,
    storedHashedPassword: string,
  ) => Promise<boolean>;
};
export type TUSER_ROLE = keyof typeof USER_ROLE;