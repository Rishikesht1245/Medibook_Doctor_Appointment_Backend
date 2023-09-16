"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = exports.login = exports.resentOtp = exports.verifyOtp = exports.signup = void 0;
const patient_1 = require("../../models/patient");
const token_1 = require("../../models/token");
const sendMail_1 = __importDefault(require("../../utils/sendMail"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokenManager_1 = require("../../utils/tokenManager");
const signup = async (req, res) => {
    console.log("Reached patient signup");
    try {
        // checking if already exists
        const patientCheck = await patient_1.PatientModel.findOne({
            email: req?.body?.email,
        });
        if (patientCheck) {
            return res
                .status(401)
                .json({ message: "User Already exists with the entered e-Mail" });
        }
        // deleting confirm password
        delete req.body.confirmPassword;
        //hashing the password
        req.body.password = await bcrypt_1.default.hash(req.body.password, 10);
        //saving new patient to DB
        const newPatient = await new patient_1.PatientModel(req.body).save();
        // saving OTP to db
        const token = await new token_1.TokenModel({
            userId: newPatient._id,
            //generate a random string of hexadecimal characters base 16
            // same schema for both email verify token and otp
            token: Math.floor(Math.random() * 9000) + 1000,
        }).save();
        console.log(token.token);
        //sending mail
        const message = `Please enter the OTP to verify your Account : ${token.token}`;
        await (0, sendMail_1.default)(newPatient.email, "Verify OTP | Medibook", message);
        res.json({
            message: `An OTP has been sent to ${newPatient.email}, Please verify`,
            success: true,
            id: newPatient._id,
        });
    }
    catch (error) {
        console.log("Error in Patient Sign Up : ", error);
        res.status(401).json({ message: "Something went wrong" });
    }
};
exports.signup = signup;
const verifyOtp = async (req, res) => {
    try {
        let { id, otp } = req.body;
        otp = Number(otp);
        id = new mongoose_1.default.Types.ObjectId(id);
        const otpCheck = await token_1.TokenModel.findOne({ userId: id, token: otp });
        if (!otpCheck)
            return res.status(400).json({ message: " Invalid OTP" });
        const patient = await patient_1.PatientModel.findByIdAndUpdate(id, {
            verified: true,
        });
        await token_1.TokenModel.findByIdAndRemove(otpCheck._id);
        res.json({ success: true, message: "OTP Verified Successfully" });
    }
    catch (error) {
        console.log("Error in OTP Verification :", error);
        res.status(400).json({ message: "Something went wrong" });
    }
};
exports.verifyOtp = verifyOtp;
// resend otp
const resentOtp = async (req, res) => {
    try {
        const id = new mongoose_1.default.Types.ObjectId(req.params.id);
        const patient = await patient_1.PatientModel.findById(id);
        if (!patient)
            return res.status(400).json({ message: "Please register again" });
        // saving token to db
        const token = await new token_1.TokenModel({
            userId: patient._id,
            //generate a random string of hexadecimal characters base 16
            // same schema for both email verify token and otp
            token: Math.floor(Math.random() * 9000) + 1000,
        }).save();
        console.log(token.token);
        //sending mail
        const message = `Please enter the OTP to verify your Account : ${token.token}`;
        await (0, sendMail_1.default)(patient.email, "Verify OTP | Medibook", message);
        res.json({
            message: `An OTP has been sent to ${patient.email}, Please verify`,
            success: true,
            id: patient._id,
        });
    }
    catch (error) { }
};
exports.resentOtp = resentOtp;
const login = async (req, res) => {
    console.log("Reached Patient login : " + req.body);
    try {
        const patientCheck = await patient_1.PatientModel.findOne({
            email: req?.body?.email,
        });
        if (!patientCheck) {
            return res.status(401).json({ message: "User not found" });
        }
        if (await bcrypt_1.default.compare(req.body.password, patientCheck.password)) {
            const token = (0, tokenManager_1.signToken)(patientCheck._id, patientCheck.email, "patient");
            res.json({ success: true, token: token, data: patientCheck });
        }
    }
    catch (error) {
        console.log("Error in Patient Login : ", error);
        res.status(400).json({ message: "Something went wrong" });
    }
};
exports.login = login;
//verify email with token
const verifyEmail = async (req, res) => {
    try {
        // check if patient exists
        const patient = await patient_1.PatientModel.findOne({ _id: req.params.id });
        if (!patient)
            return res.status(400).json({ message: "Invalid Link" });
        //     check if token exists
        const token = await token_1.TokenModel.findOne({
            userId: patient._id,
            token: req.params.token,
        });
        if (!token)
            return res.status(400).json({ message: "invalid Link" });
        await patient_1.PatientModel.updateOne({ _id: patient._id, verified: true });
        await token_1.TokenModel.findByIdAndRemove(token._id);
        res.json({ message: "Email Verified Successfully" });
    }
    catch (error) {
        console.log("Error in Email Verification :", error);
        res.status(400).json({ message: "Something went wrong" });
    }
};
exports.verifyEmail = verifyEmail;
