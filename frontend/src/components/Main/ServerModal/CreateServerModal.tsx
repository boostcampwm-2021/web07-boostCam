import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { MainStoreContext } from '../MainStore';

const Container = styled.form`
  width: 90%;
  height: 100%;
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
  margin: 10px 0px;
`;

const ImageInputDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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

const ImagePreview = styled.img`
  width: 40px;
  height: 40px;
`;

const InputFile = styled.input`
  width: 0px;
  height: 0px;
`;

const InputLabel = styled.label`
  background-color: #26a9ca;
  width: 300px;
  height: 40px;
  border-radius: 10px;
  margin: 10px;
  font-weight: 400;
  transition: all 0.3s;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: '#2dc2e6';
    transition: all 0.3s;
    cursor: pointer;
  }
`;

const MessageFailToPost = styled.span`
  color: red;
  font-size: 16px;
  font-family: Malgun Gothic;
`;

type CreateModalForm = {
  name: string;
  description: string;
  file: FileList;
};

function CreateServerModal(): JSX.Element {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateModalForm>();
  const { setIsModalOpen, getUserServerList } = useContext(MainStoreContext);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);
  const [messageFailToPost, setMessageFailToPost] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>();

  const onSubmitCreateServerModal = async (data: { name: string; description: string; file: FileList }) => {
    const formData = new FormData();
    const { name, description, file } = data;

    formData.append('name', name);
    formData.append('description', description);
    formData.append('icon', file[0]);

    const response = await fetch('api/servers', {
      method: 'POST',
      body: formData,
    });

    if (response.status === 201) {
      getUserServerList('created');
      setIsModalOpen(false);
    } else {
      const body = await response.json();
      setMessageFailToPost(body.message);
    }
  };

  const onChangePreviewImage = (e: React.ChangeEvent & { target: HTMLInputElement }) => {
    const file = e.target.files;

    if (file) {
      setImagePreview(URL.createObjectURL(file[0]));
    }
  };

  useEffect(() => {
    const { name, description } = watch();
    const isActive = name.trim().length > 2 && description.trim().length > 0;
    setIsButtonActive(isActive);
  }, [watch()]);

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <Container onSubmit={handleSubmit(onSubmitCreateServerModal)}>
      <InputDiv>
        <InputName>이름</InputName>
        <Input
          {...register('name', {
            validate: (value) => value.trim().length > 1 || '"이름" 칸은 2글자 이상 입력되어야합니다!',
          })}
          placeholder="서버명을 입력해주세요"
        />
        {errors.name && <InputErrorMessage>{errors.name.message}</InputErrorMessage>}
      </InputDiv>
      <InputDiv>
        <InputName>설명</InputName>
        <Input
          {...register('description', {
            validate: (value) => value.trim().length > 0 || '"설명" 칸은 꼭 입력되어야합니다!',
          })}
          placeholder="서버 설명을 입력해주세요"
        />
        {errors.description && <InputErrorMessage>{errors.description.message}</InputErrorMessage>}
      </InputDiv>
      <InputDiv>
        <InputName>서버 아이콘</InputName>
        <ImageInputDiv>
          <ImagePreview src={imagePreview} />
          <InputLabel htmlFor="file">파일을 선택하세요</InputLabel>
          <InputFile id="file" type="file" {...register('file')} onChange={onChangePreviewImage} />
        </ImageInputDiv>
      </InputDiv>
      <MessageFailToPost>{messageFailToPost}</MessageFailToPost>
      <SubmitButton type="submit" isButtonActive={isButtonActive}>
        생성
      </SubmitButton>
    </Container>
  );
}

export default CreateServerModal;
