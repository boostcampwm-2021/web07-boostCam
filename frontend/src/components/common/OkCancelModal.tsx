import React from 'react';
import styled from 'styled-components';

const ModalButtonContainer = styled.div`
  width: 100%;
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
  background: none;

  padding: 10px;
  margin-right: 20px;

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
};

function OkCancelModal(props: OkCancelModalProps): JSX.Element {
  const { handleClickOk, handleClickCancel } = props;

  return (
    <ModalButtonContainer>
      <OkButton onClick={handleClickOk}>확인</OkButton>
      <CancelButton onClick={handleClickCancel}>취소</CancelButton>
    </ModalButtonContainer>
  );
}

export default OkCancelModal;
