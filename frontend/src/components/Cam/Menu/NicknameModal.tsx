import React, { useContext } from 'react';
import styled from 'styled-components';

import { UserInfo } from '../../../types/cam';
import { flex } from '../../../utils/styledComponentFunc';
import { CamStoreContext } from '../CamStore';

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0px;
  right: 0px;
  ${flex('column', 'space-around', 'center')}
  z-index: 2;
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
  width: 30%;
  height: 20%;
  background-color: white;
  ${flex('column', 'space-around', 'center')}
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 5px 22px -2px #000000;
  z-index: 3;
`;

const Form = styled.form`
  border-radius: 20px;
  ${flex('row', 'space-around', 'center')}
`;

const Input = styled.input`
  border: 1px solid grey;
  outline: none;
  padding: 8px 10px;
  margin-right: 20px;
  border-radius: 10px;
`;

const SubmitButton = styled.button`
  width: 30%;
  height: 35px;
  background: none;

  outline: 0;

  border: 1px solid grey;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;

  a {
    text-decoration: none;
  }
`;

const Title = styled.div``;

type NicknameModalProps = {
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  setIsActiveNicknameModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function NicknameModal(props: NicknameModalProps): JSX.Element {
  const { setUserInfo, setIsActiveNicknameModal } = props;
  const { socket } = useContext(CamStoreContext);

  const onSubmitNicknameForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { currentTarget } = e;
    const nickname = new FormData(currentTarget).get('nickname')?.toString().trim();
    if (!nickname) return;
    setUserInfo((prev) => ({ ...prev, nickname }));
    socket.emit('changeNickname', { userNickname: nickname });
    setIsActiveNicknameModal(false);
  };

  const onClickModalBackground = () => {
    setIsActiveNicknameModal(false);
  };

  return (
    <Container>
      <ModalBackground onClick={onClickModalBackground} />
      <ModalBox>
        <Title>닉네임 변경</Title>
        <Form onSubmit={onSubmitNicknameForm}>
          <Input name="nickname" placeholder="닉네임을 입력해주세요" required />
          <SubmitButton type="submit">입력</SubmitButton>
        </Form>
      </ModalBox>
    </Container>
  );
}

export default NicknameModal;
