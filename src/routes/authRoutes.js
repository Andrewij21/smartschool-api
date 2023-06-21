const route = require("express").Router();
const {
  loginStudent,
  registerStudent,
} = require("../controller/auth_controller");
const ROLE = {
  student: "student",
  parent: "parent",
  teacher: "teacher",
};

// student
route.post(`/${ROLE.student}/login`, loginStudent);
route.post(`/${ROLE.student}/register`, registerStudent);

module.exports = route;
