/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';

function useSTT(): {
  lastResult: {
    text: string;
    isFinal: boolean;
  };
  isSTTActive: boolean;
  isSpeaking: boolean;
  toggleSTTActive: () => void;
} {
  const [lastResult, setLastResult] = useState({ text: '', isFinal: false });
  const [isSTTActive, setSTTActive] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const recognitionRef = useRef<any>();

  // @ts-expect-error: it only works on Chrome
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const toggleSTTActive = () => {
    setSTTActive((prev) => !prev);
  };

  useEffect(() => {
    const handleResult = ({ results }: { results: any }) => {
      const last: any = Array.from(results[results.length - 1]);
      if (isSTTActive) {
        setLastResult({
          text: last.reduce((prev: string, curr: any) => prev + curr.transcript, '').trim(),
          isFinal: results[results.length - 1].isFinal,
        });
      }
      if (results[results.length - 1].isFinal) {
        setIsSpeaking(false);
      } else {
        setIsSpeaking(true);
      }
    };

    const makeNewRecognition = () => {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = handleResult;

      recognition.onsoundend = () => {
        makeNewRecognition();
      };

      recognition.start();
      recognitionRef.current = recognition;
    };

    makeNewRecognition();
  }, [isSTTActive]);

  return { lastResult, isSTTActive, isSpeaking, toggleSTTActive };
}

export default useSTT;
