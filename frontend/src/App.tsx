import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginMain from './components/Login/LoginMain';
import CamMain from './components/Cam/CamMain';
import LoginCallback from './components/Login/LoginCallback';
import Main from './components/Main/Main';
import Loading from './components/core/Loading';

function App(): JSX.Element {
  return (
    <Router>
      <RecoilRoot>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<LoginMain />} />
            <Route path="/main" element={<Main />} />
            <Route path="/login/github" element={<LoginCallback service="github" />} />
            <Route path="/cam" element={<CamMain />} />
          </Routes>
        </Suspense>
      </RecoilRoot>
    </Router>
  );
}

export default App;
