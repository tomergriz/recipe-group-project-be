import { Request, Response } from "express";
import Recipes from "../models/recipeModel";
import { User } from "../models/userModel";

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
    const userCreatedRecipe = await User.findById(userId);
    const addedRecipe = await Recipes.create({
      recipeTitle: recipeTitle,
      description: description,
      category: category,
      picture: picture,
      ingredients: ingredients.split(","),
      directions: directions.split(","),
      servings: servings,
      totalTime: totalTime,
      difficulty: difficulty,
      createdBy: `${userCreatedRecipe?.fname} ${userCreatedRecipe?.lname}`,
    });
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { userRecipes: addedRecipe._id } }
    ).exec();
    res.send({
      ok: true,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getRecipeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
      throw new Error("Recipe not found");
    }
  } catch (error) {
    console.error(error);
  }
};

const editRecipe = async (req: Request, res: Response): Promise<void> => {
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
    const currentRecipe = await Recipes.findById(req.params.id);
    if (recipeTitle) currentRecipe.recipeTitle = recipeTitle;
    if (description) currentRecipe.description = description;
    if (category) currentRecipe.category = category;
    if (picture) currentRecipe.picture = picture;
    if (ingredients) currentRecipe.ingredients = ingredients;
    if (directions) currentRecipe.directions = directions;
    if (servings) currentRecipe.servings = servings;
    if (totalTime) currentRecipe.totalTime = totalTime;
    if (difficulty) currentRecipe.difficulty = difficulty;
    if (userId) currentRecipe.userId = userId;
    await currentRecipe.save();
    res.send({
      ok: true,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getSearchResults = async (req: Request, res: Response): Promise<void> => {
  try {
    const recipes = await Recipes.find(req.query);
    res.json(recipes);
  } catch (error) {
    console.error(error);
  }
};

const addSavedRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (recipe) {
      const { userId }: { userId: string } = req.body;
      const { id } = req.params;
      const currentUser = await User.findById(userId);
      if (!currentUser.savedRecipes) {
        await User.findOneAndUpdate(
          { _id: userId },
          { $push: { savedRecipes: id } }
        ).exec();
        res.send({
          ok: true,
        });
      } else if (!currentUser.savedRecipes.includes(id)) {
        await User.findOneAndUpdate(
          { _id: userId },
          { $push: { savedRecipes: id } }
        ).exec();
        res.send({
          ok: true,
        });
      } else {
        res.status(404).json({ message: "Recipe already saved" });
        throw new Error("Recipe already saved");
      }
    } else {
      res.status(404).json({ message: "Recipe not found" });
      throw new Error("Recipe not found");
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteSavedRecipe = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (recipe) {
      const { userId }: { userId: string } = req.body;
      const { id } = req.params;
      const currentUser = await User.findById(userId);
      if (currentUser.savedRecipes.includes(id)) {
        await User.findOneAndUpdate(
          { _id: userId },
          { $pull: { savedRecipes: id } }
        ).exec();
        res.send({
          ok: true,
        });
      } else {
        res.status(404).json({ message: "Recipe not found" });
        throw new Error("Recipe not found");
      }
    } else {
      res.status(404).json({ message: "Recipe not found" });
      throw new Error("Recipe not found");
    }
  } catch (error) {
    console.error(error);
  }
};

const getUserRecipes = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.body.userId, {
      savedRecipes: 1,
      userRecipes: 1,

      _id: 0,
    }).exec();
    const mySavedRecipes = await Recipes.find({
      _id: { $in: user?.savedRecipes },
    });
    const myUserRecipes = await Recipes.find({
      _id: { $in: user?.userRecipes },
    });

    res.json({
      savedRecipes: mySavedRecipes,
      userRecipes: myUserRecipes,
    });
  } catch (error) {
    console.error(error);
  }
};

export {
  addRecipe,
  getRecipeById,
  editRecipe,
  getSearchResults,
  addSavedRecipe,
  deleteSavedRecipe,
  getUserRecipes,
};
