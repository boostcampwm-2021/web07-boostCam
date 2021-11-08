import React from 'react';
import styled from 'styled-components';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Cam from './components/Cam/Cam';
import LoginMain from './components/LoginPage/LoginMain';

const Container = styled.div``;

function App(): JSX.Element {
  return (
    <Router>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<LoginMain />} />
          <Route path="/cam" element={<Cam />} />
        </Routes>
      </RecoilRoot>
    </Router>
  );
}

export default App;
