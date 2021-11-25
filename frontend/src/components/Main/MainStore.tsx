import { createContext, useEffect, useState } from 'react';
import { CamData, ChannelData, MyServerData } from '../../types/main';

export const MainStoreContext = createContext<React.ComponentState>(null);

type MainStoreProps = {
  children: React.ReactChild[] | React.ReactChild;
};

function MainStore(props: MainStoreProps): JSX.Element {
  const { children } = props;
  const [selectedServer, setSelectedServer] = useState<MyServerData>();
  const [selectedChannel, setSelectedChannel] = useState<string>('-1');
  const [rightClickedChannelId, setRightClickedChannelId] = useState<string>('');
  const [rightClickedChannelName, setRightClickedChannelName] = useState<string>('');
  const [serverChannelList, setServerChannelList] = useState<ChannelData[]>([]);

  const [isCreateChannelModalOpen, setIsCreateChannelModalOpen] = useState<boolean>(false);
  const [isJoinChannelModalOpen, setIsJoinChannelModalOpen] = useState<boolean>(false);
  const [isUpdateChannelModalOpen, setIsUpdateChannelModalOpen] = useState<boolean>(false);
  const [isQuitChannelModalOpen, setIsQuitChannelModalOpen] = useState<boolean>(false);

  const [isCreateServerModalOpen, setIsCreateServerModalOpen] = useState<boolean>(false);
  const [isJoinServerModalOpen, setIsJoinServerModalOpen] = useState<boolean>(false);
  const [isServerInfoModalOpen, setIsServerInfoModalOpen] = useState<boolean>(false);
  const [isServerSettingModalOpen, setIsServerSettingModalOpen] = useState<boolean>(false);
  const [isQuitServerModalOpen, setIsQuitServerModalOpen] = useState<boolean>(false);

  const [serverList, setServerList] = useState<MyServerData[]>([]);

  const [isCreateCamModalOpen, setIsCreateCamModalOpen] = useState<boolean>(false);
  const [serverCamList, setServerCamList] = useState<CamData[]>([]);

  const getServerChannelList = async (): Promise<void> => {
    const response = await fetch(`/api/user/servers/${selectedServer?.server.id}/channels/joined/`);
    const list = await response.json();
    const channelList = list.data;
    if (channelList.length) {
      setSelectedChannel(channelList[0].id);
    } else {
      setSelectedChannel('-1');
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

  const getMessageList = async (): Promise<void> => {
    const response = await fetch(`/api/messages?channelId=${selectedChannel}`);
    const list = await response.json();
    const messageList = list.data;
    // eslint-disable-next-line no-console
    console.log(messageList);
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
    if (selectedChannel) {
      getMessageList();
    }
  }, [selectedChannel]);

  return (
    <MainStoreContext.Provider
      value={{
        selectedServer,
        selectedChannel,
        rightClickedChannelId,
        rightClickedChannelName,
        isCreateChannelModalOpen,
        isJoinChannelModalOpen,
        isUpdateChannelModalOpen,
        isQuitChannelModalOpen,
        serverChannelList,
        isCreateServerModalOpen,
        isJoinServerModalOpen,
        isServerInfoModalOpen,
        isServerSettingModalOpen,
        isQuitServerModalOpen,
        isCreateCamModalOpen,
        serverList,
        serverCamList,
        setSelectedServer,
        setSelectedChannel,
        setRightClickedChannelId,
        setRightClickedChannelName,
        setIsCreateChannelModalOpen,
        setIsJoinChannelModalOpen,
        setIsUpdateChannelModalOpen,
        setIsQuitChannelModalOpen,
        setServerChannelList,
        getServerChannelList,
        setIsCreateServerModalOpen,
        setIsJoinServerModalOpen,
        setIsServerInfoModalOpen,
        setIsServerSettingModalOpen,
        setIsQuitServerModalOpen,
        setIsCreateCamModalOpen,
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
