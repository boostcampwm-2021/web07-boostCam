import React, { useContext } from 'react';
import styled from 'styled-components';

import ServerListTab from './ServerListTab';
import MainSection from './MainSection';
import { MainStoreContext } from './MainStore';
import MainModal from './MainModal';

import MainDropdown from './MainDropdown';
import AlertModal from './AlertModal';

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

function MainPage(): JSX.Element {
  const { isModalOpen, isAlertModalOpen } = useContext(MainStoreContext);

  return (
    <Container>
      <MainDropdown />
      {isModalOpen && <MainModal />}
      {isAlertModalOpen && <AlertModal />}
      <ServerListTab />
      <MainSection />
    </Container>
  );
}

export default MainPage;
