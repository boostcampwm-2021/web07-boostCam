import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { MainStoreContext } from '../MainStore';

import CamListHeader from './CamListHeader';
import CamListItem from './CamListItem';

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
  const { serverCamList } = useContext(MainStoreContext);

  const listElements = serverCamList.map((cam: { id: number; name: string; url: string }) => (
    <CamListItem key={cam.id} id={cam.id} name={cam.name} url={cam.url} />
  ));

  return (
    <Container>
      <CamListHeader isListOpen={isListOpen} setIsListOpen={setIsListOpen} />
      {isListOpen && <CamListBody>{listElements}</CamListBody>}
    </Container>
  );
}

export default CamList;
