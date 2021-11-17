import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import ServerListTab from './ServerListTab';
import MainSection from './MainSection';
import { MainStoreContext } from './MainStore';
import CreateChannelModal from './Modal/CreateChannelModal';
import JoinChannelModal from './Modal/JoinChannelModal';

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

function MainPage(): JSX.Element {
  const { isCreateModalOpen, isJoinModalOpen, setIsCreateModalOpen, setIsJoinModalOpen } = useContext(MainStoreContext);
  useEffect(() => {}, []);

  useEffect(() => {
    console.log(`isCreateModalOpen ${isCreateModalOpen}`);
  }, [isCreateModalOpen]);

  useEffect(() => {
    console.log(`isJoinModalOpen ${isJoinModalOpen}`);
  }, [isJoinModalOpen]);

  return (
    <Container>
      {isCreateModalOpen && <CreateChannelModal />}
      {isJoinModalOpen && <JoinChannelModal />}
      <ServerListTab />
      <MainSection />
    </Container>
  );
}

export default MainPage;
