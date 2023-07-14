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
const openai_1 = require("openai");
// import { Request, Response } from "express"
const utility_1 = require("./utility");
const openai = new openai_1.OpenAIApi(utility_1.openAiConfiguration);
const chatCreator = (prompt, tokenNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const content = `create a ${prompt.wordLimit} words ${prompt.flag} for ${prompt.type} about ${prompt.msg}`;
    console.log(content);
    const x = yield openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content
            }
        ],
        max_tokens: tokenNumber
    });
    if (x.data.choices[0].message) {
        return x.data.choices[0].message.content;
    }
});
const generate_image = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("🔥🔥🔥 Generating Image 🔥🔥🔥");
    const result = yield openai.createImage({
        prompt,
        n: 1,
        size: "512x512" //size always should be in ['256x256', '512x512', '1024x1024']
    });
    const url = result.data.data[0].url;
    return url;
});
const generate_content = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    const storyObject = {
        title: "",
        body: [],
        chat: ""
    };
    const storyImageObject = {
        title: "",
        body: []
    };
    storyObject.title = yield chatCreator(Object.assign(Object.assign({}, prompt), { flag: "title", wordLimit: "50" }), 300);
    storyImageObject.title = yield generate_image(storyObject.title);
    storyObject.chat = yield chatCreator(Object.assign(Object.assign({}, prompt), { msg: storyObject.title, flag: "story", wordLimit: "200-250" }), 500);
    storyObject.body = storyObject.chat.split("\n\n");
    // Generate a random float between 0 and 1
    const min = 0;
    const max = storyObject.body.length;
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    storyImageObject.body.push(yield generate_image(storyObject.body[randomInt]));
    // storyImageObject.body.push(await generate_image(storyObject.body[randomInt]));
    return { storyObject, storyImageObject };
});
const generatePDF = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("🔥🔥🔥 Generating Content🔥🔥🔥");
    const { storyObject, storyImageObject } = yield generate_content(prompt);
    console.log("🔥🔥🔥 Generating PDF🔥🔥🔥");
    const randomFilename = (0, utility_1.generateRandomFilename)('pdf');
    const doc = new pdfkit_1.default({ size: 'A4' });
    doc.pipe(fs_1.default.createWriteStream(randomFilename));
    doc.fontSize(26)
        .font('./fonts/Helvetica-Bold.ttf');
    // Set the alignment of the title to center
    doc.text(String(storyObject.title), { align: 'center' });
    doc.moveDown(2);
    doc
        .font('Times-Roman', 12)
        .text('Generated by: md.danialislam@gmail.com', 300, 670)
        .fillColor('blue')
        .text(`This book can be found at https://storage.googleapis.com/buetcsehackathonpdf/pdfs/${randomFilename}`, 100, 690);
    const imageBuffer = yield request_promise_1.default.get({ url: String(storyImageObject.title), encoding: null });
    // Calculate the image dimensions
    const imageWidth = doc.page.width - 100; // Adjust the width as needed
    const imageHeight = (imageWidth * 9) / 16; // Assuming a 16:9 aspect ratio
    // Center the image on the page
    const x = (doc.page.width - imageWidth) / 2;
    const y = (doc.page.height - imageHeight) / 2;
    // Add the cover image to the PDF
    doc.image(imageBuffer, x, y, { width: imageWidth, height: imageHeight });
    // Add another page
    doc.addPage();
    const imageBuffer2 = yield request_promise_1.default.get({ url: String(storyImageObject.body[0]), encoding: null });
    // console.log("Image 2 get ")
    // // Add the cover image to the PDF
    doc.image(imageBuffer2, x, 10, { width: imageWidth, height: imageHeight });
    doc.moveDown(2);
    doc
        .font('Times-Roman', 12)
        .moveTo(0, imageHeight + 20)
        .text(String(storyObject.chat), {
        width: 412,
        align: 'justify',
        indent: 30,
        columns: 2,
        height: 300,
        ellipsis: true
    });
    // Finalize PDF file
    // doc.pipe(fs.createWriteStream('./output.pdf'));
    doc.end();
    const bucketName = process.env.STORAGE_BUCKET || 'buetcsehackathonpdf';
    const destinationFilename = `pdfs/${randomFilename}`;
    yield (0, utility_1.uploadToCloudStorage)(bucketName, randomFilename, destinationFilename);
    const fileUrl = `https://storage.googleapis.com/${bucketName}/${destinationFilename}`;
    fs_1.default.unlinkSync(`./${randomFilename}`);
    return { storyObject, fileUrl };
});
exports.default = generatePDF;
