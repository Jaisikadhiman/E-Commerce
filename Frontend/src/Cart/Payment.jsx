import React from "react";
import { FaCcMastercard } from "react-icons/fa6";
import { FaCcVisa } from "react-icons/fa6";
import { FaCcAmex } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa";
import { Element } from "./Stripe/Element";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const Payment = () => {
  const ll = useLocation()

  // const rt = new URLSearchParams(ll.search).get("id")
  console.log('ll :>> ', ll);
  // const token = useSelector((state) => state?.userSlice?.loginUser?.token);
  const amount= useSelector((state)=>state.cartSlice.amount);
  console.log('amount :>> ', amount);
  const shipping= 20;
  return (
    <>
      <div
        class="card bg-primary text-white rounded-3"
        style={{ width: "800px", marginLeft: "250px" }}
      >
        <div class="card-body">
          {/* <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="mb-0">Card details</h5>
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
              class="img-fluid rounded-3"
              style={{ width: "45px;" }}
              alt="Avatar"
            />
          </div> */}

          {/* <p class="small mb-2">Card type</p>
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
          </a> */}

          {/* <form class="mt-5 ms-0" style={{ width: "320px" }}>
            <div data-mdb-input-init class="form-outline form-white mb-4">
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

            <div data-mdb-input-init class="form-outline form-white mb-4">
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
                <div data-mdb-input-init class="form-outline form-white">
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
                <div data-mdb-input-init class="form-outline form-white">
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
          </form> */}

          <hr class="my-4" />

          <div class="d-flex justify-content-between">
            <p class="mb-2">Subtotal</p>
            <p class="mb-2">${amount}.00</p>
          </div>

          <div class="d-flex justify-content-between">
            <p class="mb-2">Shipping</p>
            <p class="mb-2">${shipping}.00</p>
          </div>

          <div class="d-flex justify-content-between mb-4">
            <p class="mb-2">Total(Incl. taxes)</p>
            <p class="mb-2">${amount+shipping}.00</p>
          </div>
          <Element payment={amount+shipping} />
          {/* <button
            type="button"
            data-mdb-button-init
            data-mdb-ripple-init
            class="btn btn-info btn-block btn-lg"
          >
            <div class="d-flex justify-content-between">
              <span>${amount}</span>
              <span>
                Pay <i class="fas fa-long-arrow-alt-right ms-2"></i>
              </span>
            </div>
          </button> */}
        </div>
      </div>
    </>
  );
};

export default Payment;
