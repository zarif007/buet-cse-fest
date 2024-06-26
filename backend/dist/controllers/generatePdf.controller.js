"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const generatePdf_service_1 = require("../services/generatePdf.service");
const generatePdf = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prompt = req.body;
        const result = yield (0, generatePdf_service_1.generatePdfService)(prompt);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            err: err.message,
            message: "Error in generating pdf",
        });
    }
});
const getgeneratedPdf = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const result = yield (0, generatePdf_service_1.getPdfService)(query);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            err: err.message,
            message: "Error in generating pdf",
        });
    }
});
exports.default = {
    getgeneratedPdf,
    generatePdf,
};
