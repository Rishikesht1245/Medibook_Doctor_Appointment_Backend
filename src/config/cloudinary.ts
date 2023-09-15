import { config } from "dotenv";
import { Request, Response, NextFunction } from "express";
import { v2 as cloudinary } from "cloudinary";

config(); // Load environment variables from .env

/**
 * Middleware to configure Cloudinary using environment variables
 * @param {Request} req - The Express Request object
 * @param {Response} res - The Express Response object
 * @param {NextFunction} next - The next middleware function
 */
const cloudinaryConfig = (req: Request, res: Response, next: NextFunction) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  next();
};

export { cloudinaryConfig, cloudinary };
