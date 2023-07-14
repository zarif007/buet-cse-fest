import { Request, Response, NextFunction } from "express";

import {
  addUserService, getUserService,
} from "../services/user.service";
import { UserInterface } from "../types/user";




const addNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email } = req.body;
    const result = await addUserService({ name, email });
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      err: err.message,
      message: "Error in Adding new user",
    });
  }
};

const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, email } = req.query;

    // send alluser if no query
    if (!id && !email) {
      const result = await getUserService({});
      res.status(400).json({
        success: true,
        data: result,
      });
    }

    // for single user
    let result;
    if (id) {
      result = getUserService({ _id: id });
    }
    else if (email) {
      result = await getUserService({ email });
    }
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      err: err.message,
      message: "Error in getting user",
    });
  }
};
const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const result = await getUserService(query);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      err: err.message,
      message: "Error in getting user",
    });
  }
};


export default {
  getUser,
  addNewUser,
};
