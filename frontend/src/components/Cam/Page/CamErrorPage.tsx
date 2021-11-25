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

function CamErrorPage(): JSX.Element {
  return (
    <CamDefaultPage backgroundSrc="/pepes/pepe-2.jpg">
      <Title>알 수 없는 오류가 발생했습니다.</Title>
    </CamDefaultPage>
  );
}

export default CamErrorPage;
