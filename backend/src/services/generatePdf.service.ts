// import { ActivityInterface } from '../types/activity/index';
import { PdfModel } from "../models/pdf.model";

import generatePDF from "../utils/pdfgenerator"

const generatePdfService = async (prompt: any) => {

  const {msg, generatedBy,type} = prompt;

  console.log(msg, generatedBy,type);

  const url = generatePDF({ msg,type})

  // // const {pdfUrl, pdfTag} = msg;
  // // const result = await PdfModel.create({
  // //   url: pdfUrl, generatedBy,tags:pdfTag});
  // // return result;
  return url;
};

export {
  generatePdfService,
};
