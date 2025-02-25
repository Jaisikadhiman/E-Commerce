const { customerCard, paymentIntents } = require("../CommonModule/Stripe");
const { User } = require("../Model/User");

const customerCardd = async (req, resp) => {
  const { tokenId, userId } = req.body;
  // const { id } = req.params;
  const customer = await User.findById(userId);
  const customerId = customer.customerId;
  console.log("userId :>> ", userId);
  console.log("tokenId :>> ", tokenId);
  console.log("customer :>> ", customer.customerId);
  // if(customer){
  //   return resp.status(200).json({
  //     data:customer,
  //     message:"user found"
  //   })
  // }
  const ans = await customerCard(tokenId, customerId);
  const cardId = ans.id;
  console.log("ans :>> ", ans);
  if (ans) {
    return resp.status(200).json({
      message: "successfully",
      cardId: cardId,
    });
  }
  // console.log("ans :>> ", ans);
};
const paymentIntent = async (req, resp) => {
  const { cardId, amount, userId } = req.body;
  const customer = await User.findById(userId);
  const customerId = customer.customerId;
  const ans = await paymentIntents(amount,cardId,customerId);
  console.log("ans :>> ", ans.data);
  if (ans) {
    return resp.status(200).json({
      message: "successfully",
      data: ans,
    });
  }
};
module.exports = { customerCardd , paymentIntent };
