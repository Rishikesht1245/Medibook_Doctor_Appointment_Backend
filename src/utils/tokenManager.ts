import { sign, JwtPayload, verify } from "jsonwebtoken";
import { TokenRole } from "src/interfaces/auth";
import { ObjectId } from "mongoose";
// creating token
export const signToken = (
  _id: any,
  email: string,
  role: TokenRole
): JwtPayload | string => {
  console.log("JWT");
  return sign({ _id, email, role }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};

// verifying token
export const verifyToken = (token: string) =>
  verify(token, process.env.JWT_SECRET as string);
