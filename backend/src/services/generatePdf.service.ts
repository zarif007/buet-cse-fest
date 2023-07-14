// import { ActivityInterface } from '../types/activity/index';
import { PdfModel } from "../models/pdf.model";
import { UserModel } from "../models/user.model";

import generatePDF from "../utils/pdfgenerator"
import { convertToObjectId } from "../utils/utility";
import { getUserService } from "./user.service";

const generatePdfService = async (prompt: any) => {

  const { msg, generatedBy, type } = prompt;
  let generator;
  if (generatedBy) {
    generator = await getUserService({ email: generatedBy })
  }
  else {
    generator = await getUserService({ _id: convertToObjectId("64b09dbd96342a86c8bf9b8b") })
  }

  const { storyObject, fileUrl } = await generatePDF({ msg, type })
  
  const result = await PdfModel.create({
    pdfUrl: fileUrl, creator: generator[0]._id,
    contentInText: storyObject.chat, title: storyObject.title
  });
  return result;
};

const getPdfService = async (query: any) => {
  const result = await PdfModel.find(query)
  return result;
};

export {
  getPdfService,
  generatePdfService,
};
