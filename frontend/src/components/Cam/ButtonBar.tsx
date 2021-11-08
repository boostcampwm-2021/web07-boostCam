import React, { useContext } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { ReactComponent as MicIcon } from '../../assets/icons/mic.svg';
import { ReactComponent as VideoIcon } from '../../assets/icons/video.svg';
import { ReactComponent as IdentificationIcon } from '../../assets/icons/identification.svg';
import { ReactComponent as ChatIcon } from '../../assets/icons/chat.svg';
import { ReactComponent as PresenstationIcon } from '../../assets/icons/presentation.svg';
import { ReactComponent as UsersIcon } from '../../assets/icons/users.svg';
import { ReactComponent as BackgroundIcon } from '../../assets/icons/background.svg';
import { ReactComponent as ExitIcon } from '../../assets/icons/exit.svg';
import { CamStoreContext } from './CamStore';
import socketState from '../../atoms/socket';

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
  min-width: 9vw;
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
  handleTab: {
    handleUserListTabActive: () => void;
    handleChattingTabActive: () => void;
  };
  isMouseOnCamPage: boolean;
};

function ButtonBar(props: ButtonBarProps): JSX.Element {
  const { handleTab, isMouseOnCamPage } = props;
  const { handleUserListTabActive, handleChattingTabActive } = handleTab;
  const { localStream, setLocalStatus } = useContext(CamStoreContext);
  const socket = useRecoilValue(socketState);

  const onClickVideoToggleButton = () => {
    localStream.getVideoTracks()[0].enabled = !localStream.getVideoTracks()[0].enabled;
    setLocalStatus((prev: { video: boolean; audio: boolean }) => ({
      audio: prev.audio,
      video: localStream.getVideoTracks()[0].enabled,
    }));
    socket.emit('userToggleVideo');
  };

  const onClickMicToggleButton = () => {
    localStream.getAudioTracks()[0].enabled = !localStream.getAudioTracks()[0].enabled;
    setLocalStatus((prev: { video: boolean; audio: boolean }) => ({
      video: prev.video,
      audio: localStream.getAudioTracks()[0].enabled,
    }));
    socket.emit('userToggleAudio');
  };

  return (
    <Container isMouseOnCamPage={isMouseOnCamPage}>
      <ButtonContainer>
        <Button onClick={onClickMicToggleButton}>
          <MicIcon />
          <span>마이크</span>
        </Button>
        <Button onClick={onClickVideoToggleButton}>
          <VideoIcon />
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
        <Button color="#00ff2e">
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
      </ButtonContainer>
      <ButtonContainer>
        <Button color="red">
          <ExitIcon />
          <span>나가기</span>
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export default ButtonBar;
