import React, { useContext } from 'react';
import styled from 'styled-components';

import { BoostCamMainIcons } from '../../utils/svgIcons';
import { flex } from '../../utils/styledComponentFunc';
import { ToggleStoreContext } from '../Main/ToggleStore';

const { Close } = BoostCamMainIcons;

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0px;
  right: 0px;
  ${flex('column', 'space-around', 'center')}
  z-index:3;
`;

const ModalBackground = styled.div`
  position: fixed;
  left: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
`;

const Modal = styled.div<{ height: string; minHeight: string }>`
  width: 35%;
  min-width: 400px;
  height: ${(props) => `${props.height}`};
  min-height: ${(props) => `${props.minHeight}`};

  background-color: #222322;
  ${flex('column', 'center', 'center')};

  border-radius: 20px;

  z-index: 5;
`;

const ModalInnerBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 10px;
  ${flex('column', 'flex-start', 'flex-start')};
`;

const ModalHeader = styled.div`
  width: 100%;
  ${flex('row', 'space-between', 'center')};
  flex: 1;
`;

const ModalTitle = styled.span`
  margin-left: 25px;
  padding: 10px 5px;

  color: #cbc4b9;
  font-size: 32px;
  font-weight: 600;
`;

const ModalDescription = styled.span`
  flex: 0.3;
  margin-left: 25px;
  padding: 10px 5px;

  color: #cbc4b9;
  font-size: 15px;
`;

const ModalCloseButton = styled.div`
  width: 32px;
  height: 32px;
  ${flex('row', 'center', 'center')};
  cursor: pointer;
  margin-right: 25px;
`;

const CloseIcon = styled(Close)`
  width: 20px;
  height: 20px;
  fill: #a69c96;
`;

function MainModal(): JSX.Element {
  const { setIsModalOpen, modalContents } = useContext(ToggleStoreContext);
  const { contents, title, description, height, minHeight } = modalContents;
  return (
    <Container>
      <ModalBackground onClick={() => setIsModalOpen(false)} />
      <Modal height={height} minHeight={minHeight}>
        <ModalInnerBox>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <ModalCloseButton onClick={() => setIsModalOpen(false)}>
              <CloseIcon />
            </ModalCloseButton>
          </ModalHeader>
          <ModalDescription>{description}</ModalDescription>
          {contents}
        </ModalInnerBox>
      </Modal>
    </Container>
  );
}

export default MainModal;
