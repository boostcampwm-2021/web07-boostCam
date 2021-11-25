import React, { useContext } from 'react';
import styled from 'styled-components';

import ServerListTab from './ServerListTab';
import MainSection from './MainSection';
import { MainStoreContext } from './MainStore';
import MainModal from './MainModal';

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

function MainPage(): JSX.Element {
  const { isModalOpen } = useContext(MainStoreContext);

  return (
    <Container>
      {isModalOpen && <MainModal />}
      <ServerListTab />
      <MainSection />
    </Container>
  );
}

export default MainPage;
