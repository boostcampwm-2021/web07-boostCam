import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { useNavigate } from 'react-router-dom';
import socketState from '../../atoms/socket';

const Container = styled.div`
  width: 100%;
  height: 50px;

  background-color: #321832;
`;

const HeaderBox = styled.div`
  width: 100%;
  height: 100%;
`;

const CurrentServerName = styled.span`
  color: #dcd6d0;
  font-size: 30px;

  margin-left: 20px;
`;

function MainHeader(): JSX.Element {
  const socket = useRecoilValue(socketState);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <Container>
      <HeaderBox>
        <CurrentServerName>Server Name</CurrentServerName>
      </HeaderBox>
    </Container>
  );
}

export default MainHeader;
