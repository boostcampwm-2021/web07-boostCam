import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { BoostCamMainIcons } from '../../utils/SvgIcons';
import { ChannelData } from '../../types/main';
import { MainStoreContext } from './MainStore';
import ChannelListHeader from './ChannelListHeader';

const { Hash } = BoostCamMainIcons;

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

const ChannelListItem = styled.div<{ selected: boolean }>`
  width: 100%;
  height: 25px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  box-sizing: border-box;
  padding: 15px 0px 15px 25px;
  ${(props) => (props.selected ? 'background-color:#21557C;' : '')}

  &:hover {
    cursor: pointer;
    background-color: ${(props) => (props.selected ? '#21557C' : '#321832')};
  }
`;

const ChannelNameSpan = styled.span`
  padding: 5px 0px 5px 5px;
`;

const HashIcon = styled(Hash)`
  width: 15px;
  height: 15px;
  fill: #a69c96;
`;

function ChannelList(): JSX.Element {
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const { selectedServer, selectedChannel, serverChannelList, setSelectedChannel } = useContext(MainStoreContext);
  const navigate = useNavigate();

  const onClickChannelBlock = ({ currentTarget }: React.MouseEvent<HTMLDivElement>) => {
    const channelId = currentTarget.dataset.id;
    if (channelId) setSelectedChannel(channelId);
  };

  const onRightClickChannelItem = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

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
    return (
      <ChannelListItem
        key={val.id}
        data-id={val.id}
        selected={selected}
        onClick={onClickChannelBlock}
        onContextMenu={onRightClickChannelItem}
      >
        <HashIcon />
        <ChannelNameSpan>{val.name}</ChannelNameSpan>
      </ChannelListItem>
    );
  });

  return (
    <Container>
      <ChannelListHeader isListOpen={isListOpen} setIsListOpen={setIsListOpen} />
      {isListOpen && <ChannelListBody>{listElements}</ChannelListBody>}
    </Container>
  );
}

export default ChannelList;
