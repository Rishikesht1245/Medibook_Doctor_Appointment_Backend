"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const JSON_formattor_1 = require("../../utils/JSON-formattor");
const tokenManager_1 = require("../../utils/tokenManager");
const login = async (req, res) => {
    const { email, password } = req.body;
    const name = "Medibook Admin";
    try {
        if (email === process.env.SUPER_ADMIN_EMAIL &&
            password === process.env.SUPER_ADMIN_PASSWORD) {
            const token = await (0, tokenManager_1.signToken)(123, email, "superAdmin");
            res.json({
                ...(0, JSON_formattor_1.dataFormattor)({ email, name }),
                token: token,
            });
        }
        else {
            console.log("else");
            return res.status(401).json({ message: "Invalid email or password" });
        }
    }
    catch (error) {
        console.log("Error in Super Admin Login ", error);
        res.status(401).json({ message: "Something went wrong" });
    }
};
exports.login = login;
