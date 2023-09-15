"use strict";
// import { dataUri } from "../config/multer";
// import { cloudinary } from "../config/cloudinary";
// import { Request, Response, NextFunction } from "express";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
// /**
//  * Middleware to configure Cloudinary using environment variables
//  * @param {Request} req - The Express Request object
//  * @param {Response} res - The Express Response object
//  * @param {NextFunction} next - The next middleware function
//  */
// const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     console.log(req.file);
//     if (req.file) {
//       const file = dataUri(req).content;
//       console.log(file);
//       console.log(typeof file);
//       if (typeof file == "string") {
//         const result = await cloudinary.uploader.upload(file);
//         const image = result.url;
//         next();
//       }
//     } else {
//       console.log({ error: "No file uploaded" });
//     }
//   } catch (error) {
//     console.error("Error uploading image:", error);
//   }
// };
// export { uploadImage };
const cloudinary_1 = require("../config/cloudinary");
/**
 * Middleware to upload an image to Cloudinary
 * @param {Request} req - The Express Request object
 * @param {Response} res - The Express Response object
 * @param {NextFunction} next - The next middleware function
 */
const uploadImage = async (req, res, next) => {
    try {
        if (req.file) {
            const result = await cloudinary_1.cloudinary.uploader.upload(req.file.path);
            const image = result.url;
            // You can now use the 'image' URL as needed
            req.body.image = image;
            next();
        }
        else {
            console.log({ error: "No file uploaded" });
        }
    }
    catch (error) {
        console.error("Error uploading image:", error);
    }
};
exports.uploadImage = uploadImage;
