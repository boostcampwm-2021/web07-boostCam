import React from 'react';
import styled from 'styled-components';
import { UserInfo } from '../../types/cam';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #009b9f;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Form = styled.form`
  width: 30%;
  height: 30%;
  border-radius: 20px;
  padding: 20px 0;
  margin: 30px 0;

  border: 2px solid #12cdd1;
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
  border: 2px solid #12cdd1;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;

  &:hover {
    background-color: #12cdd1;
    transition: all 0.3s;
  }

  a {
    text-decoration: none;
  }
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
      <Form onSubmit={onSubmitNicknameForm}>
        <Input name="nickname" placeholder="닉네임을 입력해주세요" required />
        <SubmitButton type="submit">입력</SubmitButton>
      </Form>
    </Container>
  );
}

export default NickNameForm;
