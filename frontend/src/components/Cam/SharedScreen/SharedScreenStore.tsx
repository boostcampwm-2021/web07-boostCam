import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

import SharedScreenReceiver from '../../../utils/sharedScreenReceiver';
import SharedScreenSender from '../../../utils/sharedScreenSender';
import { ToggleStoreContext } from '../ToggleStore';
import { CamStoreContext } from '../CamStore';

type SharedScreenStoreProps = {
  children: React.ReactChild[] | React.ReactChild;
};

export const SharedScreenStoreContext = createContext<React.ComponentState>(null);

function SharedScreenStore(props: SharedScreenStoreProps): JSX.Element {
  const { children } = props;
  const { socket } = useContext(CamStoreContext);

  const [sharedScreen, setSharedScreen] = useState<MediaStream | null>(null);
  const [sharedFromMe, setSharedFromMe] = useState(false);

  const sharedScreenReceiverRef = useRef<SharedScreenReceiver>();
  const sharedScreenSenderRef = useRef<SharedScreenSender>();

  const { setUserListTabActive } = useContext(ToggleStoreContext);

  const currentURL = new URL(window.location.href);
  const roomId = currentURL.searchParams.get('roomid');

  useEffect(() => {
    if (!roomId) {
      return undefined;
    }

    sharedScreenReceiverRef.current = new SharedScreenReceiver(socket, roomId, setSharedScreen);
    return () => sharedScreenReceiverRef.current?.close();
  }, []);

  const tryShareScreen = async () => {
    if (!roomId) {
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      stream.getVideoTracks()[0].addEventListener('ended', () => {
        setSharedScreen(null);
        sharedScreenSenderRef.current?.stopSharingScreen();
      });
      setSharedScreen(stream);
      setSharedFromMe(true);
      sharedScreenSenderRef.current = new SharedScreenSender(socket, roomId);
      sharedScreenSenderRef.current.prepareScreenShare(stream);
    } catch (error) {
      // do nothing
    }
  };

  const handleScreenShareActive = (): void => {
    if (!sharedScreen) {
      tryShareScreen();
    }

    if (sharedScreen && sharedFromMe) {
      setSharedScreen(null);
      setSharedFromMe(false);
      sharedScreenSenderRef.current?.stopSharingScreen();
      sharedScreenSenderRef.current = undefined;
    }
  };

  useEffect(() => {
    if (sharedScreen) {
      setUserListTabActive(true);
    } else {
      setUserListTabActive(false);
    }
  }, [sharedScreen]);

  return (
    <SharedScreenStoreContext.Provider value={{ sharedScreen, setSharedScreen, handleScreenShareActive }}>
      {children}
    </SharedScreenStoreContext.Provider>
  );
}

export default SharedScreenStore;
