"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/patient/auth");
const patient = (0, express_1.Router)();
//======= auth Routes ======== //
patient.post("/signup", auth_1.signup);
patient.post("/auth", auth_1.login);
patient.post("/verify-otp", auth_1.verifyOtp);
patient.get("/resend-otp/:id", auth_1.resentOtp);
exports.default = patient;
