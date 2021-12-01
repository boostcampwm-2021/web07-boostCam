import React, { useContext } from 'react';
import styled from 'styled-components';

import { MainStoreContext } from '../MainStore';
import noInfoImg from '../../../assets/hmm.gif';
import { flex } from '../../../utils/styledComponentFunc';

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${flex('column', 'center', 'center')}
`;

const NoChannelInfoDescription = styled.span`
  margin-top: 20px;
  font-size: 25px;
`;

const NoInfoImg = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 25px;
`;

const ResetButton = styled.button`
  width: 250px;
  height: 50px;
  background: none;
  padding: 15px 10px;
  margin: 15px 0px 0px 0px;
  border: 0;
  outline: 0;
  text-align: center;
  vertical-align: middle;
  border-radius: 10px;
  background-color: #26a9ca;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #2dc2e6;
    transition: all 0.3s;
  }
`;

function NotFoundChannel(): JSX.Element {
  const { getServerChannelList } = useContext(MainStoreContext);

  const onClickChannelListResetButton = () => {
    getServerChannelList();
  };

  return (
    <Container>
      <NoInfoImg src={noInfoImg} />
      <NoChannelInfoDescription>채널이 존재하지 않습니다...</NoChannelInfoDescription>
      <ResetButton onClick={onClickChannelListResetButton}>새고로침</ResetButton>
    </Container>
  );
}

export default NotFoundChannel;
