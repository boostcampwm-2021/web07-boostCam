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

function MainHeader(): JSX.Element {
  const socket = useRecoilValue(socketState);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return <Container>Server Name</Container>;
}

export default MainHeader;
