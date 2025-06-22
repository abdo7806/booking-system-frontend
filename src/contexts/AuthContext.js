import React, { createContext, useState, useContext } from 'react';

// إنشاء سياق المصادقة
const AuthContext = createContext();

// مزود السياق
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // استعادة البيانات من Local Storage إذا كانت موجودة
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  }); // حالة لتخزين بيانات المستخدم

  const login = (userData) => {
    setUser(userData); // تعيين بيانات المستخدم بعد تسجيل الدخول
  };

  const logout = () => {
    setUser(null); // مسح بيانات المستخدم عند تسجيل الخروج
		localStorage.removeItem("token");
		localStorage.removeItem("user")
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook لاستخدام السياق
export const useAuth = () => {
  return useContext(AuthContext);
};