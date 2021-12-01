import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { MainStoreContext } from '../../MainStore';
import { fetchData } from '../../../../utils/fetchMethods';
import Loading from '../../../core/Loading';
import AlertDeleteChannel from './AlertDeleteChannel';
import NoAuthModal from './NoAuthModal';

const Container = styled.form`
  flex: 3 1 0;
  width: 90%;
  border-radius: 20px;
  margin: 20px 0px 0px 25px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
`;

const InputDiv = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const InputName = styled.span<{ color: string }>`
  color: ${(props) => `${props.color}`};
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
  margin-right: 15px;
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

const DeleteChannelDiv = styled.div`
  flex: 1 1 0;
  margin: 10px 0px 0px 25px;
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DeleteButton = styled.button`
  width: 150px;
  height: 50px;
  background: none;
  padding: 15px 10px;
  margin-right: 15px;
  border: 0;
  outline: 0;
  text-align: center;
  vertical-align: middle;
  border-radius: 10px;
  background-color: #ec5d5d;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: red;
    transition: all 0.3s;
  }
`;

type UpdateModalForm = {
  name: string;
  description: string;
};

function UpdateChannelModal(): JSX.Element {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateModalForm>();
  const {
    selectedServer,
    rightClickedChannelId,
    setIsModalOpen,
    setIsAlertModalOpen,
    setAlertModalContents,
    getServerChannelList,
  } = useContext(MainStoreContext);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isChannelOwner, setIsChannelOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthority = async () => {
    const { data } = await fetchData<null, boolean>('GET', `/api/channels/${rightClickedChannelId}/auth`);
    setIsChannelOwner(data);
  };

  const onSubmitUpdateChannelModal = async (data: { name: string; description: string }) => {
    const { name, description } = data;
    await fetchData('PATCH', `/api/channels/${rightClickedChannelId}`, {
      name: name.trim(),
      description: description.trim(),
      serverId: selectedServer.server.id,
    });
    getServerChannelList();
    setIsModalOpen(false);
  };

  const onClickDeleteChannelButton = async () => {
    setIsAlertModalOpen(true);
    setAlertModalContents(<AlertDeleteChannel />);
  };

  const setSelectedChannelData = async () => {
    const response = await fetch(`/api/channels/${rightClickedChannelId}`);
    const responseObj = await response.json();
    const channelData = responseObj.data;
    setValue('name', channelData.name);
    setValue('description', channelData.description);
    setIsLoading(false);
  };

  const checkFormValidation = () => {
    const { name, description } = watch();
    if (!name || !description) return;
    const isActive = name.trim().length > 2 && description.trim().length > 0;
    setIsButtonActive(isActive);
  };

  useEffect(() => {
    checkAuthority();
  }, []);

  useEffect(() => {
    setSelectedChannelData();
  }, [isChannelOwner]);

  useEffect(() => {
    checkFormValidation();
  }, [watch()]);

  const modalContents = () => {
    if (!isChannelOwner) return <NoAuthModal />;
    return (
      /* eslint-disable react/jsx-props-no-spreading */
      <>
        <Container onSubmit={handleSubmit(onSubmitUpdateChannelModal)}>
          <InputDiv>
            <InputName color="#cbc4b9">이름</InputName>
            <Input
              {...register('name', {
                validate: (value) => value.trim().length > 2 || '"이름" 칸은 3글자 이상 입력되어야합니다!',
              })}
              placeholder="채널명을 입력해주세요"
            />
            {errors.name && <InputErrorMessage>{errors.name.message}</InputErrorMessage>}
          </InputDiv>
          <InputDiv>
            <InputName color="#cbc4b9">설명</InputName>
            <Input
              {...register('description', {
                validate: (value) => value.trim().length > 0 || '"설명" 칸은 꼭 입력되어야합니다!',
              })}
              placeholder="채널 설명을 입력해주세요"
            />
            {errors.description && <InputErrorMessage>{errors.description.message}</InputErrorMessage>}
          </InputDiv>
          <SubmitButton type="submit" isButtonActive={isButtonActive}>
            수정
          </SubmitButton>
        </Container>
        <DeleteChannelDiv>
          <InputName color="#ff0000">채널 삭제</InputName>
          <DeleteButton onClick={onClickDeleteChannelButton}> 채널 삭제 </DeleteButton>
        </DeleteChannelDiv>
      </>
    );
  };

  return <>{isLoading ? <Loading /> : modalContents()}</>;
}

export default UpdateChannelModal;
