const express = require("express");
const { addWishlist, getItem, deleteItem } = require("../Controller/Wishlist");
const router = express.Router();
router.post("/addWishlist", addWishlist);
router.get("/getItem", getItem);
router.post("/deleteItem/:id", deleteItem);
module.exports=router;

