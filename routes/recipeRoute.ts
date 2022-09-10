import { Router } from "express";
import { addRecipe } from "../controllers/recipeController";
import { upload, uploadToCloudinary } from "../middleware/imagesMiddleware";
import { verifyToken } from "../middleware/userMiddleware";

const router = Router();

router.post(
  "/",
  verifyToken,
  upload.single("picture"),
  uploadToCloudinary,
  addRecipe
);

export default router;
