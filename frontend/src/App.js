import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Storage from "./pages/Storage";
import Orders from "./pages/Orders";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";
import Suppliers from "./pages/Suppliers";
import CustomersDashboard from "./pages/CustomersDashboard";
import Cart from "./pages/Cart";
import CustomerOrder from "./pages/CustomerOrder";
import SignUpEmployee from "./pages/SignUpEmployee";
import SignUpCustomer from "./pages/SignUpCustomer";
import { CartProvider } from "./components/CartContext";
import { AuthProvider } from "./components/AuthContext";

function App() { // paths to each page
  return (
    <div className="App">
      <Router>
        <CartProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signupemp" element={<SignUpEmployee />} />
              <Route path="/signupcus" element={<SignUpCustomer />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/storage" element={<Storage />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/homepage" element={<CustomersDashboard />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/myorder" element={<CustomerOrder />} />
            </Routes>
          </AuthProvider>
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;
