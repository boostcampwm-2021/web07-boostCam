import React from 'react';
import styled from 'styled-components';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Cam from './components/Cam/Cam';

const Container = styled.div``;

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <Container>
        <Cam />
      </Container>
    </RecoilRoot>
  );
}

export default App;
