import { Router } from "express";
import {
  addRecipe,
  editRecipe,
  getRecipeById,
  getSearchResults,
} from "../controllers/recipeController";
import { upload, uploadToCloudinary } from "../middleware/imagesMiddleware";
import { isMyRecipe, isQueryValid } from "../middleware/recipeMiddleware";
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

router.get("/", isQueryValid, getSearchResults);

export default router;
