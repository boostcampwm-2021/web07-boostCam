import React, { useContext } from 'react';
import styled from 'styled-components';

import { ReactComponent as MicIcon } from '../../assets/icons/mic.svg';
import { ReactComponent as MicDisabledIcon } from '../../assets/icons/mic-disabled.svg';
import { ReactComponent as VideoIcon } from '../../assets/icons/video.svg';
import { ReactComponent as VideoDisabledIcon } from '../../assets/icons/video-disabled.svg';
import { ReactComponent as IdentificationIcon } from '../../assets/icons/identification.svg';
import { ReactComponent as ChatIcon } from '../../assets/icons/chat.svg';
import { ReactComponent as PresenstationIcon } from '../../assets/icons/presentation.svg';
import { ReactComponent as UsersIcon } from '../../assets/icons/users.svg';
import { ReactComponent as BackgroundIcon } from '../../assets/icons/background.svg';
import { ReactComponent as ExitIcon } from '../../assets/icons/exit.svg';
import { ReactComponent as STTIcon } from '../../assets/icons/speech.svg';
import { ReactComponent as STTDisabledIcon } from '../../assets/icons/speech-disabled.svg';
import { CamStoreContext } from './CamStore';
import type { Status } from '../../types/cam';
import { ToggleStoreContext } from './ToggleStore';
import { STTStoreContext } from './STT/STTStore';
import { SharedScreenStoreContext } from './SharedScreen/SharedScreenStore';

const Container = styled.div<{ isMouseOnCamPage: boolean }>`
  width: 98vw;
  height: 8vh;
  margin-top: 5px;

  display: ${(props) => (props.isMouseOnCamPage ? 'flex' : 'none')};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 10px;
  transition: all 0.5s ease;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Button = styled.div<{ color?: string }>`
  width: 9vw;
  height: 7vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: ${(props) => (props.color ? props.color : '#bbbbbb')};

  border-radius: 10px;
  font-size: 12px;
  &:hover {
    background-color: rgba(240, 240, 240, 0.2);
    transition: all 0.5s;
    cursor: pointer;
  }

  svg {
    min-width: 6vh;
    height: 6vh;
  }
`;

function ButtonBar(): JSX.Element {
  const { localStream, setLocalStatus, localStatus } = useContext(CamStoreContext);
  const { handleUserListTabActive, handleChattingTabActive, isMouseOnCamPage } = useContext(ToggleStoreContext);
  const { toggleSTTActive, isSTTActive } = useContext(STTStoreContext);

  const { handleScreenShareActive } = useContext(SharedScreenStoreContext);

  const onClickVideoToggleButton = () => {
    if (!localStatus.stream) {
      return;
    }
    localStream.getVideoTracks()[0].enabled = !localStream.getVideoTracks()[0].enabled;
    setLocalStatus((prev: Status) => ({
      ...prev,
      video: localStream.getVideoTracks()[0].enabled,
    }));
  };

  const onClickMicToggleButton = () => {
    if (!localStatus.stream) {
      return;
    }
    localStream.getAudioTracks()[0].enabled = !localStream.getAudioTracks()[0].enabled;
    setLocalStatus((prev: Status) => ({
      ...prev,
      audio: localStream.getAudioTracks()[0].enabled,
    }));
  };

  const handleExit = () => {
    window.location.href = '/';
  };

  return (
    <Container isMouseOnCamPage={isMouseOnCamPage}>
      <ButtonContainer>
        <Button onClick={onClickMicToggleButton}>
          {localStatus.audio ? <MicIcon /> : <MicDisabledIcon />}
          <span>마이크</span>
        </Button>
        <Button onClick={onClickVideoToggleButton}>
          {localStatus.video ? <VideoIcon /> : <VideoDisabledIcon />}
          <span>비디오</span>
        </Button>
      </ButtonContainer>
      <ButtonContainer>
        <Button>
          <IdentificationIcon />
          <span>닉네임</span>
        </Button>
        <Button>
          <BackgroundIcon />
          <span>가상 배경</span>
        </Button>
        <Button color="#00ff2e" onClick={handleScreenShareActive}>
          <PresenstationIcon />
          <span>화면 공유</span>
        </Button>
        <Button onClick={handleUserListTabActive}>
          <UsersIcon />
          <span>사용자 목록</span>
        </Button>
        <Button onClick={handleChattingTabActive}>
          <ChatIcon />
          <span>채팅</span>
        </Button>
        <Button onClick={toggleSTTActive}>
          {isSTTActive ? <STTIcon /> : <STTDisabledIcon />}
          <span>STT</span>
        </Button>
      </ButtonContainer>
      <ButtonContainer>
        <Button color="red">
          <ExitIcon onClick={handleExit} />
          <span>나가기</span>
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export default ButtonBar;
