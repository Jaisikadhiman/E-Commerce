import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ForgotPass from "./Auth/ForgotPass";

import Home from "./Home";
// import Admin from "./admin/Admin";
import AddReason from "./admin/AddReason";
import AdminRoutes from "./admin/AdminRoutes";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import ResetPass from "./Auth/ResetPass";
import VerifyOtp from "./Auth/VerifyOtp";
import AddToCart from "./Cart/AddToCart";
import CompanyRoutes from "./company/CompanyRoutes";
import AddProduct from "./company/pages/AddProduct";
import {
  ProtectAdmin,
  ProtectCompany,
  ProtectCustomer,
  ProtectPublic,
} from "./Components/ProtectedRoutes";
import CustomerRoutes from "./customer/pages/CustomerRoutes";
import ProfileEdit from "./EditProfile/ProfileEdit";
import ProfileView from "./EditProfile/profileView";
import NotFound from "./NotFound";
import Checkout from "./Cart/Checkout";
// import {  Admin, Company, Customer } from "./Constant";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* PUBLIC ROUTES*/}


            <Route path="/" element={<Home />}></Route>

            <Route path="*" element={<ProtectPublic />}>
              <Route path="login" element={<Login />}></Route>
              <Route path="forgot" element={<ForgotPass />}></Route>
              <Route path="register" element={<Register />}></Route>
              <Route path="verifyOtp" element={<VerifyOtp />}></Route>
              <Route path="reset" element={<ResetPass />}></Route>
              <Route path="checkout" element={<Checkout />}></Route>
              
            </Route>

           
            {/* <Route path="/edit/:id" element={<Edit />}></Route>
            <Route path="/view/:id" element={<View />}></Route> */}
            {/* <Route path="/unauthorized" element={<Unauthorize />}></Route> */}
            {/* <Route path="/dashboard" element={<Dashboard />}></Route> */}
            <Route path="/deleteReason" element={<AddReason />}></Route>
            <Route path="/profileEdit" element={<ProfileEdit />}></Route>
            <Route path="/profileview" element={<ProfileView />}></Route>

            <Route path="/addProduct" element={<AddProduct />}></Route>
            <Route path="*" element={<ProtectAdmin />}>
              <Route path="admin/*" element={<AdminRoutes />}></Route>
            </Route>
            <Route path="*" element={<ProtectCustomer />}>
              <Route path="customer/*" element={<CustomerRoutes />}></Route>
            </Route>
            <Route path="*" element={<ProtectCompany />}>
              <Route path="company/*" element={<CompanyRoutes />}></Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
};

export default App;
