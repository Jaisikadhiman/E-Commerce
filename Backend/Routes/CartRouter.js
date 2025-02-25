const express = require("express");
const { addToCart, getItems, getCartItem, update, cartDelete,  } = require("../Controller/CartApi");
const { authentication } = require("../Middleware/Auth");
const router= express.Router();
router.post("/addCart/:id",addToCart);
router.get("/getItems",authentication,getItems);
router.get("/getCartItem/:id",getCartItem);
router.post("/update/:id",update);
router.post("/deleteCart/:id",cartDelete);

module.exports = router;