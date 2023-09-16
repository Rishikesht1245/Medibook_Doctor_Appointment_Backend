"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/hospital/auth");
const uploadImage_1 = require("../utils/uploadImage");
const hospital = (0, express_1.Router)();
// ============= auth routes =============//
hospital.post("/signup", uploadImage_1.uploadImage, auth_1.signup);
hospital.post("/verify-otp", auth_1.verifyOtp);
hospital.get("/resend-otp/:id", auth_1.resentOtp);
hospital.post("/auth", auth_1.login);
exports.default = hospital;
