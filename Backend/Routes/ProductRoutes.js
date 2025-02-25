const express = require("express");
const { addProduct, upload, getAll } = require("../Controller/ProductApi");
const router = express.Router();
router.post("/addProduct/:id",upload.single("productImg"), addProduct);
router.get("/getall/",getAll);
module.exports = router;
