import React from 'react';
import styled from 'styled-components';
import { flex } from '../../../utils/styledComponentFunc';

type CamDefaultPageProps = {
  backgroundSrc: string;
  children: React.ReactChild | React.ReactChild[];
};

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0px;
  right: 0px;
  ${flex('row', 'center', 'center')}
  background-color: white;
`;

const Background = styled.img`
  position: absolute;
  width: 70%;
  height: auto;
  margin: 0 auto;
  opacity: 0.1;
  z-index: -1;
`;

function CamDefaultPage(props: CamDefaultPageProps): JSX.Element {
  const { children, backgroundSrc } = props;
  return (
    <Container>
      <Background alt="cam-background" src={backgroundSrc} />
      {children}
    </Container>
  );
}

export default CamDefaultPage;
