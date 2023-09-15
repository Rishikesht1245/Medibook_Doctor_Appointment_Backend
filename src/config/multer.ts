// import multer from "multer";
// import Datauri from "datauri/parser";
// import path from "path";
// import { Request, Response, NextFunction } from "express";
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

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

import multer from "multer";
import path from "path";

console.log("Reached Multer");
// Set the destination directory where uploaded files will be stored
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the directory where files will be saved
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    // Define the filename for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

// Create a Multer instance with the defined storage configuration
export const multerUploads = multer({ storage });
