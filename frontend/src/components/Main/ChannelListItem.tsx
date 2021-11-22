import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { BoostCamMainIcons } from '../../utils/SvgIcons';
import { MainStoreContext } from './MainStore';
import Dropdown from '../core/Dropdown';
import DropdownMenu from '../core/DropdownMenu';

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
`;

const HashIcon = styled(Hash)`
  width: 15px;
  height: 15px;
  fill: #a69c96;
`;

type ChannelListItemProps = {
  dataId: string;
  selected: boolean;
  name: string;
};

function ChannelListItem(props: ChannelListItemProps): JSX.Element {
  const { setSelectedChannel } = useContext(MainStoreContext);
  const [isDropdownActivated, setIsDropdownActivated] = useState<boolean>(false);
  const { dataId, selected, name } = props;

  const onClickChannelBlock = ({ currentTarget }: React.MouseEvent<HTMLDivElement>) => {
    const channelId = currentTarget.dataset.id;
    if (channelId) setSelectedChannel(channelId);
  };

  const onRightClickChannelItem = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const channelId = e.currentTarget.dataset.id;
    console.log(`channelId = ${channelId}`);
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
      <Dropdown isDropdownActivated={isDropdownActivated} setIsDropdownActivated={setIsDropdownActivated}>
        {/* <DropdownMenu
          name="추가"
          setIsDropdownActivated={setIsDropdownActivated}
          state={isCreateModalOpen}
          stateSetter={setIsCreateModalOpen}
        />
        <DropdownMenu
          name="생성"
          setIsDropdownActivated={setIsDropdownActivated}
          state={isJoinModalOpen}
          stateSetter={setIsJoinModalOpen}
        /> */}
      </Dropdown>
    </Container>
  );
}

export default ChannelListItem;
