import { Request, Response, NextFunction } from "express";
import Recipes from "../models/recipeModel";
import { User } from "../models/userModel";

const isMyRecipe = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;
  const recipeIsMine = await Recipes.findById(req.params.id, { createdBy: 1 });
  if (userId === recipeIsMine.createdBy) {
    next();
    return;
  } else {
    res.status(400).send("Recipes can only be edited by their creators");
  }
};

const isQueryValid = (req: Request, res: Response, next: NextFunction) => {
  const searchObj = {};
  if (req.query.recipeTitle) {
    Object.assign(searchObj, {
      type: { $regex: req.query.recipeTitle, $options: "i" },
    });
  }
  if (req.query.category) {
    if (req.query.category)
      Object.assign(searchObj, { category: req.query.category });
  }

  if (req.query.difficulty) {
    if (req.query.difficulty)
      Object.assign(searchObj, { difficulty: req.query.difficulty });
  }

  req.query = searchObj;
  next();
};

const isFavorited = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { userId }: { userId: string } = req.body;
  const isRecipeFavorited = await User.findById(userId, {
    savedRecipes: 1,
    _id: 0,
  }).exec();
  const favoriteCheck = isRecipeFavorited.savedRecipes.find(
    (recipe: string) => recipe === id
  );
  if (favoriteCheck) {
    res.status(400).send("Recipe is already favorited.");
    return;
  }
  next();
};

const isUnFavorited = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { userId }: { userId: string } = req.body;
  const isRecipeFavorited = await User.findById(userId, {
    savedRecipes: 1,
    _id: 0,
  }).exec();
  const favoriteCheck = isRecipeFavorited.savedRecipes.find(
    (recipe: string) => recipe === id
  );
  if (!favoriteCheck) {
    res.status(400).send("Recipe is already unfavorited.");
    return;
  }
  next();
};

export { isMyRecipe, isQueryValid, isFavorited, isUnFavorited };
