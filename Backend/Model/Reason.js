const mongoose = require("mongoose");
const ReasonSchema = mongoose.Schema(
  {
    adminId:{
      required: true,
      type: String,
    },
    reason: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Reason = mongoose.model("Reason", ReasonSchema);
module.exports = { Reason };
