import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProtectedRoute from "./components/ProtectedRoute";


import StaffListPage from './features/staff/StaffList';
import UserList from './features/user/UserList';
import ServiceList from './features/service/ServiceList';
import AvailabilityList from './features/availability/AvailabilityList';


function App() {
 


  return (
    <div className="App" dir="rtl">

          <BrowserRouter>
 
      <Routes>

             {/* صفحات عامة */}
      <Route path="/" element={<LoginPage />} />

<Route 
  path="/admin/*" 
  element={
    <>
 
      <Routes>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute role="Admin">
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="staff"
          element={
            <ProtectedRoute role="Admin">
              <StaffListPage />
            </ProtectedRoute>
          }
        />

       <Route
          path="users"
          element={
            <ProtectedRoute role="Admin">
              <UserList/>
            </ProtectedRoute>
          }
        />

          <Route
          path="services"
          element={
            <ProtectedRoute role="Admin">
              <ServiceList/>
            </ProtectedRoute>
          }
        />

          <Route
          path="availability"
          element={
            <ProtectedRoute role="Admin">
              <AvailabilityList/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  } 
/>

        <Route path="/dashboard" element={<h1>Client Dashboard</h1>} />
        <Route path="/register" element={<RegisterPage/>} />
              {/* صفحة غير مصرح */}
      <Route path="/unauthorized" element={<h2>غير مصرح لك بالدخول</h2>} />

      {/* الصفحة غير موجودة */}
      <Route path="/*" element={<h1>404</h1>} />

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
