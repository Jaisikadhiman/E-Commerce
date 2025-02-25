import React from "react";
import "./dashboard.css";
import { FaListCheck } from "react-icons/fa6";
import { BiSolidMessageRounded } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { FaFirstOrderAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Chart } from "react-google-charts";
const Dashboard = () => {
  const Navigate = useNavigate();

  const data = [
    ["Task", "Hours per Day"],
    ["Work", 9],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];
  // const dataOld = [
  //   ["Name", "Popularity"],
  //   ["Cesar", 250],
  //   ["Rachel", 4200],
  //   ["Patrick", 2900],
  //   ["Eric", 8200],
  // ];
  
  const dataNew = [
    ["Name", "Popularity"],
    ["Cesar", 370],
    ["Rachel", 600],
    ["Patrick", 700],
    ["Eric", 1500],
  ];
  
   const diffdata = {
    // old: dataOld,
    new: dataNew,
  };
  return (
    <>
      {/*NAVBAR*/}
      <nav class="navbar navbar-expand-lg navbar-light bg-dark sticky-top ">
        <div class="container-fluid">
          <a class="navbar-brand text-light" href="#">
            Admin Panel
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <form class="d-flex">
              {/* <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/> */}
              <button
                class="btn btn-outline-success bg-primary text-light"
                type="submit"
              >
                Admin Name
              </button>
            </form>
          </div>
        </div>
      </nav>
      {/*SIDEBAR*/}
      <div className="d-flex">
        <div class="sidebar bg-dark">
          {/* <h4 class="text-center">Sidebar</h4> */}
          <a href="#home" className="bg-primary mx-3 py-3 px-3 rounded">
            Dashboard
          </a>
          <div class="dropdown  py-1 px-3">
            <button
              onClick={() => {
                localStorage.clear();
                Navigate("/login");
              }}
            >
              Log out
            </button>
            <button
              class="btn btn-primary dropdown-toggle py-1"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
            >
              Product
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a class="dropdown-item text-dark" href="#">
                  Action
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
          <div class="dropdown  py-1 px-3">
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
            >
              Product Categories
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a class="dropdown-item text-dark" href="#">
                  Action
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>

          <div class="dropdown  py-1 px-3">
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
            >
              Categories
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a class="dropdown-item text-dark" href="#">
                  Action
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
          <a
            href="/deleteReason"
            className="bg-primary mx-3 mt-3 py-3 px-3 rounded"
          >
            Delete Reasons
          </a>
          <a href="#contact" className="bg-primary mx-3 mt-3 py-3 px-3 rounded">
            View Customer
          </a>
          <a href="#contact" className="bg-primary mx-3 mt-3 py-3 px-3 rounded">
            View Order
          </a>
          <a href="#contact" className="bg-primary mx-3 mt-3 py-3 px-3 rounded">
            View Payments
          </a>
          <a href="#contact" className="bg-primary mx-3 mt-3 py-3 px-3 rounded">
            View Users
          </a>
        </div>
        <div>
          <h3 className="p-3">Dashboard</h3>
          <div className="d-flex justify-content-evenly gap-4 mx-5">
            <div class="div1 bg-primary gap-4 d-flex align-items-center justify-content-center text-white">
              <div>
                <FaListCheck className="icon" />
              </div>
              <div className="d-flex flex-column">
                <h3>6</h3>
                <h5>Products</h5>
              </div>
            </div>
            <div class="div1 bg-success gap-4 d-flex align-items-center justify-content-center text-white">
              <div>
                {" "}
                <BiSolidMessageRounded className="icon" />
              </div>
              <div className="d-flex flex-column">
                <h3>0</h3>
                <h5>Customers</h5>
              </div>
            </div>
            <div class="div1 bg-warning gap-4 d-flex align-items-center justify-content-center text-white">
              <div>
                <FaShoppingCart className="icon" />
              </div>
              <div className="d-flex flex-column">
                <h3>44</h3>
                <h5>Product Categories</h5>
              </div>
            </div>
            <div class="div1 bg-danger gap-4 d-flex align-items-center justify-content-center text-white">
              <div>
                <FaFirstOrderAlt className="icon" />
              </div>
              <div className="d-flex flex-column">
                <h3>6</h3>
                <h5>Orders</h5>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6" style={{height:"100px"}}>
              <div className="mx-5 mt-5">
                <Chart
                  chartType="PieChart"
                  data={data}
                  width="90%"
                  height="200px"
                  legendToggle
                />
              </div>
            </div>
            <div className="col-lg-3">
              <div>
              <Chart
      chartType="ColumnChart"
      width="100%"
      height="400px"
      diffdata={diffdata}
    />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
