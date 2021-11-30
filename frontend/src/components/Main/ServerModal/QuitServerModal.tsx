import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { MainStoreContext } from '../MainStore';

const Container = styled.form`
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
      const calledStatus = 'deleted';
      getUserServerList(calledStatus);
      setIsModalOpen(false);
    } else {
      const body = await response.json();
      setMessageFailToPost(body.message);
    }
  };

  return (
    <Container>
      <MessageFailToPost>{messageFailToPost}</MessageFailToPost>
      <SubmitButton type="button" isButtonActive={isButtonActive} onClick={onClickQuitServer}>
        예
      </SubmitButton>
    </Container>
  );
}

export default QuitServerModal;
