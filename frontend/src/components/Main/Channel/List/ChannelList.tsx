import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { ChannelListData } from '../../../../types/main';
import { flex } from '../../../../utils/styledComponentFunc';
import { MainStoreContext } from '../../MainStore';
import ChannelListHeader from './ChannelListHeader';
import ChannelListItem from './ChannelListItem';

const Container = styled.div`
  width: 100%;
  background-color: #492148;

  margin-top: 10px;
  ${flex('column', 'flex-start', 'flex-start')}
`;

const ChannelListBody = styled.div`
  width: 100%;
  ${flex('column', 'flex-start', 'flex-start')}

  color: #a69c96;
  font-size: 15px;
`;
function ChannelList(): JSX.Element {
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const { selectedServer, selectedChannel, serverChannelList } = useContext(MainStoreContext);
  const navigate = useNavigate();
  useEffect(() => {
    const serverId = selectedServer?.server?.id || 'none';

    navigate({
      search: `?${createSearchParams({
        serverId,
        channelId: selectedChannel,
      })}`,
    });
  }, [selectedChannel]);

  const listElements = serverChannelList.map((val: ChannelListData): JSX.Element => {
    const selected = val.id === selectedChannel;
    return <ChannelListItem key={val.id} dataId={val.id} selected={selected} name={val.name} />;
  });

  return (
    <Container>
      <ChannelListHeader isListOpen={isListOpen} setIsListOpen={setIsListOpen} />
      {isListOpen && <ChannelListBody>{listElements}</ChannelListBody>}
    </Container>
  );
}

export default ChannelList;
