import React from 'react';
import styled from 'styled-components';
import CamDefaultPage from './CamDefaultPage';

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

function CamLoadingPage(): JSX.Element {
  return (
    <CamDefaultPage backgroundSrc="/pepes/pepe-4.jpg">
      <Title>Loading...</Title>
    </CamDefaultPage>
  );
}

export default CamLoadingPage;
