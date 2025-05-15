
import { useState, useEffect } from "react";

interface RotatingTextProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenPhrases?: number;
}

const RotatingText: React.FC<RotatingTextProps> = ({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenPhrases = 1000,
}) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Function to highlight the last word with teal color
  const highlightLastWord = (text: string) => {
    const words = text.split(" ");
    if (words.length <= 1) return text;
    
    const lastWord = words.pop();
    return (
      <>
        {words.join(" ")}{" "}
        <span className="text-instabids-teal">{lastWord}</span>
      </>
    );
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsTyping(false);
      }, delayBetweenPhrases);
      return () => clearTimeout(timeout);
    }

    const currentPhrase = phrases[currentIndex];

    if (isTyping) {
      if (currentText.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setCurrentText(currentPhrase.substring(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        setIsPaused(true);
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        }, deletingSpeed);
      } else {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isTyping, isPaused, phrases, typingSpeed, deletingSpeed, delayBetweenPhrases]);

  return (
    <div className="inline-block">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-instabids-dark">
        {highlightLastWord(currentText)}
        <span className="animate-pulse ml-1">|</span>
      </h2>
    </div>
  );
};

export default RotatingText;
