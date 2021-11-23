import React from 'react';
import styled from 'styled-components';
import ChattingSection from './ChattingSection';
import ThreadSection from './ThreadSection';

const Container = styled.div`
  flex: 1;
  height: 100%;
`;

function ContentsSection(): JSX.Element {
  return (
    <Container>
      <ChattingSection />
      <ThreadSection />
    </Container>
  );
}

export default ContentsSection;
