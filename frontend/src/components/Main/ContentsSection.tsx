import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { useNavigate } from 'react-router-dom';
import socketState from '../../atoms/socket';

const Container = styled.div`
  flex: 1;
  height: 100%;
`;

function ContentsSection(): JSX.Element {
  const socket = useRecoilValue(socketState);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return <Container>ContentsSection</Container>;
}

export default ContentsSection;
