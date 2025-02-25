import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import swal from "sweetalert";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const resetpass = async (values) => {
  const id =  localStorage.getItem("id");
  const resp = await axios.post(
    `http://localhost:8080/api/user/resetpass/${id}`,
    values
  );
  console.log(resp);
  return resp;
};
const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol")
    .required("please enter password"),
});
const ResetPass = () => {
    const navigate= useNavigate(); 
  const mutation = useMutation({
    mutationFn: (values) => resetpass(values),
    onSuccess: () => {
      swal({
        title: "Password Change Successfully",
        icon: "success",
        button: "okk!",
      });
      localStorage.removeItem("id");
      localStorage.removeItem("otpExpire");
      localStorage.removeItem("otpHash"); 
      navigate("/login");
    },
  });
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      password: "",
      cpassword:""
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      mutation.mutate(values);
    },
  });
  return (
    <div className="register">
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Set New Password</p>
        <h6>We sent paassord reset otp to your phone</h6>

        <input
          required=""
          placeholder="Enter Password"
          type="password"
          name="password"
          className="input"
          onChange={handleChange}
          value={values.password}
        />
        <input
          required=""
          placeholder="Confirm Password"
          type="password"
          name="cpassword"
          className="input"
          onChange={handleChange}
          value={values.cpassword}
        />
        <button className="submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResetPass;
