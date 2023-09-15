"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
// creating token
const signToken = (_id, email, role) => {
    console.log("JWT");
    return (0, jsonwebtoken_1.sign)({ _id, email, role }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};
exports.signToken = signToken;
// verifying token
const verifyToken = (token) => (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
exports.verifyToken = verifyToken;
