// const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {User} = require("../Model/User");
const dbConnection = require("../Connection/dbConnection");
module.exports= seedAdmin=async()=> {
  dbConnection();
  const existingAdmin = await User.findOne({ isAdmin: true });
  if (!existingAdmin) {
    // Create admin credentials
    const adminCredentials = {
      name: "Admin User",
      password: "admin@Pass123",
      isAdmin: true,
      gender:"Male",
      address:"xyz",
      email:"admin123@gmail.com"
    };
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminCredentials.password, salt);
    adminCredentials.password = hashedPassword;
    await User.create(adminCredentials);
    console.log("Admin user created successfully");
  }else {
    console.log("Admin user already exists");
  }
}
