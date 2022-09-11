import { Router } from "express";
import {
  addRecipe,
  editRecipe,
  getRecipeById,
} from "../controllers/recipeController";
import { upload, uploadToCloudinary } from "../middleware/imagesMiddleware";
import { isMyRecipe } from "../middleware/recipeMiddleware";
import { verifyToken } from "../middleware/userMiddleware";

const router = Router();

router.post(
  "/",
  verifyToken,
  upload.single("picture"),
  uploadToCloudinary,
  addRecipe
);

router.get("/:id", getRecipeById);

router.put(
  "/:id",
  verifyToken,
  isMyRecipe,
  upload.single("picture"),
  uploadToCloudinary,
  editRecipe
);

export default router;
