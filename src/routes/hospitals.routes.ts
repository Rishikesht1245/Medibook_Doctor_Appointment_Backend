import { Router } from "express";
import {
  login,
  resentOtp,
  signup,
  verifyOtp,
} from "../controllers/hospital/auth";
import { uploadImage } from "../utils/uploadImage";

const hospital = Router();

// ============= auth routes =============//
hospital.post("/signup", uploadImage, signup);

hospital.post("/verify-otp", verifyOtp);

hospital.get("/resend-otp/:id", resentOtp);

hospital.post("/auth", login);

export default hospital;
