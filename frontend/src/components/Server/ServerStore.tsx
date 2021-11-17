import React, { createContext, useState, useEffect } from 'react';
import { Server, ServerInfo } from '../../types/server';

type ServerStoreProps = {
  children: React.ReactChild[] | React.ReactChild;
};

export const ServerStoreContext = createContext<React.ComponentState>(null);

function ServerStore(props: ServerStoreProps): JSX.Element {
  const { children } = props;
  const [serverList, setServerList] = useState<ServerInfo[]>([]);
  const [currentServer, setCurrentServer] = useState<Server | string>('');

  useEffect(() => {
    const setServerListByUserId = async (userId: number) => {
      const response = await window.fetch(`/api/user-servers/users/${userId}`);
      const data = await response.json();
      setServerList(data);
    };

    const userId = 1;
    setServerListByUserId(userId);
  }, []);

  return (
    <ServerStoreContext.Provider value={{ currentServer, setCurrentServer, serverList }}>
      {children}
    </ServerStoreContext.Provider>
  );
}

export default ServerStore;
