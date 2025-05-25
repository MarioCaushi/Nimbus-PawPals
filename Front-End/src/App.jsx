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
import Client_PersonalInfo from './pages/ClientSide-Pages/Client_PersonalInfo';


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/Products" element={< Products />} />
        <Route path="/Personal-Info" element={< PersonalInfoPage />} />
        <Route path="/Staff" element={< StaffPage />} />
        <Route path="/Clients-Staff" element={< ClientsStaff />} />
        <Route path="/Pets" element={< PetStaff />} />
        <Route path="/Timetable" element={< TimetableStaff />} />
        <Route path="/Insights-Staff" element={< InsightsStaff />} />
        <Route path="/Client-Personal-Info" element={< Client_PersonalInfo />} />
        <Route path="*" element={<PageError />} />
      </Routes>
    </>
  );
};

export default App;
