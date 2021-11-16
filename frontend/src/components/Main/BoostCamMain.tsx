import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ServerListTab from './ServerListTab';
import MainSection from './MainSection';

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

function BoostCamMain(): JSX.Element {
  useEffect(() => {}, []);

  return (
    <Container>
      <ServerListTab />
      <MainSection />
    </Container>
  );
}

export default BoostCamMain;
