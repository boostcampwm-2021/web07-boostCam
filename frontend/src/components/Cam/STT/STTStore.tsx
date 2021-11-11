import React, { createContext } from 'react';
import useSTT from '../../../hooks/useSTT';

export const STTStoreContext = createContext<React.ComponentState>(null);

type STTStoreProps = {
  children: React.ReactChild[] | React.ReactChild;
};

function STTStore(props: STTStoreProps): JSX.Element {
  const { children } = props;
  const { lastResult, isSTTActive, toggleSTTActive } = useSTT();

  return (
    <STTStoreContext.Provider value={{ lastResult, isSTTActive, toggleSTTActive }}>{children}</STTStoreContext.Provider>
  );
}

export default STTStore;
