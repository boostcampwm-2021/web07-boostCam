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
};

function Cam({ userInfo }: CamProps): JSX.Element {
  const [isUserListTabActive, setUserListTabActive] = useState<boolean>(true);
  const [isChattingTabActive, setChattingTabActive] = useState<boolean>(true);
  const [isMouseOnCamPage, setMouseOnCampPage] = useState<boolean>(false);

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

  return (
    <Container className="cam" onMouseOver={handleMouseOverCamPage} onMouseLeave={handleMouseOutCamPage}>
      <CamStore>
        <UpperTab>
          <MainScreen tabActive={{ isUserListTabActive, isChattingTabActive }} isMouseOnCamPage={isMouseOnCamPage} />
          <UserListTab isUserListTabActive={isUserListTabActive} userInfo={userInfo} />
          <ChattingTab isChattingTabActive={isChattingTabActive} isMouseOnCamPage={isMouseOnCamPage} />
        </UpperTab>
        <ButtonBar
          handleTab={{ handleUserListTabActive, handleChattingTabActive }}
          isMouseOnCamPage={isMouseOnCamPage}
        />
      </CamStore>
    </Container>
  );
}

export default Cam;
