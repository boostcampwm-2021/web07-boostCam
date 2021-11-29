import React, { useContext } from 'react';
import styled from 'styled-components';

import { BoostCamMainIcons } from '../../utils/SvgIcons';
import { MainStoreContext } from './MainStore';
import UpdateChannelModal from './ChannelModal/UpdateChannelModal';
import QuitChannelModal from './ChannelModal/QuitChannelModal ';

const { Hash } = BoostCamMainIcons;

const Container = styled.div<{ selected: boolean }>`
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HashIcon = styled(Hash)`
  width: 15px;
  min-width: 15px;
  height: 15px;
  min-height: 15px;
  fill: #a69c96;
`;

type ChannelListItemProps = {
  dataId: number;
  selected: boolean;
  name: string;
};

function ChannelListItem(props: ChannelListItemProps): JSX.Element {
  const {
    setSelectedChannel,
    setRightClickedChannelId,
    setRightClickedChannelName,
    setIsDropdownOpen,
    setDropdownInfo,
  } = useContext(MainStoreContext);
  const { dataId, selected, name } = props;

  const onClickChannelBlock = ({ currentTarget }: React.MouseEvent<HTMLDivElement>) => {
    const channelId = currentTarget.dataset.id;
    if (channelId) setSelectedChannel(channelId);
  };

  const onRightClickChannelItem = (e: React.MouseEvent<HTMLDivElement>) => {
    const dropdownInfo = {
      position: [e.pageX, e.pageY],
      components: [
        { name: '수정', component: <UpdateChannelModal key={1} /> },
        { name: '나가기', component: <QuitChannelModal key={2} /> },
      ],
    };
    const channelId = e.currentTarget.dataset.id;
    e.preventDefault();
    setDropdownInfo(dropdownInfo);
    setIsDropdownOpen(true);
    setRightClickedChannelId(channelId);
    setRightClickedChannelName(name);
  };

  return (
    <Container
      data-id={dataId}
      selected={selected}
      onClick={onClickChannelBlock}
      onContextMenu={onRightClickChannelItem}
    >
      <HashIcon />
      <ChannelNameSpan>{name}</ChannelNameSpan>
    </Container>
  );
}

export default ChannelListItem;
