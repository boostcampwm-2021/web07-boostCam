import React, { RefObject, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { ButtonBarIcons } from '../../../utils/SvgIcons';
import { CamStoreContext } from '../CamStore';
import type { Status } from '../../../types/cam';
import { ToggleStoreContext } from '../ToggleStore';
import { STTStoreContext } from '../STT/STTStore';
import { SharedScreenStoreContext } from '../SharedScreen/SharedScreenStore';
import NicknameModal from '../Nickname/NicknameModal';

const {
  MicIcon,
  MicDisabledIcon,
  VideoIcon,
  VideoDisabledIcon,
  IdentificationIcon,
  ChatIcon,
  PresenstationIcon,
  ExitIcon,
  STTIcon,
  STTDisabledIcon,
} = ButtonBarIcons;

const Container = styled.div<{ isMouseOnCamPage: boolean }>`
  width: 98vw;
  height: 8vh;
  margin-top: 5px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 10px;
  transition: bottom 0.5s ease;
  position: absolute;
  bottom: ${(props) => (props.isMouseOnCamPage ? '0' : '-8vh')};
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

type ButtonBarProps = {
  camRef: RefObject<HTMLDivElement> | null;
};

function ButtonBar(props: ButtonBarProps): JSX.Element {
  const { camRef } = props;

  const [isMouseOnCamPage, setMouseOnCamPage] = useState<boolean>(true);
  const [isActiveNicknameModal, setIsActiveNicknameModal] = useState<boolean>(false);
  const { localStream, setLocalStatus, localStatus, setUserInfo } = useContext(CamStoreContext);
  const { handleChattingTabActive } = useContext(ToggleStoreContext);
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

  const onClickNicknameChangeButton = () => {
    setIsActiveNicknameModal(true);
  };

  const handleExit = () => {
    window.location.href = '/';
  };

  const handleMouseOverCamPage = (): void => {
    setMouseOnCamPage(true);
  };

  const handleMouseLeaveCamPage = (): void => {
    setMouseOnCamPage(false);
  };

  useEffect(() => {
    if (camRef?.current) {
      camRef.current.onmouseover = handleMouseOverCamPage;
      camRef.current.onmouseleave = handleMouseLeaveCamPage;
    }
  }, []);

  return (
    <>
      {isActiveNicknameModal && (
        <NicknameModal setUserInfo={setUserInfo} setIsActiveNicknameModal={setIsActiveNicknameModal} />
      )}
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
          <Button onClick={onClickNicknameChangeButton}>
            <IdentificationIcon />
            <span>닉네임</span>
          </Button>
          <Button color="#00ff2e" onClick={handleScreenShareActive}>
            <PresenstationIcon />
            <span>화면 공유</span>
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
          <Button color="red" onClick={handleExit}>
            <ExitIcon />
            <span>나가기</span>
          </Button>
        </ButtonContainer>
      </Container>
    </>
  );
}

export default ButtonBar;
