const route = require("express").Router();
const teacherController = require("../controller/teacher_controller");
const verify = require("../middleware/verifyAuth.js");
const checkRolesAccess = require("../utils/checkRolesAccess");
const {
  ROLES: { admin, teacher, parent, student },
} = require("../utils/roles");

// const { signupCheck, loginCheck } = require("../middleware/validator");
route.use(verify.verifyAuth);

route.get("/", teacherController.teachers);
route.delete("/:id", teacherController.removeTeacher);
route.patch("/", teacherController.updateTeacher);

module.exports = route;
