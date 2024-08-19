import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PersonalPage from './componentspersonal/App/App';
import LoginForm from './componentslogin/LoginForm';
import RegisterForm from './componentsregister/RegisterForm';
import BusinessPage from './componentsbusiness/BusinessPage/BusinessPage';
import ForgotPassword from './componentslogin/ForgotPassword';
import TablePage from './componentstablepage/tablepages';
import OrderTable from './componentstablepage2/OrderTable';
import USDTChart from './componentschart/USDTRate';
import UnbankDashboard from './componentsdashboard/unbankDashboard';


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

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
