import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { useNavigate } from 'react-router-dom';
import socketState from '../../atoms/socket';
import ChannelList from './ChannelList';
import CamList from './CamList';

const Container = styled.div`
  width: 180px;
  height: 100%;
  background-color: #492148;
`;

function RoomListSection(): JSX.Element {
  const socket = useRecoilValue(socketState);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <Container>
      <ChannelList />
      <CamList />
    </Container>
  );
}

export default RoomListSection;
