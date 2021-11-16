import React from 'react';
import styled from 'styled-components';
import { Server } from '../../types/server';

const Container = styled.button`
  flex-direction: column;
  justify-content: start;
  margin-left: 40px;
  margin-top: 15px;
  width: 90%;
`;

type ServerIconProps = {
  server: Server;
};
function ServerIcon(props: ServerIconProps): JSX.Element {
  const { server } = props;

  return <Container>{server.name}</Container>;
}

export default ServerIcon;
