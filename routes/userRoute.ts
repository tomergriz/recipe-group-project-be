import { Router } from "express";
import { signUpUser } from "../controllers/userController";
import {
  hashPwd,
  isNewUser,
  passwordsMatch,
} from "../middleware/userMiddleware";
import validateBody from "../middleware/validateBody";
import { signUpSchema } from "../schemas/allSchemas";

const router = Router();

router.post(
  "/signup",
  validateBody(signUpSchema),
  passwordsMatch,
  hashPwd,
  isNewUser,
  signUpUser
);

export default router;
