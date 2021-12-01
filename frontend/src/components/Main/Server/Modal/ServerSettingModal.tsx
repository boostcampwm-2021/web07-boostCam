import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { MainStoreContext } from '../../MainStore';
import { ButtonBarIcons } from '../../../../utils/svgIcons';
import ServerDeleteCheckModal from './ServerDeleteCheckModal';
import { fetchData, sendFormData } from '../../../../utils/fetchMethods';
import { ServerEntity } from '../../../../types/server';

const { CopyIcon } = ButtonBarIcons;

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
  width: 270px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  font-size: 16px;
`;

const SubmitButton = styled.button<{ isButtonActive: boolean }>`
  width: 80px;
  height: 30px;
  background: none;

  border: 0;
  outline: 0;
  font-weight: bold;

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
const InputFile = styled.input`
  display: none;
`;
const InputLabel = styled.label`
  background-color: #26a9ca;
  width: 220px;
  height: 40px;
  border-radius: 10px;
  transition: all 0.3s;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: '#2dc2e6';
    transition: all 0.3s;
    cursor: pointer;
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

const CodeDiv = styled.div`
  width: 220px;
  height: 24px;
  padding: 10px 40px 10px 10px;
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: white;
  overflow-x: scroll;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ResizedCopyIcon = styled(CopyIcon)`
  width: 25px;
  height: 25px;
  float: left;
  position: absolute;
  margin-left: 240px;
  &:hover {
    cursor: pointer;
  }
`;

const DeleteButton = styled.button`
  width: 80px;
  height: 30px;
  font-weight: bold;
  border: 0;
  outline: 0;
  text-align: center;
  vertical-align: middle;

  border-radius: 10px;
  background-color: red;
  cursor: pointer;
  transition: all 0.3s;
`;

function ServerSettingModal(): JSX.Element {
  const { setIsModalOpen, setIsAlertModalOpen, setAlertModalContents, selectedServer, getUserServerList } =
    useContext(MainStoreContext);
  const isButtonActive = true;
  const [imagePreview, setImagePreview] = useState<string>();
  const [messageFailToPost, setMessageFailToPost] = useState<string>('');

  const [serverName, setServerName] = useState<string>('');
  const [serverDescription, setServerDescription] = useState<string>('');
  const [files, setFiles] = useState<FileList>();
  const [code, setCode] = useState<string>();

  const serverId = selectedServer?.server.id;

  const onChangePreviewImage = (e: React.ChangeEvent & { target: HTMLInputElement }) => {
    const iconFile = e.target.files;

    if (iconFile) {
      setFiles(iconFile);
      setImagePreview(URL.createObjectURL(iconFile[0]));
    }
  };

  const onCliclUpdateServer = async () => {
    if (!serverName || !serverDescription) {
      setMessageFailToPost('서버 이름과 설명을 모두 채워주세요.');
      return;
    }
    if (serverId) {
      const formData = new FormData();

      formData.append('name', serverName);
      formData.append('description', serverDescription);
      if (files) formData.append('icon', files[0]);

      const { statusCode, message } = await sendFormData('PATCH', `/api/servers/${serverId}`, formData);
      if (statusCode === 204) {
        getUserServerList('updated');
        setIsModalOpen(false);
      } else {
        setMessageFailToPost(`${message}`);
      }
    } else {
      setMessageFailToPost('선택된 서버가 없습니다.');
    }
  };

  const onClickRefreshCode = async () => {
    if (serverId) {
      const { statusCode, message, data } = await fetchData<null, string>('PATCH', `/api/servers/${serverId}/code`);

      if (statusCode === 200) {
        setCode(data);
      } else {
        setMessageFailToPost(`${message}`);
      }
    } else {
      setMessageFailToPost('선택된 서버가 없습니다.');
    }
  };

  const setServerParticipationCode = async () => {
    if (serverId) {
      const { statusCode, message, data } = await fetchData<null, string>('GET', `/api/servers/${serverId}/code`);

      if (statusCode === 200) {
        setCode(data);
      } else {
        setMessageFailToPost(`${message}`);
      }
    } else {
      setMessageFailToPost('선택된 서버가 없습니다.');
    }
  };

  const getServerInfo = async () => {
    const { statusCode, data } = await fetchData<null, ServerEntity>('GET', `/api/servers/${serverId}/users`);
    if (statusCode === 200) {
      const { name, description, imgUrl } = data;

      setServerDescription(description);
      setServerName(name);
      if (imgUrl) {
        setImagePreview(imgUrl);
      }
    }
  };

  const onClickCopyCodeButton = () => {
    navigator.clipboard.writeText(`${code}`);
  };

  const onClickDeleteServerButton = () => {
    setIsAlertModalOpen(true);
    setAlertModalContents(<ServerDeleteCheckModal serverId={serverId} />);
  };

  useEffect(() => {
    getServerInfo();
    setServerParticipationCode();
  }, []);

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <>
      <Form>
        <InputName>새 서버 이름</InputName>
        <InputDiv>
          <Input
            name="name"
            placeholder="서버명을 입력해주세요"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
          />
          <SubmitButton isButtonActive={isButtonActive} type="button" onClick={onCliclUpdateServer}>
            제출
          </SubmitButton>
        </InputDiv>
        <InputName>새 서버 설명</InputName>
        <InputDiv>
          <Input
            name="description"
            placeholder="서버 설명을 입력해주세요"
            value={serverDescription}
            onChange={(e) => setServerDescription(e.target.value)}
          />
        </InputDiv>
        <InputName>서버 아이콘 변경</InputName>
        <InputDiv>
          <ImageInputDiv>
            <ImagePreview src={imagePreview} />
            <InputLabel htmlFor="file">파일을 선택하세요</InputLabel>
            <InputFile id="file" type="file" onChange={onChangePreviewImage} />
          </ImageInputDiv>
        </InputDiv>
        <InputName>서버 참여 코드 재생성</InputName>
        <InputDiv>
          <CodeDiv>{code}</CodeDiv>
          <ResizedCopyIcon onClick={onClickCopyCodeButton} />
          <SubmitButton isButtonActive={isButtonActive} type="button" onClick={onClickRefreshCode}>
            생성
          </SubmitButton>
        </InputDiv>
        <InputDiv>
          <InputName>서버 삭제</InputName>
          <DeleteButton type="submit" onClick={onClickDeleteServerButton}>
            서버 삭제
          </DeleteButton>
        </InputDiv>
        <MessageFailToPost>{messageFailToPost}</MessageFailToPost>
      </Form>
    </>
  );
}

export default ServerSettingModal;
