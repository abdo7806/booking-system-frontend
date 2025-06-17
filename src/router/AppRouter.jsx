import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import AdminDashboardPage from "../pages/AdminDashboardPage";
//import AdminDashboard from "../pages/AdminDashboard";
//import ClientDashboard from "../pages/ClientDashboard";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboardPage/>} />
        <Route path="/dashboard" element={<h1>Client Dashboard</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;