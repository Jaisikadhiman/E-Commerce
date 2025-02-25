import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FaCcMastercard } from "react-icons/fa6";
import { FaCcVisa } from "react-icons/fa6";
import { FaCcAmex } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";
import { amount, decrement, increment } from "../redux/slice/cartSlice";
import { useNavigate } from "react-router-dom";
import { status } from "../helper";
import "./cart.css"
import swal from "sweetalert";

const AddToCart = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(true);
  const [userId, setUserId] = useState("");
  const token = useSelector((state) => state?.userSlice?.loginUser?.token);
  // const product = useSelector((state) => state?.cartSlice?.product);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState([]);
  const queryClient = useQueryClient();
  // const [quantity, setQuantity] = useState([]);

  // // const [index,setIndex]= useState(0);
  // console.log(product);
  // const quantity = useSelector((state) => state?.cartSlice?.value);
  const navigate = useNavigate();
  // console.log(token);
  const fetchItems = async () => {
    console.log("helllooooo");
    const resp = await axios.get("http://localhost:8080/api/cart/getItems", {
      headers: { Authorization: `${token}` },
    });
    setUserId(resp.data.data[0].user_id);
    // console.log(resp.data.data[0].user_id);
    const ans = resp.data.data;
    const Quantity = ans.reduce((accumulator, item) => {
      return (accumulator += item?.quantity);
    }, 0);
    setTotalQuantity(Quantity);
    const Total = ans.reduce((accumulator, item) => {
      return (accumulator += item?.quantity * item?.basePrice);
    }, 0);
    console.log("Total :>> ", Total);
    setTotal(Total);
    console.log("totalQuantity :>> ", Quantity);
    // setQuantity(resp.data.data);
    return resp.data.data;
  };
  const { data } = useQuery({
    queryKey: ["cartItems"],
    queryFn: fetchItems,
  });
  console.log(data);
  const handleClick = (userId) => {
    dispatch(amount(total));
    // onClick={() => dispatch(decrement(item?._id))}
    console.log('userId :>> ', userId);
    navigate(`/customer/address/${userId}`);
  };
  const updateCart = async (body) => {
    // body.quantity += 1;
    console.log("body :>> ", body);
    if (body.key == 1) {
      console.log("body.quantity :>> ", body.quantity);
      console.log("body.stock :>> ", body.stock);
      if (body.quantity < body.stock) {
        body.quantity += 1;
        console.log("body.quantity :>> ", body.quantity);
        console.log("body.price :>> ", body.price);
        // setSubTotal(body?.price * body?.quantity)
        // console.log('subTotal :>> ', subTotal);
        // console.log("body?.price :>> ", body?.quantity);
        // setPrice(body?.price*body?.quantity);
      } else {
        alert("no more stock available");
      }
    }
    if (body.key == 2) {
      if (body.quantity <= 0) {
        alert("please select quantity");
      } else {
        body.quantity -= 1;
        // setSubTotal()
      }
    }
    // console.log("quantity :>> ", subTotal);
    const result = await axios.post(
      `http://localhost:8080/api/cart/update/${body.itemId}`,
      { quantity: body.quantity }
      // { upsert: true }
    );
    console.log("result :>> ", result);
    return result.data;
  };
  const mutation = useMutation({
    mutationFn: (body) => updateCart(body),
    onSuccess: () => {
      queryClient.invalidateQueries(["cartItems"]);
    },
  });
  const handleAdd = async (body) => {
    console.log("body :>> ", body);
    mutation.mutate(body);
  };
  const handleMinus = async (body) => {
    console.log("body :>> ", body);
    mutation.mutate(body);
  };
  const removeItem = async (id) => {
    console.log("id :>> ", id);
    const resp = await axios.post(
      `http://localhost:8080/api/cart/deleteCart/${id}`
    );
    console.log("resp :>> ", resp);
    return resp.data;
  };
  const deleteItem = useMutation({
    mutationFn: (id) => removeItem(id),
    onSuccess: () => {
      swal({
        title: "Remove Item!",
        icon: "success",
      });
      queryClient.invalidateQueries(["cartItems"]);
    },
  });
  const handleDelete = (id) => {
    deleteItem.mutate(id);
  };

  const handleAddList=async(body)=>{
    console.log('show :>> ', show);
    if(show){
      setShow((pre)=>!pre);
      const resp = await axios.post("http://localhost:8080/api/wishlist/addWishlist",body)
      console.log('resp :>> ', resp);
      console.log('body :>> ', body);
    }
  }
  return (
    <div style={{backgroundColor:"#00246B!important"}}>
      <section className="h-100 gradient-custom">
        <div className="container py-5" >
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3" style={{backgroundColor:"#00246B" , color:"white"}}>
                  <h5 className="mb-0">Cart - 2 items</h5>
                </div>
                <div className="card-body" style={{backgroundColor:"#CADCFC"}}>
                  {/* <!-- Single item --> */}
                  {data &&
                    data?.map((item) => (
                      <>
                        <div className="row" key={item?._id || index}>
                          <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                            {/* <!-- Image --> */}
                            <div
                              className="bg-image hover-overlay hover-zoom ripple rounded"
                              data-mdb-ripple-color="light"
                            >
                              <img
                                src={`http://localhost:8080/${item?.productImg}`}
                                className="w-100"
                                alt="Blue Jeans Jacket"
                                style={{ width: "50px", height: "150px" }}
                              />
                              <a href="#!">
                                <div
                                  className="mask"
                                  style={{
                                    backgroundColor: "rgba(251, 251, 251, 0.2)",
                                  }}
                                ></div>
                              </a>
                              {status(1)}
                            </div>
                            {/* <!-- Image --> */}
                          </div>

                          <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                            {/* <!-- Data --> */}
                            <p>
                              <strong>Decent {item?.name}</strong>
                            </p>
                            <p>name: {item?.name}</p>
                            <p>Size: {item?.size}</p>
                            <button
                              type="button"
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="btn  btn-sm me-1  fs-1"
                              data-mdb-tooltip-init
                              title="Remove item"
                              style={{ width: "80px", height: "50px", backgroundColor:"#00246B",color:"white" }}
                              onClick={() => handleDelete(item?._id)}
                              //  class="fs-1"
                            >
                              <MdDelete className="mb-5" />
                            </button>
                            <button
                              type="button"
                              data-mdb-button-init
                              data-mdb-ripple-init
                              class="btn btn-danger btn-sm  fs-1"
                              data-mdb-tooltip-init
                              title="Move to the wish list"
                              style={{ width: "80px", height: "50px" }}
                              onClick={() => {
                                let body={
                                  userId:item?.user_id,
                                  cartId:item?._id,
                                  productId:item?.product_Info[0]._id
                                }
                               
                                handleAddList(body)
                              }}
                              // class="fs-1 btn-danger"
                            >
                              {show && show ? (
                                <CiHeart className="mb-5" />
                              ) : (
                                <FaHeart className="mb-5" />
                              )}
                              {/* <FaHeart className="mb-5"/> */}
                              {/* <CiHeart className="mb-5" /> */}
                            </button>
                            {/* <!-- Data --> */}
                          </div>

                          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                            {/* <!-- Quantity --> */}
                            <div
                              className="d-flex mb-4"
                              style={{ maxWidth: "300px" }}
                            >
                              <button
                                data-mdb-button-init
                                data-mdb-ripple-init
                                className="btn  px-3 me-2"
                                onClick={() => {
                                  let body = {
                                    itemId: item?._id,
                                    quantity: item?.quantity,
                                    key: 2,
                                  };
                                  handleMinus(body);
                                }}
                                style={{backgroundColor:"#00246B",color:"white"}}
                                // onClick={() => dispatch(decrement(item?._id))}
                              >
                                <FaMinus />
                              </button>

                              <div data-mdb-input-init className="form-outline mt-3" >
                                <input
                                  id="form1"
                                  min="0"
                                  name="quantity"
                                  value={item?.quantity}
                                  max={item?.product_Info[0].stock}
                                  type="text"
                                  className="form-control"
                                  style={{backgroundColor:"#CADCFC" , color:"#00246B",borderColor:"#00246B"}}
                                  // onChange={() => setQuantity(quantity + 1)}
                                />
                                <label className="form-label" for="form1">
                                  Quantity
                                </label>
                              </div>

                              <button
                                data-mdb-button-init
                                data-mdb-ripple-init
                                className="btn  px-3 ms-2"
                                onClick={() => {
                                  // quantity ==item?.product_Info[0].stock ?
                                  // alert("no more stock"):
                                  // setQuantity(quantity+1)
                                  let body = {
                                    itemId: item?._id,
                                    quantity: item?.quantity,
                                    key: 1,
                                    price: item?.basePrice,
                                    stock: item?.product_Info[0]?.stock,
                                  };
                                  handleAdd(body);
                                }}
                                style={
                                  {backgroundColor:"#00246B",color:"white"}
                                }
                              >
                                <FaPlus />
                              </button>
                            </div>
                            {/* <!-- Quantity --> */}

                            {/* <!-- Price --> */}
                            <p className="text-start text-md-center">
                              <strong>{item?.basePrice}</strong>
                              <br />
                              <p>Subtotal:{item?.quantity * item?.basePrice}</p>
                            </p>
                            {/* <!-- Price --> */}
                          </div>
                        </div>
                        {/* <!-- Single item --> */}

                        <hr className="my-4" />
                      </>
                    ))}

                  {/* <!-- Single item --> */}
                  {/* <div className="row">
                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                     
                      <div
                        className="bg-image hover-overlay hover-zoom ripple rounded"
                        data-mdb-ripple-color="light"
                      >
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/13a.webp"
                          className="w-100"
                        />
                        <a href="#!">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.2)",
                            }}
                          ></div>
                        </a>
                      </div>
                      
                    </div>

                    <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                      
                      <p>
                        <strong>Red hoodie</strong>
                      </p>
                      <p>Color: red</p>
                      <p>Size: M</p>

                      <button
                        type="button"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-primary btn-sm me-1 mb-2"
                        data-mdb-tooltip-init
                        title="Remove item"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                      <button
                        type="button"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-danger btn-sm mb-2"
                        data-mdb-tooltip-init
                        title="Move to the wish list"
                      >
                        <i className="fas fa-heart"></i>
                      </button>
                    
                    </div>

                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                     
                      <div
                        className="d-flex mb-4"
                        style={{ maxWidth: "300px" }}
                      >
                        <button
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-primary px-3 me-2"
                          onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                        >
                          <i className="fas fa-minus"></i>
                        </button>

                        <div data-mdb-input-init className="form-outline">
                          <input
                            id="form1"
                            min="0"
                            name="quantity"
                            value="1"
                            type="number"
                            className="form-control"
                          />
                          <label className="form-label" for="form1">
                            Quantity
                          </label>
                        </div>

                        <button
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-primary px-3 ms-2"
                          onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                   

                     
                      <p className="text-start text-md-center">
                        <strong>$17.99</strong>
                      </p>
                   
                    </div>
                  </div> */}
                </div>
              </div>
              {/* <div className="card mb-4">
                <div className="card-body">
                  <p>
                    <strong>Expected shipping delivery</strong>
                  </p>
                  <p className="mb-0">12.10.2020 - 14.10.2020</p>
                </div>
              </div> */}
            </div>
            <div className="col-md-4" >
              <div >
                <div class="card mb-4" style={{backgroundColor:"#CADCFC"}}>
                  <div class="card-header py-3"  style={{backgroundColor:"#00246B" , color:"white"}}>
                    <h5 class="mb-0">Summary</h5>
                  </div>
                  <div class="card-body" >
                    <ul class="list-group list-group-flush" >
                      <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"style={{backgroundColor:"#CADCFC"}}>
                        Total Quantitiy
                        <span>{totalQuantity}</span>
                      </li>

                      <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3"style={{backgroundColor:"#CADCFC"}}>
                       
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                        <br/>
                          <strong> <FaRupeeSign/>{total}</strong>
                        </span>
                      </li>
                    </ul>

                    <button
                      type="button"
                      data-mdb-button-init
                      data-mdb-ripple-init
                      class="btn  btn-lg btn-block"
                      onClick={()=>handleClick(userId)}
                      style={
                        {backgroundColor:"#00246B",color:"white"}
                      }
                    >
                      Go to checkout
                    </button>
                  </div>
                </div>
              </div>
              {/* // Card Detailssssssss Payment */}
              {/* <div class="card bg-primary text-white rounded-3">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <h5 class="mb-0">Card details</h5>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                      class="img-fluid rounded-3"
                      style={{ width: "45px;" }}
                      alt="Avatar"
                    />
                  </div>

                  <p class="small mb-2">Card type</p>
                  <a href="#!" type="submit" class="text-white  fs-1 me-3">
                    <FaCcMastercard />
                  </a>
                  <a href="#!" type="submit" class="text-white fs-1 me-3">
                    <FaCcVisa />
                  </a>
                  <a href="#!" type="submit" class="text-white fs-1 me-3">
                    <FaCcAmex />
                  </a>
                  <a href="#!" type="submit" class="text-white fs-1 me-3">
                    <FaCcPaypal />
                  </a>

                  <form class="mt-5 ms-0" style={{ width: "320px" }}>
                    <div
                      data-mdb-input-init
                      class="form-outline form-white mb-4"
                    >
                      <input
                        type="text"
                        id="typeName"
                        class="form-control form-control-lg"
                        siez="17"
                        placeholder="Cardholder's Name"
                      />
                      <label class="form-label" for="typeName">
                        Cardholder's Name
                      </label>
                    </div>

                    <div
                      data-mdb-input-init
                      class="form-outline form-white mb-4"
                    >
                      <input
                        type="text"
                        id="typeText"
                        class="form-control form-control-lg"
                        siez="17"
                        placeholder="1234 5678 9012 3457"
                        minlength="19"
                        maxlength="19"
                      />
                      <label class="form-label" for="typeText">
                        Card Number
                      </label>
                    </div>

                    <div class="row mb-4">
                      <div class="col-md-6">
                        <div
                          data-mdb-input-init
                          class="form-outline form-white"
                        >
                          <input
                            type="text"
                            id="typeExp"
                            class="form-control form-control-lg"
                            placeholder="MM/YYYY"
                            size="7"
                            minlength="7"
                            maxlength="7"
                          />
                          <label class="form-label" for="typeExp">
                            Expiration
                          </label>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div
                          data-mdb-input-init
                          class="form-outline form-white"
                        >
                          <input
                            type="password"
                            id="typeText"
                            class="form-control form-control-lg"
                            placeholder="&#9679;&#9679;&#9679;"
                            size="1"
                            minlength="3"
                            maxlength="3"
                          />
                          <label class="form-label" for="typeText">
                            Cvv
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>

                  <hr class="my-4" />

                  <div class="d-flex justify-content-between">
                    <p class="mb-2">Subtotal</p>
                    <p class="mb-2">$4798.00</p>
                  </div>

                  <div class="d-flex justify-content-between">
                    <p class="mb-2">Shipping</p>
                    <p class="mb-2">$20.00</p>
                  </div>

                  <div class="d-flex justify-content-between mb-4">
                    <p class="mb-2">Total(Incl. taxes)</p>
                    <p class="mb-2">$4818.00</p>
                  </div>

                  <button
                    type="button"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    class="btn btn-info btn-block btn-lg"
                  >
                    <div class="d-flex justify-content-between">
                      <span>$4818.00</span>
                      <span>
                        Checkout{" "}
                        <i class="fas fa-long-arrow-alt-right ms-2"></i>
                      </span>
                    </div>
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddToCart;
