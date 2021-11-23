import React, { useState } from 'react';
import styled from 'styled-components';

import CamListHeader from './CamListHeader';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #492148;

  margin-top: 10px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const CamListBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  color: #a69c96;
  font-size: 15px;
`;

function CamList(): JSX.Element {
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const listElements: Array<JSX.Element> = [];

  return (
    <Container>
      <CamListHeader isListOpen={isListOpen} setIsListOpen={setIsListOpen} />
      {isListOpen && <CamListBody>{listElements}</CamListBody>}
    </Container>
  );
}

export default CamList;
