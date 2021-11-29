import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import ButtonBar from './Menu/ButtonBar';
import ChattingTab from './Menu/ChattingTab';
import MainScreen from './Screen/MainScreen';
import CamStore from './CamStore';
import UserListTab from './Menu/UserListTab';
import ToggleStore from './ToggleStore';
import { UserInfo } from '../../types/cam';
import STTStore from './STT/STTStore';
import SharedScreenStore from './SharedScreen/SharedScreenStore';
import CamNickNameInputPage from './Page/CamNickNameInputPage';
import CamNotFoundPage from './Page/CamNotFoundPage';
import CamLoadingPage from './Page/CamLoadingPage';
import CamNotAvailablePage from './Page/CamNotAvailablePage';
import CamErrorPage from './Page/CamErrorPage';
import userState from '../../atoms/user';

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

function Cam(): JSX.Element {
  const user = useRecoilValue(userState);
  const [userInfo, setUserInfo] = useState<UserInfo>({ roomId: null, nickname: user?.nickname || null });
  const [statusCode, setStatusCode] = useState(0);

  const camRef = useRef<HTMLDivElement>(null);

  const checkRoomExist = async (roomId: string) => {
    const response = await fetch(`/api/cam/${roomId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    setStatusCode(json.statusCode);
  };

  useEffect(() => {
    const roomId = new URLSearchParams(new URL(window.location.href).search).get('roomid');
    if (roomId) {
      checkRoomExist(roomId);
    }

    setUserInfo((prev) => ({ ...prev, roomId }));
  }, []);

  switch (statusCode) {
    case 0:
      return <CamLoadingPage />;
    case 403:
      return <CamNotAvailablePage />;
    case 404:
      return <CamNotFoundPage />;
    case 200:
      if (!userInfo?.nickname) {
        return <CamNickNameInputPage setUserInfo={setUserInfo} />;
      }
      return (
        <Container ref={camRef}>
          <CamStore userInfo={userInfo} setUserInfo={setUserInfo}>
            <ToggleStore>
              <STTStore>
                <SharedScreenStore>
                  <UpperTab>
                    <MainScreen />
                    <UserListTab />
                    <ChattingTab />
                  </UpperTab>
                  <ButtonBar camRef={camRef} />
                </SharedScreenStore>
              </STTStore>
            </ToggleStore>
          </CamStore>
        </Container>
      );
    default:
      return <CamErrorPage />;
  }
}

export default Cam;
