import React, { useContext } from 'react';
import styled from 'styled-components';
import { ServerInfo } from '../../types/server';
import ServerIcon from './ServerIcon';
import { ServerStoreContext } from './ServerStore';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-left: 40px;
  margin-top: 15px;
  width: 10%;
  background-color: blue;
  height: 50%;
`;

function ServerTab(): JSX.Element {
  const { serverList } = useContext(ServerStoreContext);
  return (
    <Container>
      {serverList.map((server: ServerInfo) => {
        return <ServerIcon key={server.id} server={server.server} />;
      })}
    </Container>
  );
}

export default ServerTab;
