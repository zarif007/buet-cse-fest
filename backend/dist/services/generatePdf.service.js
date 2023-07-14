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
const pdfgenerator_1 = __importDefault(require("../utils/pdfgenerator"));
const generatePdfService = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    const { msg, generatedBy, type } = prompt;
    console.log(msg, generatedBy, type);
    const url = (0, pdfgenerator_1.default)({ msg, type });
    // // const {pdfUrl, pdfTag} = msg;
    // // const result = await PdfModel.create({
    // //   url: pdfUrl, generatedBy,tags:pdfTag});
    // // return result;
    return url;
});
exports.generatePdfService = generatePdfService;
