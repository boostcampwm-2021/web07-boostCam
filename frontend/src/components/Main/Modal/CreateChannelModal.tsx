import React, { useContext } from 'react';
import styled from 'styled-components';

import { MainStoreContext } from '../MainStore';

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

const ModalBox = styled.div`
  width: 20%;
  height: 20%;

  background-color: #12cdd1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 20px;

  z-index: 3;
`;

const Form = styled.form`
  width: 100%;
  height: 200%;
  border-radius: 20px;
  padding: 20px 0;
  margin: 30px 0;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Input = styled.input`
  border: none;
  outline: none;
  padding: 8px 10px;
  margin-top: 10px;
  border-radius: 10px;
`;

const SubmitButton = styled.button`
  width: 60%;
  margin-top: 15px;
  height: 35px;
  background: none;

  border: 0;
  outline: 0;

  border-radius: 10px;
  background-color: #26a9ca;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;

  &:hover {
    background-color: #2dc2e6;
    transition: all 0.3s;
  }

  a {
    text-decoration: none;
  }
`;

function CreateChannelModal(): JSX.Element {
  const { setIsCreateModalOpen } = useContext(MainStoreContext);
  return (
    <Container>
      <ModalBackground onClick={() => setIsCreateModalOpen(false)} />
      <ModalBox>
        <Form>
          <Input name="nickname" placeholder="닉네임을 입력해주세요" required />
          <SubmitButton type="submit">입력</SubmitButton>
        </Form>
      </ModalBox>
    </Container>
  );
}

export default CreateChannelModal;
