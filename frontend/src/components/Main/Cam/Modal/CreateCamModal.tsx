import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { MainStoreContext } from '../../MainStore';
import { fetchData } from '../../../../utils/fetchMethods';
import { ToggleStoreContext } from '../../ToggleStore';

const Container = styled.form`
  width: 90%;
  height: 70%;
  border-radius: 20px;
  margin: 30px 0px 0px 25px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const InputDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
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

type CreateModalForm = {
  name: string;
  description: string;
};

type PostCamData = {
  name: string;
  serverId: number;
};

function CreateCamModal(): JSX.Element {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateModalForm>();
  const { selectedServer, getServerCamList } = useContext(MainStoreContext);
  const { setIsModalOpen } = useContext(ToggleStoreContext);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);

  const onSubmitCreateCamModal = async (data: { name: string; description: string }) => {
    const { name } = data;
    const requestBody: PostCamData = { name, serverId: selectedServer.server.id };
    await fetchData<PostCamData, null>('POST', '/api/cam', requestBody);
    setIsModalOpen(false);
    getServerCamList();
  };

  useEffect(() => {
    const { name } = watch();
    const isActive = name.trim().length > 2;
    setIsButtonActive(isActive);
  }, [watch()]);

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <Container onSubmit={handleSubmit(onSubmitCreateCamModal)}>
      <InputDiv>
        <InputName>이름</InputName>
        <Input
          {...register('name', {
            validate: (value) => value.trim().length > 2 || '"이름" 칸은 3글자 이상 입력되어야합니다!',
          })}
          placeholder="Cam명을 입력해주세요"
        />
        {errors.name && <InputErrorMessage>{errors.name.message}</InputErrorMessage>}
      </InputDiv>
      <SubmitButton type="submit" isButtonActive={isButtonActive}>
        생성
      </SubmitButton>
    </Container>
  );
}

export default CreateCamModal;
