import { Router } from "express";
import {
  login,
  resentOtp,
  signup,
  verifyEmail,
  verifyOtp,
} from "../controllers/patient/auth";

const patient = Router();

//======= auth Routes ======== //
patient.post("/signup", signup);

patient.post("/auth", login);

patient.post("/verify-otp", verifyOtp);

patient.get("/resend-otp/:id", resentOtp);

export default patient;
