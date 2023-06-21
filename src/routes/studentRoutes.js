const route = require("express").Router();
const studentController = require("../controller/student_controller");
// const { signupCheck, loginCheck } = require("../middleware/validator");

route.get("/", studentController.students);
route.delete("/:id", studentController.removeStudent);
route.patch("/", studentController.updateStudent);

module.exports = route;
