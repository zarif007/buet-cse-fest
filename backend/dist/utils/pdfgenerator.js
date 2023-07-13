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
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const request_promise_1 = __importDefault(require("request-promise"));
// import { Request, Response } from "express"
const utility_1 = require("./utility");
const generatePDF = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Generating PDF");
    const randomFilename = (0, utility_1.generateRandomFilename)('pdf');
    const doc = new pdfkit_1.default();
    doc.pipe(fs_1.default.createWriteStream(randomFilename));
    // Embed a font, set the font size, and render some text
    doc
        .font("./fonts/PalatinoBold.ttf")
        .fontSize(25)
        .text('Some text with an embedded font!', 100, 100);
    // Add an image, constrain it to a given size, and center it vertically and horizontally
    const imageBuffer = yield request_promise_1.default.get({ url: 'https://img.freepik.com/premium-photo/abstract-rainbow-colorful-bright-feather-closeup-up-macro-view-background-plumage-texture-with-dew-drops_753134-644.jpg', encoding: null });
    doc.image(imageBuffer, {
        fit: [250, 300],
        align: 'center',
        valign: 'center'
    });
    // Add another page
    doc
        .addPage()
        .fontSize(25)
        .text('Here is some vector graphics...', 100, 100);
    // Draw a triangle
    doc
        .save()
        .moveTo(100, 150)
        .lineTo(100, 250)
        .lineTo(200, 250)
        .fill('#FF3300');
    // Apply some transforms and render an SVG path with the 'even-odd' fill rule
    doc
        .scale(0.6)
        .translate(470, -380)
        .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
        .fill('red', 'even-odd')
        .restore();
    // Add some text with annotations
    doc
        .addPage()
        .fillColor('blue')
        .text('Here is a link!', 100, 100)
        .underline(100, 100, 160, 27, { color: '#0000FF' })
        .link(100, 100, 160, 27, 'http://google.com/');
    // Finalize PDF file
    // doc.pipe(fs.createWriteStream('./output.pdf'));
    doc.end();
    const bucketName = process.env.STORAGE_BUCKET || 'buetcsehackathonpdf';
    const destinationFilename = `pdfs/${randomFilename}`;
    yield (0, utility_1.uploadToCloudStorage)(bucketName, randomFilename, destinationFilename);
    const fileUrl = `https://storage.googleapis.com/${bucketName}/${destinationFilename}`;
    fs_1.default.unlinkSync(`./${randomFilename}`);
    return fileUrl;
});
exports.default = generatePDF;
