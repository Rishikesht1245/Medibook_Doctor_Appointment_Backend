import { Schema, Model, model } from "mongoose";
import { IVerifyToken } from "../interfaces/auth";

const tokenSchema = new Schema<IVerifyToken>({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, "User ID is required"],
  },
  token: {
    type: String,
    required: [true, "Token is required"],
  },
});

export const TokenModel: Model<IVerifyToken> = model("Token", tokenSchema);
