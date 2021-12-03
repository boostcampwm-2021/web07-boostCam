import React from 'react';
import MainPage from './MainPage';
import MainStore from './MainStore';
import ToggleStore from './ToggleStore';

function Main(): JSX.Element {
  return (
    <MainStore>
      <ToggleStore>
        <MainPage />
      </ToggleStore>
    </MainStore>
  );
}

export default Main;
