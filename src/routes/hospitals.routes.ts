import { Router } from "express";
import { signup } from "../controllers/hospital/auth";
import { multerUploads } from "../config/multer";
import { uploadImage } from "../utils/uploadImage";

const hospital = Router();

hospital.post("/signup", multerUploads.single("images"), uploadImage, signup);

export default hospital;
