import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import ServerListTab from './ServerListTab';
import MainSection from './MainSection';
import { MainStoreContext } from './MainStore';
import CreateChannelModal from './ChannelModal/CreateChannelModal';
import JoinChannelModal from './ChannelModal/JoinChannelModal';
import CreateServerModal from './ServerModal/CreateServerModal';
import JoinServerModal from './ServerModal/JoinServerModal';
import ServerSettingModal from './ServerModal/ServerSettingModal';
import ServerInfoModal from './ServerModal/ServerInfoModal';
import QuitServerModal from './ServerModal/QuitServerModal';
import UpdateChannelModal from './ChannelModal/UpdateChannelModal';
import QuitChannelModal from './ChannelModal/QuitChannelModal ';

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

function MainPage(): JSX.Element {
  const {
    isCreateChannelModalOpen,
    isJoinChannelModalOpen,
    isUpdateChannelModalOpen,
    isQuitChannelModalOpen,
    isCreateServerModalOpen,
    isJoinServerModalOpen,
    isServerInfoModalOpen,
    isServerSettingModalOpen,
    isQuitServerModalOpen,
  } = useContext(MainStoreContext);
  useEffect(() => {}, []);

  return (
    <Container>
      {isCreateChannelModalOpen && <CreateChannelModal />}
      {isJoinChannelModalOpen && <JoinChannelModal />}
      {isUpdateChannelModalOpen && <UpdateChannelModal />}
      {isQuitChannelModalOpen && <QuitChannelModal />}
      {isCreateServerModalOpen && <CreateServerModal />}
      {isJoinServerModalOpen && <JoinServerModal />}
      {isServerSettingModalOpen && <ServerSettingModal />}
      {isServerInfoModalOpen && <ServerInfoModal />}
      {isQuitServerModalOpen && <QuitServerModal />}
      <ServerListTab />
      <MainSection />
    </Container>
  );
}

export default MainPage;
