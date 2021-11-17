import React, { useContext } from 'react';
import styled from 'styled-components';
import { Server } from '../../types/server';
import { ServerStoreContext } from './ServerStore';

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
  const { setCurrentServer } = useContext(ServerStoreContext);

  const onClickChangeCurrentServer = () => {
    setCurrentServer(server);
  };

  return <Container onClick={onClickChangeCurrentServer}>{server.name}</Container>;
}

export default ServerIcon;
