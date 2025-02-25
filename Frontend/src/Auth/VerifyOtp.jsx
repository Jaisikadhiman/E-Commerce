import React from "react";
import { useFormik } from "formik";
import { jwtDecode } from "jwt-decode";
import { useMutation } from "@tanstack/react-query";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";

const verifyotp = async (otp) => {
  console.log(otp);
  const id = localStorage.getItem("id");
  console.log(id);
  const resp = await axios.post(
    `http://localhost:8080/api/user/verify/${id}`,
    otp
  );
  console.log(resp);
  return resp;
};
const VerifyOtp = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (values) => verifyotp(values),
    onSuccess: (resp) => {
      swal({
        title: "Otp verified",
        icon: "success",
        button: "okk!",
      });
      navigate("/reset");
    },
  });
  const { handleChange, handleSubmit, touched, values } = useFormik({
    initialValues: {
      otp: "",
    },
    onSubmit: (values) => {
      console.log(values);
      mutation.mutate(values);
    },
  });
  return (
    <div className="register">
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Code Verification</p>
        <h6>We sent password reset otp to your phone</h6>

        {/* <input
          required=""
          placeholder="Enter Code"
          type="number"
          name="otp"
          className="input"
          onChange={handleChange}
          value={values.otp}
        /> */}
        <OtpInput
        className="mx-3"
          value={values.otp}
          onChange={handleChange}
          numInputs={4}
          // renderSeparator={<span> * </span>}
          renderInput={(props) => <input {...props}
          style={{width:"50px" ,height:"50px",marginLeft:"20px"
          }} />}
        />
        <button className="submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
