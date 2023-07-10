const route = require("express").Router();
const attendanceController = require("../controller/attendance_controller");
const verify = require("../middleware/verifyAuth.js");
const upload = require("../middleware/upload");
const checkRolesAccess = require("../utils/checkRolesAccess");
const {
  ROLES: { admin, teacher, parent, student },
} = require("../utils/roles");

// const { signupCheck, loginCheck } = require("../middleware/validator");

/*
Add this 'upload.single("image")'
if selfie FEAT is fix
*/

route.use(verify.verifyAuth);

route.get("/", attendanceController.attendances);
route.post("/", attendanceController.createAttendance);
route.patch("/:id", attendanceController.addStudentToAttendance);
route.delete("/:id", attendanceController.removeAttendance);
route.patch("/", attendanceController.updateAttendance);

module.exports = route;
