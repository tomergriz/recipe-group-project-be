interface UserModel {
  email: string;
  password: string;
  fname: string;
  lname: string;
  savedRecipes: string[];
  userRecipes: string[];
  isAdmin: boolean;
}

interface getUserController {
  _id: string;
  email: string;
  fname: string;
  lname: string;
  isAdmin: boolean;
  savedRecipes: string[];
  userRecipes: string[];
}

interface UserSignUpController {
  email: string;
  password: string;
  fname: string;
  lname: string;
}

interface UserSignUp extends UserSignUpController {
  repassword: string;
  isAdmin?: boolean;
}

interface UserUpdateProfile extends UserSignUp {
  userId: string;
}

interface UserLogin {
  email: string;
  password: string;
  isAdmin?: boolean;
}

interface UserLoginController {
  _id: string;
  isAdmin: boolean;
}

interface PwdMiddleware {
  password: string;
}

interface PwdRepwdMiddleware extends PwdMiddleware {
  repassword: string;
}

interface emailMiddlware {
  email: string;
}

interface IRecipe {
  recipeTitle: string;
  description: string;
  category: string;
  picture: string;
  ingredients: string[];
  directions: string[];
  servings: number;
  totalTime: number;
  difficulty: string;
  createdBy: string;
}

export type {
  UserSignUpController,
  UserSignUp,
  UserModel,
  PwdMiddleware,
  PwdRepwdMiddleware,
  emailMiddlware,
  UserLogin,
  UserLoginController,
  getUserController,
  UserUpdateProfile,
  IRecipe,
};
