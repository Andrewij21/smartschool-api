const route = require("express").Router();
const studentController = require("../controller/student_controller");
const verify = require("../middleware/verifyAuth");

// const { signupCheck, loginCheck } = require("../middleware/validator");
route.use(verify);

route.get("/", studentController.students);
route.delete("/:id", studentController.removeStudent);
route.patch("/", studentController.updateStudent);

module.exports = route;
