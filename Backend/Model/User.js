const mongoose = require("mongoose");
const { Admin, Customer, Company } = require("../constant");
const UserSchema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    address: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    gender: {
      required: true,
      type: String,
      enum: ["Male", "Female"],
    },
    role: {
      required: true,
      type: Number,
      enum: [Admin, Customer, Company],
    },
    token: {
      // required: true,
      type: String,
    },
    otpHash: {
      // required: true,
      type: String,
    },
    otpExpire: {
      // required: true,
      type: String,
    },
    isAdmin: {
      type: Boolean,
    },
    status: {
      type: [String],
      enum: ["active", "inactive", "deleted"],
      default: "active",
    },
    reason: {
      type: String,
    },
    deletedAt: {
      type: Date,
      default: null, // Null indicates the record is not deleted
    },
    phone: {
      type: String,
    },
    reasonId: {
      type: String,
      unique: true,
    },
    customerId:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", UserSchema);
module.exports = { User };
