const express= require("express");
const { Register, Login, Forgot, Reset, Verify, Resetpass, GetAll, GetOne, ChangePassword, Update, SoftDelete, DeleteAccount, customerCardd } = require("../Controller/userapi");
const { authentication } = require("../Middleware/Auth");
const router = express.Router();
router.post("/register",Register);
router.post("/login", Login);
router.post("/forgot",Forgot);
router.post("/verify/:id",Verify);
router.post("/resetpass/:id",Resetpass);
router.get("/getall/",GetAll);
router.get("/getone/:id",GetOne);
router.post("/changePass/:id",ChangePassword)
router.post("/update/:id",Update)
router.post("/softdelete/:id",SoftDelete)
router.post("/deleteAccount/:id",DeleteAccount)
module.exports= router;