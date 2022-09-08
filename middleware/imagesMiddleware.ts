// import { NextFunction, Request, Response } from "express";
// import multer, { FileFilterCallback } from "multer";
// import { v2 as cloudinary } from "cloudinary";
// import dotenv from "dotenv";

// const fs = require("fs");

// dotenv.config();

// cloudinary.config({
//   cloud_name: "",
//   api_key: "",
//   api_secret: process.env.CLOUDINARY_SECRET,
// });

// const upload = multer({ dest: "./images" });

// const imageUrl = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     console.log(req.file);
//     const picture = "http://localhost:5000/" + req?.file?.path;
//     req.body.picture = picture;

//     next();
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

// const uploadToCloudinary = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (req.body.picture) {
//     next();
//   } else {
//     if (!req.file) {
//       res.status(400).send("No image attached");
//       return;
//     }

//     cloudinary.uploader.upload(req.file.path, (err, result) => {
//       if (err) {
//         res.status(500).send(err.message);
//         return;
//       }
//       if (result) {
//         req.body.picture = result.secure_url;
//         fs.unlinkSync(req?.file?.path);
//         next();
//       }
//     });
//   }
// };

// export { upload, uploadToCloudinary };
