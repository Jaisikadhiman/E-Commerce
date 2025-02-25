import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
export const CheckOutForm = (props) => {
  // console.log('props.total :>> ', props.total);
  const amount = props.total;
  const userId = useSelector((state) => state.userSlice.user.data.data._id);
  console.log("userId :>> ", userId);
  const stripe = useStripe();
  const elements = useElements();

  //   const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);
    const token = await stripe.createToken(card);
    if (token) {
      // hit backend token api
      console.log("token :>> ", token);
      // alert(`your token id is ${token?.token?.id}`);
      const tokenId = token?.token?.id;
      const ans = await axios.post(
        "http://localhost:8080/api/payment/addcard",
        { tokenId, userId }
      );
      console.log("ans :>> ", ans.data.cardId);
      const cardId = ans.data.cardId;
      const result = await axios.post(
        "http://localhost:8080/api/payment/paymentIntent",
        { amount, cardId, userId }
      );
      console.log('result :>> ', result);
      if(result.data.data.status === "succeeded"){
      
        Swal.fire({
          title: "Payment Done!",
          icon: "success",
          draggable: true
        });
        // alert("payment successfull")
      }
      console.log("result :>> ", result.data.data.status);

      // const ans = await axios.post()
    }

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    // const {error: submitError} = await elements.submit();
    // if (submitError) {
    //   // Show error to your customer
    //   setErrorMessage(submitError.message);
    //   return;
    // }

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
      {/* Show error message to your customers */}
      {/* {errorMessage && <div>{errorMessage}</div>} */}
    </form>
  );
};
