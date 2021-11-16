import React, { useContext } from 'react';
import styled from 'styled-components';
import { ServerStoreContext } from './ServerStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin-left: 40px;
  margin-top: 15px;
  width: 100%;
  background-color: yellow;
  height: 5%;
`;

function NavigationBar(): JSX.Element {
  const { currentServer } = useContext(ServerStoreContext);
  return <Container>{currentServer.name}</Container>;
}

export default NavigationBar;
