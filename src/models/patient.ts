import { Schema, Model, model } from "mongoose";
import { IPatient } from "src/interfaces/patient";
import validator from "validator";

const patientSchema = new Schema<IPatient>({
  name: {
    type: String,
    required: [true, "Patient Must Have a name"],
    validate: { validator: validator.isAlpha as any, message: "Invalid name" },
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Patient must have an email"],
    validate: {
      validator: (email: string) => /[a-z0-9]+@[a-z0-9]+.com/i.test(email),
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
      validator: (number: any) => number.toString().length === 10,
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
});

export const PatientModel: Model<IPatient> = model("Patient", patientSchema);
