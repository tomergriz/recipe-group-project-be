import { Router } from "express";
import {
  getUser,
  getUserFull,
  getUsers,
  login,
  signout,
  signUpUser,
  updateUserInfo,
} from "../controllers/userController";
import {
  hashPwd,
  isAdmin,
  isExistingUser,
  isNewUser,
  passwordsMatch,
  verifyPwd,
  verifyToken,
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

router.get("/id", verifyToken, getUser);
router.put(
  "/id",
  validateBody(signUpSchema),
  verifyToken,
  passwordsMatch,
  hashPwd,
  isNewUser,
  updateUserInfo
);

router.get("/", verifyToken, isAdmin, getUsers);

router.get("/:id/full", verifyToken, isAdmin, getUserFull);

router.get("/signout", signout);

export default router;
