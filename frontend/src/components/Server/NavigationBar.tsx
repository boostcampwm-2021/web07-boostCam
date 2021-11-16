import React from 'react';
import styled from 'styled-components';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin-left: 40px;
  margin-top: 15px;
  width: 100%;
  background-color: yellow;
  height: 5%;
`;

function NavigationBar(): JSX.Element {
  return <Container>서버이름</Container>;
}

export default NavigationBar;
