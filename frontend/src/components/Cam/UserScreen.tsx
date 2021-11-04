import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import socketState from '../../atoms/socket';

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

  const [status, setStatus] = useState<{ video: boolean; audio: boolean }>({ video: true, audio: true });

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !stream?.active) {
      return;
    }
    video.srcObject = stream;
  });

  useEffect(() => {
    socket.on('userChangeStatus', (payload) => {
      if (payload.userId === userId) {
        setStatus(payload.status);
      }
    });
  }, []);

  return (
    <Container>
      <div>{`video ${status.video} audio ${status.audio}`}</div>
      <Video ref={videoRef} playsInline autoPlay muted>
        <track kind="captions" />
      </Video>
    </Container>
  );
}

export default UserScreen;
