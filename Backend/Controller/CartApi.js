const mongoose = require("mongoose");
const { Cart } = require("../Model/Cart");
// const { pipeline } = require("nodemailer/lib/xoauth2");
const addToCart = async (req, resp) => {
  const { product_id, size, basePrice, name, productImg } = req.body;
  console.log("object", product_id, size, basePrice, name, productImg);
  console.log("req.body  ", req.body);
  const { id } = req.params;
  const ans = await Cart.create({
    user_id: id,
    product_id: product_id,
    size: size,
    basePrice: basePrice,
    name: name,
    productImg: productImg,
  });
  ans.save();
  if (ans) {
    return resp.status(200).json({
      message: "successfully added to cart",
      data: ans,
    });
  } else {
    return resp.status(400).json({
      message: "Items not added to cart",
      success: false,
    });
  }
};
const getCartItem = async (req, resp) => {
  // const  {id}  = req.params;
  const { id } = req.params;
  const idd = new mongoose.Types.ObjectId(id);
  console.log("id :>> ", idd);
  const item = await Cart.aggregate([
    {
      $sort: {
        _id: -1,
      },
    },
    {
      $match: {
        product_id: idd,
      },
    },
  ]);
  console.log("item :>> ", item);
  if (item.length > 0) {
    return resp.status(200).json({
      message: "Item found",
      data: item,
      success: true,
      status: 200,
    });
  } else {
    return resp.json({
      message: "Items not found",
      success: false,
      status: 400,
    });
  }
};

const getItems = async (req, resp) => {
  const data = await Cart.aggregate([
    {
      $sort: { _id: -1 },
    },
    { $match: { user_id: new mongoose.Types.ObjectId(req.user.data._id) } },
    // { $project: { product_id: 1, _id: 0 } },
    // {
    //   $lookup: {
    //     from: "users",
    //     let: { user_id: "$user_id" },
    //     pipeline: [
    //       {
    //         $match: {
    //           $expr: {
    //             $eq: ["$_id", "$$user_id"],
    //           },
    //         },
    //       },
    //     ],
    //     as: "user_Info",
    //   },
    // },
    {
      $lookup: {
        from: "products",
        // let: { product_id: { $map: { input:"$product_id", as: "prodIds", in: "$$prodIds" } }},
        let: { product_id: "$product_id" },

        pipeline: [
          {
            $match: {
              $expr: {
                // $in: ["$_id", "$$product_id"],
                $eq: ["$_id", "$$product_id"],
              },
            },
          },
        ],
        as: "product_Info",
      },
    },
  ]);
  if (data) {
    return resp.status(200).json({
      message: "Get cart Items",
      data: data,
    });
  } else {
    return resp.status(400).json({
      message: "items not found",
      data: data,
    });
  }
};

// const getCartItems = async (req, resp) => {
//   const data = await Cart.aggregate([
//     {
//       $sort: { _id: -1 },
//     },
//     {
//       $lookup: {
//         from: "users",
//         let: { user_id: "$user_id" },
//         pipeline: [
//           {
//             $match: {
//               $expr: {
//                 $eq: ["$_id", "$$user_id"],
//               },
//             },
//           },
//         ],
//         as: "user_Info",
//       },
//     },
//     {
//       $lookup: {
//         from: "products",
//         // let: { product_id: { $map: { input:"$product_id", as: "prodIds", in: "$$prodIds" } }},
//         let: { product_id: "$product_id" },

//         pipeline: [
//           {
//             $match: {
//               $expr: {
//                 // $in: ["$_id", "$$product_id"],
//                 $eq: ["$_id", "$$product_id"],
//               },
//             },
//           },
//         ],
//         as: "product_Info",
//       },
//     },
//   ]);
//   if (data) {
//     return resp.status(200).json({
//       message: "Get cart Items",
//       data: data,
//     });
//   } else {
//     return resp.status(400).json({
//       message: "items not found",
//       data: data,
//     });
//   }
// };
const update = async (req, resp) => {
  const { id } = req.params;
  const data = req.body;
  console.log("data :>> ", data);
  const res = await Cart.findByIdAndUpdate(
    id,
    {
      quantity: data.quantity,
      subtotal: data.subtotal,
    },
    { upsert: true },
    { new: true, runValidators: true }
  );
  console.log("id :>> ", id);
  console.log("res :>> ", res);
  if (res) {
    return resp.status(200).json({
      message: " Items updated",
      data: res,
    });
  } else {
    return resp.status(400).json({
      message: "items not updated",
      data: data,
    });
  }
};
const cartDelete = async (req, resp) => {
  const { id } = req.params;
  const data = await Cart.findByIdAndDelete(id);
  if (data) {
    return resp.status(200).json({
      message: " Items deleted",
      data: data,
      suceese: true,
    });
  } else {
    return resp.status(400).json({
      message: "items not deleted",
      suceese: false,
    });
  }
};
module.exports = {
  addToCart,
  getItems,
  getCartItem,
  update,
  cartDelete,
};
