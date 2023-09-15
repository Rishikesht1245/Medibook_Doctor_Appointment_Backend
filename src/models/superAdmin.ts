import { Schema, Model, model } from "mongoose";
import { ISuperAdmin } from "src/interfaces/superAdmin";
import validator from "validator";

const superAdminSchema = new Schema<ISuperAdmin>({
  name: {
    type: String,
    required: [true, "Super Admin must have a name"],
    validate: { validator: validator.isAlpha as any, message: "Invalid Name" },
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Super Admin must have an email"],
    validate: {
      validator: (email: string) => /[a-z0-9]+@[a-z0-9]+.com/i.test(email),
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
      validator: (number: any) => number.toString().length === 10,
      message: "Invalid phone number!",
    },
  },
});

export const SuperAdminModel: Model<ISuperAdmin> = model(
  "SuperAdmin",
  superAdminSchema
);
