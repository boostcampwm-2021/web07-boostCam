import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { flex } from '../../../../utils/styledComponentFunc';
import { MainStoreContext } from '../../MainStore';

import CamListHeader from './CamListHeader';
import CamListItem from './CamListItem';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #492148;

  margin-top: 10px;
  ${flex('column', 'flex-start', 'flex-start')}
`;

const CamListBody = styled.div`
  width: 100%;
  ${flex('column', 'flex-start', 'flex-start')}
  color: #a69c96;
  font-size: 15px;
`;

function CamList(): JSX.Element {
  const [isListOpen, setIsListOpen] = useState<boolean>(true);
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
