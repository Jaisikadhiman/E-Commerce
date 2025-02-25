const mongoose = require("mongoose");
const CartSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    size: {
      type: String,
    },
    basePrice: {
      type: Number,
    },
    name: {
      type: String,
    },
    productImg: {
      type: String,
    },
    quantity:{
      type:Number,
      default:1
    }
  },
  {
    timestamps: true,
  }
);
const Cart = mongoose.model("Cart", CartSchema);
module.exports = { Cart };
