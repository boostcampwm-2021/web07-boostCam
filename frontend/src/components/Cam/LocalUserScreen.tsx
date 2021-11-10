import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';

import DefaultScreen from './DefaultScreen';
import { CamStoreContext } from './CamStore';
import StreamStatusIndicator from './StreamStatusIndicator';

const Container = styled.div<{ screenWidth: string }>`
  width: ${(props) => props.screenWidth};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90%;
`;

const Video = styled.video<{ screenWidth: string }>`
  max-height: 100%;
  width: 100%;
`;

type LocalUserScreenProps = {
  screenWidth: string;
};

function LocalUserScreen(props: LocalUserScreenProps): JSX.Element {
  const { screenWidth } = props;
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
    <Container screenWidth={screenWidth}>
      {localStatus.stream && localStatus.video ? (
        <Video screenWidth={screenWidth} ref={videoRef} playsInline autoPlay muted>
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
