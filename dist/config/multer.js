"use strict";
// import multer from "multer";
// import Datauri from "datauri/parser";
// import path from "path";
// import { Request, Response, NextFunction } from "express";
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUploads = void 0;
// const dUri = new Datauri();
// /**
//  * Middleware to handle file uploads
//  */
// const multerUploads = upload.single("images");
// /**
//  * Convert the uploaded file to a data URI
//  * @param {Request} req - The Express Request object
//  * @returns {String} The data URI from the uploaded file
//  */
// const dataUri = (req: Request) => {
//   console.log("reached");
//   if (!req.file) {
//     throw new Error("No file found in the request.");
//   }
//   const ext = path.extname(req.file.originalname).toString();
//   return dUri.format(ext, req.file.buffer);
// };
// export { multerUploads, dataUri };
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
console.log("Reached Multer");
// Set the destination directory where uploaded files will be stored
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // Define the directory where files will be saved
        cb(null, path_1.default.join(__dirname, "uploads"));
    },
    filename: (req, file, cb) => {
        // Define the filename for the uploaded file
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path_1.default.extname(file.originalname)}`);
    },
});
// Create a Multer instance with the defined storage configuration
exports.multerUploads = (0, multer_1.default)({ storage });
