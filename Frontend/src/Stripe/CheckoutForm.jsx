import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

export const CheckoutForm = ({ price }) => {
  const [status,setStatus]=useState(false)
  console.log("price :>> ", price);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // to get card elements
    const card = elements.getElement(CardElement);
    // to create token
    const token = await stripe.createToken(card);

    if (card == "save") {
      if (token) {
        // perform other action
        console.log("token?.id :>> ", token?.token?.id);
        alert(` Card added token is :  ${token?.token?.id}`);
      }
    } else {
      // perform direct payment action
    }
  };

  
  return (
    <div>
      <label htmlFor="">do you want to save card?</label><br />
      <input type="checkbox" name="card" onClick={()=>setStatus(true)} checked={status}/>
      <label htmlFor="" className="mx-2">Yes</label>
      <input type="checkbox"  className="mx-2" name="card" onClick={()=>setStatus(false)} checked={!status}/>
      <label htmlFor="">No</label>
      <br /><br />
      <hr />
      <CardElement />
      <div>
        <button
          type="button"
          disabled={!stripe || !elements}
          className="float-end mt-4"
          onClick={() => handleSubmit()}
        >
          {
            status?
            "Add"
            :
            "Pay"
          }
          
        </button>
      </div>
      <div>
      </div>
    </div>
  );
};
