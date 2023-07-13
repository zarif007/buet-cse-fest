"use client";

import React from "react";
import { useEffect, useState } from "react";
import handlePromptSubmit from "../utils/handlePromptSubmit";
import handleDetectTextFromImage from "../utils/handleDetectTextFromImage";
import UseDropZoneToUploadFile from "./UseDropZoneToUploadFile";

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
      { role: "User:", content: prompt },
    ]);

    const reply = await handlePromptSubmit(prompt);

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "AI:", content: reply },
    ]);

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
    <div className="mx-auto w-full max-w-md py-24 flex flex-col">
      {messages.length > 0 && (
        <div>
          {messages.map((m, index) => (
            <div key={index}>
              {m.role}
              {m.content}
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
      >
        <input
          className="flex w-full text-black"
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
      >
        <button type="button" onClick={toggleVoiceInput}>
          {voiceInputEnabled ? "Disable Voice Input" : "Enable Voice Input"}
        </button>
        {listening && <span>Listening...</span>}
        <p>{voiceText}</p>
        <button type="submit">submit</button>
      </form>

      <UseDropZoneToUploadFile handleFileUpload={handleFileUpload} />
    </div>
  );
};

export default ChatBot;
