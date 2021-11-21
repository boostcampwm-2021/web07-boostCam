import { createContext, useEffect, useState } from 'react';

import { ChannelData } from '../../types/main';

export const MainStoreContext = createContext<React.ComponentState>(null);

type MainStoreProps = {
  children: React.ReactChild[] | React.ReactChild;
};

function MainStore(props: MainStoreProps): JSX.Element {
  const { children } = props;
  const [selectedServer, setSelectedServer] = useState<string>('1');
  const [selectedChannel, setSelectedChannel] = useState<string>('1');
  const [serverChannelList, setServerChannelList] = useState<ChannelData[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState<boolean>(false);

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
        setSelectedServer,
        setSelectedChannel,
        setIsCreateModalOpen,
        setIsJoinModalOpen,
        setServerChannelList,
        getServerChannelList,
      }}
    >
      {children}
    </MainStoreContext.Provider>
  );
}

export default MainStore;
