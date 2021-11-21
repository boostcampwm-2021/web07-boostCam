import React, { useContext } from 'react';
import styled from 'styled-components';

import { MainStoreContext } from '../MainStore';
import { BoostCamMainIcons } from '../../../utils/SvgIcons';

const { Close } = BoostCamMainIcons;

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0px;
  right: 0px;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ModalBackground = styled.div`
  position: fixed;
  left: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
`;

const ModalBox = styled.div`
  width: 35%;
  min-width: 400px;

  background-color: #222322;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 20px;

  z-index: 3;
`;

const ModalInnerBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.span`
  margin-left: 25px;
  padding: 10px 5px;

  color: #cbc4b9;
  font-size: 32px;
  font-weight: 600;
`;

const ModalCloseButton = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  flex-direction: center;
  align-items: center;

  cursor: pointer;
  margin-right: 25px;
`;

const CloseIcon = styled(Close)`
  width: 20px;
  height: 20px;
  fill: #a69c96;
`;

const ServerTitleBox = styled.div`
  margin-left: 25px;
  padding: 10px 5px;
  width: 350px;
  display: flex;
`;

const InformationBox = styled.div`
  margin-left: 25px;
  padding: 10px 5px;
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  item-align: start;
  color: #cbc4b9;
  font-size: 20px;
  font-weight: 600;
`;

const SubTitle = styled.div`
  color: #cbc4b9;
  font-size: 20px;
  font-weight: 600;
  width: 100%;
`;

const ServerIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const InfoParagraph = styled.pre`
  background-color: #cbc4b9;
  border-radius: 10px;
  color: black;
  padding: 0px 10px;
  max-height: 80px;
  overflow-y: auto;
  margin: 0px;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #999999;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #cccccc;
    border-radius: 10px;
  }
`;

const InfoSpan = styled.span`
  background-color: #cbc4b9;
  border-radius: 10px;
  padding: 0px 10px;
  max-height: 40px;
  overflow-y: auto;
  color: black;
  font-size: 20px;
  font-weight: 600;

  &::-webkit-scrollbar {
    display: none;
  }
`;

function ServerInfoModal(): JSX.Element {
  const { setIsServerInfoModalOpen } = useContext(MainStoreContext);

  const a = `fafeaf\nfeafa\nfeafafeafa\nfeafa\nfeafafeaf\nfeafa\nfeafa\nfeafa\nfeaa\nfeafa`;
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <Container>
      <ModalBackground onClick={() => setIsServerInfoModalOpen(false)} />
      <ModalBox>
        <ModalInnerBox>
          <ModalHeader>
            <ModalTitle>서버 정보</ModalTitle>
            <ModalCloseButton onClick={() => setIsServerInfoModalOpen(false)}>
              <CloseIcon />
            </ModalCloseButton>
          </ModalHeader>
          <ServerTitleBox>
            <ServerIcon src="https://boostcam.kr.object.ncloudstorage.com/server-icons/1637413367738-test.gif" />
            <InfoSpan>{a}</InfoSpan>
          </ServerTitleBox>
          <InformationBox>
            <InfoParagraph>{a}</InfoParagraph>
          </InformationBox>
          <InformationBox>
            <SubTitle>서버 참가 URL</SubTitle>
            <InfoSpan>{a}</InfoSpan>
          </InformationBox>
          <InformationBox>
            <SubTitle>서버 사용자 리스트</SubTitle>
            <InfoParagraph>{a}</InfoParagraph>
          </InformationBox>
        </ModalInnerBox>
      </ModalBox>
    </Container>
  );
}

export default ServerInfoModal;
