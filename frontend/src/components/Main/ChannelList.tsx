import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { BoostCamMainIcons } from '../../utils/SvgIcons';
import { ChannelData } from '../../types/main';
import { MainStoreContext } from './MainStore';
import Dropdown from '../core/Dropdown';
import DropdownMenu from '../core/DropdownMenu';

const { Hash, Plus, ListArrow } = BoostCamMainIcons;

const Container = styled.div`
  width: 100%;
  background-color: #492148;

  margin-top: 10px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ChannelListHeader = styled.div`
  width: 90%;
  height: 30px;

  margin-left: 15px;
  color: #a69c96;
  font-size: 17px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const ChannelListHeaderSpan = styled.span`
  margin-left: 5px;
`;

const ChannelListHeaderButton = styled.div<{ isButtonVisible: boolean }>`
  margin-left: 70px;
  visibility: ${(props) => (props.isButtonVisible ? 'visible' : 'hidden')};
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

const ChannelNameBlock = styled.div<{ selected: boolean }>`
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

const ListArrowIcon = styled(ListArrow)<{ isListOpen: boolean }>`
  width: 20px;
  height: 20px;
  fill: #a69c96;
  transition: all ease-out 0.3s;
  ${(props) => (props.isListOpen ? 'transform: rotate(90deg);' : 'transform: rotate(0deg);')}
`;

const PlusIcon = styled(Plus)`
  width: 20px;
  height: 20px;
  fill: #a69c96;
`;

const HashIcon = styled(Hash)`
  width: 15px;
  height: 15px;
  fill: #a69c96;
`;

function ChannelList(): JSX.Element {
  const [channelList, setChannelList] = useState<ChannelData[]>([]);
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(false);
  const [isDropdownActivated, setIsDropdownActivated] = useState<boolean>(false);
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const {
    selectedServer,
    selectedChannel,
    isCreateModalOpen,
    isJoinModalOpen,
    setSelectedChannel,
    setIsCreateModalOpen,
    setIsJoinModalOpen,
  } = useContext(MainStoreContext);
  const navigate = useNavigate();

  const onClickChannelBlock = (e: React.MouseEvent<HTMLDivElement>) => {
    const channelId = e.currentTarget.dataset.id;
    if (channelId) setSelectedChannel(channelId);
  };

  const onClickChannelAddButton = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.stopPropagation();
    setIsDropdownActivated(!isDropdownActivated);
  };

  const getChannelList = async (): Promise<void> => {
    const response = await fetch('/api/channel/list');
    const list = await response.json();

    setChannelList(list.data);
  };

  useEffect(() => {
    getChannelList();
  }, []);

  useEffect(() => {
    navigate({
      search: `?${createSearchParams({
        serverId: selectedServer,
        channelId: selectedChannel,
      })}`,
    });
  }, [selectedChannel]);

  const listElements = channelList.map((val: ChannelData): JSX.Element => {
    const selected = val.id === selectedChannel;
    return (
      <ChannelNameBlock key={val.id} data-id={val.id} selected={selected} onClick={onClickChannelBlock}>
        <HashIcon />
        <ChannelNameSpan>{val.name}</ChannelNameSpan>
      </ChannelNameBlock>
    );
  });

  return (
    <Container>
      <ChannelListHeader
        onMouseEnter={() => setIsButtonVisible(true)}
        onMouseLeave={() => setIsButtonVisible(false)}
        onClick={() => setIsListOpen(!isListOpen)}
      >
        <ListArrowIcon isListOpen={isListOpen} />
        <ChannelListHeaderSpan>채널</ChannelListHeaderSpan>
        <ChannelListHeaderButton isButtonVisible={isButtonVisible}>
          <PlusIcon onClick={onClickChannelAddButton} />
          <Dropdown isDropdownActivated={isDropdownActivated} setIsDropdownActivated={setIsDropdownActivated}>
            <DropdownMenu
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
            />
          </Dropdown>
        </ChannelListHeaderButton>
      </ChannelListHeader>
      {isListOpen && <ChannelListBody>{listElements}</ChannelListBody>}
    </Container>
  );
}

export default ChannelList;
