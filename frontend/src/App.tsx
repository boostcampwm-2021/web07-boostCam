import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginMain from './components/Login/LoginMain';
import CamMain from './components/Cam/CamMain';
import LoginCallback from './components/Login/LoginCallback';
import Main from './components/Main/Main';

function App(): JSX.Element {
  return (
    <Router>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<LoginMain />} />
          <Route path="/main" element={<Main />} />
          <Route path="/login/github" element={<LoginCallback service="github" />} />
          <Route path="/cam" element={<CamMain />} />
        </Routes>
      </RecoilRoot>
    </Router>
  );
}

export default App;
