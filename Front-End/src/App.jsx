import './App.css';
import { Route, Routes } from 'react-router-dom';
import AuthRedirect from './utils/AuthRedirect';
import PageError from './pages/PageError';
import Home from './pages/Home';
import Products from './pages/Products';

const App = () => {
  return (
    <>
      {/* <AuthRedirect /> */}
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/Products" element={< Products />} />
        <Route path="*" element={<PageError />} />
      </Routes>
    </>
  );
};

export default App;
