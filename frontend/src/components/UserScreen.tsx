import React, { useEffect, useRef } from 'react';

type UserScreenProps = {
  stream: MediaStream | undefined;
};

function UserScreen(props: UserScreenProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !props.stream) {
      return;
    }
    video.srcObject = props.stream;
  }, []);
  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video ref={videoRef} playsInline autoPlay />;
}

export default UserScreen;
