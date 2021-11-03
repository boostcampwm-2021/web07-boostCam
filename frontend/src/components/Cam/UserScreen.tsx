import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

type UserScreenProps = {
  stream: MediaStream | undefined;
};

const Container = styled.div``;

function UserScreen({ stream }: UserScreenProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !stream?.active) {
      return;
    }
    video.srcObject = stream;
  });

  return (
    <Container>
      <div>this is video</div>
      <video ref={videoRef} playsInline autoPlay muted width="640" height="320">
        <track kind="captions" />
      </video>
    </Container>
  );
}

export default UserScreen;
