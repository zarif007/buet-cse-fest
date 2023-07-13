import PDFDocument from 'pdfkit';
import fs from 'fs';
import request from 'request-promise';
import { Storage } from '@google-cloud/storage';

// import { Request, Response } from "express"
import { generateRandomFilename, uploadToCloudStorage } from './utility';



const generatePDF = async () => {

    console.log("Generating PDF");

    const randomFilename = generateRandomFilename('pdf');
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(randomFilename));

    // Embed a font, set the font size, and render some text
    doc
        .font("./fonts/PalatinoBold.ttf")
        .fontSize(25)
        .text('Some text with an embedded font!', 100, 100);

    // Add an image, constrain it to a given size, and center it vertically and horizontally
    const imageBuffer = await request.get({ url: 'https://img.freepik.com/premium-photo/abstract-rainbow-colorful-bright-feather-closeup-up-macro-view-background-plumage-texture-with-dew-drops_753134-644.jpg', encoding: null });

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
    doc.end()


    const bucketName = process.env.STORAGE_BUCKET || 'buetcsehackathonpdf';
    const destinationFilename = `pdfs/${randomFilename}`;
    await uploadToCloudStorage(bucketName, randomFilename, destinationFilename);
    const fileUrl = `https://storage.googleapis.com/${bucketName}/${destinationFilename}`;
    fs.unlinkSync(`./${randomFilename}`);
    return fileUrl;

}

export default generatePDF;