import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import ServerListTab from './ServerListTab';
import MainSection from './MainSection';
import { MainStoreContext } from './MainStore';
import CreateChannelModal from './Modal/CreateChannelModal';
import JoinChannelModal from './Modal/JoinChannelModal';
import CreateServerModal from './ServerModal/CreateServerModal';
import JoinServerModal from './ServerModal/JoinServerModal';

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

function MainPage(): JSX.Element {
  const { isCreateModalOpen, isJoinModalOpen, isCreateServerModalOpen, isJoinServerModalOpen } =
    useContext(MainStoreContext);
  useEffect(() => {}, []);

  return (
    <Container>
      {isCreateModalOpen && <CreateChannelModal />}
      {isJoinModalOpen && <JoinChannelModal />}
      {isCreateServerModalOpen && <CreateServerModal />}
      {isJoinServerModalOpen && <JoinServerModal />}
      <ServerListTab />
      <MainSection />
    </Container>
  );
}

export default MainPage;
