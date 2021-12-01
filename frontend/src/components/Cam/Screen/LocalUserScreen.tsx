import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';

import DefaultScreen from './DefaultScreen';
import { CamStoreContext } from '../CamStore';
import StreamStatusIndicator from './StreamStatusIndicator';
import { flex } from '../../../utils/styledComponentFunc';

const Container = styled.div<{ numOfScreen: number }>`
  position: relative;
  width: calc(100% / ${(props) => Math.ceil(props.numOfScreen ** 0.5)});
  height: calc(100% / ${(props) => Math.floor((props.numOfScreen + 1) ** 0.5)});
  ${flex('column', 'center', 'center')}
  aspect-ratio: 16/9;
  overflow: hidden;
`;

const Video = styled.video`
  max-height: 100%;
  width: 90%;
`;

type LocalUserScreenProps = {
  numOfScreen: number;
};

function LocalUserScreen(props: LocalUserScreenProps): JSX.Element {
  const { numOfScreen } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const { localStream, localStatus, userInfo } = useContext(CamStoreContext);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !localStream?.active || video?.srcObject) {
      return;
    }
    video.srcObject = localStream;
  });

  return (
    <Container numOfScreen={numOfScreen}>
      {localStatus.stream && localStatus.video ? (
        <Video ref={videoRef} playsInline autoPlay muted>
          <track kind="captions" />
        </Video>
      ) : (
        <DefaultScreen />
      )}
      <StreamStatusIndicator
        micStatus={localStatus.audio}
        videoStatus={localStatus.video}
        nickname={userInfo.nickname}
      />
    </Container>
  );
}

export default LocalUserScreen;
