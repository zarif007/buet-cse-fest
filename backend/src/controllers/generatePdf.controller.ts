import { Request, Response, NextFunction } from "express";

import {
  generatePdfService, getPdfService,
} from "../services/generatePdf.service";




const generatePdf = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prompt = req.body;

    const result = await generatePdfService(prompt);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      err: err.message,
      message: "Error in generating pdf",
    });
  }
};

const getgeneratedPdf = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;

    const result = await getPdfService(query);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      err: err.message,
      message: "Error in generating pdf",
    });
  }
};


export default {
  getgeneratedPdf,
  generatePdf,
};
