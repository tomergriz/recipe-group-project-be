import { JSONSchemaType } from "ajv";
import { UserSignUp } from "../types/types";

const signUpSchema: JSONSchemaType<UserSignUp> = {
  type: "object",
  properties: {
    email: { type: "string", maxLength: 50 },
    password: { type: "string", minLength: 6 },
    repassword: { type: "string", minLength: 6 },
    fname: { type: "string", minLength: 2, maxLength: 15 },
    lname: { type: "string", minLength: 2, maxLength: 20 },
    isAdmin: { type: "boolean", nullable: true },
  },
  additionalProperties: false,
  required: ["email", "password", "repassword", "fname", "lname"],
};

export { signUpSchema };
