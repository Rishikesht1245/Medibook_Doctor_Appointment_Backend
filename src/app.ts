import express, { Application, Request, Response } from "express";
import * as dotenv from "dotenv";
import connectDB from "./config/databse";
import cors from "cors";
import superAdminRoutes from "./routes/superAdmin.routes";
import patientRoutes from "./routes/patients.routes";
import session from "express-session";
import hospitalRoutes from "./routes/hospitals.routes";

const createApp = (): Application => {
  //load environment variables from .env file
  dotenv.config();

  const app: Application = express();

  // session configuration
  app.use(
    session({
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: true,
    })
  );

  // enable cors
  app.use(
    cors({
      origin: [process.env.FRONTEND as string],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
    })
  );

  // app.use(cors());

  //   parse request bodies with a specified size limit of 2 MB
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ limit: "2mb" }));

  //   Routes
  app.all("/api/v1", (req: Request, res: Response) => {
    res.json("Welcome to Medibook App 🏨");
  });

  //superAdmin routes
  app.use("/api/v1/super-admins/", superAdminRoutes);

  //Patient routes
  app.use("/api/v1/patients/", patientRoutes);

  //Hospital routes
  app.use("/api/v1/hospital-admins/", hospitalRoutes);

  //   connect to mongo DB
  connectDB();

  //  app will be used in server.ts
  return app;
};

export default createApp;
