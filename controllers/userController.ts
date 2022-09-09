import dotenv from "dotenv";
import { User } from "../models/userModel";
import { NextFunction, Request, Response } from "express";
import connectDB from "../config/db";
import jwt from "jsonwebtoken";
import {
  getUserController,
  UserLoginController,
  UserSignUpController,
} from "../types/types";

dotenv.config();
connectDB();

const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, fname, lname }: UserSignUpController = req.body;
    const newUser = { email, password, fname, lname };
    const userId = await User.create(newUser);
    const token = jwt.sign(
      { id: userId._id, isAdmin: userId.isAdmin },
      process.env.TOKEN_SECRET as string,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("token", token, {
      maxAge: 168 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.send({
      ok: true,
    });
  } catch (error: any) {
    console.log(error);
    error.statusCode = 500;
    next(error);
  }
};

const login = (req: Request, res: Response) => {
  try {
    const { _id, isAdmin }: UserLoginController = req.body.user;
    const token = jwt.sign(
      { id: _id?.toString(), isAdmin: isAdmin },
      process.env.TOKEN_SECRET as string,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.send({
      ok: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.body.userId, {
      _id: 1,
      email: 1,
      fname: 1,
      lname: 1,
      isAdmin: 1,
      savedRecipes: 1,
      userRecipes: 1,
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
      throw new Error("User not found");
    }
  } catch (error) {
    console.error(error);
  }
};

export { signUpUser, login, getUser };
