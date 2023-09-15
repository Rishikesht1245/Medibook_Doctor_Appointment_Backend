"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/superAdmin/auth");
const superAdmin = (0, express_1.Router)();
superAdmin.post("/auth", auth_1.login);
exports.default = superAdmin;
