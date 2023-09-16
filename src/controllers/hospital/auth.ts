import { RequestHandler } from "express";
import { HospitalModel } from "../../models/hospital";
import bcrypt from "bcrypt";
import { TokenModel } from "../../models/token";
import sendEmail from "../../utils/sendMail";
import mongoose from "mongoose";
import { signToken } from "../../utils/tokenManager";

// hospital registration
export const signup: RequestHandler = async (req, res) => {
  console.log("reached hospital signup");

  try {
    const hospitalCheck = await HospitalModel.findOne({
      email: req?.body?.email,
    });

    if (hospitalCheck) {
      return res.status(401).json({
        message: "Hospital Already exists with the entered Hospital Mail",
      });
    }

    delete req.body.confirmPassword;

    req.body.password = await bcrypt.hash(req.body.password, 10);

    // saving to db after checking, not existing hospital
    const newHospital = await new HospitalModel(req.body).save();

    // creating OTP
    const token = await new TokenModel({
      userId: newHospital._id,
      //generate a random string of hexadecimal characters base 16
      // same schema for both email verify token and otp
      token: Math.floor(Math.random() * 9000) + 1000,
    }).save();

    // send email to the hospital
    const message = `Please enter the OTP to verify your Account :${token.token}`;
    await sendEmail(newHospital.email, "Verify OTP | Medibook", message);

    res.json({
      message: `An OTP has been sent to ${newHospital.email}, Please verify`,
      success: true,
      id: newHospital._id,
    });
  } catch (error) {
    console.log("Error in Hospital Sign Up : " + error);
    res
      .status(401)
      .json({ message: "Something went wrong, Please try after sometime." });
  }
};

// verify otp
export const verifyOtp: RequestHandler = async (req, res) => {
  try {
    let { id, otp } = req.body;
    // converting string to number
    otp = Number(otp);
    // converting id in string format to object ID
    id = new mongoose.Types.ObjectId(id);

    const otpCheck = await TokenModel.findOne({ userId: id, token: otp });

    if (!otpCheck) return res.status(401).json({ message: "Invalid OTP" });

    // making the new hospital verification status true
    const hospital = await HospitalModel.findByIdAndUpdate(id, {
      verified: true,
    });

    // deleting token from token model after successful verification
    await TokenModel.findByIdAndRemove(otpCheck._id);

    res.json({ success: true, message: "OTP Verified Successfully" });
  } catch (error) {
    console.log("Error in Otp Verification hospital : ", error);
    res.status(400).json({ message: "Something went wrong!" });
  }
};

// resend otp
export const resentOtp: RequestHandler = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);

    const hospital = await HospitalModel.findById(id);

    if (!hospital)
      return res.status(400).json({ message: "Please register again" });

    // saving token to db
    const token = await new TokenModel({
      userId: hospital._id,
      //generate a random string of hexadecimal characters base 16
      // same schema for both email verify token and otp
      token: Math.floor(Math.random() * 9000) + 1000,
    }).save();
    console.log(token.token);

    //sending mail
    const message = `Please enter the OTP to verify your Account : ${token.token}`;
    await sendEmail(hospital.email, "Verify OTP | Medibook", message);

    res.json({
      message: `An OTP has been sent to ${hospital.email}, Please verify`,
      success: true,
      id: hospital._id,
    });
  } catch (error) {}
};

// hospital login
export const login: RequestHandler = async (req, res) => {
  console.log("Reached Hospital Login : ", req.body);
  try {
    const hospitalCheck = await HospitalModel.findOne({
      email: req?.body?.email,
      verified: true,
      isBlocked: false,
    });

    if (!hospitalCheck) {
      return res.status(401).json({
        message: "User not found or User is not Authorized",
      });
    }

    if (await bcrypt.compare(req.body.password, hospitalCheck.password)) {
      const token = signToken(
        hospitalCheck._id,
        hospitalCheck.email,
        "hospitalAdmin"
      );
      res.json({ success: true, token: token, data: hospitalCheck });
    }
  } catch (error) {
    console.log("Error in Hospital Login : ", Error);
    res.status(400).json({ message: "Something went wrong" });
  }
};
