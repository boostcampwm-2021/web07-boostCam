import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ChannelEntity from '../../../types/channel';
import { CommentListInfo } from '../../../types/comment';
import { MyServerData } from '../../../types/main';
import { MessageListInfo } from '../../../types/message';
import { User } from '../../../types/user';
import { fetchData } from '../../../utils/fetchMethods';
import { flex } from '../../../utils/styledComponentFunc';
import Loading from '../../core/Loading';
import { MainStoreContext } from '../MainStore';
import MessageSection from './MessageSection';
import NoChannelSection from './NoChannelSection';
import ThreadSection from './ThreadSection';

const Container = styled.div`
  flex: 1 0 0;
  height: 100%;

  ${flex('row', 'space-around', 'center')}
  background-color: #ffffff;
`;

type ContentsSectionProps = {
  messageList: MessageListInfo;
  commentList: CommentListInfo;
};

const getJoinedUserList = async (selectedServer: MyServerData, selectedChannel: number) => {
  const response = await fetchData<null, User[]>(
    'GET',
    `/api/user/servers/${selectedServer?.server.id}/channels/users?channelId=${selectedChannel}`,
  );
  return response;
};

const getSelectedChannelInfo = async (selectedChannel: number) => {
  const response = await fetchData<null, ChannelEntity>('GET', `/api/channels/${selectedChannel}`);
  return response;
};

function ContentsSection(props: ContentsSectionProps): JSX.Element {
  const { selectedChannel, selectedServer } = useContext(MainStoreContext);
  const [isThreadOpen, setIsThreadOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState<User[]>([]);
  const [channelInfo, setChannelInfo] = useState<ChannelEntity | undefined>();
  const { messageList, commentList } = props;

  const getChannelInfo = async () => {
    if (!selectedChannel) {
      setIsLoading(false);
      return;
    }
    const selectedChannelInfo = await getSelectedChannelInfo(selectedChannel);
    if (selectedChannelInfo.statusCode > 300) {
      setIsLoading(false);
      setChannelInfo(undefined);
      return;
    }
    const joinedUserList = await getJoinedUserList(selectedServer, selectedChannel);
    setIsLoading(false);
    setUserList(joinedUserList.data);
    setChannelInfo(selectedChannelInfo.data);
  };

  useEffect(() => {
    setIsLoading(true);
    getChannelInfo();
  }, [selectedChannel]);

  useEffect(() => {
    setIsThreadOpen(false);
  }, [selectedServer]);

  const buildContentsSection = () => {
    if (!selectedChannel) return <NoChannelSection />;
    return (
      <MessageSection
        messageList={messageList}
        setIsThreadOpen={setIsThreadOpen}
        userList={userList}
        channelInfo={channelInfo}
      />
    );
  };

  return (
    <Container>
      {isLoading ? <Loading /> : buildContentsSection()}
      {isThreadOpen && (
        <ThreadSection setIsThreadOpen={setIsThreadOpen} channelInfo={channelInfo} commentList={commentList} />
      )}
    </Container>
  );
}

export default ContentsSection;
