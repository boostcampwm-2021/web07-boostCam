import { createContext, RefObject, useEffect, useState } from 'react';

export const ToggleStoreContext = createContext<React.ComponentState>(null);

type CamToggleStoreProps = {
  children: React.ReactChild[] | React.ReactChild;
  camRef: RefObject<HTMLDivElement> | null;
};

function ToggleStore(props: CamToggleStoreProps): JSX.Element {
  const { children, camRef } = props;

  const [isMouseOnCamPage, setMouseOnCamPage] = useState<boolean>(true);
  const [isUserListTabActive, setUserListTabActive] = useState<boolean>(true);
  const [isChattingTabActive, setChattingTabActive] = useState<boolean>(true);
  const [isScreenShareActive, setScreenShareActive] = useState<boolean>(false);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);

  const handleUserListTabActive = (): void => {
    setUserListTabActive(!isUserListTabActive);
  };

  const handleChattingTabActive = (): void => {
    setChattingTabActive(!isChattingTabActive);
  };

  const handleMouseOverCamPage = (): void => {
    setMouseOnCamPage(true);
  };

  const handleMouseLeaveCamPage = (): void => {
    setMouseOnCamPage(false);
  };

  const tryShareScreen = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia();
      stream.getVideoTracks()[0].addEventListener('ended', () => {
        setScreenStream(null);
        setScreenShareActive(false);
      });
      setScreenStream(stream);
      setScreenShareActive(true);
    } catch (error) {
      // do nothing
    }
  };
  const handleScreenShareActive = (): void => {
    if (!isScreenShareActive) {
      tryShareScreen();
    }
    if (isScreenShareActive) {
      setScreenStream(null);
      setScreenShareActive(false);
    }
  };

  useEffect(() => {
    if (camRef?.current) {
      camRef.current.onmouseover = handleMouseOverCamPage;
      camRef.current.onmouseleave = handleMouseLeaveCamPage;
    }
  }, []);

  return (
    <ToggleStoreContext.Provider
      value={{
        isUserListTabActive,
        isChattingTabActive,
        isMouseOnCamPage,
        isScreenShareActive,
        screenStream,
        handleUserListTabActive,
        handleChattingTabActive,
        handleMouseOverCamPage,
        handleMouseLeaveCamPage,
        handleScreenShareActive,
      }}
    >
      {children}
    </ToggleStoreContext.Provider>
  );
}

export default ToggleStore;
