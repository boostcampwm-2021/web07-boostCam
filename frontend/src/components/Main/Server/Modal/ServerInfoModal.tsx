import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { MainStoreContext } from '../../MainStore';
import { fetchData } from '../../../../utils/fetchMethods';
import { flex } from '../../../../utils/styledComponentFunc';

const Container = styled.div`
  width: 100%;
  ${flex('column', 'flex-start', 'flex-start')};
`;

const ServerTitleBox = styled.div`
  margin-left: 25px;
  padding: 10px 5px;
  width: 350px;
  ${flex('row')};
`;

const InformationBox = styled.div`
  margin-left: 25px;
  padding: 10px 5px;
  width: 350px;
  ${flex('column', 'end', 'start')};
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
  width: 90%;
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
  width: 95%;
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
  width: 265px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

type ServerInfo = {
  name: string;
  description: string;
  users: Array<UserInfo>;
  imgUrl: string;
};

type UserInfo = {
  id: number;
  nickname: string;
  profile: string;
};

function ServerInfoModal(): JSX.Element {
  const { selectedServer } = useContext(MainStoreContext);
  const [joinedUserList, setJoinedUserList] = useState<UserInfo[]>();
  const [serverDescription, setServerDescription] = useState<string>();
  const [serverName, setServerName] = useState<string>('');
  const [serverIconUrl, setServerIconUrl] = useState<string>();

  const getServerInfo = async () => {
    const serverId = selectedServer.server.id;
    const { statusCode, data } = await fetchData<null, ServerInfo>('GET', `/api/servers/${serverId}/users`);
    if (statusCode === 200) {
      const { name, description, users, imgUrl } = data;

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
    </Container>
  );
}

export default ServerInfoModal;
