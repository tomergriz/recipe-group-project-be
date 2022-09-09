import { Schema, model, models } from "mongoose";
import { UserModel } from "../types/types";

const userSchema = new Schema<UserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    savedRecipes: {
      type: Array<Object>(),
    },
    userRecipes: {
      type: Array<Object>(),
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = models["Users"] || model<UserModel>("Users", userSchema);

export { User };
