/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';

function useSTT(): {
  lastResult: {
    text: string;
    isFinal: boolean;
  };
  isSTTActive: boolean;
  toggleSTTActive: () => void;
} {
  const [lastResult, setLastResult] = useState({ text: '', isFinal: false });
  const [isSTTActive, setSTTActive] = useState<boolean>(false);
  const recognitionRef = useRef<any>();

  // @ts-expect-error: it only works on Chrome
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const makeNewRecognition = () => {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.start();

    recognition.onresult = ({ results }: { results: any }) => {
      const last: any = Array.from(results[results.length - 1]);

      setLastResult({
        text: last.reduce((prev: string, curr: any) => prev + curr.transcript, ''),
        isFinal: results[results.length - 1].isFinal,
      });
    };
    return recognition;
  };

  const toggleSTTActive = () => {
    setSTTActive((prev) => !prev);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (isSTTActive) {
      recognitionRef.current = makeNewRecognition();
    } else {
      recognitionRef?.current?.abort();
    }
  }, [isSTTActive]);

  return { lastResult, isSTTActive, toggleSTTActive };
}

export default useSTT;
