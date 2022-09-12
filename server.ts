import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import userRoute from "./routes/userRoute";
import recipeRoute from "./routes/recipeRoute";

dotenv.config();
connectDB();
const app: Application = express();
const PORT = process.env.PORT || 5000;
app.use(cors({origin: "http://localhost:3000",credentials: true}));
app.use(cookieParser());
app.use(express.json());
app.use("/images", express.static("images"));

app.get("/", (req: Request, res: Response): void => {
  res.send("API is running...");
});

app.use("/user", userRoute);
app.use("/recipe", recipeRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
