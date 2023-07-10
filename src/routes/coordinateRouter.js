const route = require("express").Router();
const coordinateController = require("../controller/coordinateController");
const verify = require("../middleware/verifyAuth.js");
const checkRolesAccess = require("../utils/checkRolesAccess");
const {
  ROLES: { admin, teacher, parent, student },
} = require("../utils/roles");

route.use(verify.verifyAuth);

route.get("/", coordinateController.getCoordinate);
route.post("/", coordinateController.createCoordinate);

module.exports = route;
