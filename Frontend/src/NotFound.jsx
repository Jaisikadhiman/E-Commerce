import React from "react";
import Login from "./Auth/Login";
import { Link } from "react-router-dom";

function NotFound() {
  const mystyle = {
    // width: "600px",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div style={mystyle}>
      {/* <p className="title">Register </p> */}
      <h1>Page Not Found</h1>
      <img src="src\images\error_img.jpg" style={{width:"600px"}}   alt="" /> <br />
      <Link to={"/login"}><h3>Back</h3>
      </Link>
      {/* <button onClick={"/login"}>Back</button> */}
    </div>
  );
}

export default NotFound;
