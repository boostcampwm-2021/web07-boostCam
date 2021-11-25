import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0px;
  right: 0px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 44px;
`;

const Background = styled.img`
  position: absolute;
  width: 70%;
  height: auto;
  margin: 0 auto;
  opacity: 0.1;
`;

function CamNotFound(): JSX.Element {
  return (
    <Container>
      <Background alt="not-found-background" src="/not-found.jpg" />
      <Title>존재하지 않는 방입니다.</Title>
    </Container>
  );
}

export default CamNotFound;
