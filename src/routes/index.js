const route = require("express").Router();
const studentRoutes = require("./studentRoutes");
const authRoutes = require("./authRoutes");
const ORIGIN_URI = "/api/v1/";

route.use(ORIGIN_URI + "student", studentRoutes);
route.use(ORIGIN_URI + "auth", authRoutes);

module.exports = route;
