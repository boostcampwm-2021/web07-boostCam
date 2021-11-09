import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import DefaultScreen from './DefaultScreen';
import { CamStoreContext } from './CamStore';

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

function LocalUserScreen(): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { localStream, localStatus } = useContext(CamStoreContext);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !localStream?.active) {
      return;
    }
    video.srcObject = localStream;
  });

  return (
    <Container>
      <div>{`video ${localStatus.video} audio ${localStatus.audio}`}</div>
      {localStatus.stream && localStatus.video ? (
        <Video ref={videoRef} playsInline autoPlay muted>
          <track kind="captions" />
        </Video>
      ) : (
        <DefaultScreen />
      )}
    </Container>
  );
}

export default LocalUserScreen;
