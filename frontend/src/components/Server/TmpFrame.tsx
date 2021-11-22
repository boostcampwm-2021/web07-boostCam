import React from 'react';
import styled from 'styled-components';

import ServerTab from './ServerTab';
import NavigationBar from './NavigationBar';
import ServerStore from './ServerStore';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  overflow-x: hidden;
  overflow-y: hidden;
`;

function TmpFrame(): JSX.Element {
  return (
    <Container>
      <ServerStore>
        <NavigationBar />
        <ServerTab />
      </ServerStore>
    </Container>
  );
}

export default TmpFrame;
