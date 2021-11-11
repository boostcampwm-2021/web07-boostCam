import { useState, useEffect } from 'react';

function useSTT(): {
  text: string;
  isFinal: boolean;
} {
  const [lastResult, setLastResult] = useState({ text: '', isFinal: false });

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

  return lastResult;
}

export default useSTT;
