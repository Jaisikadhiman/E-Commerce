const jwt = require("jsonwebtoken");
const authentication = async (req, resp, next) => {
  const tokenHeader = req.headers.authorization;
  if (tokenHeader) {
      const verify = jwt.verify(tokenHeader, process.env.SECRET_KEY);
      if (verify) {
        req.user = verify;
        console.log("objectsdfguiouytryuiouj    ",req.user)
        next();
      } else {
        resp.status(400).json({
          success: false,
          message: "you are not authenticate user",
        });
      }
    } 
   else {
    resp.status(400).json({
      success: false,
      message: "please provide authentication token",
    });
  }
};
module.exports = {
  authentication,
};
