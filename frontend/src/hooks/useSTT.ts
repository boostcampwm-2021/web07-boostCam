/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

function useSTT(): {
  lastResult: {
    text: string;
    isFinal: boolean;
  };
  isSTTActive: boolean;
  setSTTActive: React.Dispatch<React.SetStateAction<boolean>>;
} {
  const [lastResult, setLastResult] = useState({ text: '', isFinal: false });
  const [isSTTActive, setSTTActive] = useState<boolean>(false);

  // @ts-expect-error: it only works on Chrome
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  useEffect(() => {
    recognition.onresult = ({ results }: { results: any }) => {
      const last: any = Array.from(results[results.length - 1]);

      setLastResult({
        text: last.reduce((prev: string, curr: any) => prev + curr.transcript, ''),
        isFinal: results[results.length - 1].isFinal,
      });
    };
    recognition.start();
  }, []);

  return { lastResult, isSTTActive, setSTTActive };
}

export default useSTT;
