"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const main_controller_1 = require("../../controllers/main.controller");
/*
    @route      ALL /api/v1/
    @detail     This is the main hit point for the API version 1
*/
router.get("/", main_controller_1.getHome);
/*
    @route      GET /api/v1/student/{route}
    @detail     This is every router hit point for the student endpoints
*/
// router.use("/student", rateLimiter, StudentRoute);
exports.default = router;
