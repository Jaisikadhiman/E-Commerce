import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ADMIN, COMPANY, CUSTOMER } from "../Constant";
import { useSelector } from "react-redux";

// const details = JSON.parse(localStorage.getItem("details"));
// console.log("details :>> ", details?.token);
// const role = details?.data?.role;
// console.log("role",role);

export const ProtectAdmin = () => {
  const token = useSelector((state) => state?.userSlice?.loginUser?.token);
  const role = useSelector((state) => state?.userSlice?.loginUser?.data?.role);
  console.log(token);
  if (token) {
    if (role === CUSTOMER) {
      return <Navigate to={"/customer/home"} replace={true} />;
    } else if (role === COMPANY) {
      return <Navigate to={"/company/home"} replace={true} />;
    } else {
      return <Outlet />;
    }
  } else {
    return <Navigate to={"/login"} />;
  }
};

export const ProtectCustomer = () => {
  const token = useSelector((state) => state?.userSlice?.loginUser?.token);
  const role = useSelector((state) => state?.userSlice?.loginUser?.data?.role);
  console.log(role);
  if (token) {
    if (role === ADMIN) {
      return <Navigate to={"/admin/home"} replace={true} />;
    } else if (role === COMPANY) {
      return <Navigate to={"/company/home"} replace={true} />;
    } else {
      return <Outlet />;
    }
  } else {
    return <Navigate to={"/login"} />;
  }
};

export const ProtectCompany = () => {
  const token = useSelector((state) => state?.userSlice?.loginUser?.token);
  const role = useSelector((state) => state?.userSlice?.loginUser?.data?.role);
  console.log(token);
  if (token) {
    if (role === CUSTOMER) {
      return <Navigate to={"/customer/home"} replace={true} />;
    } else if (role === ADMIN) {
      return <Navigate to={"/admin/home"} replace={true} />;
    } else {
      return <Outlet />;
    }
  } else {
    return <Navigate to={"/login"} />;
  }
};

export const ProtectPublic = () => {
  const token = useSelector((state) => state?.userSlice?.loginUser?.token);
  const role = useSelector((state) => state?.userSlice?.loginUser?.data?.role);
  // console.log(token);
  if (token) {
    if (role === CUSTOMER) {
      return <Navigate to={"/customer/home"} replace={true} />;
    } else if (role === ADMIN) {
      return <Navigate to={"/admin/home"} replace={true} />;
    } else if (role === COMPANY) {
      return <Navigate to={"/company/home"} replace={true} />;
    }
  } else {
    return <Outlet />;
  }
};
