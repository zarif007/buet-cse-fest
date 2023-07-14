"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const generatePdf_controller_1 = __importDefault(require("../../controllers/generatePdf.controller"));
router
    .route("/")
    .get(generatePdf_controller_1.default.getgeneratedPdf)
    .post(generatePdf_controller_1.default.generatePdf);
// router
//   .route("/:id")
exports.default = router;
