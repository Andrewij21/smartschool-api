const route = require("express").Router();
const studentController = require("../controller/student_controller");
const verify = require("../middleware/verifyAuth.js");
const checkRolesAccess = require("../utils/checkRolesAccess");
const {
  ROLES: { admin, teacher, parent, student },
} = require("../utils/roles");

// const { signupCheck, loginCheck } = require("../middleware/validator");
route.use(verify.verifyAuth);

route.get("/", checkRolesAccess([admin]), studentController.students);
route.get("/:id", studentController.studentById);
route.delete("/:id", studentController.removeStudent);
route.patch("/", studentController.updateStudent);

module.exports = route;
