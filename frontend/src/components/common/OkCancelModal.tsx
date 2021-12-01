import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 50%;
  min-width: 400px;
  height: 30%;
  min-height: 250px;

  background-color: #222322;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;
  border-radius: 20px;
  padding: 30px;

  z-index: 3;
`;

const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.span`
  color: #cbc4b9;
  font-size: 24px;
  font-weight: 600;
`;

const ModalDescription = styled.div`
  width: 100%;
  display: flex;

  color: #cbc4b9;
  font-size: 18px;
`;

const ModalButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
  background: none;

  padding: 10px;
  margin-left: 20px;

  border: 0;
  outline: 0;

  text-align: center;
  vertical-align: middle;

  border-radius: 10px;
  background-color: #26a9ca;
  cursor: pointer;
  transition: all 0.3s;
`;

const OkButton = styled(Button)`
  background-color: #26a9ca;
  &:hover {
    background-color: #54c8e6;
  }
`;

const CancelButton = styled(Button)`
  background-color: gray;
  &:hover {
    background-color: #d4d0d0;
  }
`;

type OkCancelModalProps = {
  handleClickOk: () => void;
  handleClickCancel: () => void;
  title: string;
  description: string;
};

function OkCancelModal(props: OkCancelModalProps): JSX.Element {
  const { handleClickOk, handleClickCancel, title, description } = props;

  return (
    <Container>
      <ModalHeader>
        <ModalTitle>{title}</ModalTitle>
      </ModalHeader>
      <ModalDescription>{description}</ModalDescription>
      <ModalButtonContainer>
        <OkButton onClick={handleClickOk}>확인</OkButton>
        <CancelButton onClick={handleClickCancel}>취소</CancelButton>
      </ModalButtonContainer>
    </Container>
  );
}

export default OkCancelModal;
