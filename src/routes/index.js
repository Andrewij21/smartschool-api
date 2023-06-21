const route = require("express").Router();
const studentRoutes = require("./studentRoutes");
const ORIGIN_URI = "/api/v1/";

route.use(ORIGIN_URI + "student", studentRoutes);

module.exports = route;
