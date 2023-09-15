import { RequestHandler } from "express";
import { PatientModel } from "../../models/patient";
import { TokenModel } from "../../models/token";
import sendEmail from "../../utils/sendMail";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { signToken } from "../../utils/tokenManager";

export const signup: RequestHandler = async (req, res) => {
  console.log("Reached patient signup");

  try {
    // checking if already exists
    const patientCheck = await PatientModel.findOne({
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
    req.body.password = await bcrypt.hash(req.body.password, 10);

    //saving new patient to DB
    const newPatient = await new PatientModel(req.body).save();

    // saving token to db
    const token = await new TokenModel({
      userId: newPatient._id,
      //generate a random string of hexadecimal characters base 16
      // same schema for both email verify token and otp
      token: Math.floor(Math.random() * 9000) + 1000,
    }).save();
    console.log(token.token);

    //sending mail
    const message = `Please enter the OTP to verify your Account : ${token.token}`;
    await sendEmail(newPatient.email, "Verify OTP | Medibook", message);

    res.json({
      message: `An OTP has been sent to ${newPatient.email}, Please verify`,
      success: true,
      id: newPatient._id,
    });
  } catch (error) {
    console.log("Error in Patient Sign Up : ", error);
    res.status(401).json({ message: "Something went wrong" });
  }
};

export const verifyOtp: RequestHandler = async (req, res) => {
  try {
    let { id, otp } = req.body;
    otp = Number(otp);
    id = new mongoose.Types.ObjectId(id);

    const otpCheck = await TokenModel.findOne({ userId: id, token: otp });

    if (!otpCheck) return res.status(400).json({ message: " Invalid OTP" });

    const patient = await PatientModel.findByIdAndUpdate(id, {
      verified: true,
    });

    await TokenModel.findByIdAndRemove(otpCheck._id);

    res.json({ success: true, message: "OTP Verified Successfully" });
  } catch (error) {
    console.log("Error in OTP Verification :", error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

// resend otp
export const resentOtp: RequestHandler = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);

    const patient = await PatientModel.findById(id);

    if (!patient)
      return res.status(400).json({ message: "Please register again" });

    // saving token to db
    const token = await new TokenModel({
      userId: patient._id,
      //generate a random string of hexadecimal characters base 16
      // same schema for both email verify token and otp
      token: Math.floor(Math.random() * 9000) + 1000,
    }).save();
    console.log(token.token);

    //sending mail
    const message = `Please enter the OTP to verify your Account : ${token.token}`;
    await sendEmail(patient.email, "Verify OTP | Medibook", message);

    res.json({
      message: `An OTP has been sent to ${patient.email}, Please verify`,
      success: true,
      id: patient._id,
    });
  } catch (error) {}
};

export const login: RequestHandler = async (req, res) => {
  console.log("Reached Patient login : " + req.body);
  try {
    const patientCheck = await PatientModel.findOne({
      email: req?.body?.email,
    });

    if (!patientCheck) {
      return res.status(401).json({ message: "User not found" });
    }

    if (await bcrypt.compare(req.body.password, patientCheck.password)) {
      const token = signToken(patientCheck._id, patientCheck.email, "patient");
      res.json({ success: true, token: token, data: patientCheck });
    }
  } catch (error) {
    console.log("Error in Patient Login : ", error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

//verify email with token
export const verifyEmail: RequestHandler = async (req, res) => {
  try {
    // check if patient exists
    const patient = await PatientModel.findOne({ _id: req.params.id });
    if (!patient) return res.status(400).json({ message: "Invalid Link" });

    //     check if token exists
    const token = await TokenModel.findOne({
      userId: patient._id,
      token: req.params.token,
    });

    if (!token) return res.status(400).json({ message: "invalid Link" });

    await PatientModel.updateOne({ _id: patient._id, verified: true });
    await TokenModel.findByIdAndRemove(token._id);

    res.json({ message: "Email Verified Successfully" });
  } catch (error) {
    console.log("Error in Email Verification :", error);
    res.status(400).json({ message: "Something went wrong" });
  }
};
