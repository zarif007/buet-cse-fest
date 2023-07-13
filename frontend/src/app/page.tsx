"use client";
import ChatBot from "./components/ChatBot";
import DisplayPDFs from "./components/DisplayPDFs";
import PDFViewer from "./components/PDFViewer";
import PDFModal from "./components/ui/PDF.Modal";

export default function Home() {
  return (
    <div>
      <DisplayPDFs />
      {/* <PDFViewer url="https://www.africau.edu/images/default/sample.pdf" /> */}
    </div>
  );
}
