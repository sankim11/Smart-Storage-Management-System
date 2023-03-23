import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Storage from './pages/Storage';
import Orders from './pages/Orders';
import Employees from './pages/Employees';
import Reports from './pages/Reports';
import Suppliers from './pages/Suppliers';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/storage" element={<Storage/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/employees" element={<Employees/>} />
          <Route path="/reports" element={<Reports/>} />
          <Route path="/suppliers" element={<Suppliers/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;