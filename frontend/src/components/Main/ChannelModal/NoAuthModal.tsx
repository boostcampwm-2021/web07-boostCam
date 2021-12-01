import React from 'react';
import styled from 'styled-components';
import noAuthImg from '../../../assets/hmm.gif';

const ModalDescriptionDiv = styled.div`
  flex: 3 1 0;
  width: 90%;
  margin: 50px 0px 0px 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalDescription = styled.span`
  padding: 10px 5px;
  margin-left: 25px;
  color: #cbc4b9;
  font-size: 15px;
`;

const NoAuthImg = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 25px;
`;

function NoAuthModal(): JSX.Element {
  return (
    <ModalDescriptionDiv>
      <NoAuthImg src={noAuthImg} />
      <ModalDescription>이 채널에 대한 수정 권한이 없습니다!</ModalDescription>
    </ModalDescriptionDiv>
  );
}

export default NoAuthModal;
