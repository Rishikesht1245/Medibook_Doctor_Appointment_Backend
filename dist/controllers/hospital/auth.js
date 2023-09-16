"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.resentOtp = exports.verifyOtp = exports.signup = void 0;
const hospital_1 = require("../../models/hospital");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = require("../../models/token");
const sendMail_1 = __importDefault(require("../../utils/sendMail"));
const mongoose_1 = __importDefault(require("mongoose"));
const tokenManager_1 = require("../../utils/tokenManager");
// hospital registration
const signup = async (req, res) => {
    console.log("reached hospital signup");
    try {
        const hospitalCheck = await hospital_1.HospitalModel.findOne({
            email: req?.body?.email,
        });
        if (hospitalCheck) {
            return res.status(401).json({
                message: "Hospital Already exists with the entered Hospital Mail",
            });
        }
        delete req.body.confirmPassword;
        req.body.password = await bcrypt_1.default.hash(req.body.password, 10);
        // saving to db after checking, not existing hospital
        const newHospital = await new hospital_1.HospitalModel(req.body).save();
        // creating OTP
        const token = await new token_1.TokenModel({
            userId: newHospital._id,
            //generate a random string of hexadecimal characters base 16
            // same schema for both email verify token and otp
            token: Math.floor(Math.random() * 9000) + 1000,
        }).save();
        // send email to the hospital
        const message = `Please enter the OTP to verify your Account :${token.token}`;
        await (0, sendMail_1.default)(newHospital.email, "Verify OTP | Medibook", message);
        res.json({
            message: `An OTP has been sent to ${newHospital.email}, Please verify`,
            success: true,
            id: newHospital._id,
        });
    }
    catch (error) {
        console.log("Error in Hospital Sign Up : " + error);
        res
            .status(401)
            .json({ message: "Something went wrong, Please try after sometime." });
    }
};
exports.signup = signup;
// verify otp
const verifyOtp = async (req, res) => {
    try {
        let { id, otp } = req.body;
        // converting string to number
        otp = Number(otp);
        // converting id in string format to object ID
        id = new mongoose_1.default.Types.ObjectId(id);
        const otpCheck = await token_1.TokenModel.findOne({ userId: id, token: otp });
        if (!otpCheck)
            return res.status(401).json({ message: "Invalid OTP" });
        // making the new hospital verification status true
        const hospital = await hospital_1.HospitalModel.findByIdAndUpdate(id, {
            verified: true,
        });
        // deleting token from token model after successful verification
        await token_1.TokenModel.findByIdAndRemove(otpCheck._id);
        res.json({ success: true, message: "OTP Verified Successfully" });
    }
    catch (error) {
        console.log("Error in Otp Verification hospital : ", error);
        res.status(400).json({ message: "Something went wrong!" });
    }
};
exports.verifyOtp = verifyOtp;
// resend otp
const resentOtp = async (req, res) => {
    try {
        const id = new mongoose_1.default.Types.ObjectId(req.params.id);
        const hospital = await hospital_1.HospitalModel.findById(id);
        if (!hospital)
            return res.status(400).json({ message: "Please register again" });
        // saving token to db
        const token = await new token_1.TokenModel({
            userId: hospital._id,
            //generate a random string of hexadecimal characters base 16
            // same schema for both email verify token and otp
            token: Math.floor(Math.random() * 9000) + 1000,
        }).save();
        console.log(token.token);
        //sending mail
        const message = `Please enter the OTP to verify your Account : ${token.token}`;
        await (0, sendMail_1.default)(hospital.email, "Verify OTP | Medibook", message);
        res.json({
            message: `An OTP has been sent to ${hospital.email}, Please verify`,
            success: true,
            id: hospital._id,
        });
    }
    catch (error) { }
};
exports.resentOtp = resentOtp;
// hospital login
const login = async (req, res) => {
    console.log("Reached Hospital Login : ", req.body);
    try {
        const hospitalCheck = await hospital_1.HospitalModel.findOne({
            email: req?.body?.email,
            verified: true,
            isBlocked: false,
        });
        if (!hospitalCheck) {
            return res.status(401).json({
                message: "User not found or User is not Authorized",
            });
        }
        if (await bcrypt_1.default.compare(req.body.password, hospitalCheck.password)) {
            const token = (0, tokenManager_1.signToken)(hospitalCheck._id, hospitalCheck.email, "hospitalAdmin");
            res.json({ success: true, token: token, data: hospitalCheck });
        }
    }
    catch (error) {
        console.log("Error in Hospital Login : ", Error);
        res.status(400).json({ message: "Something went wrong" });
    }
};
exports.login = login;
