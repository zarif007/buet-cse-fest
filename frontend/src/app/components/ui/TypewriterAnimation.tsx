import React, { useEffect, useState } from "react";

const TypewriterAnimation = ({ text }: { text: any }) => {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setTypedText((prevText) => prevText + text.charAt(currentIndex));
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 50); // Adjust the typing speed (delay) here

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <div>
      <span>{typedText}</span>
      <span>|</span> {/* Cursor */}
    </div>
  );
};

export default TypewriterAnimation;
