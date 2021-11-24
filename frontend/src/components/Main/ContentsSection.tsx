import React, { useEffect } from 'react';
import styled from 'styled-components';
import Message from './Message/Message';

const Container = styled.div`
  flex: 1;
  height: 100%;
`;

function ContentsSection(): JSX.Element {
  useEffect(() => {}, []);

  return (
    <Container>
      <Message />
    </Container>
  );
}

export default ContentsSection;
