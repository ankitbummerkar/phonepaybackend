import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import Signup from "./pages/Signup";

import AddMoney from "./pages/AddMoney";

import PayPage from "./pages/PayPage";
import Dashboard from "./pages/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-right" theme="colored" />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/add-money" element={<AddMoney />} />

        <Route path="/pay/:id" element={<PayPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
