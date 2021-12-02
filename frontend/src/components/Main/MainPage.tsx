import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import ServerListTab from './Server/List/ServerListTab';
import MainSection from './MainSection';
import MainModal from '../core/MainModal';

import MainDropdown from '../core/MainDropdown';
import AlertModal from './AlertModal';
import Loading from '../core/Loading';
import { MainStoreContext } from './MainStore';
import { flex } from '../../utils/styledComponentFunc';
import { ToggleStoreContext } from './ToggleStore';

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  ${flex('row', 'flex-start', 'center')}
`;

function MainPage(): JSX.Element {
  const { getUserServerList } = useContext(MainStoreContext);
  const { isModalOpen, isAlertModalOpen } = useContext(ToggleStoreContext);
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
