const jwt = require("jsonwebtoken");
const Student = require("../models/studentModel");

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
class VerifyAuth {
  async verifyAuthStudent(req, res, next) {
    const token = checkToken(req.headers.authorization, res);
    if (typeof token === "object") return;
    try {
      const { _id } = jwt.verify(token, process.env.SECRET_TOKEN);
      req.user_id = await Student.findById(_id).select("_id");
      next();
    } catch (error) {
      res.status(403).json({ error: "Invalid Token" });
    }
  }
}
module.exports = new VerifyAuth();
