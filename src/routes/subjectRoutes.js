const route = require("express").Router();
const subjectController = require("../controller/subject_controller");
const verify = require("../middleware/verifyAuth.js");
const checkRolesAccess = require("../utils/checkRolesAccess");
const {
  ROLES: { admin, teacher, parent, student },
} = require("../utils/roles");

// const { signupCheck, loginCheck } = require("../middleware/validator");
route.use(verify.verifyAuth);

route.get("/", subjectController.subjects);
route.post("/", subjectController.createSubject);
route.delete("/:id", subjectController.removeSubject);
route.patch("/", subjectController.updateSubject);

module.exports = route;
