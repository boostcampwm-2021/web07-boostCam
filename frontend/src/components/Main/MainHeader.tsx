import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { MainStoreContext } from './MainStore';

const Container = styled.div`
  width: 100%;
  height: 50px;

  background-color: #321832;
`;

const HeaderBox = styled.div`
  width: 100%;
  height: 100%;
`;

const CurrentServerName = styled.span`
  color: #dcd6d0;
  font-size: 30px;

  margin-left: 20px;
`;

function MainHeader(): JSX.Element {
  const { selectedServer } = useContext(MainStoreContext);
  useEffect(() => {}, []);
  return (
    <Container>
      <HeaderBox>
        <CurrentServerName>
          {selectedServer !== undefined ? selectedServer.server.name : '새로운 서버에 참여하세요.'}
        </CurrentServerName>
      </HeaderBox>
    </Container>
  );
}

export default MainHeader;
