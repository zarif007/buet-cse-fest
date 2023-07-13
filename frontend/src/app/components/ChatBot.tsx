"use client";

import React from "react";
import { useEffect, useState } from "react";
import handlePromptSubmit from "../utils/handlePromptSubmit";
import handleDetectTextFromImage from "../utils/handleDetectTextFromImage";
import UseDropZoneToUploadFile from "./UseDropZoneToUploadFile";
import TypewriterAnimation from "./ui/TypewriterAnimation";
import TextToVoice from "./TextToVoice";

const dp = [
  "https://i.ibb.co/RhgYH8R/kisspng-clip-art-openclipart-beard-image-vector-graphics-beard-png-images-free-download-5b7ed8401bd6.png",
  "https://i.ibb.co/bFK7xBb/robot-chatbot-icon-sign-free-vector-removebg-preview.png",
];

const ChatBot = () => {
  const [voiceInputEnabled, setVoiceInputEnabled] = useState(false);
  const [listening, setListening] = useState(false);

  const [voiceText, setVoiceText] = useState<string>("");

  const [normalText, setNormalText] = useState<string>("");

  const [messages, setMessages] = useState<
    { role: string; content: string | undefined }[]
  >([]);

  useEffect(() => {
    if (voiceInputEnabled && "webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();

      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setListening(true);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognition.onresult = (event) => {
        const transcript =
          event.results[event.results.length - 1][0].transcript;
        setVoiceText(transcript);
      };

      recognition.start();

      return () => {
        recognition.stop();
      };
    }
  }, [voiceInputEnabled]);

  const toggleVoiceInput = () => {
    setVoiceInputEnabled(!voiceInputEnabled);
  };

  const handleExtraSubmit = async (prompt: any) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "User", content: prompt },
    ]);

    const reply = await handlePromptSubmit(prompt);

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "AI", content: reply },
    ]);

    console.log(messages);
    setVoiceInputEnabled(false);
    setVoiceText("");
  };

  // retrieved texts to prompt
  const handleCommandsFromTXT = async (commands: string[]) => {
    for (const command of commands) {
      await handleExtraSubmit(command);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  };

  // text file > detected > openaiapi
  const handleTXTFileInput = (file: any) => {
    const reader = new FileReader();

    reader.onload = () => {
      const content = reader.result;
      if (content && typeof content === "string") {
        handleCommandsFromTXT(content.split("\n"));
      }
    };

    reader.readAsText(file);
  };

  // image > detected > openaiapi
  const handleImageFilInput = async (file: any) => {
    handleDetectTextFromImage(file)
      .then((detectedText) => {
        handleExtraSubmit(detectedText);
        // Use the detectedText value here
      })
      .catch((error) => {
        console.error("Error detecting text:", error);
        // Handle the error here
      });
  };

  // Image and file input handler
  const handleFileUpload = (acceptedFiles: any) => {
    const file = acceptedFiles[0];

    if (file.type === "text/plain") handleTXTFileInput(file);
    else handleImageFilInput(file);
  };

  return (
    <div className="mx-auto py-24 flex flex-col">
      {messages.length > 0 && (
        <div>
          {messages.map((m, index) => (
            <div
              key={index}
              className={`${m.role === "User" ? "" : "bg-gray-900"} py-8 px-4`}
            >
              <div className="w-full max-w-5xl mx-auto font-semibold flex space-x-2 items-center">
                <img src={dp[index % 2]} className="w-10 h-10" />
                <TypewriterAnimation text={m.content} />
                {index % 2 !== 0 && <TextToVoice text={m.content} />}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Normal text submit */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleExtraSubmit(normalText);
        }}
        className="w-full max-w-5xl mx-auto my-2"
      >
        <input
          className="flex w-full text-black h-16 bg-gray-800 rounded-sm border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          defaultValue={normalText}
          placeholder="text"
          onChange={(e) => setNormalText(e.target.value)}
        />
      </form>

      {/* voice text */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleExtraSubmit(voiceText);
        }}
        className="w-full max-w-5xl mx-auto my-2"
      >
        <button type="button" onClick={toggleVoiceInput}>
          {voiceInputEnabled ? "Disable Voice Input" : "Enable Voice Input"}
        </button>
        {listening && <span>Listening...</span>}
        <p>{voiceText}</p>
        <button type="submit">submit</button>
      </form>

      <div className="w-full max-w-5xl mx-auto my-2">
        <UseDropZoneToUploadFile handleFileUpload={handleFileUpload} />
      </div>
    </div>
  );
};

export default ChatBot;
