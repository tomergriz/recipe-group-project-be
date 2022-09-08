import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
//connectDb()
const app: Application = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(cookieParser());
app.use(express.json());
// app.use('/images', express.static('images'));

app.get("/", (req: Request, res: Response): void => {
  res.send("API is running...");
});

// app.use('/user', userRoute);

// app.use(notFound);
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
