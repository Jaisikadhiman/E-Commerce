const { pipeline } = require("nodemailer/lib/xoauth2");
const { Address } = require("../Model/Address");
const { default: mongoose } = require("mongoose");

const addAddress = async (req, resp) => {
  const id = req.user.data._id;
  console.log(id);
  const { name, contactNo, landmark, colony, houseNo, city, pincode, state } =
    req.body;
  if (
    !name ||
    !contactNo ||
    !landmark ||
    !colony ||
    !houseNo ||
    !city ||
    !pincode ||
    !state
  ) {
    return resp.status(400).json({
      message: "please enter all details",
    });
  }
  const data = await Address.create({
    name,
    contactNo,
    landmark,
    colony,
    houseNo,
    city,
    pincode,
    state,
    userId: id,
  });
  await data.save();
  if (data) {
    return resp.status(200).json({
      message: "address successfully added",
      success: true,
      data: data,
    });
  } else {
    return resp.status(400).json({
      message: "address not added",
      success: false,
    });
  }
};
const getAddress = async (req, resp) => {
  const id =new mongoose.Types.ObjectId(req.user.data._id)
  console.log('id   :>> ', id  );
  const addresses = await Address.aggregate([
    {
      $sort: {
        _id: -1,
      },
    },
    {
      $match: {
        // $eq: ["$userId", "$$_id"]

        userId: id
      },
    },
  ]);
//   if (addresses) {
//     return resp.status(200).json({
//       message: "address successfully find",
//       success: true,
//       data: addresses,
//     });
//   } else {
//     return resp.status(400).json({
//       message: "address not found",
//       success: false,
//     });
//   }
if (addresses.length > 0) {
    return resp.status(200).json({
      message: "Address successfully found",
      success: true,
      data: addresses,
    });
  } else {
    return resp.status(400).json({
      message: "Address not found",
      success: false,
    });
  }
};
module.exports = {
  addAddress,
  getAddress,
};
