"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI, {
            //use modern url parser
            useNewUrlParser: true,
            //   use new engine server discovery
            useUnifiedTopology: true,
            // Specify your write concern here
            w: "majority",
            wtimeout: 5000,
            dbName: "Medibook",
        });
        console.log("database is connected");
    }
    catch (error) {
        throw new Error("Internal Server Error");
    }
};
exports.default = connectDB;
