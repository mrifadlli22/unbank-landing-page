import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PersonalPage from './componentspersonal/App/App';
import LoginForm from './componentslogin/LoginForm';
import RegisterForm from './componentsregister/RegisterForm';
import BusinessPage from './componentsbusiness/BusinessPage/BusinessPage';
import ForgotPassword from './componentslogin/ForgotPassword';
import TablePage from './componentstablepage/tablepages';
import OrderTable from './componentstablepage2/OrderTable';
// import USDTChart from './componentschart/USDTRate';
import UnbankDashboard from './componentsdashboard/unbankDashboard';
import Settings from './componentsdashboard/settings';
import Swap from './componentsdashboard/swap';
import Xcrow from './componentsdashboard/xcrow';
import History from './componentsdashboard/history';
import Help from './componentsdashboard/help';
import Verification from './componentsdashboard/verification';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Redirect from root path to /personalpage */}
          <Route path="/" element={<Navigate to="/personalpage" replace />} /> 
          <Route path="/personalpage" element={<PersonalPage />} /> 
          <Route path="/businesspage" element={<BusinessPage />} /> 
          <Route path="/login" element={<LoginForm />} /> 
          <Route path="/register" element={<RegisterForm />} /> 
          <Route path="/forgotpassword" element={<ForgotPassword />} /> 
          <Route path='/tablepage' element={<TablePage />} /> 
          <Route path='/tablepage2' element={<OrderTable />} /> 
          <Route path='/dashboard' element={<UnbankDashboard />} /> 
          <Route path='/settings' element={<Settings />} /> 
          <Route path='/profile' element={<Settings />} /> 
          <Route path='/support' element={<Settings />} /> 
          <Route path='/security' element={<Settings />} /> 
          <Route path='/verification' element={<Verification />} /> 
          <Route path='/welcome' element={<Verification />} /> 
          <Route path='/phoneverification' element={<Verification />} /> 
          <Route path='/swap' element={<Swap />} /> 
          <Route path='/xcrow' element={<Xcrow />} /> 
          <Route path='/history' element={<History />} /> 
          <Route path='/help' element={<Help />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
