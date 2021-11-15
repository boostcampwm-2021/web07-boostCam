import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';

import DefaultScreen from './DefaultScreen';
import { CamStoreContext } from './CamStore';
import StreamStatusIndicator from './StreamStatusIndicator';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90%;
`;

const Video = styled.video`
  max-height: 100%;
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
      {localStatus.stream && localStatus.video ? (
        <Video ref={videoRef} playsInline autoPlay muted>
          <track kind="captions" />
        </Video>
      ) : (
        <DefaultScreen />
      )}
      <StreamStatusIndicator micStatus={localStatus.audio} videoStatus={localStatus.video} />
    </Container>
  );
}

export default LocalUserScreen;
