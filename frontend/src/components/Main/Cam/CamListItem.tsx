import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { BoostCamMainIcons } from '../../../utils/SvgIcons';

const { Hash } = BoostCamMainIcons;

type CamListItemProps = {
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
  const { name, url } = props;
  const navigate = useNavigate();

  const onClickCam = () => {
    navigate(`/cam?roomid=${url}`);
  };

  return (
    <Container onClick={onClickCam}>
      <HashIcon />
      <CamNameSpan>{name}</CamNameSpan>
    </Container>
  );
}

export default CamListItem;
