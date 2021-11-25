import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { MainStoreContext } from '../MainStore';
import { BoostCamMainIcons } from '../../../utils/SvgIcons';

const { Close } = BoostCamMainIcons;

const Container = styled.div`
  width: 35%;
  min-width: 400px;

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

const Form = styled.div`
  width: 90%;
  height: 100%;
  border-radius: 20px;
  margin: 0px 0px 0px 25px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const InputDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ImageInputDiv = styled.div`
  width: 250px;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const InputName = styled.span`
  color: #cbc4b9;
  font-size: 20px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 250px;
  border: none;
  outline: none;
  padding: 15px 10px;
  border-radius: 10px;
`;

const SubmitButton = styled.button<{ isButtonActive: boolean }>`
  width: 80px;
  height: 30px;
  background: none;

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
const MessageFailToPost = styled.span`
  color: red;
  font-size: 16px;
  font-family: Malgun Gothic;
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

function ServerSettingModal(): JSX.Element {
  const { setIsModalOpen, selectedServer, getUserServerList } = useContext(MainStoreContext);
  const isButtonActive = true;
  const [imagePreview, setImagePreview] = useState<string>();
  const [messageFailToPost, setMessageFailToPost] = useState<string>('');

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [files, setFiles] = useState<FileList>();

  const serverId = selectedServer?.server.id;

  const onChangePreviewImage = (e: React.ChangeEvent & { target: HTMLInputElement }) => {
    const iconFile = e.target.files;

    if (iconFile) {
      setFiles(iconFile);
      setImagePreview(URL.createObjectURL(iconFile[0]));
    }
  };

  const onCliclUpdateServer = async () => {
    if (serverId) {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      if (files) formData.append('icon', files[0]);

      const response = await fetch(`api/servers/${serverId}`, {
        method: 'PATCH',
        body: formData,
      });
      if (response.status === 204) {
        getUserServerList('updated');
        setIsModalOpen(false);
      } else {
        const body = await response.json();
        setMessageFailToPost(body.message);
      }
    } else {
      setMessageFailToPost('선택된 서버가 없습니다.');
    }
  };

  const onClickDeleteServer = async () => {
    if (serverId) {
      const response = await fetch(`api/servers/${serverId}`, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        getUserServerList();
        setIsModalOpen(false);
      } else {
        const body = await response.json();
        setMessageFailToPost(body.message);
      }
    } else {
      setMessageFailToPost('선택된 서버가 없습니다.');
    }
  };

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <Container>
      <ModalInnerBox>
        <ModalHeader>
          <ModalTitle>서버 설정</ModalTitle>
          <ModalCloseButton onClick={() => setIsModalOpen(false)}>
            <CloseIcon />
          </ModalCloseButton>
        </ModalHeader>
        <Form>
          <InputName>서버 이름 변경</InputName>
          <InputDiv>
            <Input name="name" placeholder="서버명을 입력해주세요" onChange={(e) => setName(e.target.value)} />
            <SubmitButton isButtonActive={isButtonActive} type="button" onClick={onCliclUpdateServer}>
              제출
            </SubmitButton>
          </InputDiv>
          <InputName>서버 설명 변경</InputName>
          <InputDiv>
            <Input
              name="description"
              placeholder="서버 설명을 입력해주세요"
              onChange={(e) => setDescription(e.target.value)}
            />
            <SubmitButton isButtonActive={isButtonActive} type="button" onClick={onCliclUpdateServer}>
              제출
            </SubmitButton>
          </InputDiv>
          <InputName>서버 아이콘 변경</InputName>
          <InputDiv>
            <ImageInputDiv>
              <ImagePreview src={imagePreview} />
              <Input type="file" onChange={onChangePreviewImage} />
            </ImageInputDiv>
            <SubmitButton isButtonActive={isButtonActive} type="button" onClick={onCliclUpdateServer}>
              제출
            </SubmitButton>
          </InputDiv>
          <InputName>서버 URL 재생성</InputName>
          <InputDiv>
            <Input name="url" />
            <SubmitButton isButtonActive={isButtonActive} type="button">
              생성
            </SubmitButton>
          </InputDiv>
          <InputDiv>
            <InputName>서버 삭제</InputName>
            <SubmitButton type="submit" isButtonActive={isButtonActive} onClick={onClickDeleteServer}>
              서버 삭제
            </SubmitButton>
          </InputDiv>
          <MessageFailToPost>{messageFailToPost}</MessageFailToPost>
        </Form>
      </ModalInnerBox>
    </Container>
  );
}

export default ServerSettingModal;
