import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckOutForm } from '../CheckOutForm';
const stripeKey = loadStripe('pk_test_51QXju6Bca28f02JwaVotnGcAKQWRDoUMzPJhuBZXuSYam1x77VuyGMf55ePWpxB5jkYLFQaJSl5xDexB26XKGwBn00PtHo671E');
export const Element = (props) => (
    <Elements stripe={stripeKey} >
      <CheckOutForm total={props.payment}/>
    </Elements>
  );