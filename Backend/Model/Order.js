const mongoose = require("mongoose");
const OrderSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    totalAmount: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["credit card", "paypal", "cash on Delivery", "Bank Transfer"],
    },
    addressId: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
    status: {
      type: String,
      required: true,
      enum: ["pending", "processing", "shipped", "delivered", "cancel"],
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    deliverDate: {
      type: Date,
    },
  },
  {
    timeStamps: true,
  }
);
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
