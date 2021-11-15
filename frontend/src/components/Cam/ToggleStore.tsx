import { createContext, RefObject, useEffect, useState } from 'react';

export const ToggleStoreContext = createContext<React.ComponentState>(null);

type CamToggleStoreProps = {
  children: React.ReactChild[] | React.ReactChild;
  camRef: RefObject<HTMLDivElement> | null;
};

function ToggleStore(props: CamToggleStoreProps): JSX.Element {
  const { children, camRef } = props;

  const [isMouseOnCamPage, setMouseOnCamPage] = useState<boolean>(true);
  const [isUserListTabActive, setUserListTabActive] = useState<boolean>(false);
  const [isChattingTabActive, setChattingTabActive] = useState<boolean>(true);

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
        handleUserListTabActive,
        handleChattingTabActive,
        handleMouseOverCamPage,
        handleMouseLeaveCamPage,
      }}
    >
      {children}
    </ToggleStoreContext.Provider>
  );
}

export default ToggleStore;
