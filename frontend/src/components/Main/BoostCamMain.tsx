import React, { useEffect } from 'react';
import MainPage from './MainPage';
import MainStore from './MainStore';

function BoostCamMain(): JSX.Element {
  useEffect(() => {}, []);

  return (
    <MainStore>
      <MainPage />
    </MainStore>
  );
}

export default BoostCamMain;
