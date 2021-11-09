import React, { useState } from 'react';
import styled from 'styled-components';

import ButtonBar from './ButtonBar';
import ChattingTab from './ChattingTab';
import MainScreen from './MainScreen';
import CamStore from './CamStore';
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

  position: relative;
`;

type UserInfo = {
  roomId: number | null;
  nickname: string | null;
};

type CamProps = {
  userInfo: UserInfo | null;
};

function Cam({ userInfo }: CamProps): JSX.Element {
  const [isUserListTabActive, setUserListTabActive] = useState<boolean>(true);
  const [isChattingTabActive, setChattingTabActive] = useState<boolean>(true);

  const handleUserListTabActive = (): void => {
    setUserListTabActive(!isUserListTabActive);
  };

  const handleChattingTabActive = (): void => {
    setChattingTabActive(!isChattingTabActive);
  };

  return (
    <Container>
      <CamStore>
        <UpperTab>
          <MainScreen tabActive={{ isUserListTabActive, isChattingTabActive }} />
          <UserListTab isUserListTabActive={isUserListTabActive} userInfo={userInfo} />
          <ChattingTab isChattingTabActive={isChattingTabActive} />
        </UpperTab>
        <ButtonBar handleTab={{ handleUserListTabActive, handleChattingTabActive }} />
      </CamStore>
    </Container>
  );
}

export default Cam;
