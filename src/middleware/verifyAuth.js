const jwt = require("jsonwebtoken");
const Student = require("../models/studentModel");
const Admin = require("../models/adminModel");
const { SECRET_TOKEN } = process.env;
const { requestResponse } = require("../utils/requestResponse");
// const verifyAuth = async (req, res, next) => {
//   const authorization = req.headers.authorization;
//   const token = authorization && authorization.split(" ")[1];
//   if (!token) return res.status(401).json({ error: "Null Token" });

//   try {
//     const { _id } = jwt.verify(token, process.env.SECRET_TOKEN);
//     req.user_id = await Student.findById(_id).select("_id");
//     next();
//   } catch (error) {
//     res.status(403).json({ error: "Invalid Token" });
//   }
// };

function checkToken(authorization, res) {
  // const authorization = req.headers.authorization;
  const token = authorization && authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Null Token" });
  return token;
}

// BIKIN
// 1 FUNGSI UNTUK MEMERIKA APAKAH USER VALID
// 2 CEK ROLE NYA APA AJA
class VerifyAuth {
  async verifyAuth(req, res, next) {
    // console.log("path", path);
    const token = checkToken(req.headers.authorization, res);
    if (typeof token === "object") return;

    try {
      const { _id, role } = jwt.verify(token, SECRET_TOKEN);
      req.user_role = role;
      next();
    } catch (error) {
      res.status(403).json({ error: "Invalid Token" });
    }
  }
  async verifyAuthRole(req, res, next, roles) {
    const role = req.user_role;
    console.log(role);
    console.log(roles);
    if (!roles.includes(role))
      return res.status(401).json({
        ...requestResponse.unauthorized,
        message: "You are not authorized",
      });
    next();
  }
}
module.exports = new VerifyAuth();
