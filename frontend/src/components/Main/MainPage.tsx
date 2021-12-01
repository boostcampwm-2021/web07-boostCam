import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import ServerListTab from './ServerListTab';
import MainSection from './MainSection';
import { MainStoreContext } from './MainStore';
import MainModal from './MainModal';

import MainDropdown from './MainDropdown';
import AlertModal from './AlertModal';
import Loading from '../core/Loading';

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

function MainPage(): JSX.Element {
  const { isModalOpen, isAlertModalOpen, getUserServerList } = useContext(MainStoreContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setUserServerList = async () => {
    await getUserServerList();
    setIsLoading(false);
  };

  useEffect(() => {
    setUserServerList();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

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
