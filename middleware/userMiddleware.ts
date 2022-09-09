import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/userModel";
import {
  emailMiddlware,
  PwdMiddleware,
  PwdRepwdMiddleware,
} from "../types/types";

const passwordsMatch = (req: Request, res: Response, next: NextFunction) => {
  const { password, repassword }: PwdRepwdMiddleware = req.body;
  if (password !== repassword) {
    res.status(400).send("Passwords do not match");
    return;
  }
  next();
};

const hashPwd = (req: Request, res: Response, next: NextFunction) => {
  const saltRounds = 10;
  const { password }: PwdMiddleware = req.body;
  if (password) {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      req.body.password = hash;
    });
  }
  next();
};

const isNewUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email }: emailMiddlware = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    res.status(400).send("User already exists");
    return;
  }
  next();
};

const isExistingUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    req.body.user = user;

    next();
    return;
  }
  res.status(400).send("User with this email does not exist");
};

const verifyPwd = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req.body;

  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (result) {
      next();
      return;
    } else {
      res.status(400).send("Incorrrect Password!");
    }
  });
};

export { passwordsMatch, hashPwd, isNewUser, isExistingUser, verifyPwd };
