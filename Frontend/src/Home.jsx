import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
// import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteAccount from "./EditProfile/DeleteAccount";
import ProfileEdit from "./EditProfile/ProfileEdit";
import ProfileView from "./EditProfile/profileView";
import { addCart, blankCart, clearCount } from "./redux/slice/cartSlice";
import { logout } from "./redux/slice/userSlice";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import swal from "sweetalert";
// import { CiHeart } from "react-icons/ci";showData
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
{
  /* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" /> */
}

const Home = () => {
  const [show, setShow] = useState(false);
  const [showData, setShowData] = useState("");
  const [select, setSelect] = useState("");
  const queryClient = useQueryClient();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = useSelector((state) => state?.userSlice?.loginUser ?? "");
  const userId = user?.data?._id;
  const cart = useSelector((state) => state?.cartSlice);
  const token = useSelector(
    (state) => state?.userSlice?.loginUser?.token ?? ""
  );
  console.log(token);

  console.log("cart :>> ", cart);
  const navigate = useNavigate();
  const dispatch = useDispatch(addCart);
  const selector = useSelector((state) => state?.cartSlice?.product);
  console.log(selector);

  console.log("user :>> ", user);
  const [isModalOneVisible, setIsModalOneVisible] = React.useState(false);
  const [isModalTwoVisible, setIsModalTwoVisible] = React.useState(false);
  const [isModalThreeVisible, setIsModalThreeVisible] = React.useState(false);
  const [isModalFourVisible, setIsModalFourVisible] = React.useState(false);
  const [isModalFiveVisible, setIsModalFiveVisible] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [detail,setDetail] =React.useState("");

  const getProducts = async () => {
    const resp = await axios.get("http://localhost:8080/api/product/getall");
    console.log(resp);
    return resp.data.data;
  };
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  console.log(data);
  const mystyle = {
    width: "30px",
    borderRadius: "25px",
  };
  const divStyle = {
    width: "100%",
    height: "480px",
  };

  const addItems = async (body) => {
    const resp = await axios.post(
      `http://localhost:8080/api/cart/addCart/${userId}`,
      body
    );
    console.log(resp);
    return resp;
  };
  const mutation = useMutation({
    mutationFn: (body) => addItems(body),
    onSuccess: (data) => {
      swal({
        title: "Item Added To Cart Successfully",
        icon: "success",
      });
      setShowData("");
      setShow("");
      setSelect("");
    },
  });
  const fetchItem = async (id) => {
    console.log("body.product_id :>> ", id);
    // const id = body.product_id;
    const resp = await axios.get(
      `http://localhost:8080/api/cart/getCartItem/${id}`
    );
    console.log("resp :>> ", resp);
    return resp.data;
  };

  const addToCart = async (body) => {
    if (user?.token) {
      const response = await fetchItem(body.product_id);
      if (response.status == 200) {
        swal({
          title: "Item already in cart",
          // icon: "success",
        });
        setShow(false);
      } else {
        dispatch(addCart(body?.product_id));
        mutation.mutate(body);
      }
      // console.log("enter :>> 111", body?.quantity);
      // console.log(body?.product_id);
      // alert("added to cart");
      // console.log("enter :>>222 ");
      // console.log("enter :>>3333 ");
    } else {
      alert("please login first to add product in  cart");
      navigate("/login");
    }
  };
  const handlelogout = () => {
    setIsModalFourVisible(true);
    dispatch(logout());
    dispatch(blankCart());
    dispatch(clearCount());
    navigate("/");
  };
  const addWishlistItem = async (id) => {
    alert("hello cliclked");
    // setStatus("true");
    const ans = await axios.post(
      "http://localhost:8080/api/wishlist/addWishlist",
      { productId: id, userId: userId, status: status }
    );
    console.log("ans :>> ", ans);
    console.log("status :>> ", status);
    return resp.data;
  };
  const wishlist = useMutation({
    mutationFn: (id) => addWishlistItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
    },
  });
  const addWishlist = (id) => {
    // alert("hello cliclked")
    wishlist.mutate(id);
  };
  console.log(selector.length);
  console.log(data);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#00246B" }} // Deep navy blue background
      >
        {/* Container wrapper */}
        <div className="container-fluid">
          {/* Toggle button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars" style={{ color: "#CADCFC" }}></i>{" "}
            {/* Light blue icon */}
          </button>

          {/* Collapsible wrapper */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Navbar brand */}
            <a className="navbar-brand mt-2 mt-lg-0" href="#">
              <img
                src="/images/logo.jpg"
                height="60"
                width={"60px"}
                alt="MDB Logo"
                loading="lazy"
                style={{ border: "2px solid #CADCFC", borderRadius: "50%" }} // Light blue border
              />
            </a>

            {/* Left links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/login"
                  style={{ color: "#CADCFC" }}
                >
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/register"
                  style={{ color: "#CADCFC" }}
                >
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* Right elements */}
          <div className="d-flex align-items-center ">
            <a className="nav-link" href="/customer/cart">
              <span
                className="position-absolute badge rounded-pill"
                style={{
                  top: "32px",
                  right: "120px",
                  backgroundColor: "#CADCFC", // Light blue badge
                  color: "#00246B", // Deep navy blue text
                }}
              >
                {selector?.length ?? "0"}
              </span>
            </a>

            <a className="nav-link" href="/customer/cart">
              <FaShoppingCart
                style={{
                  top: "38px",
                  right: "25px",
                  width: "60px",
                  color: "#CADCFC",
                }}
              />{" "}
              {/* Light blue icon */}
            </a>

            <a className="nav-link" href="/customer/wishlist">
              <FaHeart
                style={{
                  top: "38px",
                  right: "25px",
                  width: "60px",
                  color: "#CADCFC",
                  fontSize: "25px",
                }}
              />{" "}
              {/* Light blue icon */}
            </a>

            {/* Avatar Dropdown */}
            <div className="dropdown">
              <a
                className="d-flex align-items-center hidden-arrow"
                href="#"
                id="navbarDropdownMenuAvatar"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="\images\profile.png"
                  className="rounded-circle"
                  height="40"
                  width={"40px"}
                  alt="User Avatar"
                  style={{ border: "2px solid #CADCFC" }} // Light blue border
                />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuAvatar"
              >
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setIsModalOneVisible(true)}
                  >
                    View Profile
                  </button>
                  <ProfileView
                    show={isModalOneVisible}
                    onHide={() => setIsModalOneVisible(false)}
                  />
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setIsModalTwoVisible(true)}
                  >
                    Edit Profile
                  </button>
                  <ProfileEdit
                    show={isModalTwoVisible}
                    onHide={() => setIsModalTwoVisible(false)}
                  />
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setIsModalThreeVisible(true)}
                  >
                    Change Password
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handlelogout}>
                    Logout
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setIsModalFiveVisible(true)}
                  >
                    Delete Account
                  </button>
                  <DeleteAccount
                    show={isModalFiveVisible}
                    onHide={() => setIsModalFiveVisible(false)}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <section>
        <div
          id="fashionCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ marginTop: "" }}
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="/images/fashion1.jpg"
                className="d-block w-100"
                alt="Fashion Image 1"
                style={{ height: "600px", objectFit: "cover" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="/images/fashion2.jpg"
                className="d-block w-100"
                alt="Fashion Image 2"
                style={{ height: "600px", objectFit: "cover" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="/images/fashion3.jpg"
                className="d-block w-100"
                alt="Fashion Image 3"
                style={{ height: "600px", objectFit: "cover" }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#fashionCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#fashionCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* <div>
        <img src="\images\e-comm.jpeg" style={divStyle} alt="" />
      </div> */}

      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row">
            {data &&
              data?.map((item) => (
                // Card
                <div className="col-md-12 col-lg-3 mb-4 mb-lg-0">
                  <div className="card">
                    <div className="d-flex justify-content-between p-3">
                      <p className="lead mb-0 fw-bold">{item.name}</p>
                      {/* <div
                    className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                    style={{ width: "35px", height: "35px" }}
                  >
                    
                  </div> */}
                      <button
                        style={{ width: "50px", height: "35px" }}
                        type="button"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        class="btn btn-primary fs-6"
                        data-mdb-ripple-color="dark"
                        onClick={() => addWishlist(item?._id)}
                        // onClick={()=>setDetail()}
                      >
                        {status && status ? (
                          <FaHeart
                            className="mb-5"
                            style={{
                              width: "80px",
                              height: "35px",
                              marginLeft: "-27px",
                              marginTop: "-6px",
                            }}
                          />
                        ) : (
                          <CiHeart
                            className="mb-5"
                            style={{
                              width: "80px",
                              height: "35px",
                              marginLeft: "-27px",
                              marginTop: "-6px",
                            }}
                          />
                        )}
                        {/* <CiHeart  style={{ width: "80px", height: "35px" ,marginLeft:"-27px" , marginTop:"-6px"}}/> */}
                      </button>
                    </div>
                    <img
                      style={{
                        width: "200px",
                        height: "200px",
                        marginLeft: "30px",
                      }}
                      src={`http://localhost:8080/${item.productImg}`}
                      className="card-img-top"
                      alt="Laptop"
                    />
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        {/* <p className="small">
                      <a href="#!" className="text-muted">
                      Category:{item.category}
                      </a>
                    </p> */}

                        <p className="text-muted mb-0">
                          Category:{" "}
                          <span className="fw-bold">{item.category}</span>
                        </p>

                        <p className="small text-danger">
                          <s>{item.discount}%</s>
                        </p>
                      </div>

                      <div className="d-flex justify-content-between mb-3">
                        <p className="text-muted mb-0">
                          Stock: <span className="fw-bold">{item.stock}</span>
                        </p>
                        <p className="text-muted mb-0">
                          Price:{" "}
                          <span className="fw-bold">{item?.basePrice}</span>
                        </p>
                      </div>

                      <div className="  mb-2">
                        <p>Added By: {item.user_Data.name}</p>
                        <p style={{ fontSize: "14px" }}>
                          {" "}
                          <h6>Description:</h6> {item.description}
                        </p>
                        {/* <div className="ms-auto text-warning">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </div> */}
                      </div>
                      <div class="d-flex flex-row">
                        <button
                          type="button"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          class="btn btn-danger flex-fill ms-1"
                          onClick={() => {
                            setShowData(item);
                            setShow(true);
                          }}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {/* <div className="col-md-6 col-lg-3 mb-4 mb-md-0">
              <div className="card">
                <div className="d-flex justify-content-between p-3">
                  <p className="lead mb-0">Today's Combo Offer</p>
                  <div
                    className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                    style={{ width: "35px", height: "35px" }}
                  >
                    <p className="text-white mb-0 small">x2</p>
                  </div>
                </div>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/7.webp"
                  className="card-img-top"
                  alt="Laptop"
                />
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <p className="small">
                      <a href="#!" className="text-muted">
                        Laptops
                      </a>
                    </p>
                    <p className="small text-danger">
                      <s>$1199</s>
                    </p>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <h5 className="mb-0">HP Envy</h5>
                    <h5 className="text-dark mb-0">$1099</h5>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <p className="text-muted mb-0">
                      Available: <span className="fw-bold">7</span>
                    </p>
                    <div className="ms-auto text-warning">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="far fa-star"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4 mb-md-0">
              <div className="card">
                <div className="d-flex justify-content-between p-3">
                  <p className="lead mb-0">Today's Combo Offer</p>
                  <div
                    className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                    style={{ width: "35px", height: "35px" }}
                  >
                    <p className="text-white mb-0 small">x3</p>
                  </div>
                </div>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/5.webp"
                  className="card-img-top"
                  alt="Gaming Laptop"
                />
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <p className="small">
                      <a href="#!" className="text-muted">
                        Laptops
                      </a>
                    </p>
                    <p className="small text-danger">
                      <s>$1399</s>
                    </p>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <h5 className="mb-0">Toshiba B77</h5>
                    <h5 className="text-dark mb-0">$1299</h5>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <p className="text-muted mb-0">
                      Available: <span className="fw-bold">5</span>
                    </p>
                    <div className="ms-auto text-warning">
                      <i className="fa fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4 mb-md-0">
              <div className="card">
                <div className="d-flex justify-content-between p-3">
                  <p className="lead mb-0">Today's Combo Offer</p>
                  <div
                    className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                    style={{ width: "35px", height: "35px" }}
                  >
                    <p className="text-white mb-0 small">x3</p>
                  </div>
                </div>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/5.webp"
                  className="card-img-top"
                  alt="Gaming Laptop"
                />
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <p className="small">
                      <a href="#!" className="text-muted">
                        Laptops
                      </a>
                    </p>
                    <p className="small text-danger">
                      <s>$1399</s>
                    </p>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <h5 className="mb-0">Toshiba B77</h5>
                    <h5 className="text-dark mb-0">$1299</h5>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <p className="text-muted mb-0">
                      Available: <span className="fw-bold">5</span>
                    </p>
                    <div className="ms-auto text-warning">
                      <i className="fa fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>selected size : {select}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {showData?.size?.map((items) => {
                  return (
                    <>
                      {items}
                      <input
                        type="radio"
                        name="size"
                        onClick={() => setSelect(items)}
                      />
                    </>
                  );
                })}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => {
                    if (select) {
                      let body = {
                        product_id: showData?._id,
                        size: select,
                        basePrice: showData?.basePrice,
                        name: showData?.name,
                        productImg: showData?.productImg,
                        quantity: showData?.quantity,
                      };
                      addToCart(body);
                    } else {
                      alert("please select size");
                    }
                  }}
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </section>
    </>
  );

  //   return (
  //     <>
  //       <nav
  //         className="navbar navbar-expand-lg"
  //         style={{ backgroundColor: "#00246B" }} // Deep navy blue background
  //       >
  //         {/* Container wrapper */}
  //         <div className="container-fluid">
  //           {/* Toggle button */}
  //           <button
  //             className="navbar-toggler"
  //             type="button"
  //             data-bs-toggle="collapse"
  //             data-bs-target="#navbarSupportedContent"
  //             aria-controls="navbarSupportedContent"
  //             aria-expanded="false"
  //             aria-label="Toggle navigation"
  //           >
  //             <i className="fas fa-bars" style={{ color: "#CADCFC" }}></i> {/* Light blue icon */}
  //           </button>

  //           {/* Collapsible wrapper */}
  //           <div className="collapse navbar-collapse" id="navbarSupportedContent">
  //             {/* Navbar brand */}
  //             <a className="navbar-brand mt-2 mt-lg-0" href="#">
  //               <img
  //                 src="/images/logo.jpg"
  //                 height="60"
  //                 width={"60px"}
  //                 alt="MDB Logo"
  //                 loading="lazy"
  //                 style={{ border: "2px solid #CADCFC", borderRadius: "50%" }} // Light blue border
  //               />
  //             </a>

  //             {/* Left links */}
  //             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
  //               <li className="nav-item">
  //                 <a className="nav-link" href="/login" style={{ color: "#CADCFC" }}>
  //                   Login
  //                 </a>
  //               </li>
  //               <li className="nav-item">
  //                 <a className="nav-link" href="/register" style={{ color: "#CADCFC" }}>
  //                   Register
  //                 </a>
  //               </li>
  //             </ul>
  //           </div>

  //           {/* Right elements */}
  //           <div className="d-flex align-items-center ">
  //             <span
  //               className="position-absolute badge rounded-pill"
  //               style={{
  //                 top: "22px",
  //                 right: "80px",
  //                 backgroundColor: "#CADCFC", // Light blue badge
  //                 color: "#00246B", // Deep navy blue text
  //               }}
  //             >
  //               {selector?.length ?? "0"}
  //             </span>
  //             <a className="nav-link" href="/register">
  //               <FaShoppingCart
  //                 style={{ top: "38px", right: "25px", width: "60px", color: "#CADCFC" }}
  //               /> {/* Light blue icon */}
  //             </a>

  //             {/* Avatar Dropdown */}
  //             <div className="dropdown">
  //               <a
  //                 className="d-flex align-items-center hidden-arrow"
  //                 href="#"
  //                 id="navbarDropdownMenuAvatar"
  //                 role="button"
  //                 data-bs-toggle="dropdown"
  //                 aria-expanded="false"
  //               >
  //                 <img
  //                   src="/images/logo.jpg"
  //                   className="rounded-circle"
  //                   height="40"
  //                   width={"40px"}
  //                   alt="User Avatar"
  //                   style={{ border: "2px solid #CADCFC" }} // Light blue border
  //                 />
  //               </a>
  //               <ul
  //                 className="dropdown-menu dropdown-menu-end"
  //                 aria-labelledby="navbarDropdownMenuAvatar"
  //               >
  //                 <li>
  //                   <button
  //                     className="dropdown-item"
  //                     onClick={() => setIsModalOneVisible(true)}
  //                   >
  //                     View Profile
  //                   </button>
  //                   <ProfileView
  //                     show={isModalOneVisible}
  //                     onHide={() => setIsModalOneVisible(false)}
  //                   />
  //                 </li>
  //                 <li>
  //                   <button
  //                     className="dropdown-item"
  //                     onClick={() => setIsModalTwoVisible(true)}
  //                   >
  //                     Edit Profile
  //                   </button>
  //                   <ProfileEdit
  //                     show={isModalTwoVisible}
  //                     onHide={() => setIsModalTwoVisible(false)}
  //                   />
  //                 </li>
  //                 <li>
  //                   <button
  //                     className="dropdown-item"
  //                     onClick={() => setIsModalThreeVisible(true)}
  //                   >
  //                     Change Password
  //                   </button>
  //                 </li>
  //                 <li>
  //                   <button className="dropdown-item" onClick={handlelogout}>
  //                     Logout
  //                   </button>
  //                 </li>
  //                 <li>
  //                   <button
  //                     className="dropdown-item"
  //                     onClick={() => setIsModalFiveVisible(true)}
  //                   >
  //                     Delete Account
  //                   </button>
  //                   <DeleteAccount
  //                     show={isModalFiveVisible}
  //                     onHide={() => setIsModalFiveVisible(false)}
  //                   />
  //                 </li>
  //               </ul>
  //             </div>
  //           </div>
  //         </div>
  //       </nav>

  //       {/* Fashion Section - Carousel */}
  //       {/* <section>
  //         <div
  //           id="fashionCarousel"
  //           className="carousel slide"
  //           data-bs-ride="carousel"
  //           style={{ marginTop: "20px" }}
  //         >
  //           <div className="carousel-inner">
  //             <div className="carousel-item active">
  //               <img
  //                 src="/images/fashion1.jpg"
  //                 className="d-block w-100"
  //                 alt="Fashion Image 1"
  //                 style={{ height: "400px", objectFit: "cover" }}
  //               />
  //             </div>
  //             <div className="carousel-item">
  //               <img
  //                 src="/images/fashion2.jpg"
  //                 className="d-block w-100"
  //                 alt="Fashion Image 2"
  //                 style={{ height: "400px", objectFit: "cover" }}
  //               />
  //             </div>
  //             <div className="carousel-item">
  //               <img
  //                 src="/images/fashion3.jpg"
  //                 className="d-block w-100"
  //                 alt="Fashion Image 3"
  //                 style={{ height: "400px", objectFit: "cover" }}
  //               />
  //             </div>
  //           </div>
  //           <button
  //             className="carousel-control-prev"
  //             type="button"
  //             data-bs-target="#fashionCarousel"
  //             data-bs-slide="prev"
  //           >
  //             <span
  //               className="carousel-control-prev-icon"
  //               aria-hidden="true"
  //             ></span>
  //             <span className="visually-hidden">Previous</span>
  //           </button>
  //           <button
  //             className="carousel-control-next"
  //             type="button"
  //             data-bs-target="#fashionCarousel"
  //             data-bs-slide="next"
  //           >
  //             <span
  //               className="carousel-control-next-icon"
  //               aria-hidden="true"
  //             ></span>
  //             <span className="visually-hidden">Next</span>
  //           </button>
  //         </div>
  //       </section> */}
  //       <section>
  //   <div
  //     id="fashionCarousel"
  //     className="carousel slide"
  //     data-bs-ride="carousel"
  //     data-bs-interval="3000" // Autoplay every 3 seconds
  //     style={{ marginTop: "" }}
  //   >
  //     <div className="carousel-inner">
  //       <div className="carousel-item active">
  //         <img
  //           src="\images\fashion.jpg"
  //           className="d-block w-100"
  //           alt="Fashion Image 1"
  //           style={{ height: "500px", objectFit: "cover" }}
  //         />
  //       </div>
  //       <div className="carousel-item">
  //         <img
  //           src="/images/fashion1.jpg"
  //           className="d-block w-100"
  //           alt="Fashion Image 2"
  //           style={{ height: "500px", objectFit: "cover" }}
  //         />
  //       </div>
  //       <div className="carousel-item">
  //         <img
  //           src="\images\fashion2.jpg"
  //           className="d-block w-100"
  //           alt="Fashion Image 3"
  //           style={{ height: "500px", objectFit: "cover" }}
  //         />
  //       </div>
  //     </div>
  //     <button
  //       className="carousel-control-prev"
  //       type="button"
  //       data-bs-target="#fashionCarousel"
  //       data-bs-slide="prev"
  //     >
  //       <span
  //         className="carousel-control-prev-icon"
  //         aria-hidden="true"
  //       ></span>
  //       <span className="visually-hidden">Previous</span>
  //     </button>
  //     <button
  //       className="carousel-control-next"
  //       type="button"
  //       data-bs-target="#fashionCarousel"
  //       data-bs-slide="next"
  //     >
  //       <span
  //         className="carousel-control-next-icon"
  //         aria-hidden="true"
  //       ></span>
  //       <span className="visually-hidden">Next</span>
  //     </button>
  //   </div>
  // </section>

  //       {/* Product Listings */}
  //       <section style={{ backgroundColor: "#eee" }}>
  //         <div className="container py-5">
  //           <div className="row">
  //             {data &&
  //               data?.map((item) => (
  //                 <div className="col-md-12 col-lg-3 mb-4 mb-lg-0" key={item._id}>
  //                   <div className="card">
  //                     <div className="d-flex justify-content-between p-3">
  //                       <p className="lead mb-0 fw-bold">{item.name}</p>
  //                       <button
  //                         style={{ width: "80px", height: "35px" }}
  //                         type="button"
  //                         data-mdb-button-init
  //                         data-mdb-ripple-init
  //                         className="btn btn-primary fs-6"
  //                         data-mdb-ripple-color="dark"
  //                       >
  //                         Wishlist
  //                       </button>
  //                     </div>
  //                     <img
  //                       style={{
  //                         width: "200px",
  //                         height: "200px",
  //                         marginLeft: "30px",
  //                       }}
  //                       src={`http://localhost:8080/${item.productImg}`}
  //                       className="card-img-top"
  //                       alt="Product"
  //                     />
  //                     <div className="card-body">
  //                       <div className="d-flex justify-content-between">
  //                         <p className="text-muted mb-0">
  //                           Category: <span className="fw-bold">{item.category}</span>
  //                         </p>
  //                         <p className="small text-danger">
  //                           <s>{item.discount}%</s>
  //                         </p>
  //                       </div>

  //                       <div className="d-flex justify-content-between mb-3">
  //                         <p className="text-muted mb-0">
  //                           Stock: <span className="fw-bold">{item.stock}</span>
  //                         </p>
  //                         <p className="text-muted mb-0">
  //                           Price: <span className="fw-bold">{item?.basePrice}</span>
  //                         </p>
  //                       </div>

  //                       <div className="mb-2">
  //                         <p>Added By: {item.user_Data.name}</p>
  //                         <p style={{ fontSize: "14px" }}>
  //                           <h6>Description:</h6> {item.description}
  //                         </p>
  //                       </div>
  //                       <div className="d-flex flex-row">
  //                         <button
  //                           type="button"
  //                           data-mdb-button-init
  //                           data-mdb-ripple-init
  //                           className="btn btn-danger flex-fill ms-1"
  //                           onClick={() => {
  //                             setShowData(item);
  //                             setShow(true);
  //                           }}
  //                         >
  //                           Add To Cart
  //                         </button>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               ))}
  //           </div>
  //         </div>
  //       </section>

  //     </>
  //   );
};

export default Home;
