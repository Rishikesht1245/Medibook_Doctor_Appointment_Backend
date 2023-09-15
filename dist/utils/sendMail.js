"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = async (email, subject, text) => {
    try {
        //creating transporter
        const transporter = nodemailer_1.default.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.TRANSPORTER_USERNAME,
                pass: process.env.TRANSPORTER_PASSWORD,
            },
        });
        //   send email
        await transporter.sendMail({
            from: process.env.TRANSPORTER_USERNAME,
            to: email,
            subject: subject,
            text: text,
        });
        console.log("email send successfully");
    }
    catch (error) {
        console.log("Email not send :", error);
    }
};
exports.default = sendEmail;
