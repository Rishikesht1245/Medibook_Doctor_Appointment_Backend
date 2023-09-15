"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const app = (0, app_1.default)();
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});
