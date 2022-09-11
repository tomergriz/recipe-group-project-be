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

export { isMyRecipe };
