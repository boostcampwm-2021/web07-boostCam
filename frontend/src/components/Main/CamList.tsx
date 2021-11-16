import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { useNavigate } from 'react-router-dom';
import socketState from '../../atoms/socket';
import { ReactComponent as Hash } from '../../assets/icons/hash.svg';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #492148;

  margin-top: 10px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const CamListHeader = styled.div`
  width: 100%;
  height: 30px;

  margin-left: 15px;
  color: #a69c96;
  font-size: 17px;

  &:hover {
    cursor: pointer;
  }
`;

const CamListBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  color: #a69c96;
  font-size: 15px;
`;

const CamNameBlock = styled.div`
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

const CamNameSpan = styled.span`
  padding: 5px 0px 5px 5px;
`;

const HashIcon = styled(Hash)`
  width: 15px;
  height: 15px;
  fill: #a69c96;
`;

function CamList(): JSX.Element {
  const socket = useRecoilValue(socketState);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <Container>
      <CamListHeader>Cam</CamListHeader>
      <CamListBody>
        <CamNameBlock>
          <HashIcon />
          <CamNameSpan>Cam 1</CamNameSpan>
        </CamNameBlock>
        <CamNameBlock>
          <HashIcon />
          <CamNameSpan>Cam 2</CamNameSpan>
        </CamNameBlock>
        <CamNameBlock>
          <HashIcon />
          <CamNameSpan>Cam 3</CamNameSpan>
        </CamNameBlock>
        <CamNameBlock>
          <HashIcon />
          <CamNameSpan>Cam 4</CamNameSpan>
        </CamNameBlock>
        <CamNameBlock>
          <HashIcon />
          <CamNameSpan>Cam 5</CamNameSpan>
        </CamNameBlock>
      </CamListBody>
    </Container>
  );
}

export default CamList;
