import { createContext, useState } from 'react';
import { MyServerData } from '../../types/main';

export const MainStoreContext = createContext<React.ComponentState>(null);

type MainStoreProps = {
  children: React.ReactChild[] | React.ReactChild;
};

function MainStore(props: MainStoreProps): JSX.Element {
  const { children } = props;
  const [selectedServer, setSelectedServer] = useState<MyServerData>();
  const [selectedChannel, setSelectedChannel] = useState<string>('1');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState<boolean>(false);
  const [isCreateServerModalOpen, setIsCreateServerModalOpen] = useState<boolean>(false);
  const [isJoinServerModalOpen, setIsJoinServerModalOpen] = useState<boolean>(false);

  return (
    <MainStoreContext.Provider
      value={{
        selectedServer,
        selectedChannel,
        isCreateModalOpen,
        isJoinModalOpen,
        isCreateServerModalOpen,
        isJoinServerModalOpen,
        setSelectedServer,
        setSelectedChannel,
        setIsCreateModalOpen,
        setIsJoinModalOpen,
        setIsCreateServerModalOpen,
        setIsJoinServerModalOpen,
      }}
    >
      {children}
    </MainStoreContext.Provider>
  );
}

export default MainStore;
