import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFTextExtractor = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    const extractTextFromPDF = async () => {
      try {
        const loadingTask = pdfjs.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;

        let extractedText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((item) => item.str).join(" ");
          extractedText += pageText + "\n";
        }

        setNumPages(pdf.numPages);
        setText(extractedText);
      } catch (error) {
        console.error("Error extracting text from PDF:", error);
      }
    };

    extractTextFromPDF();
  }, [pdfUrl]);

  return (
    <div>
      <Document
        file={pdfUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={index + 1} pageNumber={index + 1} />
        ))}
      </Document>
      <div>
        <pre>{text}</pre>
      </div>
    </div>
  );
};

export default PDFTextExtractor;
