import React, { MutableRefObject, useEffect, useRef } from 'react';

function Screen(): JSX.Element {
  const video: MutableRefObject<HTMLVideoElement | null> = useRef(null);
  useEffect(() => {
    const init = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      });

      const videoRef = video.current;
      if (videoRef === null) {
        return;
      }
      videoRef.srcObject = stream;
    };
    init();
  }, []);
  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video ref={video} playsInline autoPlay />;
}

export default Screen;
