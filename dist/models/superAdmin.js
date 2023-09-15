"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminModel = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const superAdminSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Super Admin must have a name"],
        validate: { validator: validator_1.default.isAlpha, message: "Invalid Name" },
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Super Admin must have an email"],
        validate: {
            validator: (email) => /[a-z0-9]+@[a-z0-9]+.com/i.test(email),
            message: "Invalid e-Mail",
        },
    },
    password: {
        type: String,
        required: [true, "Super Admin must have a password."],
    },
    mobile: {
        type: Number,
        required: [true, "Super Admin must have an contact number."],
        validate: {
            validator: (number) => number.toString().length === 10,
            message: "Invalid phone number!",
        },
    },
});
exports.SuperAdminModel = (0, mongoose_1.model)("SuperAdmin", superAdminSchema);
