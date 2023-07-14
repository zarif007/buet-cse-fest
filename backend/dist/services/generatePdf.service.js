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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePdfService = void 0;
// import { ActivityInterface } from '../types/activity/index';
const pdf_model_1 = require("../models/pdf.model");
const pdfgenerator_1 = __importDefault(require("../utils/pdfgenerator"));
const utility_1 = require("../utils/utility");
const user_service_1 = require("./user.service");
const generatePdfService = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    const { msg, generatedBy, type } = prompt;
    let generator;
    if (generatedBy) {
        generator = yield (0, user_service_1.getUserService)({ email: generatedBy });
    }
    else {
        generator = yield (0, user_service_1.getUserService)({ _id: (0, utility_1.convertToObjectId)("64b09dbd96342a86c8bf9b8b") });
    }
    const { storyObject, fileUrl } = yield (0, pdfgenerator_1.default)({ msg, type });
    const result = yield pdf_model_1.PdfModel.create({
        pdfUrl: fileUrl, creator: generator[0]._id,
        contentInText: storyObject.chat, title: storyObject.title
    });
    return result;
});
exports.generatePdfService = generatePdfService;
