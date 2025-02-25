const { User } = require("../Model/User");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { createCustomer, customerCard } = require("../CommonModule/Stripe");
// const SECRET_KEY = "45uhdfg765dcfvj";
const Register = async (req, resp) => {
  try {
    const { name, email, address, password, gender, role, phone } = req.body;

    const salt = await bcrypt.genSalt(3);
    const pass = await bcrypt.hash(password, 3);

    const customerId = await createCustomer(name, email);
    const custId = customerId.id;
    console.log("custId :>> ", customerId);

    const data = await User.create({
      name,
      email,
      address,
      password: pass,
      gender,
      role,
      phone,
      customerId: custId,
    });
    data.save();
    resp.status(200).json({
      message: "successfully registered",
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const Login = async (req, resp) => {
  // const email = req.query.email || "";
  // const password = req.query.password || "";

  const { email, password } = req.body;
  const data = await User.findOne({ email: email });
  //  console.log("data.email"+" "+req.body.email);
  //  console.log("email"+" "+email)
  if (data?.email === email) {
    const match = await bcrypt.compare(password, data?.password);
    if (match) {
      const token = jwt.sign({ data }, process.env.SECRET_KEY);
      resp.status(200).json({
        status: 200,
        success: true,
        message: "login successfully",
        data: {
          data: data,
          token: token,
        },
      });
    } else {
      resp.status(400).json({
        status: 400,
        message: "password not match",
        data: data,
      });
    }
  } else {
    resp.status(400).json({
      status: 400,
      message: "email not found",
      data: data,
    });
  }
};

const Forgot = async (req, resp) => {
  const dataa = req.body;
  console.log("phone :>> ", dataa.phone);
  console.log("email :>> ", dataa.email);

  // const token = jwt.sign({ data }, SECRET_KEY);

  const otp = Math.floor(1000 + Math.random() * 9000);
  console.log("otp :>> ", otp);
  const otphash = await bcrypt.hash(otp.toString(), 10);
  const otpexpire = Date.now() + 10 * 60 * 1000;

  if (dataa.phone) {
    console.log("heeeeeeeeeeeeeeeeee");
    console.log("dataa.phone :>> ", dataa.phone);
    const data = await User.findOne({ phone: "+" + dataa.phone });
    console.log("data :>> ", data);
    if (data == null) {
      return resp.status(400).json({
        success: false,
        message: "phone number does not exist",
      });
    }
    await User.findByIdAndUpdate(data._id, {
      otpHash: otphash,
      otpExpire: otpexpire,
    });
    const client = require("twilio")(
      process.env.ACCOUNTSID,
      process.env.AUTHTOKEN
    );

    client.messages
      .create({
        body: `Hello this otp  ${otp} from twilio trial`,
        from: process.env.TWILIONO,
        to: `${"+" + dataa.phone}`,
      })
      .then((message) => console.log("message.sid"));
  } else if (dataa.email) {
    const data = await User.findOne({ email: dataa.email });
    if (!data) {
      return resp.status(400).json({
        success: false,
        message: "email does not exist",
      });
    }
    await User.findByIdAndUpdate(data._id, {
      otpHash: otphash,
      otpExpire: otpexpire,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true, // true for port 465, false for other ports
      auth: {
        user: "jaisikadhiman446@gmail.com",
        pass: "oipp blzw pezy iakn",
      },
    });
    const info = await transporter.sendMail({
      from: "jaisikadhiman446@gmail.com", // sender address
      to: dataa.email, // list of receivers
      subject: "Reset Password", // Subject line
      text: `Your Reset Password Otp is ${otp}`, // plain text body
    });
  }
  return resp.status(200).json({
    success: true,
    message: "successfully",
    // data: data,
    // token: token,
  });
};
const Verify = async (req, resp) => {
  const { otp } = req.body;
  const { id } = req.params;
  console.log("otp :>> ", otp);
  console.log(id);
  const user = await User.findById(id);
  if (!user) {
    return resp.status(400).json({
      success: false,
      message: "user not found",
    });
  }
  if (Date.now() > user?.otpExpire) {
    return resp.status(400).json({
      success: false,
      message: "Otp Expired",
    });
  }
  console.log(user);
  console.log(typeof otp);
  console.log(user.otpHash);
  const isMatch = await bcrypt.compare(otp, user.otpHash);
  if (!isMatch) {
    return resp.status(400).json({
      success: false,
      message: "Invalid Otp",
    });
  } else {
    return resp.status(200).json({
      success: true,
      message: "Otp Verified",
    });
  }
};
const Resetpass = async (req, resp) => {
  const { password } = req.body;
  const { id } = req.params;
  const hashPassword = await bcrypt.hash(password, 10);
  const data = await User.findByIdAndUpdate(id, { password: hashPassword });
  console.log(data);
  if (data) {
    return resp.status(200).json({
      data: data,
      success: true,
      message: "password reset successfully",
    });
  } else {
    return resp.status(400).json({
      data: data,
      success: false,
      message: "password not reset",
    });
  }
};
// const GetAll = async (req, resp) => {
//   const page = req.query.page * 1 || 1;
//   const limit = req.query.limit * 1 || 1;
//   const skip = (page - 1) * limit;
//   // if (skip >= count) {
//   //   return resp.json({
//   //     message: "page not exist",
//   //   });
//   // }
//   // else {
//     const data = await User.find().skip(skip).limit(limit);
//     const totalCount = await User.find().countDocuments();
//     console.log(totalCount)
//     const totalPage= Math.ceil(totalCount/limit)
//     if (!data) {
//       return resp.status(400).json({
//         data: data,
//         success: false,
//         message: "data not found",
//       });
//     } else {
//       return resp.status(200).json({
//         data: data,
//         success: true,
//         message: "successfully",
//         pageCount:totalPage
//       });
//     }

// };

const GetAll = async (req, resp) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 1;
  const skip = (page - 1) * limit;
  const viewAllUsers = await User.aggregate([
    {
      $sort: {
        _id: -1,
      },
    },
    {
      $facet: {
        data: [{ $skip: skip }, { $limit: limit }],
        count: [{ $count: "count" }],
      },
    },
  ]);
  console.log("viewAllUsers   ", viewAllUsers[0]);
  if (!viewAllUsers) {
    return resp.status(400).json({
      data: data,
      success: false,
      message: "users not found",
    });
  } else {
    return resp.status(200).json({
      data: viewAllUsers[0].data,
      success: true,
      message: "successfully",
      // pageCount: viewAllUsers[0].count[0].count,
      pageCount: Math.ceil(viewAllUsers[0].count[0].count / limit),
    });
  }
};

const GetOne = async (req, resp) => {
  const { id } = req.params;
  const data = await User.findById(id);
  if (!data) {
    return resp.status(400).json({
      data: data,
      success: false,
      message: "User Does not Exist",
    });
  } else {
    return resp.status(200).json({
      data: data,
      success: true,
      message: "successfully",
    });
  }
};

const ChangePassword = async (req, resp) => {
  const { id } = req.params;
  const { newPass, oldPass } = req.body;
  const user = await User.findById(id);
  if (!user) {
    return resp.status(400).json({
      success: false,
      message: "user not exist",
    });
  }
  const password = user?.password;
  const newhashPass = await bcrypt.hash(newPass, 3);
  // const newhashPass = await bcrypt.hash(newPass.toString(), 3);

  const match = await bcrypt.compare(oldPass, password);
  if (!match) {
    return resp.status(400).json({
      success: false,
      message: "old password not match",
    });
  }
  console.log(newhashPass);
  const update = await User.findByIdAndUpdate(id, {
    password: newhashPass,
  });
  if (update) {
    return resp.status(200).json({
      success: true,
      message: "password change successfully",
    });
  } else {
    return resp.status(400).json({
      success: false,
      message: "password not change",
    });
  }
};

const Update = async (req, resp) => {
  const { id } = req.params;
  console.log(id);
  console.log(req.body);
  const data = await User.findByIdAndUpdate(id, req.body);
  if (!data) {
    return resp.status(400).json({
      data: data,
      success: false,
      message: "Not Updated",
    });
  } else {
    return resp.status(200).json({
      data: data,
      success: true,
      message: " Update successfully",
    });
  }
};
const SoftDelete = async (req, resp) => {
  const { id } = req.params;
  var data = await User.updateOne(
    {
      _id: id,
    },
    { deletedAt: Date.now() }
  );
  resp.status(200).json({
    data: data,
  });
};
const DeleteAccount = async (req, resp) => {
  const { id } = req.params;
  const { reasonId } = req.body;
  console.log(reasonId);
  const status = "deleted";
  const user = await User.findByIdAndUpdate(id, { status, reasonId });
  if (user) {
    return resp.status(200).json({
      status: 200,
      data: user,
      success: true,
      message: " Update successfully",
    });
  } else {
    return resp.status(400).json({
      status: 400,
      success: false,
      message: "Not Updated",
    });
  }
};

module.exports = {
  Register,
  Login,
  Forgot,
  Verify,
  Resetpass,
  GetAll,
  GetOne,
  ChangePassword,
  Update,
  SoftDelete,
  DeleteAccount,
};
// $2b$10$kY.Zj6DSK0OXh0aQ1nRjeu0oqaO4W8FZZ9hOrbRmZxYfC6khpJrLm
// sk_test_51QXju6Bca28f02Jwvk5qfgQPHrZjzh2yz4q8ebgRGLE97IO0z28ltPXwZTIdm1uIPHSCLWZv8EwbN4kGOoit46Ea00kQkqgC3i
