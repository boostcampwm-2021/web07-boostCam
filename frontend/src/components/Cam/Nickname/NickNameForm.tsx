import React from 'react';
import styled from 'styled-components';
import { UserInfo } from '../../../types/cam';

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0px;
  right: 0px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Form = styled.form`
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 44px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 10px;
  width: 30%;
`;

const SubmitButton = styled.button`
  padding: 10px 30px;
  border: 0;
  outline: 0;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  margin-left: 20px;

  a {
    text-decoration: none;
  }
`;

const Background = styled.img`
  position: absolute;
  width: 70%;
  height: auto;
  margin: 0 auto;
  opacity: 0.1;
  z-index: -1;
`;

type NickNameFormProps = {
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
};

function NickNameForm(props: NickNameFormProps): JSX.Element {
  const { setUserInfo } = props;

  const onSubmitNicknameForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { currentTarget } = e;
    const nickname = new FormData(currentTarget).get('nickname')?.toString().trim();
    if (!nickname) {
      return;
    }
    setUserInfo((prev) => ({ ...prev, nickname }));
  };

  return (
    <Container>
      <Background alt="nickname-form-background" src="/nickname-form.jpg" />
      <Form onSubmit={onSubmitNicknameForm}>
        <Input name="nickname" placeholder="닉네임을 입력해주세요" required />
        <SubmitButton type="submit">입력</SubmitButton>
      </Form>
    </Container>
  );
}

export default NickNameForm;
