const route = require("express").Router();
const authController = require("../controller/auth_controller");
const ROLE = {
  student: "student",
  parent: "parent",
  teacher: "teacher",
};

// student
route.post(`/:role/login`, authController.login);
route.post(`/:role/register`, authController.register);

module.exports = route;
