import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';

import { MainStoreContext } from '../MainStore';
import { ChannelListData } from '../../../types/main';
import { fetchData } from '../../../utils/fetchMethods';
import { JoinChannelRequest } from '../../../types/join-channel-request';
import { customScroll, flex } from '../../../utils/styledComponentFunc';
import { ToggleStoreContext } from '../ToggleStore';

const Container = styled.div`
  width: 50%;
  min-width: 400px;
  height: 70%;
  min-height: 500px;

  border: 5px solid #222322;
  background-color: #dfdbdb;

  ${flex('column', 'center', 'center')}

  border-radius: 20px;
`;

const ModalInnerBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 10px;
  ${flex('column', 'flex-start', 'flex-start')}
`;

const ModalHeader = styled.div`
  width: 100%;
  ${flex('row', 'space-between', 'center')}
  flex: 1;
`;

const ModalTitle = styled.span`
  margin-left: 25px;
  padding: 10px 5px;

  font-size: 32px;
  font-weight: 600;
`;

const ModalDescription = styled.span`
  flex: 0.3;
  margin-left: 25px;
  padding: 10px 5px;

  font-size: 15px;
`;

const ModalChannelList = styled.div`
  width: 90%;
  height: 70%;
  margin-left: 25px;
  margin-bottom: 25px;
  ${flex('column', 'flex-start', 'center')}

  border: 2px solid black;
  border-radius: 5px;

  flex: 4;

  overflow-y: auto;

  background-color: #b9b5b5;
  ${customScroll()};
`;

const ModalChannelListItem = styled.div`
  width: 90%;
  padding: 15px 10px;
  margin: 3px 0px 0px 0px;
  ${flex('row', 'flex-start', 'center')};

  font-size: 18px;

  border-top: 1px solid #e5e0d8;

  &:last-child {
    border-bottom: 1px solid #e5e0d8;
  }

  &:hover {
    button {
      visibility: visible;
    }
    background-color: #dad6d6;
  }

  button {
    visibility: hidden;
  }
`;

const ItemText = styled.div`
  flex: 4;
  ${flex('column', 'space-around', 'flex-start')}
`;

const ItemTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

const ItemDescription = styled.span`
  text-align: center;
  font-weight: 400;
  color: #6e6d69;
`;

const ItemButton = styled.button`
  border: none;
  border-radius: 5px;
  flex: 0.5;
  padding: 4px 12px 4px;
  text-align: center;
  background-color: #38ad3e;
  cursor: pointer;
`;

function NoChannelSection(): JSX.Element {
  const { selectedServer, getServerChannelList, socket } = useContext(MainStoreContext);
  const { setIsModalOpen } = useContext(ToggleStoreContext);
  const [channelList, setChannelList] = useState<ChannelListData[]>([]);

  const getNotJoinedChannelList = async () => {
    const { data } = await fetchData<null, ChannelListData[]>(
      'GET',
      `/api/user/servers/${selectedServer?.server.id}/channels/notjoined/`,
    );
    setChannelList(data);
  };

  const onClickChannelListButton = async (id: number) => {
    const resquestBody = {
      channelId: id,
    };
    await fetchData<JoinChannelRequest, null>(
      'POST',
      `/api/user/servers/${selectedServer.server.id}/channels`,
      resquestBody,
    );
    getServerChannelList();
    socket.emit('joinChannel', { channelId: id });
    setIsModalOpen(false);
  };

  useEffect(() => {
    getNotJoinedChannelList();
    return () => setChannelList([]);
  }, []);

  useEffect(() => {
    getNotJoinedChannelList();
  }, [selectedServer]);

  const notJoinedChannelList = channelList.map((val) => (
    <ModalChannelListItem key={val.id}>
      <ItemText>
        <ItemTitle>{val.name}</ItemTitle>
        <ItemDescription>{val.description}</ItemDescription>
      </ItemText>
      <ItemButton onClick={() => onClickChannelListButton(val.id)}>참여</ItemButton>
    </ModalChannelListItem>
  ));

  return (
    <Container>
      <ModalInnerBox>
        <ModalHeader>
          <ModalTitle>채널 참가</ModalTitle>
        </ModalHeader>
        <ModalDescription>현재 참가하고 있는 채널이 없습니다!</ModalDescription>
        <ModalDescription>아래 목록에서 참가할 채널을 선택해주세요</ModalDescription>
        <ModalDescription>혹은 왼쪽의 채널 리스트에서 새로운 채널을 생성해주세요</ModalDescription>
        <ModalChannelList>{notJoinedChannelList}</ModalChannelList>
      </ModalInnerBox>
    </Container>
  );
}

export default NoChannelSection;
