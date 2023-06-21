const route = require("express").Router();
const {
  loginUser,
  signupUser,
  getUsers,
} = require("../controller/student_controller");
// const { signupCheck, loginCheck } = require("../middleware/validator");

// route.post("/login", loginCheck, loginUser);
// route.post("/signup", signupCheck, signupUser);
route.post("/login", loginUser);
route.post("/signup", signupUser);
route.get("/", getUsers);

module.exports = route;
