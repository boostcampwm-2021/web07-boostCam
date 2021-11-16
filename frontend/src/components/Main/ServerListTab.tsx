import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { useNavigate } from 'react-router-dom';
import socketState from '../../atoms/socket';

const Container = styled.div`
  width: 80px;
  height: 100%;

  background-color: #492148;
  border-right: 1px solid #92508f;
`;

function ServerListTab(): JSX.Element {
  const socket = useRecoilValue(socketState);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return <Container>ServerListTab</Container>;
}

export default ServerListTab;
