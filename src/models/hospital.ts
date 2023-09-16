import { Schema, Model, model } from "mongoose";
import { IHospital } from "../interfaces/hospital";
import validator from "validator";

const hospitalSchema = new Schema<IHospital>({
  name: {
    type: String,
    required: [true, "Patient Must Have a name"],
    validate: {
      validator: (value: string) => /^[A-Za-z\s]+$/.test(value),
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
      validator: (email: string) => /[a-z0-9]+@[a-z0-9]+.com/i.test(email),
      message: "Invalid e-Mail",
    },
  },
  description: {
    type: String,
    required: [true, "Description is Required"],
  },
  location: {
    type: String,
    required: [true, "Location is Required"],
  },
  city: {
    type: String,
    required: [true, "City is Required"],
  },
  state: {
    type: String,
    required: [true, "State is Required"],
  },
  country: {
    type: String,
    required: [true, "Country is Required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  mobile: {
    type: Number,
    required: [true, "Patient must have an contact number."],
    validate: {
      validator: (number: any) => number.toString().length === 10,
      message: "Invalid phone number!",
    },
  },
  website: {
    type: String,
    required: [true, "Website is required"],
  },
  password: {
    type: String,
    required: [true, "Patient must have a password."],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
});

export const HospitalModel: Model<IHospital> = model(
  "Hospital",
  hospitalSchema
);
