import React from 'react';
import styled from 'styled-components';

import { BoostCamMainIcons } from '../../../utils/SvgIcons';

const { ListArrow } = BoostCamMainIcons;

const Container = styled.div`
  width: 100%;
  height: 100%;

  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ChattingSectionHeader = styled.div`
  width: 100%;
  height: 25px;
  flex: 0.5;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ChannelName = styled.div`
  margin-left: 15px;
  padding: 3px 5px;
  border-radius: 10px;

  cursor: pointer;

  &:hover {
    background-color: #f0e7e7;
  }
`;

const ChannelUserButton = styled.div`
  margin-right: 15px;
  padding: 3px 5px;
  border: 1px solid gray;
  border-radius: 10px;

  cursor: pointer;

  &:hover {
    background-color: #f0e7e7;
  }
`;

const ChattingSectionBody = styled.div`
  width: 100%;
  flex: 5;

  overflow-y: auto;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ChattingItemBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  &:hover {
    background-color: #f0e7e7;
  }
`;

const ChattingItemIcon = styled.div`
  width: 36px;
  height: 36px;
  margin: 10px;
  background-color: indigo;
  border-radius: 8px;
`;

const ChattingItem = styled.div`
  width: 90%;
  padding: 8px 0px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ChattingItemHeader = styled.div`
  min-width: 150px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const ChattingSender = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const ChattingTimelog = styled.span`
  font-size: 10px;
`;

const ChattingContents = styled.span`
  font-size: 13px;
`;

const ChattingTextarea = styled.textarea`
  width: 100%;
  flex: 1;
`;

const ListArrowIcon = styled(ListArrow)`
  width: 20px;
  height: 20px;
  fill: #a69c96;
  transform: rotate(90deg);
`;

function ChattingSection(): JSX.Element {
  const tmpAry = new Array(30).fill('value');

  const tmpChattingItems = tmpAry.map((val: string, idx: number): JSX.Element => {
    const key = `${val}-${idx}`;
    const tmp = new Array(idx).fill('chatting');
    const contents = tmp.reduce((acc, va) => {
      return `${acc}-${va}`;
    }, '');
    return (
      <ChattingItemBlock key={key}>
        <ChattingItemIcon />
        <ChattingItem>
          <ChattingItemHeader>
            <ChattingSender> Sender {idx}</ChattingSender>
            <ChattingTimelog>Timestamp</ChattingTimelog>
          </ChattingItemHeader>
          <ChattingContents>
            `${contents}-${idx}`
          </ChattingContents>
        </ChattingItem>
      </ChattingItemBlock>
    );
  });

  return (
    <Container>
      <ChattingSectionHeader>
        <ChannelName> # ChannelName</ChannelName>
        <ChannelUserButton>Users 5</ChannelUserButton>
      </ChattingSectionHeader>
      <ChattingSectionBody>{tmpChattingItems}</ChattingSectionBody>
      <ChattingTextarea />
    </Container>
  );
}

export default ChattingSection;
