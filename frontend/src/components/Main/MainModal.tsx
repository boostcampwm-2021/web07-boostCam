import React, { useContext } from 'react';
import styled from 'styled-components';

import { MainStoreContext } from './MainStore';

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0px;
  right: 0px;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ModalBackground = styled.div`
  position: fixed;
  left: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
`;

function MainModal(): JSX.Element {
  const { setIsModalOpen, modalContents } = useContext(MainStoreContext);

  return (
    <Container>
      <ModalBackground onClick={() => setIsModalOpen(false)} />
      {modalContents}
    </Container>
  );
}

export default MainModal;
