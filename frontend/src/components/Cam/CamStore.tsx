import React, { createContext } from 'react';
import { useRecoilValue } from 'recoil';

import useUserMedia from '../../hooks/useUserMedia';
import SocketState from '../../atoms/socket';
import { UserInfo } from '../../types/cam';

type CamStoreProps = {
  children: React.ReactChild[] | React.ReactChild;
  userInfo: UserInfo;
};

export const CamStoreContext = createContext<React.ComponentState>(null);

function CamStore(props: CamStoreProps): JSX.Element {
  const { children, userInfo } = props;
  const socket = useRecoilValue(SocketState);
  const currentURL = new URL(window.location.href);
  const roomId = currentURL.searchParams.get('roomid');
  const { localStatus, localStream, setLocalStatus, screenList } = useUserMedia({
    socket,
    roomId,
    userInfo,
  });

  return (
    <CamStoreContext.Provider value={{ localStream, localStatus, setLocalStatus, screenList, userInfo }}>
      {children}
    </CamStoreContext.Provider>
  );
}

export default CamStore;
