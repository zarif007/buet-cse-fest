import mongoose from 'mongoose';
import { Storage } from '@google-cloud/storage';
import crypto from 'crypto';
import { Configuration} from "openai";

const storage = new Storage({
    projectId: 'buetcsehackathonpdf',
    keyFilename: './credentials/gcpstoragecredentials.json',
});

const openAiConfiguration = new Configuration({
    apiKey :'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'
});

// change string id to mongodb object id
const convertToObjectId = (id: string) => {
    const objectId = new mongoose.mongo.ObjectId(id);
    return objectId;
}

// Function to generate a random filename
const generateRandomFilename = (extension: string): string => {
    const randomName = crypto.randomBytes(16).toString('hex');
    return `${randomName}.${extension}`;
  }

const uploadToCloudStorage = async (bucketName: string, filename:string, destinationPath: string) => {

    await storage.bucket(bucketName).upload(filename, {
        destination: destinationPath,
      });
    
    console.log(`${filename} uploaded to ${bucketName}.`);
    
}


export { convertToObjectId, generateRandomFilename, uploadToCloudStorage,openAiConfiguration}