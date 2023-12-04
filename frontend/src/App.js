import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './Pages/Login';
import RegisterPage from './Pages/Register';
import HomePage from './Pages/HomePage';
import AddVehiclePage from './Pages/AddVehiclePage';
import GetVehicleDetailPage from './Pages/GetVehicleDetailPage';
import ViewSpecificVehiclePage from './Pages/ViewSpecificVehiclePage';
import ViewSpecificSelfVehiclePage from './Pages/ViewSpecificSelfCar';
import TransferCarPage from './Pages/TransferCar';
import RecordAccidentPage from './Pages/RecordAccident';
import RecordMaintenancePage from './Pages/RecordMaintenance';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/add" element={<AddVehiclePage />} />
        <Route path="/vehicle/search" element={<GetVehicleDetailPage />} />
        <Route path="/vehicle/:vid" element={<ViewSpecificVehiclePage />} />
        <Route path="/vehicle" element={<ViewSpecificSelfVehiclePage />} />
        <Route path="/vehicle/transfer" element={<TransferCarPage />} />
        <Route path="/vehicle/recordaccident" element={<RecordAccidentPage />} />
        <Route path="/vehicle/recordmaintainence" element={<RecordMaintenancePage />} />
      </Routes>
    </Router>
  );
}
