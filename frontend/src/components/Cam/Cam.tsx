import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import ButtonBar from './ButtonBar/ButtonBar';
import ChattingTab from './Chatting/ChattingTab';
import MainScreen from './Screen/MainScreen';
import CamStore from './CamStore';
import UserListTab from './UserList/UserListTab';
import ToggleStore from './ToggleStore';
import { UserInfo } from '../../types/cam';
import socketState from '../../atoms/socket';
import STTStore from './STT/STTStore';
import SharedScreenStore from './SharedScreen/SharedScreenStore';
import NickNameForm from './Nickname/NickNameForm';

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

  const socket = useRecoilValue(socketState);
  const camRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const roomId = new URLSearchParams(new URL(window.location.href).search).get('roomid');
    setUserInfo((prev) => ({ ...prev, roomId }));
    return () => {
      socket.emit('exitRoom');
      socket.emit('changeRoomList');
    };
  }, []);

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

export default Cam;
