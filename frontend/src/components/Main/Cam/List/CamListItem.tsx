import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { BoostCamMainIcons } from '../../../../utils/svgIcons';
import { MainStoreContext } from '../../MainStore';
import CamDeleteModal from '../Modal/CamDeleteModal';

const { Hash } = BoostCamMainIcons;

type CamListItemProps = {
  id: number;
  name: string;
  url: string;
};

const Container = styled.div`
  width: 100%;
  height: 25px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  box-sizing: border-box;
  padding: 15px 0px 15px 25px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: inherit;

  &:hover {
    cursor: pointer;
  }
`;

const HashIcon = styled(Hash)`
  width: 15px;
  min-width: 15px;
  height: 15px;
  min-height: 15px;
  fill: #a69c96;
`;

const CamNameSpan = styled.span`
  padding: 5px 0px 5px 5px;
`;

function CamListItem(props: CamListItemProps): JSX.Element {
  const { id, name, url } = props;
  const navigate = useNavigate();
  const { setIsDropdownOpen, setDropdownInfo } = useContext(MainStoreContext);

  const onClickCam = () => {
    navigate(`/cam?roomid=${url}`);
  };

  const onContextCam = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const dropdownInfo = {
      position: [e.pageX, e.pageY],
      components: [
        {
          name: '삭제',
          component: {
            contents: <CamDeleteModal camId={id} />,
            title: 'cam 삭제',
            description: `${name} cam을 삭제하시겠습니까?`,
            height: '30%',
            minHeight: '250px',
          },
        },
      ],
    };

    setDropdownInfo(dropdownInfo);
    setIsDropdownOpen(true);
  };

  return (
    <Container onClick={onClickCam} onContextMenu={onContextCam}>
      <HashIcon />
      <CamNameSpan>{name}</CamNameSpan>
    </Container>
  );
}

export default CamListItem;
