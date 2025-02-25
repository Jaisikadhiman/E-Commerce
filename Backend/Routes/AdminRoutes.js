const express = require("express");
const { ReasonAdd, GetAll } = require("../Controller/Adminapi");
const router = express.Router();
router.post("/addreason",ReasonAdd );
router.get("/getAll",GetAll)
module.exports = router;
