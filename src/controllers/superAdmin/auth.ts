import { RequestHandler } from "express";
import { dataFormattor } from "../../utils/JSON-formattor";
import { signToken } from "../../utils/tokenManager";

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const name = "Medibook Admin";
  try {
    if (
      email === process.env.SUPER_ADMIN_EMAIL &&
      password === process.env.SUPER_ADMIN_PASSWORD
    ) {
      const token = await signToken(123, email, "superAdmin");
      res.json({
        ...dataFormattor({ email, name }),
        token: token,
      });
    } else {
      console.log("else");
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log("Error in Super Admin Login ", error);
    res.status(401).json({ message: "Something went wrong" });
  }
};
