import React from 'react';
import styled from 'styled-components';
import MessageSection from './MessageSection';
import ThreadSection from './ThreadSection';

const Container = styled.div`
  flex: 1 0 0;
  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

function ContentsSection(): JSX.Element {
  return (
    <Container>
      <MessageSection />
      <ThreadSection />
    </Container>
  );
}

export default ContentsSection;
