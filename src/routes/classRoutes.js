const route = require("express").Router();
const classController = require("../controller/class_controller");
const verify = require("../middleware/verifyAuth.js");
const checkRolesAccess = require("../utils/checkRolesAccess");
const {
  ROLES: { admin, teacher, parent, student },
} = require("../utils/roles");

// const { signupCheck, loginCheck } = require("../middleware/validator");
route.use(verify.verifyAuth);

route.get("/", classController.classes);
route.post("/", classController.createClass);
route.delete("/:id", classController.removeClass);
route.patch("/", classController.updateClass);

module.exports = route;
