import { createContext, useEffect, useState } from 'react';

import { ChannelData } from '../../types/main';
import { MyServerData } from '../../types/main';

export const MainStoreContext = createContext<React.ComponentState>(null);

type MainStoreProps = {
  children: React.ReactChild[] | React.ReactChild;
};

function MainStore(props: MainStoreProps): JSX.Element {
  const { children } = props;
  const [selectedServer, setSelectedServer] = useState<MyServerData>();
  const [selectedChannel, setSelectedChannel] = useState<string>('1');
  const [serverChannelList, setServerChannelList] = useState<ChannelData[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState<boolean>(false);
  const [isCreateServerModalOpen, setIsCreateServerModalOpen] = useState<boolean>(false);
  const [isJoinServerModalOpen, setIsJoinServerModalOpen] = useState<boolean>(false);
  const [isServerInfoModalOpen, setIsServerInfoModalOpen] = useState<boolean>(false);
  const [isServerSettingModalOpen, setIsServerSettingModalOpen] = useState<boolean>(false);
  const [isQuitServerModalOpen, setIsQuitServerModalOpen] = useState<boolean>(false);
  const [serverList, setServerList] = useState<MyServerData[]>([]);

  const getServerChannelList = async (): Promise<void> => {
    const response = await fetch(`/api/user/channels/joined/${selectedServer}`);
    const list = await response.json();
    setServerChannelList(list.data);
  };

  useEffect(() => {
    if (selectedServer) getServerChannelList();
  }, [selectedServer]);

  return (
    <MainStoreContext.Provider
      value={{
        selectedServer,
        selectedChannel,
        isCreateModalOpen,
        isJoinModalOpen,
        serverChannelList,
        isCreateServerModalOpen,
        isJoinServerModalOpen,
        isServerInfoModalOpen,
        isServerSettingModalOpen,
        isQuitServerModalOpen,
        serverList,
        setSelectedServer,
        setSelectedChannel,
        setIsCreateModalOpen,
        setIsJoinModalOpen,
        setServerChannelList,
        getServerChannelList,
        setIsCreateServerModalOpen,
        setIsJoinServerModalOpen,
        setIsServerInfoModalOpen,
        setIsServerSettingModalOpen,
        setIsQuitServerModalOpen,
        setServerList,
      }}
    >
      {children}
    </MainStoreContext.Provider>
  );
}

export default MainStore;
