import React, { useEffect } from 'react';
import styled from 'styled-components';

import ChannelList from './ChannelList';
import CamList from './CamList';

const Container = styled.div`
  width: 180px;
  height: 100%;
  background-color: #492148;
`;

function RoomListSection(): JSX.Element {
  useEffect(() => {}, []);

  return (
    <Container>
      <ChannelList />
      <CamList />
    </Container>
  );
}

export default RoomListSection;