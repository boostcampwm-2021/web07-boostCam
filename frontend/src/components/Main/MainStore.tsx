import { createContext, useState } from 'react';

export const MainStoreContext = createContext<React.ComponentState>(null);

type MainStoreProps = {
  children: React.ReactChild[] | React.ReactChild;
};

function MainStore(props: MainStoreProps): JSX.Element {
  const { children } = props;
  const [selectedServer, setSelectedServer] = useState<string>('1');
  const [selectedChannel, setSelectedChannel] = useState<string>('1');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState<boolean>(false);

  return (
    <MainStoreContext.Provider
      value={{
        selectedServer,
        selectedChannel,
        isCreateModalOpen,
        isJoinModalOpen,
        setSelectedServer,
        setSelectedChannel,
        setIsCreateModalOpen,
        setIsJoinModalOpen,
      }}
    >
      {children}
    </MainStoreContext.Provider>
  );
}

export default MainStore;
