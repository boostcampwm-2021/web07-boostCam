import React, { createContext } from 'react';
import { useRecoilValue } from 'recoil';

import useUserMedia from '../../hooks/useUserMedia';
import SocketState from '../../atoms/socket';

type CamStoreProps = {
  children: React.ReactChild[];
};

export const CamStoreContext = createContext<React.ComponentState>(null);

function CamStore(props: CamStoreProps): JSX.Element {
  const { children } = props;
  const socket = useRecoilValue(SocketState);
  const { localStatus, localStream, setLocalStatus, screenList } = useUserMedia({
    socket,
    roomId: '1',
  });

  return (
    <CamStoreContext.Provider value={{ localStream, localStatus, setLocalStatus, screenList }}>
      {children}
    </CamStoreContext.Provider>
  );
}

export default CamStore;
