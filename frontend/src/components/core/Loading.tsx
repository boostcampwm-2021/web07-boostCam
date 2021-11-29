import React from 'react';
import styled, { keyframes } from 'styled-components';
import { BoostCamMainIcons } from '../../utils/SvgIcons';

const { loading } = BoostCamMainIcons;

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: white;
`;

const spin = keyframes`
  100%{ transform: rotate(360deg); }
`;

const LoadingIcon = styled(loading)`
  width: 120px;
  height: 120px;
  fill: #a69c96;
  margin-right: 15px;
  animation: ${spin} 1s infinite cubic-bezier(0.45, 0, 0.55, 1);
`;

function Loading(): JSX.Element {
  return (
    <Container>
      <LoadingIcon />
    </Container>
  );
}

export default Loading;
