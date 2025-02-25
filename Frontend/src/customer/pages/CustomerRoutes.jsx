import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../Home";
import Address from "../../Cart/Address";
import AddToCart from "../../Cart/AddToCart";
import Payment from "../../Cart/Payment";
import Wishlist from "../../Cart/wishlist";

const CustomerRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/home" element={<CustomerHome />}></Route> */}
      <Route path="/home" element={<Home />}></Route>
      <Route path="/cart" element={<AddToCart />}></Route>
      <Route path="/address/:id" element={<Address />}></Route>
      <Route path="/payment" element={<Payment />}></Route>
      <Route path="/wishlist" element={<Wishlist/>}></Route>
    </Routes>
  );
};

export default CustomerRoutes;
