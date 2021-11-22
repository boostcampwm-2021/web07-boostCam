import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { BoostCamMainIcons } from '../../utils/SvgIcons';
import { ChannelData } from '../../types/main';
import { MainStoreContext } from './MainStore';
import ChannelListHeader from './ChannelListHeader';
import ChannelListItem from './ChannelListItem';

const Container = styled.div`
  width: 100%;
  background-color: #492148;

  margin-top: 10px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ChannelListBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  color: #a69c96;
  font-size: 15px;
`;
function ChannelList(): JSX.Element {
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const [clickedChannel, setClickedChannel] = useState<number>(-1);
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

  const listElements = serverChannelList.map((val: ChannelData): JSX.Element => {
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
