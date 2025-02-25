const { jwtDecode } = require("jwt-decode");
const { Reason } = require("../Model/Reason");

const ReasonAdd = async (req, resp) => {
  const { reason,token } = req.body;
  console.log(reason)
  const decode = jwtDecode(token);
  const id = decode.data._id;
  console.log(id)
  const data = await Reason.create({
    adminId:id,reason,
  });

  await data.save();
  if (data) {
    return resp.status(200).json({
      message: "successfully reason added",
      success: true,
      status: 200,
    });
  }
};
const GetAll=async(req,resp)=>{
const data= await Reason.find();
console.log(data)
if(data){
  return resp.status(200).json({
    message: "successfully reason added",
    success: true,
    status: 200,
    data:data
  });
}
}
module.exports={
    ReasonAdd,GetAll
}
