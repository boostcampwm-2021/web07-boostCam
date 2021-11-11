import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import socketState from '../../atoms/socket';
import DefaultScreen from './DefaultScreen';
import type { Status } from '../../types/cam';
import StreamStatusIndicator from './StreamStatusIndicator';

type UserScreenProps = {
  stream: MediaStream | undefined;
  userId: string;
  screenWidth: string;
};

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

function UserScreen(props: UserScreenProps): JSX.Element {
  const { stream, userId, screenWidth } = props;
  const socket = useRecoilValue(socketState);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [status, setStatus] = useState<Status>({
    video: false,
    audio: false,
    stream: false,
  });

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !stream?.active) {
      return;
    }
    video.srcObject = stream;
  });

  useEffect(() => {
    socket.on('userStatus', (payload) => {
      if (payload.userId === userId) {
        setStatus(payload.status);
      }
    });
    socket.emit('getUserStatus', { userId });
  }, []);

  return (
    <Container screenWidth={screenWidth}>
      {status.stream && status.video ? (
        <Video screenWidth={screenWidth} ref={videoRef} playsInline autoPlay>
          <track kind="captions" />
        </Video>
      ) : (
        <DefaultScreen />
      )}
      <StreamStatusIndicator micStatus={status.audio} videoStatus={status.video} />
    </Container>
  );
}

export default UserScreen;
