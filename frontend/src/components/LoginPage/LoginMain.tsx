import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LocalLogin from './LocalLogin';
import OAuthLogin from './OAuthLogin';

import { ReactComponent as TmpIcon } from '../../assets/icons/slack.svg';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #c4c4c4;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const LoginBox = styled.div`
  min-width: 700px;
  min-height: 600px;
  background-color: skyblue;
  border-radius: 20px;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const LeftDiv = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const RightDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  svg {
    width: 50%;
    height: 50%;
  }
`;

const WelcomeMessage = styled.span`
  font-size: 30px;
  color: black;
`;

const SplitLine = styled.hr`
  width: 90%;
  margin: 15px 0;
`;

function LoginMain(): JSX.Element {
  return (
    <Container>
      <LoginBox>
        <LeftDiv>
          <WelcomeMessage>Welcom to boostCam!</WelcomeMessage>
          <LocalLogin />
          <SplitLine />
          <OAuthLogin />
          <Link to="/main">Go To BoostCamMain </Link>
          <Link to="/camroom">Go To CamRoom </Link>
        </LeftDiv>
        <RightDiv>
          <TmpIcon />
        </RightDiv>
      </LoginBox>
    </Container>
  );
}

export default LoginMain;
