import dotenv from "dotenv";
import { User } from "../models/userModel";
import { NextFunction, Request, Response } from "express";
import connectDB from "../config/db";
import jwt from "jsonwebtoken";
import { UserSignUpController } from "../types/types";

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

export { signUpUser };
