import { Router } from "express";
import { login, signUpUser } from "../controllers/userController";
import {
  hashPwd,
  isExistingUser,
  isNewUser,
  passwordsMatch,
  verifyPwd,
} from "../middleware/userMiddleware";
import validateBody from "../middleware/validateBody";
import { loginSchema, signUpSchema } from "../schemas/allSchemas";

const router = Router();

router.post(
  "/signup",
  validateBody(signUpSchema),
  passwordsMatch,
  hashPwd,
  isNewUser,
  signUpUser
);

router.post(
  "/login",
  validateBody(loginSchema),
  isExistingUser,
  verifyPwd,
  login
);

export default router;
