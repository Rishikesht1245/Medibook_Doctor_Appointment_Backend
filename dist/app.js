"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const databse_1 = __importDefault(require("./config/databse"));
const cors_1 = __importDefault(require("cors"));
const superAdmin_routes_1 = __importDefault(require("./routes/superAdmin.routes"));
const patients_routes_1 = __importDefault(require("./routes/patients.routes"));
const express_session_1 = __importDefault(require("express-session"));
const hospitals_routes_1 = __importDefault(require("./routes/hospitals.routes"));
const createApp = () => {
    //load environment variables from .env file
    dotenv.config();
    const app = (0, express_1.default)();
    // session configuration
    app.use((0, express_session_1.default)({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    }));
    // enable cors
    app.use((0, cors_1.default)({
        origin: [process.env.FRONTEND],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    }));
    // app.use(cors());
    //   parse request bodies with a specified size limit of 2 MB
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json({ limit: "2mb" }));
    //   Routes
    app.all("/api/v1", (req, res) => {
        res.json("Welcome to Medibook App 🏨");
    });
    //superAdmin routes
    app.use("/api/v1/super-admins/", superAdmin_routes_1.default);
    //Patient routes
    app.use("/api/v1/patients/", patients_routes_1.default);
    //Hospital routes
    app.use("/api/v1/hospital-admins/", hospitals_routes_1.default);
    //   connect to mongo DB
    (0, databse_1.default)();
    //  app will be used in server.ts
    return app;
};
exports.default = createApp;
