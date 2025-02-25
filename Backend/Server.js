const express = require("express");
const cors = require("cors");
const dbConnection = require("./Connection/dbConnection.js");
const app = express();
require("dotenv").config();
const userRoute = require("./Routes/UserRoute.js");
const adminRoute = require("./Routes/AdminRoutes.js");
const seedAdmin = require("./Seeders/admin_seeder.js");
const productRoute = require("./Routes/ProductRoutes.js");
const addCartRoute = require("./Routes/CartRouter.js");
const addAddressRoute = require("./Routes/AddressRoutes.js");
const wishListRoute= require("./Routes/WishlistRoutes.js");
const paymentRoute = require("./Routes/PaymentRoutes.js")
const { default: mongoose } = require("mongoose");
const path = require("path");
mongoose.set("debug", true);
var corsOptions = {
  origin: "*",
};

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", addCartRoute);
app.use("/api/address", addAddressRoute);
app.use("/api/wishlist", wishListRoute);
app.use("/api/payment", paymentRoute);
dbConnection();
seedAdmin()
  .then(() => {
    console.log("Admin seeding completed");
    // process.exit(0);
  })
  .catch((err) => {
    console.error("Error seeding admin:", err);
    // process.exit(1);
  });
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
