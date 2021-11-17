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
};

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90%;
`;

const Video = styled.video<{ isSpeaking: boolean }>`
  max-height: 100%;
  width: 100%;
  border: ${(props) => (props.isSpeaking ? '2px solid green' : 'none')};
`;

function UserScreen(props: UserScreenProps): JSX.Element {
  const { stream, userId } = props;
  const socket = useRecoilValue(socketState);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [status, setStatus] = useState<Status>({
    video: false,
    audio: false,
    stream: false,
    speaking: false,
  });

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !stream?.active || video?.srcObject) {
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
    <Container>
      {status.stream && status.video ? (
        <Video ref={videoRef} playsInline autoPlay isSpeaking={status.speaking}>
          <track kind="captions" />
        </Video>
      ) : (
        <DefaultScreen />
      )}
      <StreamStatusIndicator micStatus={status.audio} videoStatus={status.video} nickname={userId} />
    </Container>
  );
}

export default UserScreen;
