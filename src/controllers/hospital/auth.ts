import { RequestHandler } from "express";

export const signup: RequestHandler = async (req, res) => {
  console.log("reached hospital signup");
  console.log(req.body);
};
