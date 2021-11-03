import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

type UserScreenProps = {
  stream: MediaStream | undefined;
};

const Container = styled.div`
  margin-top: 10px;
  &:last-child {
    margin-bottom: 10px;
  }
`;

const Video = styled.video`
  height: auto;
  width: 100%;
`;

function UserScreen(props: UserScreenProps): JSX.Element {
  const { stream } = props;
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
      <Video ref={videoRef} playsInline autoPlay muted>
        <track kind="captions" />
      </Video>
    </Container>
  );
}

export default UserScreen;
