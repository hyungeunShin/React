import { Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import loadable from '@loadable/component';

const RedPage = loadable(() => import('./pages/RedPage'));
const BluePage = loadable(() => import('./pages/BluePage'));
const UsersPage = loadable(() => import('./pages/UsersPage'));

const App = () => {
  return (
    <div>
      <Menu></Menu>
      <hr></hr>
      <Routes>
          <Route path="/red" element={<RedPage></RedPage>}></Route>
          <Route path="/blue" element={<BluePage></BluePage>}></Route>
          <Route path="/users/*" element={<UsersPage></UsersPage>}></Route>
      </Routes>
    </div>
  );
};

export default App;
