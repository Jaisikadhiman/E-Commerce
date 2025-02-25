const express = require("express");
const{ addAddress, getAddress }= require("../Controller/AddressApi");
const { authentication } = require("../Middleware/Auth");
const router = express.Router();
router.post("/addAddress", authentication, addAddress)
router.get("/getAddresses", authentication,getAddress)
module.exports = router;