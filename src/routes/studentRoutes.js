const route = require("express").Router();
const studentController = require("../controller/student_controller");
// const { signupCheck, loginCheck } = require("../middleware/validator");

route.get("/", studentController.students);

module.exports = route;
