"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenModel = void 0;
const mongoose_1 = require("mongoose");
const tokenSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "User ID is required"],
    },
    token: {
        type: String,
        required: [true, "Token is required"],
    },
});
exports.TokenModel = (0, mongoose_1.model)("Token", tokenSchema);
