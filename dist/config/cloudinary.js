"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = exports.cloudinaryConfig = void 0;
const dotenv_1 = require("dotenv");
const cloudinary_1 = require("cloudinary");
Object.defineProperty(exports, "cloudinary", { enumerable: true, get: function () { return cloudinary_1.v2; } });
(0, dotenv_1.config)(); // Load environment variables from .env
/**
 * Middleware to configure Cloudinary using environment variables
 * @param {Request} req - The Express Request object
 * @param {Response} res - The Express Response object
 * @param {NextFunction} next - The next middleware function
 */
const cloudinaryConfig = (req, res, next) => {
    cloudinary_1.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    next();
};
exports.cloudinaryConfig = cloudinaryConfig;
