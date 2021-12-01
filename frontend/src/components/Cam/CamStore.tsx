import React, { createContext } from 'react';
import { io } from 'socket.io-client';

import useUserMedia from '../../hooks/useUserMedia';
import { UserInfo } from '../../types/cam';

type CamStoreProps = {
  children: React.ReactChild[] | React.ReactChild;
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
};

const socket = io({
  withCredentials: true,
});

export const CamStoreContext = createContext<React.ComponentState>(null);

function CamStore(props: CamStoreProps): JSX.Element {
  const { children, userInfo, setUserInfo } = props;
  const currentURL = new URL(window.location.href);
  const roomId = currentURL.searchParams.get('roomid');
  const { localStatus, localStream, setLocalStatus, screenList } = useUserMedia({
    socket,
    roomId,
    userInfo,
  });

  return (
    <CamStoreContext.Provider
      value={{ socket, localStream, localStatus, setLocalStatus, screenList, userInfo, setUserInfo }}
    >
      {children}
    </CamStoreContext.Provider>
  );
}

export default CamStore;
