import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { BoostCamMainIcons } from '../../utils/SvgIcons';
import { MainStoreContext } from './MainStore';
import Dropdown from '../core/Dropdown';
import DropdownMenu from '../core/DropdownMenu';
import CreateChannelModal from './ChannelModal/CreateChannelModal';
import JoinChannelModal from './ChannelModal/JoinChannelModal';

const { Plus, ListArrow } = BoostCamMainIcons;

const Container = styled.div`
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

const ListArrowIcon = styled(ListArrow)<{ $isListOpen: boolean }>`
  width: 20px;
  height: 20px;
  fill: #a69c96;
  transition: all ease-out 0.3s;
  ${(props) => (props.$isListOpen ? 'transform: rotate(90deg);' : 'transform: rotate(0deg);')}
`;

const PlusIcon = styled(Plus)`
  width: 20px;
  height: 20px;
  fill: #a69c96;
`;

type ChannelListHeaderProps = {
  isListOpen: boolean;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function ChannelListHeader(props: ChannelListHeaderProps): JSX.Element {
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(false);
  const [isDropdownActivated, setIsDropdownActivated] = useState<boolean>(false);
  const { isListOpen, setIsListOpen } = props;
  const { selectedServer, selectedChannel } = useContext(MainStoreContext);
  const navigate = useNavigate();

  const onClickChannelAddButton = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.stopPropagation();
    setIsDropdownActivated(!isDropdownActivated);
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

  return (
    <Container
      onMouseEnter={() => setIsButtonVisible(true)}
      onMouseLeave={() => setIsButtonVisible(false)}
      onClick={() => setIsListOpen(!isListOpen)}
    >
      <ListArrowIcon $isListOpen={isListOpen} />
      <ChannelListHeaderSpan>채널</ChannelListHeaderSpan>
      <ChannelListHeaderButton isButtonVisible={isButtonVisible}>
        <PlusIcon onClick={onClickChannelAddButton} />
        <Dropdown isDropdownActivated={isDropdownActivated} setIsDropdownActivated={setIsDropdownActivated}>
          <DropdownMenu
            name="채널 생성"
            setIsDropdownActivated={setIsDropdownActivated}
            modalContents={{
              contents: <CreateChannelModal />,
              title: '채널 생성',
              description: '생성할 채널의 이름과 설명을 입력해주세요.',
            }}
          />
          <DropdownMenu
            name="채널 참가"
            setIsDropdownActivated={setIsDropdownActivated}
            modalContents={{
              contents: <JoinChannelModal />,
              title: '채널 참가',
              description: '참가할 채널을 선택해주세요.',
            }}
          />
        </Dropdown>
      </ChannelListHeaderButton>
    </Container>
  );
}

export default ChannelListHeader;
