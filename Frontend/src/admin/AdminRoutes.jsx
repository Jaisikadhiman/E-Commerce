import React from 'react'
import { Route, Routes } from "react-router-dom";
import Dashboard from './Dashboard';
import Admin from './Admin';

const AdminRoutes = () => {
  return (
    <Routes>
        <Route path='/home' element={<Admin/>}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  )
}

export default AdminRoutes
