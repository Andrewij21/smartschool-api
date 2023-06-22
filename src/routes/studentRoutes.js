const route = require("express").Router();
const studentController = require("../controller/student_controller");
const verify = require("../middleware/verifyAuth.js");

// const { signupCheck, loginCheck } = require("../middleware/validator");
// route.use((req, res, next) => verify.verifyAuthStudent(req, res, next));
route.use(verify.verifyAuthStudent);

route.get("/", studentController.students);
route.delete("/:id", studentController.removeStudent);
route.patch("/", studentController.updateStudent);

module.exports = route;
