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
import Transfer from './componentsdashboard/transfer';
import TransferDigital from './componentsdashboard/transferdigital';
import TransactionIqr from './componentsdashboard/transactionInquiry';
import AccountState from './componentsdashboard/accountStatement';
import Beneficiary from './componentsdashboard/beneficiary';
import TopUp from './componentsdashboard/topUp';
import TransferPage from './componentsdashboard/transferpage';
import Exchange from './componentsdashboard/exchange';
import Receive from './componentsdashboard/receive';
import Send from './componentsdashboard/send';
import OnRamp from './componentsdashboard/onRamp';
import OffRamp from './componentsdashboard/OffRamp';
import Stacking from './componentsdashboard/stacking';
import Guarantee from './componentsdashboard/guarantee';
import LandC from './componentsdashboard/LC';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* LANDING PAGE */}
          <Route path="/" element={<Navigate to="/personalpage" replace />} /> 
          <Route path="/personalpage" element={<PersonalPage />} /> 
          <Route path="/businesspage" element={<BusinessPage />} /> 

          {/* LOGIN AND REGISTRATION PAGE */}
          <Route path="/login" element={<LoginForm />} /> 
          <Route path="/register" element={<RegisterForm />} /> 
          <Route path="/forgotpassword" element={<ForgotPassword />} /> 

          {/* TABLE TEMPLATE PAGE */}
          <Route path='/tablepage' element={<TablePage />} /> 
          <Route path='/tablepage2' element={<OrderTable />} /> 

          {/* ACCOUNT INFORMATION */}
          <Route path='/account-summary' element={<UnbankDashboard />} /> 
          <Route path='/transaction-inquiry' element={<TransactionIqr />} /> 
          <Route path='/account-statement' element={<AccountState />} /> 
          <Route path='/beneficiary' element={<Beneficiary />} /> 

          {/* FIAT */}
          <Route path='/topup' element={<TopUp />} />
          <Route path='/transfer-page' element={<TransferPage />} /> 
          <Route path='/transfer' element={<Transfer />} /> 
          <Route path='/transfer-crypto' element={<TransferDigital />} /> 
          <Route path='/exchange' element={<Exchange />} /> 

          {/* DIGITAL ASSET */}
          <Route path='/received' element={<Receive />} />           
          <Route path='/send' element={<Send />} />
          <Route path='/on-ramp' element={<OnRamp />} />                      
          <Route path='/off-ramp' element={<OffRamp />} />                      
          <Route path='/swap' element={<Swap />} /> 


         {/* PRODUCT */}
          <Route path='/stacking' element={<Stacking />} /> 
          <Route path='/guarantee' element={<Guarantee />} /> 
          <Route path='/xcrow' element={<Xcrow />} /> 
          <Route path='/l-and-c' element={<LandC />} />

          {/* SETTINGS */}
          <Route path='/settings' element={<Settings />} /> 
          <Route path='/profile' element={<Settings />} /> 
          <Route path='/support' element={<Settings />} /> 
          <Route path='/security' element={<Settings />} /> 

          {/* HELP */}
          <Route path='/help' element={<Help />} /> 

          {/* VERIFICATION */}
          <Route path='/verification' element={<Verification />} /> 
          <Route path='/welcome' element={<Verification />} /> 
          <Route path='/phoneverification' element={<Verification />} /> 

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
