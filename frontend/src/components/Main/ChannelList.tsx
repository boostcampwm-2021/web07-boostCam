import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { useNavigate } from 'react-router-dom';
import socketState from '../../atoms/socket';

import { BoostCamMainIcons } from '../../utils/SvgIcons';

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

const ChannelListHeader = styled.div`
  width: 100%;
  height: 30px;

  margin-left: 15px;
  color: #a69c96;
  font-size: 17px;

  &:hover {
    cursor: pointer;
  }
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

const ChannelNameBlock = styled.div`
  width: 100%;
  height: 25px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  box-sizing: border-box;
  margin-top: 5px;
  padding-left: 25px;
  &:hover {
    cursor: pointer;
    background-color: #321832;
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
  const socket = useRecoilValue(socketState);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <Container>
      <ChannelListHeader>채널</ChannelListHeader>
      <ChannelListBody>
        <ChannelNameBlock>
          <HashIcon />
          <ChannelNameSpan>Channel 1</ChannelNameSpan>
        </ChannelNameBlock>
        <ChannelNameBlock>
          <HashIcon />
          <ChannelNameSpan>Channel 2</ChannelNameSpan>
        </ChannelNameBlock>
        <ChannelNameBlock>
          <HashIcon />
          <ChannelNameSpan>Channel 3</ChannelNameSpan>
        </ChannelNameBlock>
        <ChannelNameBlock>
          <HashIcon />
          <ChannelNameSpan>Channel 4</ChannelNameSpan>
        </ChannelNameBlock>
        <ChannelNameBlock>
          <HashIcon />
          <ChannelNameSpan>Channel 5</ChannelNameSpan>
        </ChannelNameBlock>
      </ChannelListBody>
    </Container>
  );
}

export default ChannelList;
