import { Router } from "express";
import {
  addRecipe,
  addSavedRecipe,
  deleteSavedRecipe,
  editRecipe,
  getRecipeById,
  getSearchResults,
  getUserRecipes,
} from "../controllers/recipeController";
import { upload, uploadToCloudinary } from "../middleware/imagesMiddleware";
import {
  isFavorited,
  isMyRecipe,
  isQueryValid,
  isUnFavorited,
} from "../middleware/recipeMiddleware";
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

router.post("/:id/save", verifyToken, isFavorited, addSavedRecipe);

router.delete("/:id/save", verifyToken, isUnFavorited, deleteSavedRecipe);

router.get("/user/:id", verifyToken, getUserRecipes);

export default router;
