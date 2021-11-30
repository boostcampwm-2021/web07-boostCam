import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { DropdownInfo } from '../../types/dropdown';
import { CamData, ChannelData, MyServerData } from '../../types/main';
import { MessageData } from '../../types/message';

export const MainStoreContext = createContext<React.ComponentState>(null);

type MainStoreProps = {
  children: React.ReactChild[] | React.ReactChild;
};

const socket = io({
  withCredentials: true,
  autoConnect: false,
});

socket.on('connect', () => {
  socket.emit('joinChannels');
});

function MainStore(props: MainStoreProps): JSX.Element {
  const { children } = props;
  const [selectedServer, setSelectedServer] = useState<MyServerData>();
  const [selectedChannel, setSelectedChannel] = useState<string>('');
  const [selectedMessageData, setSelectedMessageData] = useState<MessageData>();
  const [rightClickedChannelId, setRightClickedChannelId] = useState<string>('');
  const [rightClickedChannelName, setRightClickedChannelName] = useState<string>('');
  const [serverChannelList, setServerChannelList] = useState<ChannelData[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContents, setModalContents] = useState<JSX.Element>(<></>);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownInfo, setDropdownInfo] = useState<DropdownInfo>({ position: [0, 0], components: [] });

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

    if (response.status === 200) {
      setServerList(list.data);
      if (calledStatus === 'updated') {
        const updatedServerId = selectedServer?.server.id;
        setSelectedServer(list.data.filter((userServer: MyServerData) => userServer.server.id === updatedServerId)[0]);
      } else if (calledStatus === 'created') {
        const selectedServerIndex = list.data.length - 1;
        setSelectedServer(list.data[selectedServerIndex]);
      } else if (calledStatus === 'deleted') {
        if (!serverList.length) setSelectedServer(undefined);
        else setSelectedServer(list.data[0]);
      } else {
        setSelectedServer(list.data[0]);
      }
    }
  };

  const getServerCamList = async (): Promise<void> => {
    const response = await fetch(`/api/servers/${selectedServer?.server.id}/cam`);
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

  useEffect(() => {
    socket.connect();
  }, []);

  return (
    <MainStoreContext.Provider
      value={{
        socket,
        isModalOpen,
        modalContents,
        selectedServer,
        selectedChannel,
        selectedMessageData,
        rightClickedChannelId,
        rightClickedChannelName,
        serverChannelList,
        serverList,
        serverCamList,
        setIsModalOpen,
        setModalContents,
        setSelectedServer,
        setSelectedChannel,
        setSelectedMessageData,
        setRightClickedChannelId,
        setRightClickedChannelName,
        setServerChannelList,
        getServerChannelList,
        setServerList,
        getUserServerList,
        getServerCamList,
        isDropdownOpen,
        setIsDropdownOpen,
        dropdownInfo,
        setDropdownInfo,
      }}
    >
      {children}
    </MainStoreContext.Provider>
  );
}

export default MainStore;
