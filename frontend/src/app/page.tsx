"use client";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import handlePromptSubmit from "./utils/handlePromptSubmit";

export default function Home() {
  const [voiceInputEnabled, setVoiceInputEnabled] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceText, setVoiceText] = useState<string>("");
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [prompt, setPrompt] = useState<string>("");

  useEffect(() => {
    setPrompt("");
    console.log(voiceText);
    if (voiceText !== "") setPrompt(voiceText);
    else setPrompt(input);
  }, [input, voiceText]);

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
        setPrompt(transcript);
      };

      recognition.start();

      return () => {
        recognition.stop();
      };
    }
  }, [voiceInputEnabled, handleInputChange]);

  const toggleVoiceInput = () => {
    setVoiceInputEnabled(!voiceInputEnabled);
  };

  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col">
      {messages.length > 0 && (
        <div>
          {messages.map((m) => (
            <div key={m.id}>
              {m.role === "user" ? "user: " : "AI: "}
              {m.content}
            </div>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          className="flex w-full text-black"
          defaultValue={prompt}
          placeholder="text"
          onChange={handleInputChange}
        />
      </form>

      <button type="button" onClick={toggleVoiceInput}>
        {voiceInputEnabled ? "Disable Voice Input" : "Enable Voice Input"}
      </button>
      {listening && <span>Listening...</span>}
      <p>{voiceText}</p>
      <button onClick={() => handlePromptSubmit("hiii")}>submit</button>
    </div>
  );
}
