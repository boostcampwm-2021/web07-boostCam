import React, { useEffect } from 'react';
import styled from 'styled-components';

import RoomListSection from './RoomListSection';
import ContentsSection from './ContentsSection';
import MainHeader from './MainHeader';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const MainBody = styled.div`
  width: 100%;
  height: 100%;
  background-color: #222323;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

function MainSection(): JSX.Element {
  useEffect(() => {}, []);

  return (
    <Container>
      <MainHeader />
      <MainBody>
        <RoomListSection />
        <ContentsSection />
      </MainBody>
    </Container>
  );
}

export default MainSection;
