"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const main_controller_1 = require("../../controllers/main.controller");
const generatePdf_route_1 = __importDefault(require("./generatePdf.route"));
const user_route_1 = __importDefault(require("./user.route"));
const rateLimiter_1 = require("../../middleware/rateLimiter");
/*
    @route      ALL /api/v1/
    @detail     This is the main hit point for the API version 1
*/
router.get("/", main_controller_1.getHome);
/*
    @route      GET /api/v1/generatepdf/{route}
    @detail     This is every router hit point for the generatepdf endpoints
*/
router.use("/generatepdf", rateLimiter_1.rateLimiter, generatePdf_route_1.default);
/*
    @route      GET /api/v1/user/{route}
    @route      POST /api/v1/user/          {name,email}
    @detail     This is every router hit point for the user endpoints
*/
router.use("/user", rateLimiter_1.rateLimiter, user_route_1.default);
exports.default = router;
