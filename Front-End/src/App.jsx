import './App.css';
import { Route, Routes } from 'react-router-dom';
import PageError from './pages/PageError';
import Home from './pages/Home';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="*" element={<PageError />} />
      </Routes>
    </>
  );
};

export default App;
