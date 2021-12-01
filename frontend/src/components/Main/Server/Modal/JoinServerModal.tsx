import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { MainStoreContext } from '../../MainStore';
import { fetchData } from '../../../../utils/fetchMethods';
import { flex } from '../../../../utils/styledComponentFunc';

const Container = styled.form`
  width: 90%;
  height: 70%;
  border-radius: 20px;
  margin: 30px 0px 0px 25px;

  ${flex('column', 'flex-start', 'flex-start')};
`;

const InputDiv = styled.div`
  width: 100%;
  height: 100%;
  ${flex('column', 'flex-start', 'flex-start')};
`;

const InputName = styled.span`
  color: #cbc4b9;
  font-size: 20px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 90%;
  border: none;
  outline: none;
  padding: 15px 10px;
  margin-top: 10px;
  border-radius: 10px;
`;

const InputErrorMessage = styled.span`
  padding: 5px 0px;
  color: red;
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

type JoinServerModalForm = {
  code: string;
};

function JoinServerModal(): JSX.Element {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<JoinServerModalForm>();
  const { setIsModalOpen, getUserServerList } = useContext(MainStoreContext);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);
  const [messageFailToPost, setMessageFailToPost] = useState<string>('');

  const onSubmitJoinServerModal = async (datas: { code: string }) => {
    const { code } = datas;
    const { statusCode, message } = await fetchData<unknown, number>('POST', '/api/user/servers', {
      code: code.trim(),
    });

    if (statusCode === 201) {
      getUserServerList('created');
      setIsModalOpen(false);
    } else {
      setMessageFailToPost(`${message}`);
    }
  };

  useEffect(() => {
    const { code } = watch();
    const isActive = code.trim().length > 0;
    setIsButtonActive(isActive);
  }, [watch()]);

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <Container onSubmit={handleSubmit(onSubmitJoinServerModal)}>
      <InputDiv>
        <InputName>참가 코드</InputName>
        <Input
          {...register('code', {
            validate: (value) => value.trim().length > 0 || '"참가코드" 칸을 입력해주세요!',
          })}
          placeholder="참가코드를 입력해주세요"
        />
        {errors.code && <InputErrorMessage>{errors.code.message}</InputErrorMessage>}
      </InputDiv>
      <MessageFailToPost>{messageFailToPost}</MessageFailToPost>
      <SubmitButton type="submit" isButtonActive={isButtonActive}>
        생성
      </SubmitButton>
    </Container>
  );
}

export default JoinServerModal;
