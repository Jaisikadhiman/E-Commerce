const mongoose = require("mongoose");
const AddressSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: {
    type: String,
    required: true,
  },
  contactNo: {
    type: Number,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  colony: {
    type: String,
    required: true,
  },
  houseNo: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const Address = mongoose.model("Address", AddressSchema);
module.exports = {
  Address,
};
