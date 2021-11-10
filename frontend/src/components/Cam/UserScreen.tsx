import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import socketState from '../../atoms/socket';
import DefaultScreen from './DefaultScreen';
import type { Status } from '../../types/cam';

type UserScreenProps = {
  stream: MediaStream | undefined;
  userId: string;
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
  const { stream, userId } = props;
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
    <Container>
      <div>{`video ${status.video} audio ${status.audio}`}</div>
      {status.stream && status.video ? (
        <Video ref={videoRef} playsInline autoPlay>
          <track kind="captions" />
        </Video>
      ) : (
        <DefaultScreen />
      )}
    </Container>
  );
}

export default UserScreen;
