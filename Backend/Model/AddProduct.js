const mongoose = require("mongoose");
const AddProductSchema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    size:[ {
      type: String,
      // enum: ["XS", "S", "M","XL","XXL"],
      required: true,
    }],
    gender: {
      type: String,
      enum: ["Men", "Women", "Unisex"],
      required: true,
    },
    basePrice: {
      required: true,
      type: Number,
    },
    stock: {
      required: true,
      type: Number,
    },
    discountType: {
      required: true,
      type: String,
    },
    discount: {
      required: true,
      type: Number,
    },
    productImg: {
      required: true,
      type: String,
    },
    category: {
      required: true,
      type: String,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
 
);
const Product = mongoose.model("Product", AddProductSchema);
module.exports = { Product };
