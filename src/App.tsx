// using HashRouter bc GitHub pages doesn't support the tech used by the BrowserRouter
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NavBar } from 'components/navbar/nav-bar';
import { Content } from 'screens/content';
import { Home } from 'screens/home';
import { StartMatch } from 'screens/start';

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
