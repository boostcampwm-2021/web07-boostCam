import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { MainStoreContext } from '../MainStore';
import { BoostCamMainIcons } from '../../../utils/SvgIcons';

const { Close } = BoostCamMainIcons;

const Container = styled.div`
  width: 35%;
  min-width: 400px;
  height: 50%;
  min-height: 450px;

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

type CreateModalForm = {
  name: string;
  description: string;
};

function CreateCamModal(): JSX.Element {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateModalForm>();
  const { selectedServer, setIsModalOpen, getServerCamList } = useContext(MainStoreContext);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);

  const onSubmitCreateCamModal = async (data: { name: string; description: string }) => {
    const { name } = data;
    await fetch('api/cam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.trim(),
        serverId: selectedServer.server.id,
      }),
    });
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
    <Container>
      <ModalInnerBox>
        <ModalHeader>
          <ModalTitle>Cam 생성</ModalTitle>
          <ModalCloseButton onClick={() => setIsModalOpen(false)}>
            <CloseIcon />
          </ModalCloseButton>
        </ModalHeader>
        <ModalDescription>생성할 Cam의 이름을 작성해주세요</ModalDescription>
        <Form onSubmit={handleSubmit(onSubmitCreateCamModal)}>
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
        </Form>
      </ModalInnerBox>
    </Container>
  );
}

export default CreateCamModal;
