import React, { useContext, useEffect, useState } from 'react';
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

const ServerTitleBox = styled.div`
  margin-left: 25px;
  padding: 10px 5px;
  width: 350px;
  display: flex;
`;

const InformationBox = styled.div`
  margin-left: 25px;
  padding: 10px 5px;
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  item-align: start;
  color: #cbc4b9;
  font-size: 20px;
  font-weight: 600;
`;

const SubTitle = styled.div`
  color: #cbc4b9;
  font-size: 20px;
  font-weight: 600;
  width: 100%;
`;

const ServerIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 5px;
`;

const ServerName = styled.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  margin-right: 10px;
  font-size: 30px;
  font-weight: bold;
  background-color: #ffffff;
  border-radius: 5px;
  text-align: center;
`;

const InfoParagraph = styled.div`
  background-color: #eeeeee;
  border-radius: 10px;
  color: black;
  padding: 0px 10px;
  height: 80px;
  overflow-y: auto;
  margin: 0px;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #999999;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #cccccc;
    border-radius: 10px;
  }
`;

const InfoDiv = styled.div`
  background-color: #eeeeee;
  border-radius: 10px;
  color: black;
  min-height: 80px;
  max-height: 150px;
  overflow-y: auto;
  margin: 0px;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #999999;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #cccccc;
    border-radius: 10px;
  }
`;

const ServerParticipant = styled.div`
  display: flex;
  align-items: center;
`;

const ParticipantIcon = styled.div<{ imgUrl: string }>`
  width: 36px;
  height: 36px;
  margin: 5px;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 8px;
`;

const ParticipantNickname = styled.div`
  height: 36px;
`;

const InfoSpan = styled.span`
  background-color: #eeeeee;
  border-radius: 10px;
  padding: 0px 10px;
  height: 40px;
  overflow-y: auto;
  color: black;
  font-size: 20px;
  font-weight: 600;
  width: 330px;

  &::-webkit-scrollbar {
    display: none;
  }
`;
type UserInfo = {
  id: number;
  nickname: string;
  profile: string;
};

function ServerInfoModal(): JSX.Element {
  const { setIsModalOpen, selectedServer } = useContext(MainStoreContext);
  const [joinedUserList, setJoinedUserList] = useState<UserInfo[]>();
  const [serverDescription, setServerDescription] = useState<string>();
  const [serverName, setServerName] = useState<string>('');
  const [serverIconUrl, setServerIconUrl] = useState<string>();

  const getServerInfo = async () => {
    const serverId = selectedServer.server.id;
    const response = await fetch(`/api/servers/${serverId}/users`);
    const serverInfo = await response.json();

    if (response.status === 200) {
      const { name, description, users, imgUrl } = serverInfo.data;

      setJoinedUserList(users);
      setServerDescription(description);
      setServerName(name);
      if (imgUrl) {
        setServerIconUrl(imgUrl);
      }
    }
  };
  useEffect(() => {
    getServerInfo();
  }, []);
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <Container>
      <ModalInnerBox>
        <ModalHeader>
          <ModalTitle>서버 정보</ModalTitle>
          <ModalCloseButton onClick={() => setIsModalOpen(false)}>
            <CloseIcon />
          </ModalCloseButton>
        </ModalHeader>
        <ServerTitleBox>
          {serverIconUrl ? <ServerIcon src={serverIconUrl} /> : <ServerName>{serverName[0]}</ServerName>}
          <InfoSpan>{serverName}</InfoSpan>
        </ServerTitleBox>
        <InformationBox>
          <SubTitle>서버 설명</SubTitle>
          <InfoParagraph>{serverDescription}</InfoParagraph>
        </InformationBox>
        <InformationBox>
          <SubTitle>서버 사용자 리스트</SubTitle>
          <InfoDiv>
            {joinedUserList?.map((joinedUser) => {
              const { nickname, profile, id } = joinedUser;
              return (
                <ServerParticipant key={id}>
                  <ParticipantIcon imgUrl={profile} />
                  <ParticipantNickname>{nickname}</ParticipantNickname>
                </ServerParticipant>
              );
            })}
          </InfoDiv>
        </InformationBox>
      </ModalInnerBox>
    </Container>
  );
}

export default ServerInfoModal;
