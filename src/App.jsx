import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PersonalPage from './componentspersonal/App/App';
import LoginForm from './componentslogin/LoginForm';
import RegisterForm from './componentsregister/RegisterForm';
import BusinessPage from './componentsbusiness/BusinessPage/BusinessPage';
import ForgotPassword from './componentslogin/ForgotPassword';
import TablePage from './componentstablepage/tablepages';

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
