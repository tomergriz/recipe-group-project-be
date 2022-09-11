import { Request, Response, NextFunction } from "express";
import Recipes from "../models/recipeModel";

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

export { isMyRecipe, isQueryValid };
