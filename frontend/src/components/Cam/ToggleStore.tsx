import { createContext, useState } from 'react';

export const ToggleStoreContext = createContext<React.ComponentState>(null);

type CamToggleStoreProps = {
  children: React.ReactChild[] | React.ReactChild;
};

function ToggleStore(props: CamToggleStoreProps): JSX.Element {
  const { children } = props;

  const [isUserListTabActive, setUserListTabActive] = useState<boolean>(false);
  const [isChattingTabActive, setChattingTabActive] = useState<boolean>(true);

  const handleUserListTabActive = (): void => {
    setUserListTabActive(!isUserListTabActive);
  };

  const handleChattingTabActive = (): void => {
    setChattingTabActive(!isChattingTabActive);
  };

  return (
    <ToggleStoreContext.Provider
      value={{
        isUserListTabActive,
        isChattingTabActive,
        handleUserListTabActive,
        handleChattingTabActive,
      }}
    >
      {children}
    </ToggleStoreContext.Provider>
  );
}

export default ToggleStore;
