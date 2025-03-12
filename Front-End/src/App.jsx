import './App.css';
import {  Route, Routes } from 'react-router-dom';
import PageError from './pages/PageError';

const App = () => {  
  return (
    <>
      <Routes>
        <Route path="*" element={<PageError />} />
      </Routes>
    </>
  );
};

export default App;
