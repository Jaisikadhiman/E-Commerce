import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object({
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
  address: Yup.string().required("please enter address"),
  gender: Yup.string().required("please enter gender"),
});
const getUser = async (id) => {
 
  console.log(id);
  const resp = await axios.get(`http://localhost:8080/api/user/getone/${id}`);
  console.log(resp);
  return resp.data;
};
const Edit = () => {
    const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: ()=>getUser(id),
  });
  console.log(data);
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
      gender: "",
    },
    validationSchema: validationSchema,
    onSubmit: {},
  });
  return (
    <div className="register">
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Edit Details </p>

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
        <button className="submit" type="submit">
          Edit
        </button>
      </form>
    </div>
  );
};

export default Edit;
