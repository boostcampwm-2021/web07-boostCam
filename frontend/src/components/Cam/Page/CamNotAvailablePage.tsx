import React from 'react';
import styled from 'styled-components';
import { flex } from '../../../utils/styledComponentFunc';
import CamDefaultPage from './CamDefaultPage';

const Title = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 20%;
  ${flex('row', 'center', 'center')};
  color: white;
  font-size: 44px;
`;

function CamNotAvailablePage(): JSX.Element {
  return (
    <CamDefaultPage backgroundSrc="/pepes/pepe-5.jpg">
      <Title>참여 인원을 초과하였습니다.</Title>
    </CamDefaultPage>
  );
}

export default CamNotAvailablePage;
