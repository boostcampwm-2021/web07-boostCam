import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import ButtonBar from './ButtonBar/ButtonBar';
import ChattingTab from './Chatting/ChattingTab';
import MainScreen from './Screen/MainScreen';
import CamStore from './CamStore';
import UserListTab from './UserList/UserListTab';
import ToggleStore from './ToggleStore';
import { UserInfo } from '../../types/cam';
import STTStore from './STT/STTStore';
import SharedScreenStore from './SharedScreen/SharedScreenStore';
import NickNameForm from './Nickname/NickNameForm';
import CamNotFound from './CamNotFound';

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
  const [userInfo, setUserInfo] = useState<UserInfo>({ roomId: null, nickname: null });
  const [isRoomExist, setIsRoomExist] = useState(false);

  const camRef = useRef<HTMLDivElement>(null);

  const checkRoomExist = async (roomId: string) => {
    const response = await fetch(`/api/cam/${roomId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (json.statusCode === 200) {
      setIsRoomExist(true);
    } else {
      setIsRoomExist(false);
    }
  };

  useEffect(() => {
    const roomId = new URLSearchParams(new URL(window.location.href).search).get('roomid');
    if (roomId) {
      checkRoomExist(roomId);
    }

    setUserInfo((prev) => ({ ...prev, roomId }));
  }, []);

  if (isRoomExist) {
    return (
      <Container ref={camRef}>
        {!userInfo?.nickname ? (
          <NickNameForm setUserInfo={setUserInfo} />
        ) : (
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
        )}
      </Container>
    );
  }
  return <CamNotFound />;
}

export default Cam;
