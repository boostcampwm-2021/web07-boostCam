import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { MainStoreContext } from '../../MainStore';
import { ButtonBarIcons } from '../../../../utils/svgIcons';
import ServerDeleteCheckModal from './ServerDeleteCheckModal';
import { fetchData, sendFormData } from '../../../../utils/fetchMethods';
import { ServerEntity } from '../../../../types/server';
import { flex } from '../../../../utils/styledComponentFunc';
import { ToggleStoreContext } from '../../ToggleStore';

const { CopyIcon } = ButtonBarIcons;

const Form = styled.div`
  width: 90%;
  height: 100%;
  border-radius: 20px;
  margin: 0px 0px 0px 25px;
  ${flex('column', 'flex-start', 'flex-start')}
`;

const InputDiv = styled.div`
  width: 100%;
  height: 100%;
  ${flex('row', 'space-between', 'center')}
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ImageInputDiv = styled.div`
  width: 270px;
  height: 100%;
  ${flex('row', 'space-between', 'center')}
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
  background-color: white;
  border-radius: 5px;
`;

const ServerName = styled.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  font-size: 30px;
  font-weight: bold;
  background-color: #ffffff;
  border-radius: 5px;
  text-align: center;
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
  const { selectedServer, getUserServerList } = useContext(MainStoreContext);
  const { setIsModalOpen, setIsAlertModalOpen, setAlertModalContents } = useContext(ToggleStoreContext);
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
      setMessageFailToPost('?????? ????????? ????????? ?????? ???????????????.');
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
      setMessageFailToPost('????????? ????????? ????????????.');
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
      setMessageFailToPost('????????? ????????? ????????????.');
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
      setMessageFailToPost('????????? ????????? ????????????.');
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
        <InputName>??? ?????? ??????</InputName>
        <InputDiv>
          <Input
            name="name"
            placeholder="???????????? ??????????????????"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
          />
          <SubmitButton isButtonActive={isButtonActive} type="button" onClick={onCliclUpdateServer}>
            ??????
          </SubmitButton>
        </InputDiv>
        <InputName>??? ?????? ??????</InputName>
        <InputDiv>
          <Input
            name="description"
            placeholder="?????? ????????? ??????????????????"
            value={serverDescription}
            onChange={(e) => setServerDescription(e.target.value)}
          />
        </InputDiv>
        <InputName>?????? ????????? ??????</InputName>
        <InputDiv>
          <ImageInputDiv>
            {imagePreview ? <ImagePreview src={imagePreview} /> : <ServerName>{serverName[0]}</ServerName>}
            <InputLabel htmlFor="file">????????? ???????????????</InputLabel>
            <InputFile id="file" type="file" onChange={onChangePreviewImage} />
          </ImageInputDiv>
        </InputDiv>
        <InputName>?????? ?????? ?????? ?????????</InputName>
        <InputDiv>
          <CodeDiv>{code}</CodeDiv>
          <ResizedCopyIcon onClick={onClickCopyCodeButton} />
          <SubmitButton isButtonActive={isButtonActive} type="button" onClick={onClickRefreshCode}>
            ??????
          </SubmitButton>
        </InputDiv>
        <InputDiv>
          <InputName>?????? ??????</InputName>
          <DeleteButton type="submit" onClick={onClickDeleteServerButton}>
            ?????? ??????
          </DeleteButton>
        </InputDiv>
        <MessageFailToPost>{messageFailToPost}</MessageFailToPost>
      </Form>
    </>
  );
}

export default ServerSettingModal;
