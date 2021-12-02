import React, { useContext } from 'react';
import styled from 'styled-components';
import { flex } from '../../utils/styledComponentFunc';

import { ToggleStoreContext } from './ToggleStore';

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0px;
  right: 0px;

  ${flex('column', 'space-around', 'center')}
  z-index: 10;
`;

const ModalBackground = styled.div`
  position: fixed;
  left: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
`;

function AlertModal(): JSX.Element {
  const { setIsAlertModalOpen, alertModalContents } = useContext(ToggleStoreContext);

  return (
    <Container>
      <ModalBackground onClick={() => setIsAlertModalOpen(false)} />
      {alertModalContents}
    </Container>
  );
}

export default AlertModal;
