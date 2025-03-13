import './App.css';
import { Route, Routes } from 'react-router-dom';
import AuthRedirect from './utils/AuthRedirect';
import PageError from './pages/PageError';
import Home from './pages/Home';

const App = () => {
  return (
    <>
      <AuthRedirect />
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="*" element={<PageError />} />
      </Routes>
    </>
  );
};

export default App;
