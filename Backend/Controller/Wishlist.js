const { Wishlist } = require("../Model/Wishlist");

const addWishlist = async (req, resp) => {
  const { userId, productId ,status} = req.body;
  const data = await Wishlist.create({
    // cartId: cartId,
    userId: userId,
    productId: productId,
    status: status,
  });
  data.save();
  if (data) {
    resp.status(200).json({
      suceess: true,
      message: "item added to wishlist",
      data: data,
    });
  } else {
    resp.status(400).json({
      suceess: false,
      message: "item not added to wishlist",
    });
  }
};
const getItem = async (req, resp) => {
  const data = await Wishlist.aggregate([
    {
      $sort: {
        _id: -1,
      },
    },
    // {
    //   $lookup: {
    //     from: "users",
    //     let: { user_id: "$userId" },
    //     pipeline: [
    //       {
    //         $match: {
    //           $expr: {
    //             $eq: ["$_id", "$$user_id"],
    //           },
    //         },
    //       },
    //     ],
    //     as: "userData",
    //   },
    // },
    {
      $lookup: {
        from: "products",
        let: { product_id: "$productId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$product_id"],
              },
            },
          },
        ],
        as: "productData",
      },
    },
    {
      $unwind: {
        path: "$productData",
      },
    },
  ]);
  if (data) {
    resp.status(200).json({
      suceess: true,
      message: "item found",
      data: data,
    });
  } else {
    resp.status(400).json({
      suceess: false,
      message: "item not found",
    });
  }
};
const deleteItem = async (req, resp) => {
  const { id } = req.params;
  console.log("id :>> ", id);
  const res = await Wishlist.findByIdAndDelete(id);
  console.log("res :>> ", res);
  if (res) {
    resp.status(200).json({
      suceess: true,
      message: "item deleted",
      data: res,
    });
  } else {
    resp.status(400).json({
      suceess: false,
      message: "item not deleted",
    });
  }
};
module.exports = {
  addWishlist,
  getItem,
  deleteItem,
};
