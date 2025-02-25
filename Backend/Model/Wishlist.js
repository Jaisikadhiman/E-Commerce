const mongoose = require("mongoose");
const wishlistSchema = mongoose.Schema(
  {
    // cartId: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  },
  {
    timestamps: true,
  }
);
const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports = { Wishlist };
