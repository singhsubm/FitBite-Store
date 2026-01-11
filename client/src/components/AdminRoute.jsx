import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // Agar user hai AUR wo admin hai, to andar jane do (Outlet)
  // Warna Home page par fek do
  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;