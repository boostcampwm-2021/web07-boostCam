import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import DefaultScreen from './DefaultScreen';
import type { Control, Status } from '../../../types/cam';
import StreamStatusIndicator from './StreamStatusIndicator';
import ControlMenu from './ControlMenu';
import { CamStoreContext } from '../CamStore';
import { flex } from '../../../utils/styledComponentFunc';

type UserScreenProps = {
  stream: MediaStream | undefined;
  userId: string;
  numOfScreen: number;
};

const Container = styled.div<{ numOfScreen: number }>`
  position: relative;
  width: calc(100% / ${(props) => Math.ceil(props.numOfScreen ** 0.5)});
  height: calc(100% / ${(props) => Math.floor((props.numOfScreen + 1) ** 0.5)});
  ${flex('column', 'center', 'center')};
  aspect-ratio: 16/9;
  overflow: hidden;
`;

const Video = styled.video<{ isSpeaking: boolean }>`
  max-height: 100%;
  width: 90%;
  border: ${(props) => (props.isSpeaking ? '2px solid green' : 'none')};
`;

function UserScreen(props: UserScreenProps): JSX.Element {
  const { stream, userId, numOfScreen } = props;
  const { socket } = useContext(CamStoreContext);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [nickname, setNickname] = useState<string>('김철수');
  const [status, setStatus] = useState<Status>({
    video: false,
    audio: false,
    stream: false,
    speaking: false,
  });
  const [control, setControl] = useState<Control>({ video: true, audio: true });
  const [isActiveControl, setActiveControl] = useState<boolean>(false);
  const [controlPosition, setControlPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActiveControl(true);
    setControlPosition({ x: e.pageX, y: e.pageY });
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !stream?.active || video?.srcObject) {
      return;
    }
    video.srcObject = stream;
  });

  useEffect(() => {
    socket.on('userStatus', (payload: { userId: string; status: Status }) => {
      if (payload.userId === userId) {
        setStatus(payload.status);
      }
    });
    socket.on('userNickname', (payload: { userId: string; userNickname: string }) => {
      if (payload.userId === userId) {
        setNickname(payload.userNickname);
      }
    });
    socket.emit('getUserStatus', { userId });
    return () => {
      if (stream) {
        if (stream.getAudioTracks()[0]) {
          stream.getAudioTracks()[0].enabled = true;
        }
        if (stream.getVideoTracks()[0]) {
          stream.getVideoTracks()[0].enabled = true;
        }
      }
    };
  }, []);

  useEffect(() => {
    const handleClick = () => {
      if (isActiveControl) {
        setActiveControl((prev) => !prev);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isActiveControl]);

  useEffect(() => {
    if (!stream?.active) {
      return;
    }
    if (stream.getAudioTracks()[0]) {
      stream.getAudioTracks()[0].enabled = control.audio;
    }

    if (stream.getVideoTracks()[0]) {
      stream.getVideoTracks()[0].enabled = control.video;
    }
  }, [control]);

  return (
    <Container onContextMenu={handleContextMenu} numOfScreen={numOfScreen}>
      {status.stream && status.video && control.video ? (
        <Video ref={videoRef} playsInline autoPlay isSpeaking={status.speaking && status.audio}>
          <track kind="captions" />
        </Video>
      ) : (
        <DefaultScreen />
      )}
      <StreamStatusIndicator micStatus={status.audio} videoStatus={status.video} nickname={nickname} />
      {isActiveControl && <ControlMenu control={control} setControl={setControl} controlPosition={controlPosition} />}
    </Container>
  );
}

export default UserScreen;
