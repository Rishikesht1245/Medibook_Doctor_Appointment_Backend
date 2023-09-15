import createApp from "./app";
import { Application } from "express";

const app: Application = createApp();
const PORT = process.env.PORT;

const server = app.listen(PORT, (): void => {
  console.log(`Server is running on ${process.env.PORT}`);
});
