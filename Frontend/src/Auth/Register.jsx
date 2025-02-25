import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import * as Yup from "yup";
import { register } from "../redux/slice/userSlice";
// import "./register.css"


const ProfileValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "name contains atleast 2 characters")
    .max(20, "name can contain max 20 characters")
    .required("please enter name"),
  email: Yup.string()
    .email()
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .required("please enter email"),
  password: Yup.string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol")
    .required("please enter password"),
  address: Yup.string().required("please enter address"),
  gender: Yup.string().required("please enter gender"),
  role: Yup.string().required("please enter role"),
  //   .oneOf([yup.ref('pass'), null], 'Must match "password" field value'),
});
const Register = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: (newUser) =>
      axios.post("http://localhost:8080/api/user/register", newUser),
   
  });

  const { handleChange, handleSubmit, values, errors, touched, setFieldValue } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        address: "",
        password: "",
        gender: "",
        role: "",
      },
      validationSchema: ProfileValidationSchema,
      onSubmit: (values, { resetForm }) => {
        console.log(values);
        mutation.mutate(values, {
          onSuccess: (data) => {
            console.log("User registered successfully:", data);
            swal({
              title: "Registered successfully!",
              icon: "success",
              button: "okk!",
            });
            dispatch(register(data));
            resetForm();
            queryClient.invalidateQueries("user")
            navigate("/");
          },
          onError: (error) => {
            console.error("Registration failed:", error);
            alert("Registration failed!");
          },
        });
      },
    });
  // const handleCheckboxChange = (e) => {
  //   const { name, value, checked } = e.target;
  //   if (checked) {
  //     setFieldValue(name, [...values[name], value]);
  //   } else {
  //     setFieldValue(
  //       name,
  //       values[name].filter((item) => item !== value)
  //     );
  //   }
  // };
  return (
    <>
      {/* <div className="register">
        <form className="form" onSubmit={handleSubmit}>
          <p className="title">Register </p>

          <label>Name</label>
          <input
            required=""
            placeholder=""
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            className="input"
          />

          {errors.name && touched.name ? (
            <span style={{ color: "red" }}>{errors.name}</span>
          ) : null}

          <label>Email</label>
          <input
            required=""
            placeholder=""
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
             className="input"
          />

          {errors.email && touched.email ? (
            <span style={{ color: "red" }}>{errors.email}</span>
          ) : null}

          <label>Address</label>
          <input
            required=""
            placeholder=""
            type="text"
            name="address"
            value={values.address}
            onChange={handleChange}
             className="input"
          />

          {errors.address && touched.address ? (
            <span style={{ color: "red" }}>{errors.address}</span>
          ) : null}

          <label>Password </label>
          <input
            required=""
            placeholder=""
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
             className="input"
          />

          {errors.password && touched.password ? (
            <span style={{ color: "red" }}>{errors.password}</span>
          ) : null}

         
          <div className="gender">
          <label>Gender:</label>
            <input
              required=""
              placeholder=""
              type="radio"
              name="gender"
              value="Male"
              onChange={handleChange}
              checked={values.gender === "Male"}
            />
            <span>Male</span>
            <input
              required=""
              placeholder=""
              type="radio"
              name="gender"
              value="Female"
              onChange={handleChange}
              checked={values.gender === "Female"}
            />
            <span>Female</span>
            {errors.gender && touched.gender ? (
              <span style={{ color: "red" }}>{errors.gender}</span>
            ) : null}
          </div>
          <div className="role">
          <label>Role:</label>
          <input
            required=""
            placeholder=""
            type="radio"
            name="role"
            value="1"
            onChange={handleChange}
            checked={values.role === "1"}
          />
          <span>Admin</span>
          <input
            required=""
            placeholder=""
            type="radio"
            name="role"
            value="3"
            onChange={handleChange}
            checked={values.role === "3"}
          />
          <span>Company</span>
          <input
            required=""
            placeholder=""
            type="radio"
            name="role"
            value="2"
            onChange={handleChange}
            checked={values.role === "2"}
          />
          <span>Customer</span>

          {errors.role && touched.role ? (
            <span style={{ color: "red" }}>{errors.role}</span>
          ) : null}

          </div>

         
          <button className="submit" type="submit">
            Register
          </button>
          <p className="signin">
            Already have an acount ? <a href="login">Signin</a>{" "}
          </p>
        </form>
      </div> */}
      {/* <div
  className="register container p-4 rounded shadow mx-auto"
  style={{
    // backgroundColor: "#CADCFC",
    maxWidth: "700px",
     // Set a maximum width for the form
  }}
> */}
  <form className="form" onSubmit={handleSubmit}  style={{
    // backgroundColor: "#CADCFC",
    maxWidth: "600px",
    marginLeft:"350px" // Set a maximum width for the form
  }}>
    <p className="title text-center mb-4 fs-4 fw-bold" style={{ color: "#00246B" }}>
      Register
    </p>

    <div className="mb-3">
      <label className="form-label" style={{ color: "#00246B" }}>
        Name
      </label>
      <input
        type="text"
        name="name"
        className="form-control"
        value={values.name}
        onChange={handleChange}
        required
      />
      {errors.name && touched.name && (
        <span className="text-danger small">{errors.name}</span>
      )}
    </div>

    <div className="mb-3">
      <label className="form-label" style={{ color: "#00246B" }}>
        Email
      </label>
      <input
        type="email"
        name="email"
        className="form-control"
        value={values.email}
        onChange={handleChange}
        required
      />
      {errors.email && touched.email && (
        <span className="text-danger small">{errors.email}</span>
      )}
    </div>

    <div className="mb-3">
      <label className="form-label" style={{ color: "#00246B" }}>
        Address
      </label>
      <input
        type="text"
        name="address"
        className="form-control"
        value={values.address}
        onChange={handleChange}
        required
      />
      {errors.address && touched.address && (
        <span className="text-danger small">{errors.address}</span>
      )}
    </div>

    <div className="mb-3">
      <label className="form-label" style={{ color: "#00246B" }}>
        Password
      </label>
      <input
        type="password"
        name="password"
        className="form-control"
        value={values.password}
        onChange={handleChange}
        required
      />
      {errors.password && touched.password && (
        <span className="text-danger small">{errors.password}</span>
      )}
    </div>

    <div className="mb-3">
      <label className="form-label d-block" style={{ color: "#00246B" }}>
        Gender:
      </label>
      <div className="form-check form-check-inline">
        <input
          type="radio"
          name="gender"
          id="male"
          className="form-check-input"
          value="Male"
          onChange={handleChange}
          checked={values.gender === "Male"}
        />
        <label htmlFor="male" className="form-check-label" style={{ color: "#00246B" }}>
          Male
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          type="radio"
          name="gender"
          id="female"
          className="form-check-input"
          value="Female"
          onChange={handleChange}
          checked={values.gender === "Female"}
        />
        <label htmlFor="female" className="form-check-label" style={{ color: "#00246B" }}>
          Female
        </label>
      </div>
      {errors.gender && touched.gender && (
        <span className="text-danger small d-block">{errors.gender}</span>
      )}
    </div>

    <div className="mb-3">
      <label className="form-label d-block" style={{ color: "#00246B" }}>
        Role:
      </label>
      <div className="form-check form-check-inline">
        <input
          type="radio"
          name="role"
          id="admin"
          className="form-check-input"
          value="1"
          onChange={handleChange}
          checked={values.role === "1"}
        />
        <label htmlFor="admin" className="form-check-label" style={{ color: "#00246B" }}>
          Admin
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          type="radio"
          name="role"
          id="company"
          className="form-check-input"
          value="3"
          onChange={handleChange}
          checked={values.role === "3"}
        />
        <label htmlFor="company" className="form-check-label" style={{ color: "#00246B" }}>
          Company
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          type="radio"
          name="role"
          id="customer"
          className="form-check-input"
          value="2"
          onChange={handleChange}
          checked={values.role === "2"}
        />
        <label htmlFor="customer" className="form-check-label" style={{ color: "#00246B" }}>
          Customer
        </label>
      </div>
      {errors.role && touched.role && (
        <span className="text-danger small d-block">{errors.role}</span>
      )}
    </div>

    <button
      className="btn  w-100"
      style={{ backgroundColor: "#00246B", border: "none", color:"white"}}
      type="submit"
      
    >
      Register
    </button>

    <p className="signin text-center mt-3" style={{ color: "#00246B" }}>
      Already have an account?{" "}
      <a href="login" style={{ color: "#00246B", fontWeight: "bold" }}>
        Signin
      </a>
    </p>
  </form>


      {/* {mutation?.isPending && <Loader />} */}
    </>
  );
};

export default Register;
