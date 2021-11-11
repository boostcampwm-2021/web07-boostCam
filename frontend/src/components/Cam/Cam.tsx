import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useRecoilValue } from 'recoil';
import ButtonBar from './ButtonBar';
import ChattingTab from './ChattingTab';
import MainScreen from './MainScreen';
import CamStore from './CamStore';
import UserListTab from './UserListTab';

import socketState from '../../atoms/socket';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-x: hidden;
  overflow-y: hidden;
  background-color: black;
`;

const UpperTab = styled.div`
  margin-top: 5px;
  width: 98vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

type UserInfo = {
  roomId: string | null;
  nickname: string | null;
};

type CamProps = {
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
};

function Cam(props: CamProps): JSX.Element {
  const { userInfo, setUserInfo } = props;
  const [isUserListTabActive, setUserListTabActive] = useState<boolean>(true);
  const [isChattingTabActive, setChattingTabActive] = useState<boolean>(true);
  const [isScreenShareActive, setScreenShareActive] = useState<boolean>(false);
  const [isMouseOnCamPage, setMouseOnCampPage] = useState<boolean>(false);
  const socket = useRecoilValue(socketState);

  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);

  const handleUserListTabActive = (): void => {
    setUserListTabActive(!isUserListTabActive);
  };

  const handleChattingTabActive = (): void => {
    setChattingTabActive(!isChattingTabActive);
  };

  const handleMouseOverCamPage = (): void => {
    setMouseOnCampPage(true);
  };

  const handleMouseOutCamPage = (e: React.MouseEvent<HTMLDivElement> & { target: HTMLDivElement }): void => {
    if (!e.target.classList.contains('.cam')) {
      setMouseOnCampPage(false);
    }
  };

  const onSubmitNicknameForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { currentTarget } = e;
    const formData: FormData = new FormData(currentTarget);
    const receivedData: UserInfo = { nickname: null, roomId: null };
    formData.forEach((val, key) => {
      if (key === 'nickname') receivedData.nickname = val.toString().trim();
    });
    setUserInfo(receivedData);
  };

  const tryShareScreen = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia();
      stream.getVideoTracks()[0].addEventListener('ended', () => {
        setScreenStream(null);
        setScreenShareActive(false);
      });
      setScreenStream(stream);
      setScreenShareActive(true);
    } catch (error) {
      // do nothing
    }
  };
  const handleScreenShareActive = (): void => {
    if (!isScreenShareActive) {
      tryShareScreen();
    }
    if (isScreenShareActive) {
      setScreenStream(null);
      setScreenShareActive(false);
    }
  };

  useEffect(() => {
    return () => {
      socket.emit('exitRoom');
    };
  }, []);

  return (
    <Container className="cam" onMouseOver={handleMouseOverCamPage} onMouseLeave={handleMouseOutCamPage}>
      {!userInfo?.nickname ? (
        <div>
          <form onSubmit={onSubmitNicknameForm}>
            <input name="nickname" placeholder="닉네임을 입력해주세요" required />
            <button type="submit">입력</button>
          </form>
        </div>
      ) : (
        <CamStore>
          <UpperTab>
            <MainScreen
              tabActive={{ isUserListTabActive, isChattingTabActive, isScreenShareActive }}
              screenStream={screenStream}
              isMouseOnCamPage={isMouseOnCamPage}
            />
            <UserListTab isUserListTabActive={isUserListTabActive} userInfo={userInfo} />
            <ChattingTab isChattingTabActive={isChattingTabActive} isMouseOnCamPage={isMouseOnCamPage} />
          </UpperTab>
          <ButtonBar
            handleTab={{ handleUserListTabActive, handleChattingTabActive, handleScreenShareActive }}
            isMouseOnCamPage={isMouseOnCamPage}
          />
        </CamStore>
      )}
    </Container>
  );
}

export default Cam;
