import React from 'react';
import styled from 'styled-components';
import MessageSection from './MessageSection';

const Container = styled.div`
  flex: 1;
  height: 100%;
`;

function ContentsSection(): JSX.Element {
  return (
    <Container>
      <MessageSection />
    </Container>
  );
}

export default ContentsSection;
