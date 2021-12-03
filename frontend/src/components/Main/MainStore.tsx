import React, { createContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { CamData, ChannelListData, MyServerData } from '../../types/main';
import { MessageData } from '../../types/message';
import { fetchData } from '../../utils/fetchMethods';

export const MainStoreContext = createContext<React.ComponentState>(null);

type MainStoreProps = {
  children: React.ReactChild[] | React.ReactChild;
};

function MainStore(props: MainStoreProps): JSX.Element {
  const { children } = props;
  const [selectedServer, setSelectedServer] = useState<MyServerData>();
  const [selectedChannel, setSelectedChannel] = useState<number>(0);
  const [selectedMessageData, setSelectedMessageData] = useState<MessageData>();
  const [rightClickedChannelId, setRightClickedChannelId] = useState<string>('');
  const [rightClickedChannelName, setRightClickedChannelName] = useState<string>('');
  const [serverChannelList, setServerChannelList] = useState<ChannelListData[]>([]);

  const [serverList, setServerList] = useState<MyServerData[]>([]);

  const [serverCamList, setServerCamList] = useState<CamData[]>([]);

  const socketRef = useRef<Socket>();

  if (!socketRef.current) {
    const socket = io({
      withCredentials: true,
      forceNew: true,
      transports: ['polling'],
    });

    socket.on('connect', () => {
      socket.emit('joinChannels');
    });

    socketRef.current = socket;
  }

  const getServerChannelList = async (): Promise<void> => {
    const { data } = await fetchData<null, ChannelListData[]>(
      'GET',
      `/api/user/servers/${selectedServer?.server.id}/channels/joined/`,
    );
    const channelList = data;
    if (channelList.length) {
      setSelectedChannel(channelList[0].id);
    } else {
      setSelectedChannel(0);
    }
    setServerChannelList(channelList);
  };

  const getUserServerList = async (calledStatus: string | undefined): Promise<void> => {
    const { statusCode, data } = await fetchData<null, MyServerData[]>('GET', `/api/user/servers`);

    if (statusCode === 200) {
      setServerList(data);
      if (calledStatus === 'updated') {
        const updatedServerId = selectedServer?.server.id;
        setSelectedServer(data.filter((userServer: MyServerData) => userServer.server.id === updatedServerId)[0]);
      } else if (calledStatus === 'created') {
        const selectedServerIndex = data.length - 1;
        setSelectedServer(data[selectedServerIndex]);
      } else if (calledStatus === 'deleted') {
        if (!serverList.length) setSelectedServer(undefined);
        else setSelectedServer(data[0]);
      } else {
        setSelectedServer(data[0]);
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

  return (
    <MainStoreContext.Provider
      value={{
        socket: socketRef.current,
        selectedServer,
        selectedChannel,
        selectedMessageData,
        rightClickedChannelId,
        rightClickedChannelName,
        serverChannelList,
        serverList,
        serverCamList,
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
      }}
    >
      {children}
    </MainStoreContext.Provider>
  );
}

export default MainStore;
