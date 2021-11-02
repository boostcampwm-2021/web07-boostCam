import React, { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components';
import ButtonBar from './ButtonBar';

import ChattingTab from './ChattingTab';
import MainScreen from './MainScreen';
import Screen from './Screen';
import UserListTab from './UserListTab';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-x: hidden;
`;

const UpperTab = styled.div`
  margin-top: 5px;
  width: 98vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

type CamProps = {
  socket: Socket;
};

function Cam(props: CamProps): JSX.Element {
  const [isUserListTabActive, setUserListTabActive] = useState<boolean>(true);
  const [isChattingTabActive, setChattingTabActive] = useState<boolean>(true);
  const { socket } = props;

  const handleUserListTabActive = (): void => {
    setUserListTabActive(!isUserListTabActive);
  };

  const handleChattingTabActive = (): void => {
    setChattingTabActive(!isChattingTabActive);
  };

  return (
    <Container>
      {/* <Screen /> */}
      <UpperTab>
        <MainScreen tabActive={{ isUserListTabActive, isChattingTabActive }} />
        <UserListTab isUserListTabActive={isUserListTabActive} />
        <ChattingTab socket={socket} isChattingTabActive={isChattingTabActive} />
      </UpperTab>
      <ButtonBar handleTab={{ handleUserListTabActive, handleChattingTabActive }} />
    </Container>
  );
}

export default Cam;
