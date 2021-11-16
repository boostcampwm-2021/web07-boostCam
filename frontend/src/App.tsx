import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Cam from './components/Cam/Cam';
import CamRooms from './components/Main/CamRooms';
import LoginMain from './components/LoginPage/LoginMain';
import LoginCallback from './components/LoginPage/LoginCallback';

function App(): JSX.Element {
  return (
    <Router>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<CamRooms />} />
          <Route path="/login" element={<LoginMain />} />
          <Route path="/login/github" element={<LoginCallback />} />
          <Route path="/cam" element={<Cam />} />
        </Routes>
      </RecoilRoot>
    </Router>
  );
}

export default App;
