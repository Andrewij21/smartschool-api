const route = require("express").Router();
const authController = require("../controller/auth_controller");

route.post(`/:role/login`, authController.login);
route.post(`/:role/register`, authController.register);

module.exports = route;
