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
exports.openAiConfiguration = exports.uploadToCloudStorage = exports.generateRandomFilename = exports.convertToObjectId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const storage_1 = require("@google-cloud/storage");
const crypto_1 = __importDefault(require("crypto"));
const openai_1 = require("openai");
const storage = new storage_1.Storage({
    projectId: 'buetcsehackathonpdf',
    keyFilename: './credentials/gcpstoragecredentials.json',
});
const openAiConfiguration = new openai_1.Configuration({
    apiKey: process.env.OPENAI_APIKEY
});
exports.openAiConfiguration = openAiConfiguration;
// change string id to mongodb object id
const convertToObjectId = (id) => {
    const objectId = new mongoose_1.default.mongo.ObjectId(id);
    return objectId;
};
exports.convertToObjectId = convertToObjectId;
// Function to generate a random filename
const generateRandomFilename = (extension) => {
    const randomName = crypto_1.default.randomBytes(16).toString('hex');
    return `${randomName}.${extension}`;
};
exports.generateRandomFilename = generateRandomFilename;
const uploadToCloudStorage = (bucketName, filename, destinationPath) => __awaiter(void 0, void 0, void 0, function* () {
    yield storage.bucket(bucketName).upload(filename, {
        destination: destinationPath,
    });
    console.log(`${filename} uploaded to ${bucketName}.`);
});
exports.uploadToCloudStorage = uploadToCloudStorage;
