import { Request, Response } from "express"
import generatePDF from "../utils/pdfgenerator"


export const getHome = async (req:Request, res:Response) => {   
    const fileUrl = await generatePDF();
    res.send(fileUrl)
    // res.sendFile('index.html', { root: 'src/public' })
}