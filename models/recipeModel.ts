import { Schema, model, models } from "mongoose";
import type { IRecipe } from "../types/types";

const recipeSchema = new Schema<IRecipe>(
  {
    recipeTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    ingredients: {
      type: Array<Object>(),
      required: true,
    },
    directions: {
      type: Array<Object>(),
      required: true,
    },
    servings: {
      type: Number,
      required: true,
    },
    totalTime: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Recipes = models["Recipes"] || model<IRecipe>("Recipes", recipeSchema);

export default Recipes;
