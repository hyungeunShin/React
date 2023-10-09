import {Route, Routes} from 'react-router-dom';
import Menu from './components/Menu';
import RedPage from './pages/RedPage';
import BluePage from './pages/BluePage';

const App = () => {
  return (
    <div>
      <Menu></Menu>
      <hr></hr>
      <Routes>
          <Route path="/red" element={<RedPage></RedPage>}></Route>
          <Route path="/blue" element={<BluePage></BluePage>}></Route>
      </Routes>
    </div>
  );
};

export default App;
