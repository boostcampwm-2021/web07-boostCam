import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { useNavigate } from 'react-router-dom';
import socketState from '../../atoms/socket';
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
  const socket = useRecoilValue(socketState);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <Container>
      <ServerListTab />
      <MainSection />
    </Container>
  );
}

export default BoostCamMain;
