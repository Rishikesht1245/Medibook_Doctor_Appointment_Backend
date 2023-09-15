"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/hospital/auth");
const multer_1 = require("../config/multer");
const uploadImage_1 = require("../utils/uploadImage");
const hospital = (0, express_1.Router)();
hospital.post("/signup", multer_1.multerUploads.single("images"), uploadImage_1.uploadImage, auth_1.signup);
exports.default = hospital;
