import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import swal from "sweetalert";
import { ADMIN, COMPANY, CUSTOMER } from "../Constant";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slice/userSlice";
import { addCart, cartSlice } from "../redux/slice/cartSlice";
import PhoneInput from "react-phone-input-2";
import "./login.css"
import "react-phone-input-2/lib/style.css";

const LoginValidationSchema = Yup.object({
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
});

// const queryClient = useQueryClient()

const Login = () => {
  const [value, setValue] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const token = localStorage.getItem("token");
  const fetchCartList = async (token) => {
    console.log("hello jass");
    const ans = await axios.get("http://localhost:8080/api/cart/getItems", {
      headers: { Authorization: `${token}` },
    });
    console.log(ans.data.data);
    const data = ans.data.data;
    data && data.map((item) => dispatch(addCart(item?.product_id)));
    return ans.data.data;
  };
  const fetchUserByEmail = async (values) => {
    console.log(values);
    const resp = await axios.post(
      `http://localhost:8080/api/user/login`,
      values
    );
    console.log(resp);

    const token = resp.data.data.token;
    if (token) {
      console.log("hello honey");
      await fetchCartList(token);
      // const { data } = useQuery({
      //   queryKey: ["cartItems"],
      //   queryFn: fetchCartList(token),
      // });
      // console.log(data);
    }
    console.log(resp);
    return resp.data;
  };

  const [show, setShow] = useState(false);
  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginValidationSchema,
    onSubmit: (values) => {
      console.log(values.email);

      loginn?.mutate(values);
    },
  });

  const loginn = useMutation({
    mutationFn: (values) => fetchUserByEmail(values),
    onSuccess: (resp) => {
      console.log(resp);
      // console.log(resp.data.token);
      // console.log(typeof resp.data.data.role);
      // const token= resp.token;

      // console.log(data);
      // console.log(resp);
      if (resp.status === 200) {
        console.log("helloooooooooo");
        // localStorage.setItem("details", JSON.stringify(resp.data.data));
        // localStorage.setItem("token", JSON.stringify(resp.data.token));
        dispatch(loginUser(resp.data));
        // dispatch(addCart(resp.data?.cartList));
        swal({
          title: "Login successfully!",
          icon: "success",
        });
        console.log(typeof Number(ADMIN));
        if (resp.data.data.role == ADMIN) {
          console.log(resp.data.data.role);
          navigate("/admin/home");
        } else if (resp.data.data.role == CUSTOMER) {
          console.log(resp.data.data.role);
          navigate("/customer/home");
        } else if (resp.data.data.role == Number(COMPANY)) {
          console.log(resp.data.data.role);
          navigate("/company/home");
        } else {
          navigate("/");
        }
      }

      // queryClient?.invalidateQueries("key")
    },
  });

  // const handleClick = () => {
  //   console.log("queryyyyyy")
  //   const { data } = useQuery({
  //     queryKey: ["products"],
  //     queryFn: getProducts,
  //   });
  // };
  // console.log(data);
  return (
    // <div className="login">
    //   {/* <input type={show?"text":"password"} value={"rererttrr"} /> */}

    //   <form className="form" onSubmit={handleSubmit}>
    //     <div className="flex-column">
    //       <label>Email </label>
    //     </div>
    //     <div className="inputForm">
    //       <svg
    //         height="20"
    //         viewBox="0 0 32 32"
    //         width="20"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <g id="Layer_3" data-name="Layer 3">
    //           <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
    //         </g>
    //       </svg>
    //       <input
    //         type="email"
    //         name="email"
    //         value={values.email}
    //         onChange={handleChange}
    //         className="input"
    //         placeholder="Enter your Email"
    //       />
    //     </div>
    //     {errors.email && touched.email ? (
    //       <span style={{ color: "red" }}>{errors.email}</span>
    //     ) : null}

    //     <div className="flex-column">
    //       <label>Password </label>
    //     </div>
    //     <div className="inputForm">
    //       <svg
    //         height="20"
    //         viewBox="-64 0 512 512"
    //         width="20"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
    //         <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
    //       </svg>
    //       <input
    //         type={show ? "text" : "password"}
    //         className="input"
    //         value={values.password}
    //         name="password"
    //         onChange={handleChange}
    //         placeholder="Enter your Password"
    //       />
    //       {errors.password && touched.password ? (
    //         <span style={{ color: "red" }}>{errors.password}</span>
    //       ) : null}

    //       {/* <svg
    //         viewBox="0 0 576 512"
    //         height="1em"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
    //       </svg> */}
    //       {show ? (
    //         <div onClick={() => setShow(false)}>
    //           <FaEyeSlash title="hide" />
    //         </div>
    //       ) : (
    //         <div onClick={() => setShow(true)}>
    //           {" "}
    //           <FaEye />
    //         </div>
    //       )}
    //       {/* <div onClick={()=>setShow(true)}> <FaEye /></div>
    //         <div  onClick={()=>setShow(false)}><FaEyeSlash /></div> */}
    //     </div>
       

    //     <div className="flex-row">
    //       {/* <div>
    //         <input type="checkbox" />
    //         <label>Remember me </label>
    //       </div> */}
    //       <a href="/forgot" className="span">
    //         Forgot password?
    //       </a>
    //     </div>
    //     <button type="submit" className="button-submit">
    //       Sign In
    //     </button>
    //     <p className="p">
    //       Don't have an account?{" "}
    //       <a href="/register" className="span">
    //         Sign Up
    //       </a>
    //     </p>
    //   </form>
    // </div>
    <div className="login">
  <form className="form" onSubmit={handleSubmit}>
    <div className="flex-column">
      <label>Email </label>
    </div>
    <div className="inputForm">
      <svg
        height="20"
        viewBox="0 0 32 32"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Layer_3" data-name="Layer 3">
          <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
        </g>
      </svg>
      <input
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        className="input"
        placeholder="Enter your Email"
      />
    </div>
    {errors.email && touched.email ? (
      <span style={{ color: "red" }}>{errors.email}</span>
    ) : null}

    <div className="flex-column">
      <label>Password </label>
    </div>
    <div className="inputForm">
      <svg
        height="20"
        viewBox="-64 0 512 512"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
        <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
      </svg>
      <input
        type={show ? "text" : "password"}
        className="input"
        value={values.password}
        name="password"
        onChange={handleChange}
        placeholder="Enter your Password"
      />
      {errors.password && touched.password ? (
        <span style={{ color: "red" }}>{errors.password}</span>
      ) : null}

      {show ? (
        <div onClick={() => setShow(false)}>
          <FaEyeSlash title="hide" />
        </div>
      ) : (
        <div onClick={() => setShow(true)}>
          <FaEye />
        </div>
      )}
    </div>

    <div className="flex-row">
      <a href="/forgot" className="span">
        Forgot password?
      </a>
    </div>
    <button type="submit" className="button-submit">
      Sign In
    </button>
    <p className="p">
      Don't have an account?{" "}
      <a href="/register" className="span">
        Sign Up
      </a>
    </p>
  </form>
</div>

  );
};

export default Login;
