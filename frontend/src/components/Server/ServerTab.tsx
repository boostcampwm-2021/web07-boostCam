import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

import { ServerInfo } from '../../types/server';
import ServerIcon from './ServerIcon';
import { ServerStoreContext } from './ServerStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-left: 40px;
  margin-top: 15px;
  width: 10%;
  background-color: blue;
  height: 50%;
`;

const ModalDisplayButton = styled.button`
  flex-direction: column;
  justify-content: start;
  margin-left: 40px;
  margin-top: 15px;
  width: 90%;
`;

function ServerTab(): JSX.Element {
  const { serverList } = useContext(ServerStoreContext);
  const [isDropdownActivated, setDropdownActivated] = useState<boolean>(false);

  const onClickToggleNewServerModal = () => {
    setDropdownActivated(!isDropdownActivated);
  };

  useEffect(() => {
    if (isDropdownActivated) {
      window.addEventListener('click', onClickToggleNewServerModal);
    }
    return () => {
      window.removeEventListener('click', onClickToggleNewServerModal);
    };
  }, [isDropdownActivated]);

  return (
    <Container>
      {serverList.map((server: ServerInfo) => {
        return <ServerIcon key={server.id} server={server.server} />;
      })}
      <ModalDisplayButton onClick={onClickToggleNewServerModal}>+</ModalDisplayButton>
    </Container>
  );
}

export default ServerTab;
