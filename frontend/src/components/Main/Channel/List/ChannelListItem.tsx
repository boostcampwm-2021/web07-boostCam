import React, { useContext } from 'react';
import styled from 'styled-components';

import { BoostCamMainIcons } from '../../../../utils/svgIcons';
import { MainStoreContext } from '../../MainStore';
import UpdateChannelModal from '../Modal/UpdateChannelModal';
import QuitChannelModal from '../Modal/QuitChannelModal ';

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
  const { dataId, selected, name } = props;
  const {
    rightClickedChannelName,
    setSelectedChannel,
    setRightClickedChannelId,
    setRightClickedChannelName,
    setIsDropdownOpen,
    setDropdownInfo,
  } = useContext(MainStoreContext);

  const onClickChannelBlock = () => {
    setSelectedChannel(dataId);
  };

  const onRightClickChannelItem = (e: React.MouseEvent<HTMLDivElement>) => {
    const dropdownInfo = {
      position: [e.pageX, e.pageY],
      components: [
        {
          name: '수정',
          component: {
            contents: <UpdateChannelModal key={1} />,
            title: '채널 수정',
            description: '선택한 채널에 대한 내용을 변경할 수 있습니다.',
            height: '70%',
            minHeight: '450px',
          },
        },
        {
          name: '나가기',
          component: {
            contents: <QuitChannelModal key={2} />,
            title: '채널 나가기',
            description: `${rightClickedChannelName} 채널에서 나갑니다`,
            height: '30%',
            minHeight: '250px',
          },
        },
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
