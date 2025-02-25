import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Address.css";
import { Mutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
const Address = () => {
  const [show, setShow] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showId, setShowId] = useState("");
  const token = useSelector((state) => state.userSlice.loginUser.token);
  const {id} = useParams();
  console.log('userId :>> ',id);
  // console.log(token);
  const navigate = useNavigate();
  const handleclick = () => {
    // const addAddress = 

 
    navigate("/customer/payment",{state:"test"});
  };
  const fetchAddress = async (req, resp) => {
    const response = await axios.get(
      "http://localhost:8080/api/address/getAddresses",
      {
        headers: { Authorization: `${token}` },
      }
    );
    console.log(response);
    return response.data.data;
  };
  const { data } = useQuery({
    queryKey: ["addresses"],
    queryFn: fetchAddress,
  });
  return (
    <>
      {show ? (
        <div className="gradient-custom " style={{ height: "550px" }}>
          <div className="row mt-3 mx-3 " style={{ marginTop: "45px" }}>
            <div className="col-md-3">
              <div
                style={{ marginTop: "50px", marginLeft: "10px" }}
                className="text-center"
              >
                <i
                  id="animationDemo"
                  data-mdb-animation="slide-right"
                  data-mdb-toggle="animation"
                  data-mdb-animation-reset="true"
                  data-mdb-animation-start="onScroll"
                  data-mdb-animation-on-scroll="repeat"
                  className="fas fa-3x fa-shipping-fast text-white"
                ></i>
                <h3 className="mt-3 text-white">Welcome</h3>
                <p className="white-text">
                  You are 30 seconds away from compleating your order!
                </p>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-white btn-rounded back-button"
                  onClick={() => setShow(false)}
                >
                  Go back
                </button>
              </div>
            </div>
            <div className="col-md-9 justify-content-center">
              <div className="card card-custom pb-4">
                <div className="card-body mt-0 mx-5">
                  <div className="text-center mb-3 pb-2 mt-3">
                    <h4 style={{ color: " #495057 " }}>Delivery Details</h4>
                  </div>

                  <form className="mb-0" style={{ width: "600px" }}>
                    <div className="row mb-4">
                      <div className="col">
                        <div data-mdb-input-init className="form-outline">
                          <input
                            type="text"
                            id="form9Example1"
                            className="form-control input-custom"
                          />
                          <label className="form-label" for="form9Example1">
                            Name
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div data-mdb-input-init className="form-outline">
                          <input
                            type="text"
                            id="form9Example2"
                            className="form-control input-custom"
                          />
                          <label className="form-label" for="form9Example2">
                            Contact Number
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div data-mdb-input-init className="form-outline">
                          <input
                            type="text"
                            id="form9Example1"
                            className="form-control input-custom"
                          />
                          <label className="form-label" for="form9Example1">
                            Landmark
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="col">
                        <div data-mdb-input-init className="form-outline">
                          <input
                            type="text"
                            id="form9Example3"
                            className="form-control input-custom"
                          />
                          <label className="form-label" for="form9Example3">
                            Road Name/ Area /Colony
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <div data-mdb-input-init className="form-outline">
                          <input
                            type="text"
                            id="form9Example3"
                            className="form-control input-custom"
                          />
                          <label className="form-label" for="form9Example3">
                            House No
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div data-mdb-input-init className="form-outline">
                          <input
                            type="text"
                            id="form9Example3"
                            className="form-control input-custom"
                          />
                          <label className="form-label" for="form9Example3">
                            City
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div data-mdb-input-init className="form-outline">
                          <input
                            type="text"
                            id="form9Example4"
                            className="form-control input-custom"
                          />
                          <label className="form-label" for="form9Example4">
                            Pincode
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div data-mdb-input-init className="form-outline">
                          <input
                            type="text"
                            id="form9Example4"
                            className="form-control input-custom"
                          />
                          <label className="form-label" for="form9Example4">
                            State
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="float-end ">
                      <button
                        type="submit"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-primary btn-rounded"
                        style={{
                          backgroundColor: " #0062CC ",
                          marginTop: "20px",
                          marginRight: "100px",
                        }}
                        onClick={handleclick}
                      >
                        Deliver to this address
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <button
            type="submit"
            data-mdb-button-init
            data-mdb-ripple-init
            className="btn btn-rounded"
            style={{
              backgroundColor: " #00246B ",
              marginTop: "20px",
              marginRight: "100px",
              width: "200px",
              marginLeft: "550px",
              color: "white",
            }}
            onClick={() => setShow(true)}
          >
            + Add new Address
          </button>
          <br />
          {data &&
            data?.map((item, index) => (
              <>
                <div
                  className="mt-3 rounded px-2 py-1 row"
                  style={{
                    width: "500px",
                    marginLeft: "400px",
                    border: "1px solid #00246B",
                  }}
                >
                  <div className="d-flex col-10">
                    <div>
                      <input
                        type="radio"
                        name="address"
                        onChange={() => {
                          setShowButton(true);
                          setShowId(item?._id);
                        }}
                      />
                      <strong>{item?.name}</strong>
                      <div className="mt-2">
                        <span>
                          <b>Phone No:</b> +91 {item?.contactNo},<b>Colony:</b>{" "}
                          {item?.colony} ,<b>Pincode:</b>, <b>State:</b>{" "}
                          {item?.state}
                          {item?.pincode}
                        </span>

                        <div>
                          <span>
                            <b>Landmark:</b> {item?.landmark},<b>City:</b>{" "}
                            {item?.city},<b>House No:</b> {item?.houseNo}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col-2">
                      <button
                        className="btn"
                        style={{
                          marginLeft: "100px",
                          width: "50px",
                          backgroundColor: "#00246B",
                          color: "white",
                        }}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                  <br />

                  {showButton && showId == item?._id ? (
                    <button
                      type="submit"
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-rounded"
                      style={{
                        backgroundColor: " #00246B ",
                        marginTop: "20px",
                        marginRight: "100px",
                        width: "200px",
                        color: "white",
                        // marginLeft: "550px",
                      }}
                      onClick={handleclick}
                    >
                      Deliver To This Address
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </>
            ))}
        </>
      )}
    </>
  );
};

export default Address;
