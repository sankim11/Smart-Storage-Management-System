import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Storage from './pages/Storage';
import Orders from './pages/Orders';
import Employees from './pages/Employees';
import Reports from './pages/Reports';
import Suppliers from './pages/Suppliers';
import CustomersDashboard from './pages/CustomersDashboard';
import Cart from './pages/Cart';
import CustomerOrder from './pages/CustomerOrder';
import SignUpEmployee from './pages/SignUpEmployee';
import SignUpCustomer from './pages/SignUpCustomer';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signupemp" element={<SignUpEmployee/>} />
          <Route path="/signupcus" element={<SignUpCustomer/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/storage" element={<Storage/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/employees" element={<Employees/>} />
          <Route path="/reports" element={<Reports/>} />
          <Route path="/suppliers" element={<Suppliers/>} />
          <Route path="/homepage" element={<CustomersDashboard/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/myorder" element={<CustomerOrder/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;