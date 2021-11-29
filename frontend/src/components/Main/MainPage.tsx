import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import ServerListTab from './ServerListTab';
import MainSection from './MainSection';
import { MainStoreContext } from './MainStore';
import MainModal from './MainModal';

import MainDropdown from './MainDropdown';
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
  const { isModalOpen, getUserServerList } = useContext(MainStoreContext);
  const [loading, setLoading] = useState<boolean>(true);

  const setUserServerList = async () => {
    await getUserServerList();
    setLoading(false);
  };

  useEffect(() => {
    setUserServerList();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <MainDropdown />
      {isModalOpen && <MainModal />}
      <ServerListTab />
      <MainSection />
    </Container>
  );
}

export default MainPage;
