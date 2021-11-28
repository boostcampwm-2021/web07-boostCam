import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ChannelEntity from '../../../types/channel';
import { MyServerData } from '../../../types/main';
import { MessageListInfo } from '../../../types/message';
import { User } from '../../../types/user';
import fetchData from '../../../utils/fetchMethods';
import Loading from '../../core/Loading';
import { MainStoreContext } from '../MainStore';
import MessageSection from './MessageSection';
import ThreadSection from './ThreadSection';

const Container = styled.div`
  flex: 1 0 0;
  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

type ContentsSectionProps = {
  messageList: MessageListInfo;
};

const getJoinedUserList = async (selectedServer: MyServerData, selectedChannel: string) => {
  const response = await fetchData<null, User[]>(
    'GET',
    `/api/user/servers/${selectedServer?.id}/channels/users?channelId=${selectedChannel}`,
  );
  return response.data;
};

const getSelectedChannelInfo = async (selectedChannel: string) => {
  const response = await fetchData<null, ChannelEntity>('GET', `/api/channel/${selectedChannel}`);
  return response.data;
};

function ContentsSection(props: ContentsSectionProps): JSX.Element {
  const { selectedChannel, selectedServer } = useContext(MainStoreContext);
  const [isThreadOpen, setIsThreadOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState<User[]>([]);
  const [channelInfo, setChannelInfo] = useState<ChannelEntity | undefined>();
  const { messageList } = props;

  const getChannelInfo = async () => {
    const joinedUserList = await getJoinedUserList(selectedServer, selectedChannel);
    const selectedChannelInfo = await getSelectedChannelInfo(selectedChannel);
    setUserList(joinedUserList);
    setChannelInfo(selectedChannelInfo);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getChannelInfo();
  }, [selectedChannel]);

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <MessageSection
          messageList={messageList}
          setIsThreadOpen={setIsThreadOpen}
          userList={userList}
          channelInfo={channelInfo}
        />
      )}
      {isThreadOpen && <ThreadSection setIsThreadOpen={setIsThreadOpen} channelInfo={channelInfo} />}
    </Container>
  );
}

export default ContentsSection;
