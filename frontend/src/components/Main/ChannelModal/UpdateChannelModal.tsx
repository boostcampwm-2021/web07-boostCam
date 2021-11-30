import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { MainStoreContext } from '../MainStore';
import { BoostCamMainIcons } from '../../../utils/SvgIcons';
import fetchData from '../../../utils/fetchMethods';
import Loading from '../../core/Loading';
import noAuthImg from '../../../assets/hmm.gif';
import AlertDeleteChannel from './AlertDeleteChannel';

const { Close } = BoostCamMainIcons;

const Container = styled.div`
  width: 35%;
  min-width: 400px;
  height: 70%;
  min-height: 550px;

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

const ModalDescriptionDiv = styled.div`
  width: 90%;
  margin: 120px 0px 0px 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalDescription = styled.span`
  padding: 10px 5px;
  margin-left: 25px;
  color: #cbc4b9;
  font-size: 15px;
`;

const Form = styled.form`
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

const NoAuthImg = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 25px;
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
    const { data } = await fetchData<null, boolean>('GET', `api/channel/${rightClickedChannelId}/auth`);
    setIsChannelOwner(data);
  };

  const onSubmitUpdateChannelModal = async (data: { name: string; description: string }) => {
    const { name, description } = data;
    await fetch(`api/channel/${rightClickedChannelId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.trim(),
        description: description.trim(),
        serverId: selectedServer.server.id,
      }),
    });
    getServerChannelList();
    setIsModalOpen(false);
  };

  const onClickDeleteChannelButton = async () => {
    setIsAlertModalOpen(true);
    setAlertModalContents(<AlertDeleteChannel />);
  };

  const setSelectedChannelData = async () => {
    const response = await fetch(`/api/channel/${rightClickedChannelId}`);
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
    if (!isChannelOwner)
      return (
        <>
          <ModalHeader>
            <ModalTitle>채널 수정</ModalTitle>
            <ModalCloseButton onClick={() => setIsModalOpen(false)}>
              <CloseIcon />
            </ModalCloseButton>
          </ModalHeader>
          <ModalDescriptionDiv>
            <NoAuthImg src={noAuthImg} />
            <ModalDescription>이 채널에 대한 수정 권한이 없습니다!</ModalDescription>
          </ModalDescriptionDiv>
        </>
      );
    return (
      /* eslint-disable react/jsx-props-no-spreading */
      <>
        <ModalHeader>
          <ModalTitle>채널 수정</ModalTitle>
          <ModalCloseButton onClick={() => setIsModalOpen(false)}>
            <CloseIcon />
          </ModalCloseButton>
        </ModalHeader>
        <ModalDescription>선택한 채널에 대한 내용을 변경할 수 있습니다.</ModalDescription>
        <Form onSubmit={handleSubmit(onSubmitUpdateChannelModal)}>
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
        </Form>
        <DeleteChannelDiv>
          <InputName color="#ff0000">채널 삭제</InputName>
          <DeleteButton onClick={onClickDeleteChannelButton}> 채널 삭제 </DeleteButton>
        </DeleteChannelDiv>
      </>
    );
  };

  return (
    <Container>
      <ModalInnerBox>{isLoading ? <Loading /> : modalContents()}</ModalInnerBox>
    </Container>
  );
}

export default UpdateChannelModal;
