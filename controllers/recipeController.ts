import { Request, Response } from "express";
import Recipes from "../models/recipeModel";

const addRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      recipeTitle,
      description,
      category,
      picture,
      ingredients,
      directions,
      servings,
      totalTime,
      difficulty,
      userId,
    } = req.body;

    const addedRecipe = await Recipes.create({
      recipeTitle: recipeTitle,
      description: description,
      category: category,
      picture: picture,
      ingredients: ingredients,
      directions: directions,
      servings: servings,
      totalTime: totalTime,
      difficulty: difficulty,
      createdBy: userId,
    });
    res.send({
      ok: true,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export { addRecipe };