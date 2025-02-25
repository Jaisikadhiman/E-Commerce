import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .email()
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
});
const forgotpass = async (values) => {
  console.log("values :>> ", values);
  console.log("phone :>> ", values.phone);
  console.log("email :>> ", values.email);
  // const payload = "";
  if (values.email) {
    console.log("hiiii :>> ");
    const resp = await axios.post("http://localhost:8080/api/user/forgot", {
      email: values.email,
    });
    console.log(resp);

    return resp;
  } else {
    console.log("heeeeeeeee :>> ");
    const resp = await axios.post("http://localhost:8080/api/user/forgot", {
      phone: values.phone,
    });

    console.log(resp.data);

    return resp.data;
  }
};
const ForgotPass = () => {
  const [showPhoneField, setShowPhoneField] = useState(false);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (values) => forgotpass(values),
    onSuccess: (resp) => {
      console.log("respp :>> ", resp);

      localStorage.setItem("otpExpire", resp.data.otpExpire);
      localStorage.setItem("otpHash", resp.data.otpHash);
      navigate("/verifyOtp");
    },
  });
  const { values, handleSubmit, handleChange, touched, errors, setFieldValue } =
    useFormik({
      initialValues: {
        email: "",
        phone: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values, { resetForm }) => {
        console.log(values);
        mutation.mutate(values);
      },
    });
  const handleToggleField = (field) => {
    setShowPhoneField(field === "phone");
  };
  return (
    // <div className="register">
    //   <form className="form" onSubmit={handleSubmit}>
    //     <p className="title">Forget Password </p>
    //     <h6>
    //       Enter Your Email or Phone no ,We Will send you Otp to reset password
    //     </h6>
    //     {values.phone}
    //     <input
    //       required=""
    //       placeholder="Enter Email"
    //       type="email"
    //       name="email"
    //       className="input"
    //       onChange={handleChange}
    //       value={values.email}
    //     />
    //     <p>
    //       <FaAngleLeft />
    //       OR
    //     </p>
    //     {/* <input
    //       required=""
    //       placeholder="Enter Phone No"
    //       type="phone"
    //       name="phone"
    //       className="input"
    //     /> */}
    //     <PhoneInput
    //       inputProps={{
    //         name: "phone",
    //         // placeholder: "Enter your phone number",
    //       }}
    //       type="number"
    //       country={"us"} // Default country
    //       value={values.phone}
    //       onChange={(value) => setFieldValue("phone", value)}
    //       enableSearch={true} // Enable country search
    //     />

    //     <button className="submit" type="submit">
    //       Submit
    //     </button>
    //     <p className="signin">
    //       <a href="login">Back to login</a>
    //     </p>
    //   </form>
    // </div>
    <div className="register">
      <form className="form" onSubmit={handleSubmit}>
        <p className="title" style={{ color: "#00246B" }}>
          Forget Password
        </p>
        <h6 className="text-muted">
          Enter Your Email or Phone No, We Will Send You OTP to Reset Password
        </h6>

        {/* Toggle buttons */}
        <div className="d-flex justify-content-center mb-4">
          <button
            type="button"
            className={`btn btn-outline-primary me-2 ${
              !showPhoneField ? "active" : ""
            }`}
            onClick={() => handleToggleField("email")}
          >
            Email
          </button>
          <button
            type="button"
            className={`btn btn-outline-primary ${
              showPhoneField ? "active" : ""
            }`}
            onClick={() => handleToggleField("phone")}
          >
            Phone
          </button>
        </div>

        {/* Email Field */}
        {!showPhoneField && (
          <input
            required
            placeholder="Enter Email"
            type="email"
            name="email"
            className="form-control mb-3"
            onChange={handleChange}
            value={values.email}
            style={{
              borderColor: "#00246B",
              backgroundColor: "#CADCFC",
            }}
          />
        )}

        {/* Phone Field */}
        {showPhoneField && (
          <PhoneInput
            inputProps={{
              name: "phone",
            }}
            type="number"
            country={"us"} // Default country
            value={values.phone}
            // onChange={(value) =>
            //   setValues((prev) => ({
            //     ...prev,
            //     phone: value,
            //   }))
            // }
            onChange={(phone) => setFieldValue("phone", phone)}
            enableSearch={true} // Enable country search
            className="form-control mb-3"
            style={{
              borderColor: "#00246B",
              backgroundColor: "#CADCFC",
            }}
          />
        )}

        <button className="btn btn-primary w-100" type="submit">
          Submit
        </button>

        <p className="signin mt-3 text-center">
          <a href="login" style={{ color: "#00246B" }}>
            <FaAngleLeft /> Back to login
          </a>
        </p>
      </form>
    </div>
  );
};

export default ForgotPass;
