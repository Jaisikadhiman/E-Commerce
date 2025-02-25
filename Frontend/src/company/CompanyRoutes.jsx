import React from "react";
import { Route, Routes } from "react-router-dom";
import CompanyHome from "./pages/CompanyHome";
import CompanyDashboard from "./pages/CompanyDashboard";
import AddProduct from "./pages/AddProduct";


const CompanyRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<CompanyHome />}></Route>
      <Route path="/dashboard" element={<CompanyDashboard />}></Route>
      <Route path="/addProduct" element={<AddProduct />}></Route>
    </Routes>
  );
};

export default CompanyRoutes;
