"use client";
import ChatBot from "./components/ChatBot";
import DisplayPDFs from "./components/DisplayPDFs";
import Navbar from "./components/Navbar";
import MDX from "./components/ui/MDX";

export default function Home() {
  return (
    <div>
      <Navbar />
      <DisplayPDFs />
      {/* <MDX /> */}
    </div>
  );
}
