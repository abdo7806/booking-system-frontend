import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// صفحات
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import StaffListPage from './features/staff/StaffList';
import UserList from './features/user/UserList';
import ServiceList from './features/service/ServiceList';
import AvailabilityList from './features/availability/AvailabilityList';
import AppointmentList from './features/appointments/AppointmentList';
import ClientList from './features/client/ClientList';
import ClientDashboard from './features/access_client/ClientDashboard';
import CreateAppointment from './features/access_client/CreateAppointment';
import MyAppointments from './features/access_client/MyAppointments';
// مكونات
import ProtectedRoute from "./components/ProtectedRoute";

// التنقل
import ClientNavbar from './components/ClientNavbar';
// سياق المصادقة
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <div className="App" dir="rtl">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* صفحات عامة */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/unauthorized" element={<h2>غير مصرح لك بالدخول</h2>} />

            {/* صفحات المشرف */}
            <Route path="/admin/*" element={
              <Routes>
                <Route
                  path="dashboard"
                  element={<ProtectedRoute role="Admin"><AdminDashboardPage /></ProtectedRoute>}
                />
                <Route
                  path="staff"
                  element={<ProtectedRoute role="Admin"><StaffListPage /></ProtectedRoute>}
                />
                <Route
                  path="users"
                  element={<ProtectedRoute role="Admin"><UserList /></ProtectedRoute>}
                />
                <Route
                  path="services"
                  element={<ProtectedRoute role="Admin"><ServiceList /></ProtectedRoute>}
                />
                <Route
                  path="availability"
                  element={<ProtectedRoute role="Admin"><AvailabilityList /></ProtectedRoute>}
                />
                <Route
                  path="appointments"
                  element={<ProtectedRoute role="Admin"><AppointmentList /></ProtectedRoute>}
                />
                <Route
                  path="clients"
                  element={<ProtectedRoute role="Admin"><ClientList /></ProtectedRoute>}
                />
              </Routes>
            } />


          {/* مسارات العميل */}
            <Route 
              path="/client/*" 
              element={
                <>
                  <ClientNavbar />
                  <Routes>
                    <Route path='dashboard' element={<ClientDashboard />} />
                    <Route path="create-appointment" element={<CreateAppointment />} />
                    <Route path="my-appointments" element={<MyAppointments/>} />

                  </Routes>
                </>
              } 
            />

  

            {/* الصفحات غير الموجودة */}
            <Route path="/*" element={<h1>404 - الصفحة غير موجودة</h1>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;