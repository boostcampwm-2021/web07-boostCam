import React from 'react';
import styled from 'styled-components';

import ChannelList from './Channel/List/ChannelList';
import CamList from './Cam/List/CamList';

const Container = styled.div`
  width: 180px;
  height: 100%;
  background-color: #492148;
`;

function RoomListSection(): JSX.Element {
  return (
    <Container>
      <ChannelList />
      <CamList />
    </Container>
  );
}

export default RoomListSection;
