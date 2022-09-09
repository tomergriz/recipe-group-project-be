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

interface UserModel {
  email: string;
  password: string;
  fname: string;
  lname: string;
  savedRecipes: Array<Object>;
  userRecipes: Array<Object>;
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

export type {
  UserSignUpController,
  UserSignUp,
  UserModel,
  PwdMiddleware,
  PwdRepwdMiddleware,
  emailMiddlware,
};
