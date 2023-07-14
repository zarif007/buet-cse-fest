"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "UserName is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    role: {
        type: String,
        enum: ["general", "admin", "superadmin"],
        default: "general",
    },
}, {
    timestamps: true
});
exports.UserModel = mongoose_1.default.model("User", UserSchema);
