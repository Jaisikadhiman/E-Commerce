import React from "react";
import "./comDashboard.css";
import { FaListCheck } from "react-icons/fa6";
import { BiSolidMessageRounded } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { FaFirstOrderAlt } from "react-icons/fa";
import { GrOverview } from "react-icons/gr";
import { IoAnalytics } from "react-icons/io5";
import { FcSalesPerformance } from "react-icons/fc";
import { MdOutlinePayments } from "react-icons/md";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { FaFileInvoice } from "react-icons/fa";
import { MdAssignmentReturn } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { MdFeedback } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Dropdown from "react-bootstrap/Dropdown";
// import Form from 'react-bootstrap/Form';
import {
  Form,
  Row,
  Col,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CompanyDashboard = () => {
  return (
    <>
      {/*NAVBAR*/}
      <nav class="navbar navbar-expand-lg navbar-light bg-dark sticky-top ">
        <div class="container-fluid">
          <h3>Company Panel</h3>

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
              <button class="btn navbtn" type="submit">
              Company Name
              </button>
          
          </div>
        </div>
      </nav>
      {/*SIDEBAR*/}
      <div className="d-flex">
        <div class="sidebar bg-dark">
          {/* <h4 class="text-center">Sidebar</h4> */}
          <div>
            <h6 className="text-darkyellow mt-4">Main Menu</h6>
          </div>
          <a href="#home" className="bg-darkyellow mx-3 py-3 px-3 rounded">
            Overview <GrOverview />
          </a>
          <a href="#home" className="bg-primary mx-3 py-3 px-3 mt-3 rounded">
            Analytics <IoAnalytics />
          </a>
          <div class="dropdown  py-1 px-3">
            <button
              class="btn dropdown-toggle py-1"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
            >
              Products
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a class="dropdown-item text-dark" href="#">
                  Flip-Flops
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark" href="#">
                  Sports-Shoes
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark" href="#">
                  Ballet flats
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark" href="#">
                  Sneakers
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark" href="#">
                  Loafers
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark" href="#">
                  Boots
                </a>
              </li>
            </ul>
          </div>
          <a href="#home" className="bg-primary mx-3 py-3 px-3 mt-3 rounded">
            Sales <FcSalesPerformance />
          </a>
          <div>
            <h6>Transacrtions</h6>
          </div>
          <a
            href="/deleteReason"
            className="bg-primary mx-3 mt-3 py-3 px-3 rounded"
          >
            Payments <MdOutlinePayments />
          </a>
          <a href="#contact" className="bg-primary mx-3 mt-3 py-3 px-3 rounded">
            Refunds <HiOutlineReceiptRefund />
          </a>
          <a href="#contact" className="bg-primary mx-3 mt-3 py-3 px-3 rounded">
            Invoice <FaFileInvoice />
          </a>
          <a href="#contact" className="bg-primary mx-3 mt-3 py-3 px-3 rounded">
            Returns <MdAssignmentReturn />
          </a>
          <div>
            <h6>General</h6>
          </div>
          <a href="#contact" className="bg-primary mx-3 mt-3 py-3 px-3 rounded">
            Notification <IoIosNotifications />
          </a>
          <a href="#contact" className="bg-primary mx-3 mt-3 py-3 px-3 rounded">
            Feedback <MdFeedback />
          </a>
          <a href="#contact" className="bg-primary mx-3 mt-3 py-3 px-3 rounded">
            Setting <CiSettings />
          </a>
        </div>
        <div className="p-3 ">
          <h4>
            <MdOutlineProductionQuantityLimits /> Add New Product
          </h4>
          
        </div>
      </div>
    </>
  );
};

export default CompanyDashboard;
