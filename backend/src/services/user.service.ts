import { UserInterface } from '../types/user/index';
import { UserModel } from "../models/user.model";

const addUserService = async (user: any) => {
  const result = await UserModel.create(user);
  return result;
};
const getUserService = async (query: object) => {
  const result= await UserModel.find(query);
  return result;
  
};

export {
  getUserService,
  addUserService,
};
