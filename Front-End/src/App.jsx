import './App.css';
import { Route, Routes } from 'react-router-dom';
import PersonalInfoPage from './pages/PersonalInfoPage';
import PageError from './pages/PageError';
import Home from './pages/Home';
import Products from './pages/Products';
import StaffPage from './pages/StaffPage';
import ClientsStaff from './pages/ClientsStaff';
import PetStaff from './pages/PetStaff';
import TimetableStaff from './pages/TimetableStaff';
import InsightsStaff from './pages/InsightsStaff';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/Products" element={< Products />} />
        <Route path="/Personal-Info" element={< PersonalInfoPage />} />
        <Route path="/Staff" element={< StaffPage />} />
        <Route path="/Clients-Staff" element={< ClientsStaff />} />
        <Route path="/Pets-Staff" element={< PetStaff />} />
        <Route path="/Timetable-Staff" element={< TimetableStaff />} />
        <Route path="/Insights-Staff" element={< InsightsStaff />} />
        <Route path="*" element={<PageError />} />
      </Routes>
    </>
  );
};

export default App;
