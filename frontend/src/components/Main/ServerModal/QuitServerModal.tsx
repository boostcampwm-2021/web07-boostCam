import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { MainStoreContext } from '../MainStore';
import { BoostCamMainIcons } from '../../../utils/SvgIcons';

const { Close } = BoostCamMainIcons;

const Container = styled.div`
  width: 35%;
  min-width: 400px;

  background-color: #222322;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 20px;

  z-index: 3;
`;

const ModalInnerBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.span`
  margin-left: 25px;
  padding: 10px 5px;

  color: #cbc4b9;
  font-size: 32px;
  font-weight: 600;
`;

const ModalDescription = styled.span`
  margin-left: 25px;
  padding: 10px 5px;

  color: #cbc4b9;
  font-size: 15px;
`;

const Form = styled.form`
  width: 90%;
  height: 40%;
  border-radius: 20px;
  margin: 30px 0px 0px 25px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const SubmitButton = styled.button<{ isButtonActive: boolean }>`
  width: 100px;
  height: 50px;
  background: none;

  padding: 15px 10px;

  border: 0;
  outline: 0;

  text-align: center;
  vertical-align: middle;

  border-radius: 10px;
  background-color: ${(props) => (props.isButtonActive ? '#26a9ca' : 'gray')};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${(props) => (props.isButtonActive ? '#2dc2e6' : 'gray')};
    transition: all 0.3s;
  }
`;

const MessageFailToPost = styled.span`
  color: red;
  font-size: 16px;
  font-family: Malgun Gothic;
`;

const ModalCloseButton = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  flex-direction: center;
  align-items: center;

  cursor: pointer;
  margin-right: 25px;
`;

const CloseIcon = styled(Close)`
  width: 20px;
  height: 20px;
  fill: #a69c96;
`;

function QuitServerModal(): JSX.Element {
  const { setIsModalOpen, selectedServer, getUserServerList } = useContext(MainStoreContext);
  const isButtonActive = true;
  const [messageFailToPost, setMessageFailToPost] = useState<string>('');

  const onClickQuitServer = async () => {
    const userServerId = selectedServer.id;
    const response = await fetch(`api/users/servers/${userServerId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 204) {
      const isServerOrUserServerCreated = false;
      getUserServerList(isServerOrUserServerCreated);
      setIsModalOpen(false);
    } else {
      const body = await response.json();
      setMessageFailToPost(body.message);
    }
  };

  return (
    <Container>
      <ModalInnerBox>
        <ModalHeader>
          <ModalTitle>서버 나가기</ModalTitle>
          <ModalCloseButton onClick={() => setIsModalOpen(false)}>
            <CloseIcon />
          </ModalCloseButton>
        </ModalHeader>
        <ModalDescription>서버에서 나가시겠습니까?</ModalDescription>
        <Form>
          <MessageFailToPost>{messageFailToPost}</MessageFailToPost>
          <SubmitButton type="button" isButtonActive={isButtonActive} onClick={onClickQuitServer}>
            예
          </SubmitButton>
        </Form>
      </ModalInnerBox>
    </Container>
  );
}

export default QuitServerModal;
