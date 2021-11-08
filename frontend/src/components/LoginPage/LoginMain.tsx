import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import socketState from '../../atoms/socket';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #c4c4c4;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

function LoginMain(): JSX.Element {
  const socket = useRecoilValue(socketState);
  return <Container>LoginPage</Container>;
}

export default LoginMain;
