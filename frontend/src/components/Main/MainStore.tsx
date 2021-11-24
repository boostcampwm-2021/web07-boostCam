import React, { createContext, useEffect, useState } from 'react';
import { CamData, ChannelData, MyServerData } from '../../types/main';

export const MainStoreContext = createContext<React.ComponentState>(null);

type MainStoreProps = {
  children: React.ReactChild[] | React.ReactChild;
};

function MainStore(props: MainStoreProps): JSX.Element {
  const { children } = props;
  const [selectedServer, setSelectedServer] = useState<MyServerData>();
  const [selectedChannel, setSelectedChannel] = useState<string>('');
  const [rightClickedChannelId, setRightClickedChannelId] = useState<string>('');
  const [rightClickedChannelName, setRightClickedChannelName] = useState<string>('');
  const [serverChannelList, setServerChannelList] = useState<ChannelData[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContents, setModalContents] = useState<JSX.Element>(<></>);

  const [serverList, setServerList] = useState<MyServerData[]>([]);

  const [serverCamList, setServerCamList] = useState<CamData[]>([]);

  const getServerChannelList = async (): Promise<void> => {
    const response = await fetch(`/api/user/servers/${selectedServer?.server.id}/channels/joined/`);
    const list = await response.json();
    const channelList = list.data;
    if (channelList.length) {
      setSelectedChannel(channelList[0].id);
    } else {
      setSelectedChannel('');
    }
    setServerChannelList(channelList);
  };

  const getUserServerList = async (calledStatus: string | undefined): Promise<void> => {
    const response = await fetch(`/api/user/servers`);
    const list = await response.json();

    if (response.status === 200 && list.data.length !== 0) {
      setServerList(list.data);
      if (calledStatus === 'updated') {
        const updatedServerId = selectedServer?.server.id;
        setSelectedServer(list.data.filter((userServer: MyServerData) => userServer.server.id === updatedServerId)[0]);
      } else {
        const selectedServerIndex = calledStatus === 'created' ? list.data.length - 1 : 0;
        setSelectedServer(list.data[selectedServerIndex]);
      }
    }
  };

  const getServerCamList = async (): Promise<void> => {
    const response = await fetch(`/api/servers/${selectedServer?.server.id}/cams`);
    const list = await response.json();
    const camList = list.data;

    if (response.status === 200) {
      setServerCamList(camList);
    }
  };

  useEffect(() => {
    if (selectedServer) {
      getServerChannelList();
      getServerCamList();
    }
  }, [selectedServer]);

  return (
    <MainStoreContext.Provider
      value={{
        isModalOpen,
        modalContents,
        selectedServer,
        selectedChannel,
        rightClickedChannelId,
        rightClickedChannelName,
        serverChannelList,
        serverList,
        serverCamList,
        setIsModalOpen,
        setModalContents,
        setSelectedServer,
        setSelectedChannel,
        setRightClickedChannelId,
        setRightClickedChannelName,
        setServerChannelList,
        getServerChannelList,
        setServerList,
        getUserServerList,
      }}
    >
      {children}
    </MainStoreContext.Provider>
  );
}

export default MainStore;
