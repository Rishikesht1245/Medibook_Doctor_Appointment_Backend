"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientModel = void 0;
const mongoose_1 = require("mongoose");
const patientSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Patient Must Have a name"],
        validate: {
            validator: (value) => /^[A-Za-z\s]+$/.test(value),
            message: "Invalid name",
        },
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Patient must have an email"],
        validate: {
            validator: (email) => /[a-z0-9]+@[a-z0-9]+.com/i.test(email),
            message: "Invalid e-Mail",
        },
    },
    gender: {
        type: String,
        trim: true,
        required: [true, "Patient must specify the gender"],
    },
    mobile: {
        type: Number,
        required: [true, "Patient must have an contact number."],
        validate: {
            validator: (number) => number.toString().length === 10,
            message: "Invalid phone number!",
        },
    },
    age: {
        type: Number,
        required: [true, "Patient must specify the age"],
    },
    password: {
        type: String,
        required: [true, "Patient must have a password."],
    },
    verified: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
});
exports.PatientModel = (0, mongoose_1.model)("Patient", patientSchema);
