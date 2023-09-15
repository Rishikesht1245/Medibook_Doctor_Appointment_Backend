import { Router } from "express";
import { login } from "../controllers/superAdmin/auth";

const superAdmin = Router();

superAdmin.post("/auth", login);

export default superAdmin;
