const express = require("express");
const { customerCardd, paymentIntent } = require("../Controller/PaymentApi");
const router = express.Router();
router.post("/addcard",customerCardd);
router.post("/paymentIntent",paymentIntent)
module.exports= router;
