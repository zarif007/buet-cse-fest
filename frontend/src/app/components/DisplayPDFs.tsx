import React, { useEffect, useState } from "react";
import DetectSentiment from "../utils/DetectSentiment";
import PDFReader from "../utils/pdfReader";
import PDFModal from "./ui/PDF.Modal";
import { generatedPDFs } from "@/types/pdf";
import handlePromptSubmit from "../utils/handlePromptSubmit";

const generatedPdfs: generatedPDFs[] = [
  {
    creator: "Salman",
    title: "I love cow",
    pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
    visibility: false,
    coverImageUrl: "https://www.gstatic.com/webp/gallery/1.jpg",
    tags: ["nature", "travel"],
  },
  {
    creator: "Samir",
    title: "I love cow",
    pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
    visibility: false,
    coverImageUrl: "https://www.gstatic.com/webp/gallery/2.jpg",
    tags: ["nature", "travel"],
  },
  {
    creator: "Zarif",
    title: "I love cow",
    pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
    visibility: false,
    coverImageUrl: "https://www.gstatic.com/webp/gallery/3.jpg",
    tags: ["nature", "travel"],
  },
];

const DisplayPDFs = () => {
  const [prompt, setPrompt] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(prompt);
  };
  return (
    <div className="mx-auto w-full max-w-5xl py-24 flex flex-col">
      <form
        onSubmit={handleSubmit}
        className="flex space-x-2 w-full mx-auto justify-center items-center"
      >
        <input
          className=" flex w-full text-black h-14 bg-gray-800 rounded-sm border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          defaultValue=""
          placeholder="Prompt to EBook"
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          className="font-bold my-2 rounded bg-blue-500 py-4 px-6"
        >
          Submit
        </button>
      </form>
      <section className="text-gray-400 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {generatedPdfs.map((pdf: generatedPDFs, index) => (
              <DisplayPDF pdf={pdf} key={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const DisplayPDF = ({ pdf }: { pdf: generatedPDFs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sentiment, setSentiment] = useState<string | undefined>("");
  const [summary, setSummary] = useState<string | undefined>("");

  useEffect(() => {
    const getSentiment = async () => {
      setSentiment(await DetectSentiment("hiiii"));
    };
    const getSummary = async () => {
      setSummary(
        await handlePromptSubmit(
          `Generate summary based on this title ${pdf.title} in 20 words`
        )
      );
    };
    // getSummary();
    getSentiment();
  }, [pdf]);
  return (
    <div className="p-4 md:w-1/3">
      <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={pdf.coverImageUrl}
          alt="blog"
        />
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
            by {pdf.creator}
          </h2>

          <h1 className="title-font text-lg font-medium text-white mb-3">
            {pdf.title}
          </h1>
          {sentiment !== "" && (
            <h1 className="title-font text-sm p-1 bg-green-500 w-fit rounded font-medium text-white mb-3">
              {sentiment}
            </h1>
          )}

          <p className="leading-relaxed mb-3">{summary}</p>

          <div className="flex space-x-2">
            {pdf.tags.map((tag: string, index: number) => (
              <p key={index} className="text-blue-500">
                #{tag}
              </p>
            ))}
          </div>
          <div className="flex items-center flex-wrap ">
            <a
              onClick={() => setIsOpen(true)}
              className="text-indigo-400 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer"
            >
              Learn More
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
            {/* PDFModal component usage */}
            <PDFModal isOpen={isOpen} setIsOpen={setIsOpen} pdf={pdf} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayPDFs;
