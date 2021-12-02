import React, { createContext, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

import useUserMedia from '../../hooks/useUserMedia';
import { UserInfo } from '../../types/cam';

type CamStoreProps = {
  children: React.ReactChild[] | React.ReactChild;
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
};

export const CamStoreContext = createContext<React.ComponentState>(null);

function CamStore(props: CamStoreProps): JSX.Element {
  const { children, userInfo, setUserInfo } = props;
  const currentURL = new URL(window.location.href);
  const roomId = currentURL.searchParams.get('roomid');

  const socketRef = useRef<Socket>();

  if (!socketRef.current) {
    const socket = io('/cam', {
      withCredentials: true,
      forceNew: true,
      transports: ['polling'],
    });

    socketRef.current = socket;
  }

  const { localStatus, localStream, setLocalStatus, screenList } = useUserMedia({
    socket: socketRef.current,
    roomId,
    userInfo,
  });

  useEffect(() => {
    const socketDisconnect = () => {
      socketRef?.current?.disconnect();
    };
    window.addEventListener('popstate', socketDisconnect);
    return () => {
      window.removeEventListener('popstate', socketDisconnect);
    };
  }, []);

  return (
    <CamStoreContext.Provider
      value={{ socket: socketRef.current, localStream, localStatus, setLocalStatus, screenList, userInfo, setUserInfo }}
    >
      {children}
    </CamStoreContext.Provider>
  );
}

export default CamStore;
