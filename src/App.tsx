import React from 'react';
// using HashRouter bc GitHub pages doesn't support the tech used by the BrowserRouter
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NavBar } from 'components/NavBar';
import { Content } from 'screens/Content';
import { Home } from 'screens/Home';
import { StartMatch } from 'screens/StartMatch';

const App: React.FC = () => {
  return (
    <HashRouter>
      <NavBar />
      <Routes>
        <Route path="/*">
          <Route index element={<Home />} />
          <Route path="content" element={<Content />} />
          <Route path="new" element={<StartMatch />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
